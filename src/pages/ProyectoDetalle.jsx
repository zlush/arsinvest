import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import { Migas } from '../components/DatosEstructurados.jsx'
import EtiquetaEstado from '../components/EtiquetaEstado.jsx'
import NoEncontrado from './NoEncontrado.jsx'
import { buscarProyecto } from '../content/proyectos.js'

export default function ProyectoDetalle() {
  const { slug } = useParams()
  const proyecto = buscarProyecto(slug)

  if (!proyecto) return <NoEncontrado />

  /** Misma tabla en las doce fichas: un inventario se lee comparando, y no se
   *  puede comparar lo que está maquetado distinto. Brand kit §7. */
  const datos = [
    { campo: 'Ubicación', valor: proyecto.ubicacion },
    { campo: 'Comuna', valor: proyecto.comuna },
    { campo: 'Escala', valor: proyecto.escala, cifra: true },
    { campo: 'Detalle', valor: proyecto.detalle },
    { campo: 'Participantes', valor: proyecto.participantes?.join(' · ') },
    { campo: 'Vehículo de inversión', valor: proyecto.vehiculo },
    { campo: 'Rol de ARS Invest', valor: proyecto.rolARS },
  ].filter((d) => d.valor)

  return (
    <>
      <Seo ruta={`/proyectos/${proyecto.slug}`} />
      <Migas
        ruta={[
          { nombre: 'Proyectos', url: '/proyectos' },
          { nombre: proyecto.nombre, url: `/proyectos/${proyecto.slug}` },
        ]}
      />

      <article>
        <section className="border-b border-gris-200 bg-niebla">
          <div className="mx-auto w-full max-w-contenido px-5 py-12 sm:px-8 lg:py-16">
            <Link
              to="/proyectos"
              className="inline-flex items-center gap-2 font-texto text-[14px] font-semibold text-azul-600 hover:text-azul-500"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Todos los proyectos
            </Link>

            <EtiquetaEstado
              estado={proyecto.estado}
              fecha={proyecto.fechaEstado}
              className="mt-8"
            />
            <h1 className="mt-4 max-w-3xl">{proyecto.nombre}</h1>
            <p className="mt-5 max-w-lectura text-[18px] leading-relaxed text-tinta/85">
              {proyecto.descripcion}
            </p>
          </div>
        </section>

        {proyecto.foto && (
          <div className="mx-auto w-full max-w-contenido px-5 pt-12 sm:px-8">
            <img
              src={proyecto.foto}
              alt={`Proyecto ${proyecto.nombre}, ${proyecto.comuna}`}
              className="aspect-[16/9] w-full rounded object-cover"
            />
          </div>
        )}

        <section className="seccion">
          <h2 className="sr-only">Antecedentes del proyecto</h2>
          <dl className="overflow-hidden rounded border border-gris-200">
            {datos.map((dato, i) => (
              <div
                key={dato.campo}
                className={`grid gap-1 px-6 py-5 sm:grid-cols-[16rem_1fr] sm:gap-6 ${
                  i % 2 === 1 ? 'bg-niebla' : 'bg-white'
                }`}
              >
                <dt className="etiqueta">{dato.campo}</dt>
                <dd className={dato.cifra ? 'cifra text-[17px]' : 'text-[17px] text-tinta/85'}>
                  {dato.valor}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 rounded border border-gris-200 bg-niebla p-8">
            <h2 className="text-[1.15rem]">¿Le interesa un proyecto como este?</h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-gris-500">
              Conversemos sobre las condiciones de participación en proyectos en desarrollo.
            </p>
            <Link to="/contacto" className="group boton-primario mt-6">
              Conversemos sobre inversión
              <span className="boton-disco bg-white/15">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </section>
      </article>
    </>
  )
}
