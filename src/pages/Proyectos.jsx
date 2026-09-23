import { useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import ProyectoCard from '../components/ProyectoCard.jsx'
import { proyectos, filtrarProyectos, ESTADOS } from '../content/proyectos.js'

const FILTROS = [
  { id: 'todos', nombre: 'Todos' },
  { id: ESTADOS.ejecucion.id, nombre: ESTADOS.ejecucion.nombre },
  { id: ESTADOS.finalizado.id, nombre: ESTADOS.finalizado.nombre },
]

export default function Proyectos() {
  const [params, setParams] = useSearchParams()
  const activo = params.get('estado') || 'todos'
  const visibles = filtrarProyectos(proyectos, activo)

  const cambiarFiltro = (id) => {
    if (id === 'todos') setParams({}, { replace: true })
    else setParams({ estado: id }, { replace: true })
  }

  return (
    <>
      <Seo ruta="/proyectos" />

      <section className="border-b border-gris-200 bg-niebla">
        <div className="mx-auto w-full max-w-contenido px-5 py-16 sm:px-8 lg:py-20">
          <p className="etiqueta text-azul-500">Proyectos</p>
          <h1 className="mt-5 max-w-3xl">Capacidad de ejecución, proyecto por proyecto.</h1>
          <p className="mt-6 max-w-lectura text-[18px] leading-relaxed text-tinta/85">
            Cada ficha indica ubicación, escala, estado con fecha de actualización y el rol
            específico de ARS Invest en el proyecto.
          </p>
        </div>
      </section>

      <section className="seccion">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por estado">
          {FILTROS.map((filtro) => {
            const seleccionado = filtro.id === activo
            return (
              <button
                key={filtro.id}
                type="button"
                onClick={() => cambiarFiltro(filtro.id)}
                aria-pressed={seleccionado}
                className={`rounded-full border px-5 py-2 font-texto text-[14px] font-semibold transition-colors ${
                  seleccionado
                    ? 'border-azul-700 bg-azul-700 text-white'
                    : 'border-gris-200 text-grafito hover:border-azul-400 hover:text-azul-600'
                }`}
              >
                {filtro.nombre}
              </button>
            )
          })}
          <p className="ml-auto etiqueta">
            {visibles.length} {visibles.length === 1 ? 'proyecto' : 'proyectos'}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibles.map((proyecto) => (
            <ProyectoCard key={proyecto.slug} proyecto={proyecto} />
          ))}
        </div>

        <p className="mt-12 border-l-2 border-azul-400 bg-niebla p-5 text-[14px] leading-relaxed text-gris-500">
          Inventario en validación con ARS Invest. Las fechas de entrega de los proyectos
          finalizados y el material fotográfico autorizado se incorporan a medida que se
          confirman.
        </p>
      </section>
    </>
  )
}
