import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import Revelar from '../components/Revelar.jsx'
import { VeritySimbolo } from '../components/VerityMarca.jsx'
import VerityIlustracion from '../components/VerityIlustracion.jsx'
import { Encabezado, VerityCierre, VerityHero } from '../components/VerityPartes.jsx'
import {
  lineas,
  lineasResumen,
  portadaVerity,
  principios,
  publicos,
  sociedad,
} from '../content/verity.js'

/** /verity: la sociedad y sus tres líneas, cada una con su página. */
export default function Verity() {
  return (
    <>
      <Seo ruta="/verity" />

      <VerityHero
        etiqueta={portadaVerity.etiqueta}
        titulo={portadaVerity.titulo}
        bajada={portadaVerity.bajada}
        lateral={
          <div className="flex justify-center lg:justify-end">
            <VeritySimbolo claro className="h-auto w-48 sm:w-64 lg:w-80" />
          </div>
        }
      />

      <section className="border-b border-gris-200">
        <div className="seccion">
          <Encabezado etiqueta={lineasResumen.etiqueta} titulo={lineasResumen.titulo} />

          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {lineas.map((linea, i) => (
              <Revelar as="li" key={linea.slug} retraso={i * 90}>
                <Link
                  to={`/verity/${linea.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-gris-200 bg-white p-5 transition-colors duration-500 ease-suave hover:border-verity-bronce"
                >
                  <VerityIlustracion
                    nombre={linea.miniatura}
                    oscura={linea.slug === 'agentizacion'}
                  />
                  <p className="mt-6 flex items-baseline gap-3">
                    <span className="cifra text-[15px] text-verity-profundo">{linea.numero}</span>
                    <span className="etiqueta">{linea.tema}</span>
                  </p>
                  <h3 className="mt-3 font-verity text-[1.5rem] font-normal tracking-normal text-verity-profundo">
                    {linea.nombre}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-gris-500">
                    {linea.resumen}
                  </p>
                  <span className="enlace-flecha mt-6">
                    Ver la línea
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-500 ease-suave group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Revelar>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-gris-200 bg-niebla">
        <div className="seccion">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Encabezado etiqueta={sociedad.etiqueta} titulo={sociedad.titulo} />
            <p className="text-[17px] leading-relaxed text-tinta/80 lg:pt-10">{sociedad.texto}</p>
          </div>

          <dl className="mt-14 grid gap-px overflow-hidden rounded border border-gris-200 bg-gris-200 md:grid-cols-2">
            {[
              ['Visión', sociedad.vision],
              ['Misión', sociedad.mision],
            ].map(([titulo, texto]) => (
              <div key={titulo} className="bg-white p-7 sm:p-9">
                <dt className="etiqueta">{titulo}</dt>
                <dd className="mt-4 text-pretty font-verity text-[1.35rem] leading-snug text-verity-profundo">
                  {texto}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-gris-200">
        <div className="seccion">
          <Encabezado etiqueta={principios.etiqueta} titulo={principios.titulo} />
          <div className="mt-12 grid gap-px overflow-hidden rounded border border-gris-200 bg-gris-200 sm:grid-cols-2">
            {principios.items.map((p) => (
              <div key={p.titulo} className="bg-white p-7">
                <h3 className="font-texto text-[1.05rem] font-semibold tracking-normal text-verity-profundo">
                  {p.titulo}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-gris-500">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="seccion">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Encabezado etiqueta={publicos.etiqueta} titulo={publicos.titulo} />
            <ul className="divide-y divide-gris-200 border-y border-gris-200">
              {publicos.items.map((texto) => (
                <li
                  key={texto}
                  className="flex gap-4 py-5 text-[16px] leading-relaxed text-tinta/85"
                >
                  <span
                    aria-hidden="true"
                    className="mt-3 block h-0.5 w-4 shrink-0 bg-verity-bronce"
                  />
                  {texto}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <VerityCierre />
    </>
  )
}
