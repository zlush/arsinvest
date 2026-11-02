/**
 * Fuente única de rutas y metadatos.
 *
 * La consumen tres cosas que no pueden decir cosas distintas: el componente
 * Seo en el navegador, el prerender que escribe el <head> de cada HTML y el
 * sitemap. Cuando esto vivía en dos listas, una quedaba desactualizada y el
 * enlace compartido mostraba el título de otra página.
 */

import { proyectos } from './proyectos.js'
import { articulos } from './articulos/index.js'
import { lineas, portadaVerity } from './verity.js'

const ESTATICAS = [
  {
    ruta: '/',
    titulo: 'ARS Invest — Estructuramos inversiones para desarrollo inmobiliario en Chile',
    descripcion:
      'Estructuramos inversiones para desarrollar proyectos inmobiliarios en Chile. Participamos desde la evaluación del terreno hasta la distribución de resultados.',
    prioridad: '1.0',
  },
  {
    ruta: '/quienes-somos',
    titulo: 'Quiénes somos — ARS Invest',
    descripcion:
      'Equipo, visión y modelo de trabajo de ARS Invest: estructuración y coadministración de inversiones para desarrollo inmobiliario en Chile.',
    prioridad: '0.8',
  },
  {
    ruta: '/proyectos',
    titulo: 'Proyectos — ARS Invest',
    descripcion:
      'Proyectos inmobiliarios en ejecución y finalizados en los que ARS Invest participa: ubicación, escala, estado y rol de la firma.',
    prioridad: '0.9',
  },
  {
    ruta: '/actualidad-inmobiliaria',
    titulo: 'Actualidad inmobiliaria — ARS Invest',
    descripcion:
      'Artículos sobre inversión en desarrollo inmobiliario en Chile y los programas habitacionales DS49, DS10 y DS19.',
    prioridad: '0.7',
  },
  {
    ruta: '/contacto',
    titulo: 'Contacto — ARS Invest',
    descripcion:
      'Converse con ARS Invest sobre inversión en desarrollo inmobiliario, terrenos o proyectos de construcción en Chile.',
    prioridad: '0.8',
  },
]

const DE_VERITY = [
  {
    ruta: '/verity',
    titulo: 'Verity — Macrolotes, power centers y agentización empresarial',
    descripcion: portadaVerity.bajada,
    prioridad: '0.8',
  },
  ...lineas.map((l) => ({
    ruta: `/verity/${l.slug}`,
    titulo: `${l.nombre} — Verity`,
    descripcion: l.resumen,
    prioridad: '0.7',
  })),
]

const DE_PROYECTOS = proyectos.map((p) => ({
  ruta: `/proyectos/${p.slug}`,
  titulo: `${p.nombre} — ARS Invest`,
  descripcion: p.descripcion,
  imagen: p.foto || undefined,
  prioridad: '0.6',
}))

const DE_ARTICULOS = articulos.map((a) => ({
  ruta: `/actualidad-inmobiliaria/${a.slug}`,
  titulo: `${a.titulo} — ARS Invest`,
  descripcion: a.descripcionSeo,
  // Los artículos llevan su propia fecha al sitemap; el resto hereda la del
  // build. Un lastmod inventado por página es peor que no ponerlo.
  fecha: a.fecha,
  prioridad: '0.6',
}))

export const RUTAS = [...ESTATICAS, ...DE_VERITY, ...DE_PROYECTOS, ...DE_ARTICULOS]

export function metaDe(ruta) {
  return RUTAS.find((r) => r.ruta === ruta)
}
