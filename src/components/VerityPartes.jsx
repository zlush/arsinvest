import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Revelar from './Revelar.jsx'
import { avisoLegal, cierre, socios } from '../content/verity.js'

/**
 * Piezas comunes de /verity y de las páginas de línea. La identidad es la de
 * Verity (docs/brand-kit.md §12): tinta, bronce, títulos en Marcellus. El menú
 * y el pie siguen siendo los de ARS.
 */

/** Filete de bronce bajo el título: la "línea de nivel" del símbolo. */
export function LineaNivel({ className = '' }) {
  return <span aria-hidden="true" className={`block h-0.5 w-12 bg-verity-bronce ${className}`} />
}

export function VerityHero({ etiqueta, titulo, bajada, children, lateral }) {
  return (
    <section className="bg-verity-tinta text-verity-piedra">
      <div className="mx-auto grid w-full max-w-contenido items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <Revelar>
            <p className="etiqueta text-verity-bronce">{etiqueta}</p>
          </Revelar>
          <Revelar retraso={90}>
            <h1 className="mt-6 max-w-2xl font-verity font-normal tracking-normal text-verity-piedra">
              {titulo}
            </h1>
            <LineaNivel className="mt-8" />
          </Revelar>
          <Revelar retraso={180}>
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-verity-piedra/80">
              {bajada}
            </p>
            {children}
          </Revelar>
        </div>
        {lateral && <Revelar retraso={240}>{lateral}</Revelar>}
      </div>
    </section>
  )
}

/** Etiqueta, título y bajada de una sección clara. */
export function Encabezado({ etiqueta, titulo, bajada, className = '' }) {
  return (
    <div className={`max-w-lectura ${className}`}>
      <p className="etiqueta">{etiqueta}</p>
      {titulo && (
        <h2 className="mt-4 font-verity font-normal tracking-normal text-verity-profundo">
          {titulo}
        </h2>
      )}
      {bajada && (
        <p className="mt-5 max-w-[36rem] text-[17px] leading-relaxed text-tinta/80">{bajada}</p>
      )}
    </div>
  )
}

export function VerityCierre({ extra }) {
  return (
    <section className="bg-verity-profundo text-verity-piedra">
      <div className="mx-auto w-full max-w-contenido px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Revelar>
            <p className="etiqueta text-verity-bronce">Contacto</p>
            <h2 className="mt-4 max-w-2xl font-verity font-normal tracking-normal text-verity-piedra">
              {cierre.titulo}
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-verity-piedra/80">
              {cierre.texto}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contacto" className="group boton-claro">
                Ir al formulario de contacto
                <span className="boton-disco bg-verity-profundo text-white">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              {extra}
            </div>
          </Revelar>

          <Revelar retraso={120}>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {socios.map((s) => (
                <li key={s.nombre} className="py-5">
                  <p className="font-texto font-semibold text-verity-piedra">{s.nombre}</p>
                </li>
              ))}
            </ul>
          </Revelar>
        </div>

        <p className="mt-16 max-w-md border-t border-white/10 pt-6 text-[13px] leading-relaxed text-verity-piedra/60">
          {avisoLegal} Verity es una sociedad vinculada a ARS Invest; su línea de agentización
          empresarial opera con la marca Cardus.
        </p>
      </div>
    </section>
  )
}
