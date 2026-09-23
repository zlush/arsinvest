/**
 * Prerender: escribe un HTML por ruta con el contenido ya renderizado.
 *
 * El sitio es una SPA. Sin esto, el HTML crudo de cualquier ruta es una
 * cáscara vacía con el <title> de la portada. Googlebot ejecuta JavaScript y
 * termina viendo la página, pero en una segunda pasada más lenta; WhatsApp y
 * LinkedIn no lo ejecutan nunca, así que cada artículo compartido mostraría el
 * título equivocado. Para un sitio cuyo objetivo declarado es posicionar
 * cuatro artículos, eso no es un detalle.
 *
 * Corre después de `vite build` y de la build SSR. También emite robots.txt y
 * sitemap.xml desde la misma lista de rutas.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { RUTAS, render } from '../dist-ssr/entry-server.js'

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(RAIZ, 'dist')
const SITIO = (process.env.VITE_SITIO || 'https://arsinvest.cl').replace(/\/$/, '')

/**
 * index.html trae su propio <title> y su propia meta description. Hay que
 * quitarlos antes de inyectar los de la ruta: si no, quedan dos descripciones
 * y gana la de la portada, que es justo el defecto que este script corrige.
 * El <meta name="viewport"> y el charset se conservan.
 */
const LIMPIAR_CABECERA = new RegExp(
  [
    '[ \\t]*(?:',
    '<title>[\\s\\S]*?<\\/title>',
    '|<meta\\b[^>]*\\bname=["\']description["\'][^>]*>',
    '|<meta\\b[^>]*\\bproperty=["\']og:[^>]*>',
    '|<link\\b[^>]*\\brel=["\']canonical["\'][^>]*>',
    ')\\n?',
  ].join(''),
  'g',
)

/**
 * React 19 trata <title> y <meta> como "hoistable": en el navegador los sube
 * al <head>, pero renderToString no controla el <head> y los deja escritos
 * dentro del #root. El <head> definitivo lo arma este script, así que los de
 * abajo sobran y quedarían duplicados en el HTML servido.
 *
 * El <link rel="preload" as="image"> que React emite sí se conserva: ese
 * adelanta la carga de la imagen principal y no duplica nada.
 */
const LIMPIAR_CUERPO = new RegExp(
  [
    '(?:',
    '<title>[\\s\\S]*?<\\/title>',
    '|<meta\\b[^>]*\\bname="description"[^>]*>',
    '|<meta\\b[^>]*\\bproperty="og:[^>]*>',
    '|<link\\b[^>]*\\brel="canonical"[^>]*>',
    ')',
  ].join(''),
  'g',
)

function escapar(texto) {
  return String(texto ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function cabecera({ titulo, descripcion, ruta, imagen }) {
  const url = `${SITIO}${ruta === '/' ? '' : ruta}`
  const t = escapar(titulo)
  const d = escapar(descripcion)
  const og = imagen ? `${SITIO}${imagen}` : `${SITIO}/img/proyectos/playa-quintero.png`

  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${escapar(og)}" />`,
    `<meta property="og:locale" content="es_CL" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join('\n    ')
}

async function main() {
  const plantilla = await readFile(join(DIST, 'index.html'), 'utf8')
  if (!plantilla.includes('<div id="root"></div>')) {
    throw new Error('La plantilla no tiene <div id="root"></div>: ¿cambió index.html?')
  }

  for (const entrada of RUTAS) {
    const { ruta } = entrada
    const cuerpo = render(ruta).replace(LIMPIAR_CUERPO, '')

    const html = plantilla
      .replace(LIMPIAR_CABECERA, '')
      .replace('</head>', `  ${cabecera(entrada)}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${cuerpo}</div>`)

    // Dos formas del mismo archivo a propósito: los hosts estáticos no se
    // ponen de acuerdo en cómo resolver /proyectos — unos buscan
    // proyectos.html y otros proyectos/index.html.
    const destinos =
      ruta === '/'
        ? [join(DIST, 'index.html')]
        : [join(DIST, `${ruta}.html`), join(DIST, ruta, 'index.html')]

    for (const destino of destinos) {
      await mkdir(dirname(destino), { recursive: true })
      await writeFile(destino, html, 'utf8')
    }
  }

  // 404 propio. Sin esto, el rewrite comodín responde 200 con la portada a
  // cualquier URL inventada: un soft 404 que hace competir a la portada
  // consigo misma en cada dirección mal escrita.
  const html404 = plantilla
    .replace(LIMPIAR_CABECERA, '')
    .replace(
      '</head>',
      '  <title>Página no encontrada — ARS Invest</title>\n    <meta name="robots" content="noindex" />\n  </head>',
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root">${render('/404').replace(LIMPIAR_CUERPO, '')}</div>`,
    )
  await writeFile(join(DIST, '404.html'), html404, 'utf8')

  await writeFile(
    join(DIST, 'robots.txt'),
    ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITIO}/sitemap.xml`, ''].join('\n'),
    'utf8',
  )

  // Los artículos llevan su propia fecha; el resto hereda la del build. Un
  // lastmod inventado por página es peor que no ponerlo: si todas las URLs
  // dicen que cambiaron hoy, el dato deja de significar algo.
  const hoy = new Date().toISOString().slice(0, 10)
  const urls = RUTAS.map(({ ruta, prioridad, fecha }) =>
    [
      '  <url>',
      `    <loc>${SITIO}${ruta === '/' ? '/' : ruta}</loc>`,
      `    <lastmod>${fecha || hoy}</lastmod>`,
      `    <priority>${prioridad}</priority>`,
      '  </url>',
    ].join('\n'),
  ).join('\n')
  await writeFile(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    'utf8',
  )

  console.log(`  ${RUTAS.length} rutas prerenderizadas · robots.txt y sitemap.xml emitidos`)
}

main().catch((error) => {
  console.error('\nPrerender fallido:', error)
  process.exit(1)
})
