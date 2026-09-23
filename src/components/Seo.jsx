import { metaDe } from '../content/rutas.js'

const SITIO = (import.meta.env.VITE_SITIO || 'https://arsinvest.cl').replace(/\/$/, '')

/**
 * React 19 eleva <title>, <meta> y <link> al <head> por sí solo, así que no
 * hace falta Helmet ni un efecto que manipule el DOM.
 *
 * Los textos salen de src/content/rutas.js, la misma lista que usa el
 * prerender: así el HTML servido y el que arma el navegador no pueden decir
 * cosas distintas. Las props explícitas solo hacen falta si algún día una
 * ruta necesita un título que no esté en la tabla.
 */
export default function Seo({ ruta, titulo, descripcion, imagen }) {
  const meta = metaDe(ruta) || {}
  const t = titulo || meta.titulo
  const d = descripcion || meta.descripcion
  const img = imagen || meta.imagen
  const url = `${SITIO}${ruta === '/' ? '' : ruta}`

  return (
    <>
      <title>{t}</title>
      <meta name="description" content={d} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="es_CL" />
      {img && <meta property="og:image" content={`${SITIO}${img}`} />}
    </>
  )
}
