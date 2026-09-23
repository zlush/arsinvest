import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import { articulos } from '../content/articulos/index.js'

export default function Actualidad() {
  return (
    <>
      <Seo ruta="/actualidad-inmobiliaria" />

      <section className="border-b border-gris-200 bg-niebla">
        <div className="mx-auto w-full max-w-contenido px-5 py-16 sm:px-8 lg:py-20">
          <p className="etiqueta text-azul-500">Actualidad inmobiliaria</p>
          <h1 className="mt-5 max-w-3xl">
            Cómo funciona el desarrollo inmobiliario, explicado sin atajos.
          </h1>
          <p className="mt-6 max-w-lectura text-[18px] leading-relaxed text-tinta/85">
            Publicamos sobre estructuración de inversiones y sobre los programas habitacionales
            que dan contexto al desarrollo en Chile. Cada artículo cita sus fuentes.
          </p>
        </div>
      </section>

      <section className="seccion">
        <ul className="space-y-px overflow-hidden rounded border border-gris-200 bg-gris-200">
          {articulos.map((articulo) => (
            <li key={articulo.slug} className="relative bg-white p-7 transition-colors hover:bg-niebla sm:p-9">
              <div className="flex flex-wrap items-center gap-3">
                <span className="etiqueta text-azul-500">{articulo.categoria}</span>
                <span className="etiqueta" aria-hidden="true">·</span>
                <time className="etiqueta" dateTime={articulo.fecha}>
                  {articulo.fechaTexto}
                </time>
              </div>

              <h2 className="mt-4 max-w-3xl text-[1.4rem] sm:text-[1.6rem]">
                <Link to={`/actualidad-inmobiliaria/${articulo.slug}`} className="hover:text-azul-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {articulo.titulo}
                </Link>
              </h2>

              <p className="mt-4 max-w-lectura text-[16px] leading-relaxed text-gris-500">
                {articulo.bajada}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 font-texto text-sm font-semibold text-azul-600">
                Leer artículo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
