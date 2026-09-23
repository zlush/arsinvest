import { contacto } from '../content/contacto.js'
import { equipo } from '../content/equipo.js'

const SITIO = (import.meta.env.VITE_SITIO || 'https://arsinvest.cl').replace(/\/$/, '')

/**
 * JSON-LD. Es lo que permite que Google entienda qué es ARS Invest en vez de
 * inferirlo del texto: nombre, dirección, teléfono, fundador y área de
 * operación quedan declarados, y de ahí salen el panel de la derecha y los
 * resultados enriquecidos.
 *
 * Google lo lee en cualquier parte del documento, así que no necesita estar en
 * el <head>. Todo lo que se declara aquí está también visible en la página:
 * marcar datos que el visitante no puede ver es una violación de las
 * directrices y se penaliza.
 */

export const organizacion = {
  '@type': 'Organization',
  '@id': `${SITIO}/#organizacion`,
  name: 'ARS Invest',
  url: `${SITIO}/`,
  logo: `${SITIO}/img/ars-logo.png`,
  description:
    'Estructuración y coadministración de inversiones para el desarrollo de proyectos inmobiliarios en Chile.',
  email: contacto.correo,
  telephone: contacto.telefono,
  address: {
    '@type': 'PostalAddress',
    streetAddress: contacto.direccion.calle,
    addressLocality: 'Lo Barnechea',
    addressRegion: 'Región Metropolitana',
    addressCountry: 'CL',
  },
  areaServed: { '@type': 'Country', name: 'Chile' },
  founder: {
    '@type': 'Person',
    name: equipo[0].nombre,
    jobTitle: equipo[0].cargo,
  },
}

function Bloque({ datos }) {
  return (
    <script
      type="application/ld+json"
      // El JSON lo genera este componente desde datos propios, no desde
      // entrada de usuario: no hay superficie de inyección.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }}
    />
  )
}

export function DatosSitio() {
  return (
    <Bloque
      datos={{
        '@context': 'https://schema.org',
        '@graph': [
          organizacion,
          {
            '@type': 'WebSite',
            '@id': `${SITIO}/#sitio`,
            url: `${SITIO}/`,
            name: 'ARS Invest',
            inLanguage: 'es-CL',
            publisher: { '@id': `${SITIO}/#organizacion` },
          },
        ],
      }}
    />
  )
}

export function DatosArticulo({ articulo }) {
  return (
    <Bloque
      datos={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: articulo.titulo,
        description: articulo.descripcionSeo,
        datePublished: articulo.fecha,
        dateModified: articulo.fecha,
        inLanguage: 'es-CL',
        author: { '@type': 'Organization', name: articulo.autor },
        publisher: { '@id': `${SITIO}/#organizacion` },
        mainEntityOfPage: `${SITIO}/actualidad-inmobiliaria/${articulo.slug}`,
      }}
    />
  )
}

export function Migas({ ruta }) {
  return (
    <Bloque
      datos={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [{ nombre: 'Inicio', url: '/' }, ...ruta].map((paso, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: paso.nombre,
          item: `${SITIO}${paso.url}`,
        })),
      }}
    />
  )
}
