import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import { DatosArticulo, Migas } from '../components/DatosEstructurados.jsx'
import NoEncontrado from './NoEncontrado.jsx'
import { buscarArticulo } from '../content/articulos/index.js'

function Bloque({ bloque }) {
  if (bloque.tipo === 'h2') {
    return <h2 className="mt-12 text-[1.5rem] sm:text-[1.75rem]">{bloque.texto}</h2>
  }

  if (bloque.tipo === 'lista') {
    return (
      <ul className="mt-6 space-y-3">
        {bloque.items.map((item) => (
          <li key={item} className="flex gap-3 text-[17px] leading-relaxed text-tinta/85">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-azul-400" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    )
  }

  if (bloque.tipo === 'nota') {
    return (
      <aside className="mt-8 border-l-2 border-azul-400 bg-niebla p-5 text-[15px] leading-relaxed text-gris-500">
        {bloque.texto}
      </aside>
    )
  }

  return <p className="mt-6 text-[17px] leading-relaxed text-tinta/85">{bloque.texto}</p>
}

export default function ArticuloDetalle() {
  const { slug } = useParams()
  const articulo = buscarArticulo(slug)

  if (!articulo) return <NoEncontrado />

  return (
    <>
      <Seo ruta={`/actualidad-inmobiliaria/${articulo.slug}`} />
      <DatosArticulo articulo={articulo} />
      <Migas
        ruta={[
          { nombre: 'Actualidad inmobiliaria', url: '/actualidad-inmobiliaria' },
          { nombre: articulo.titulo, url: `/actualidad-inmobiliaria/${articulo.slug}` },
        ]}
      />

      <article>
        <header className="border-b border-gris-200 bg-niebla">
          <div className="mx-auto w-full max-w-contenido px-5 py-12 sm:px-8 lg:py-16">
            <Link
              to="/actualidad-inmobiliaria"
              className="inline-flex items-center gap-2 font-texto text-[14px] font-semibold text-azul-600 hover:text-azul-500"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Actualidad inmobiliaria
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="etiqueta text-azul-500">{articulo.categoria}</span>
              <span className="etiqueta" aria-hidden="true">·</span>
              <time className="etiqueta" dateTime={articulo.fecha}>
                {articulo.fechaTexto}
              </time>
              <span className="etiqueta" aria-hidden="true">·</span>
              <span className="etiqueta">{articulo.autor}</span>
            </div>

            <h1 className="mt-4 max-w-4xl">{articulo.titulo}</h1>
            <p className="mt-5 max-w-lectura text-[18px] leading-relaxed text-tinta/85">
              {articulo.bajada}
            </p>
          </div>
        </header>

        <div className="mx-auto w-full max-w-lectura px-5 py-14 sm:px-8 lg:py-20">
          {articulo.cuerpo.map((bloque, i) => (
            <Bloque key={i} bloque={bloque} />
          ))}

          {articulo.fuentes.length > 0 && (
            <section className="mt-16 border-t border-gris-200 pt-8">
              <h2 className="text-[1.05rem]">Fuentes</h2>
              <ul className="mt-4 space-y-2.5">
                {articulo.fuentes.map((fuente) => (
                  <li key={fuente.url} className="text-[15px] leading-relaxed">
                    <a
                      href={fuente.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="enlace"
                    >
                      {fuente.texto}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-12 rounded border border-gris-200 bg-niebla p-7">
            <Link
              to={articulo.enlaceSalida.ruta}
              className="inline-flex items-center gap-2 font-titulo text-[1.05rem] font-semibold text-azul-700 hover:text-azul-600"
            >
              {articulo.enlaceSalida.texto}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
