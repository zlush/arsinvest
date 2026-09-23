import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import Revelar from '../components/Revelar.jsx'
import EquipoRetrato from '../components/EquipoRetrato.jsx'
import { vision, formaDeTrabajo, comoTrabajamos, sociosConstructores } from '../content/sitio.js'
import { equipo, alcanceTrayectoria } from '../content/equipo.js'

export default function QuienesSomos() {
  return (
    <>
      <Seo ruta="/quienes-somos" />

      <section className="border-b border-gris-200 bg-niebla">
        <div className="mx-auto w-full max-w-contenido px-5 py-16 sm:px-8 lg:py-20">
          <p className="etiqueta text-azul-500">Quiénes somos</p>
          <h1 className="mt-5 max-w-3xl">
            Un equipo con treinta años de banca aplicados al desarrollo inmobiliario.
          </h1>
          <p className="mt-6 max-w-lectura text-[18px] leading-relaxed text-tinta/85">
            ARS Invest estructura y coadministra inversiones para desarrollar proyectos
            inmobiliarios en Chile. No construimos ni corretamos propiedades: evaluamos,
            estructuramos, cofirmamos y controlamos.
          </p>
        </div>
      </section>

      <section className="seccion border-b border-gris-200">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="etiqueta text-azul-500">Visión</p>
          </div>
          <div>
            <p className="font-titulo text-[1.6rem] font-semibold leading-snug text-azul-700 sm:text-[1.9rem]">
              {vision}
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded border border-gris-200 bg-gris-200 sm:grid-cols-3">
          {formaDeTrabajo.map((item) => (
            <div key={item.titulo} className="bg-white p-7">
              <h2 className="text-[1.2rem]">{item.titulo}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-gris-500">{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="como-trabajamos" className="seccion border-b border-gris-200 bg-niebla">
        <div className="max-w-lectura">
          <p className="etiqueta text-azul-500">Modelo de trabajo</p>
          <h2 className="mt-4">De la evaluación del terreno a la distribución de resultados</h2>
          <p className="mt-5 text-[17px] text-tinta/80">
            Estos son los siete pasos que seguimos en cada proyecto. La coadministración y la
            cofirma son lo que nos mantiene dentro del proyecto hasta el cierre.
          </p>
        </div>

        <ol className="mt-12 space-y-px overflow-hidden rounded border border-gris-200 bg-gris-200">
          {comoTrabajamos.map((paso) => (
            <li key={paso.paso} className="grid gap-2 bg-white p-6 sm:grid-cols-[4rem_14rem_1fr] sm:items-baseline sm:gap-6">
              <span className="cifra text-[15px] text-azul-400">{paso.paso}</span>
              <h3 className="text-[1.05rem]">{paso.titulo}</h3>
              <p className="text-[15px] leading-relaxed text-gris-500">{paso.texto}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-[15px] text-gris-500">
          Socios constructores:{' '}
          <span className="text-tinta">{sociosConstructores.join(' · ')}</span>
        </p>
      </section>

      <section className="seccion">
        <div className="max-w-lectura">
          <p className="etiqueta text-azul-500">Equipo</p>
          <h2 className="mt-4">Quienes responden por cada proyecto</h2>
        </div>

        <div className="mt-14 space-y-20 lg:space-y-28">
          {equipo.map((persona, i) => (
            <EquipoRetrato
              key={persona.slug}
              persona={persona}
              alcance={alcanceTrayectoria}
              invertido={i % 2 === 1}
            />
          ))}
        </div>

        <Revelar className="mt-20 rounded-2xl border border-gris-200 bg-niebla p-8 sm:p-10">
          <h3 className="text-[1.3rem]">¿Conversamos sobre un proyecto?</h3>
          <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-gris-500">
            Atendemos personalmente a inversionistas, propietarios de terrenos y constructoras.
          </p>
          <Link to="/contacto" className="group boton-primario mt-7">
            Conversemos sobre inversión
            <span className="boton-disco bg-white/15">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </Revelar>
      </section>
    </>
  )
}
