import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import Revelar from '../components/Revelar.jsx'
import VerityIlustracion from '../components/VerityIlustracion.jsx'
import { Encabezado, VerityCierre, VerityHero } from '../components/VerityPartes.jsx'
import { lineaDe, lineas } from '../content/verity.js'
import NoEncontrado from './NoEncontrado.jsx'

/**
 * Una página por línea de Verity. El contenido llega de src/content/verity.js
 * como una lista de bloques; aquí solo se decide cómo se dibuja cada tipo.
 */

function Ilustracion({ bloque }) {
  if (!bloque.ilustracion) return null
  return (
    <Revelar className="mt-12">
      <VerityIlustracion
        nombre={bloque.ilustracion}
        pie={bloque.pie}
        oscura={bloque.ilustracionOscura}
      />
    </Revelar>
  )
}

function BloqueTexto({ bloque }) {
  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <p className="etiqueta">{bloque.etiqueta}</p>
        <div>
          <h2 className="font-verity font-normal tracking-normal text-verity-profundo">
            {bloque.titulo}
          </h2>
          {bloque.parrafos.map((p) => (
            <p key={p} className="mt-5 max-w-lectura text-[17px] leading-relaxed text-tinta/80">
              {p}
            </p>
          ))}
        </div>
      </div>
      <dl
        className={`mt-14 grid gap-px overflow-hidden rounded border border-gris-200 bg-gris-200 ${
          bloque.columnas.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
        }`}
      >
        {bloque.columnas.map((c) => (
          <div key={c.titulo} className="bg-white p-7">
            <dt className="etiqueta">{c.titulo}</dt>
            <dd className="mt-4 text-pretty font-verity text-[1.2rem] leading-snug text-verity-profundo">
              {c.texto}
            </dd>
          </div>
        ))}
      </dl>
    </>
  )
}

function BloqueGrilla({ bloque }) {
  const columnas = bloque.items.length % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
  return (
    <>
      <Encabezado etiqueta={bloque.etiqueta} titulo={bloque.titulo} bajada={bloque.bajada} />
      <Ilustracion bloque={bloque} />
      <div
        className={`mt-12 grid gap-px overflow-hidden rounded border border-gris-200 bg-gris-200 sm:grid-cols-2 ${columnas}`}
      >
        {bloque.items.map((item) => (
          <div key={item.titulo} className="bg-white p-7">
            {/* Sin rótulo no se inventa un 01, 02: numerar capacidades que no
                tienen orden las hace parecer pasos. */}
            {item.rotulo && <p className="mb-3 etiqueta">{item.rotulo}</p>}
            <h3 className="font-texto text-[1.05rem] font-semibold tracking-normal text-verity-profundo">
              {item.titulo}
            </h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-gris-500">{item.texto}</p>
          </div>
        ))}
      </div>
    </>
  )
}

function BloquePasos({ bloque }) {
  return (
    <>
      <Encabezado etiqueta={bloque.etiqueta} titulo={bloque.titulo} bajada={bloque.bajada} />
      <Ilustracion bloque={bloque} />
      <ol className="mt-12 space-y-px overflow-hidden rounded border border-gris-200 bg-gris-200">
        {bloque.items.map((paso, i) => (
          <li
            key={paso.titulo}
            className="grid gap-2 bg-white p-6 sm:grid-cols-[3.5rem_13rem_1fr] sm:items-baseline sm:gap-6 lg:grid-cols-[3.5rem_14rem_1fr_11rem]"
          >
            <span className="cifra text-[15px] text-verity-profundo">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-texto text-[1.05rem] font-semibold tracking-normal text-verity-profundo">
              {paso.titulo}
            </h3>
            <p className="text-[15px] leading-relaxed text-gris-500">{paso.texto}</p>
            {paso.hito ? (
              <p className="flex items-center gap-2 sm:col-start-3 lg:col-start-auto">
                <span
                  aria-hidden="true"
                  className="block h-2 w-2 shrink-0 rotate-45 bg-verity-bronce"
                />
                <span className="etiqueta text-verity-profundo">{paso.hito}</span>
              </p>
            ) : (
              <span className="hidden lg:block" />
            )}
          </li>
        ))}
      </ol>
    </>
  )
}

function Filas({ filas }) {
  return (
    <dl className="divide-y divide-gris-200 border-y border-gris-200">
      {filas.map(([clave, valor]) => (
        <div key={clave} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
          <dt className="font-texto text-[15px] font-semibold text-verity-profundo">{clave}</dt>
          <dd className="text-pretty text-[15px] leading-relaxed text-tinta/80">{valor}</dd>
        </div>
      ))}
    </dl>
  )
}

function BloqueFicha({ bloque }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <Encabezado etiqueta={bloque.etiqueta} titulo={bloque.titulo} bajada={bloque.bajada} />
      <Filas filas={bloque.filas} />
    </div>
  )
}

function BloqueCaso({ bloque }) {
  const { tabla } = bloque
  return (
    <>
      <Encabezado etiqueta={bloque.etiqueta} titulo={bloque.titulo} bajada={bloque.bajada} />

      <p className="mt-8 max-w-lectura border-l-2 border-verity-bronce bg-white p-5 text-[14px] leading-relaxed text-gris-500">
        {bloque.advertencia}
      </p>

      <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded border border-gris-200 bg-gris-200 lg:grid-cols-4">
        {bloque.indicadores.map((ind) => (
          // dt antes que dd, como pide <dl>; flex-col-reverse pone la cifra arriba.
          <div key={ind.texto} className="flex flex-col-reverse bg-white p-6">
            <dt className="mt-3 text-[14px] text-gris-500">{ind.texto}</dt>
            <dd className="cifra text-[1.9rem] leading-none text-verity-profundo">{ind.valor}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        {/* min-w-0: sin esto la celda de la grilla crece hasta el ancho de la
            tabla y el scroll horizontal se va a la página entera. */}
        <div className="min-w-0">
          <h3 className="font-texto text-[1.05rem] font-semibold tracking-normal text-verity-profundo">
            {tabla.titulo}
          </h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-verity-profundo">
                  {tabla.columnas.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`py-3 pr-4 font-semibold text-verity-profundo ${i > 0 ? 'text-right' : ''}`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tabla.filas.map((fila) => (
                  <tr key={fila[0]} className="border-b border-gris-200">
                    {fila.map((celda, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="py-3 pr-4 font-normal text-tinta">
                          {celda}
                        </th>
                      ) : (
                        <td key={i} className="cifra py-3 pr-4 text-right font-normal text-tinta">
                          {celda}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  {tabla.total.map((celda, i) =>
                    i === 0 ? (
                      <th
                        key={i}
                        scope="row"
                        className="py-3 pr-4 font-semibold text-verity-profundo"
                      >
                        {celda}
                      </th>
                    ) : (
                      <td key={i} className="cifra py-3 pr-4 text-right text-verity-profundo">
                        {celda}
                      </td>
                    ),
                  )}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div>
          <h3 className="font-texto text-[1.05rem] font-semibold tracking-normal text-verity-profundo">
            Supuestos y resultado
          </h3>
          <div className="mt-4">
            <Filas filas={bloque.supuestos} />
          </div>
        </div>
      </div>
    </>
  )
}

function BloqueCifras({ bloque }) {
  return (
    <>
      <p className="etiqueta">{bloque.etiqueta}</p>
      <dl className="mt-8 grid gap-px overflow-hidden rounded border border-gris-200 bg-gris-200 sm:grid-cols-3">
        {bloque.items.map((c) => (
          <div key={c.texto} className="flex flex-col-reverse bg-white p-7">
            <dt className="mt-3 text-[15px] text-gris-500">{c.texto}</dt>
            <dd className="cifra text-[2.5rem] leading-none text-verity-profundo">{c.valor}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 max-w-lectura text-[13px] leading-relaxed text-gris-500">{bloque.nota}</p>
    </>
  )
}

const BLOQUES = {
  texto: BloqueTexto,
  grilla: BloqueGrilla,
  pasos: BloquePasos,
  ficha: BloqueFicha,
  caso: BloqueCaso,
  cifras: BloqueCifras,
}

function OtrasLineas({ actual }) {
  return (
    <nav aria-label="Otras líneas de Verity" className="border-t border-gris-200">
      <ul className="mx-auto grid w-full max-w-contenido gap-px bg-gris-200 sm:grid-cols-2">
        {lineas
          .filter((l) => l.slug !== actual)
          .map((l) => (
            <li key={l.slug} className="bg-white">
              <Link
                to={`/verity/${l.slug}`}
                className="group flex items-center justify-between gap-6 px-5 py-8 transition-colors duration-500 ease-suave hover:bg-niebla sm:px-8"
              >
                <span>
                  <span className="etiqueta">Otra línea · {l.numero}</span>
                  <span className="mt-2 block font-verity text-[1.35rem] text-verity-profundo">
                    {l.nombre}
                  </span>
                </span>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-verity-profundo transition-transform duration-500 ease-suave group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default function VerityLinea() {
  const { linea: slug } = useParams()
  const linea = lineaDe(slug)
  if (!linea) return <NoEncontrado />

  const { hero } = linea

  return (
    <>
      <Seo ruta={`/verity/${linea.slug}`} />

      <VerityHero
        etiqueta={`${linea.nombre} · ${linea.tema}`}
        titulo={hero.titulo}
        bajada={hero.bajada}
        lateral={
          <VerityIlustracion
            nombre={hero.ilustracion}
            pie={hero.pie}
            oscura={hero.oscura}
            sobreOscuro
          />
        }
      >
        {linea.marcaOperadora && (
          <p className="mt-6 text-[15px] text-verity-piedra/80">
            {linea.marcaOperadora.texto} ·{' '}
            <a
              href={linea.marcaOperadora.url}
              className="text-verity-bronce underline-offset-4 hover:underline"
              rel="noopener"
            >
              cardus.cl
            </a>
          </p>
        )}
        <p className="mt-8">
          <Link to="/verity" className="text-[15px] text-verity-piedra/80 hover:text-verity-piedra">
            ← Verity: las tres líneas
          </Link>
        </p>
      </VerityHero>

      {linea.bloques.map((bloque, i) => {
        const Bloque = BLOQUES[bloque.tipo]
        return (
          <section
            key={bloque.titulo || bloque.etiqueta}
            className={`border-b border-gris-200 ${i % 2 === 1 ? 'bg-niebla' : 'bg-white'}`}
          >
            <Revelar className="seccion">
              <Bloque bloque={bloque} />
            </Revelar>
          </section>
        )
      })}

      <OtrasLineas actual={linea.slug} />

      <VerityCierre
        extra={
          linea.marcaOperadora && (
            <a href="https://cardus.cl/contacto" className="group boton-borde-claro" rel="noopener">
              Contacto en cardus.cl
              <span className="boton-disco bg-white/10">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          )
        }
      />
    </>
  )
}
