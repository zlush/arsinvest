import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo.jsx'

export default function NoEncontrado() {
  return (
    <>
      <Seo
        titulo="Página no encontrada"
        descripcion="La página que busca no existe o cambió de dirección."
        ruta="/404"
      />

      <section className="seccion">
        <p className="etiqueta text-azul-500">Error 404</p>
        <h1 className="mt-5 max-w-2xl">Esta página no existe o cambió de dirección.</h1>
        <p className="mt-6 max-w-lectura text-[17px] leading-relaxed text-tinta/85">
          Reorganizamos el sitio. Puede que lo que busca esté ahora en proyectos o en el
          modelo de trabajo.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="group boton-primario">
            Ir al inicio
            <span className="boton-disco bg-white/15">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
          <Link to="/proyectos" className="group boton-secundario">
            Ver proyectos
            <span className="boton-disco bg-azul-100">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>
    </>
  )
}
