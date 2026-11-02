import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import EtiquetaEstado from './EtiquetaEstado.jsx'

export default function ProyectoCard({ proyecto }) {
  return (
    <article className="tarjeta group flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-azul-100">
        {proyecto.foto ? (
          <>
            <img
              src={proyecto.foto}
              alt={`Proyecto ${proyecto.nombre}, ${proyecto.comuna}`}
              loading="lazy"
              /* 1.2s: una imagen grande que crece rápido se lee como GIF.
                 Lento se lee como una cámara acercándose. */
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-suave group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <div className="velo-foto opacity-0 transition-opacity duration-700 ease-suave group-hover:opacity-100" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="etiqueta text-azul-600">Imagen en validación</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <EtiquetaEstado estado={proyecto.estado} fecha={proyecto.fechaEstado} />

        <h3 className="text-[1.3rem] transition-colors duration-300 group-hover:text-azul-600">
          <Link to={`/proyectos/${proyecto.slug}`}>
            <span className="absolute inset-0 z-10" aria-hidden="true" />
            {proyecto.nombre}
          </Link>
        </h3>

        <p className="text-[15px] text-gris-500">
          {proyecto.comuna} · <span className="cifra text-[15px]">{proyecto.escala}</span>
        </p>

        <p className="text-[15px] leading-relaxed text-tinta/80">{proyecto.detalle}</p>

        <span className="enlace-flecha mt-auto pt-4">
          Ver ficha
          <span className="boton-disco h-7 w-7 bg-azul-100">
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </span>
      </div>
    </article>
  )
}
