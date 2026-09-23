import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { navegacion, marca } from '../content/sitio.js'
import { contacto, direccionCompleta } from '../content/contacto.js'

export default function Footer() {
  const año = new Date().getFullYear()

  return (
    <footer className="bg-azul-900 text-white/85">
      <div className="mx-auto grid w-full max-w-contenido gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <p className="font-titulo text-2xl font-semibold text-white">{marca.nombre}</p>
          <p className="etiqueta mt-1 text-white/60">{marca.bajada}</p>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/75">
            {marca.descripcion}
          </p>
        </div>

        <nav aria-label="Pie de página">
          <p className="etiqueta text-white/60">Navegación</p>
          <ul className="mt-4 space-y-2.5">
            {[...navegacion, { texto: 'Contacto', ruta: '/contacto' }].map((item) => (
              <li key={item.ruta}>
                <Link
                  to={item.ruta}
                  className="text-[15px] text-white/80 transition-colors hover:text-white"
                >
                  {item.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="etiqueta text-white/60">Contacto</p>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-azul-400" aria-hidden="true" />
              <a href={`mailto:${contacto.correo}`} className="text-white/80 hover:text-white">
                {contacto.correo}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-azul-400" aria-hidden="true" />
              <a
                href={`tel:${contacto.telefonoEnlace}`}
                className="text-white/80 hover:text-white"
              >
                {contacto.telefono}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-azul-400" aria-hidden="true" />
              <span className="text-white/75">{direccionCompleta}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-contenido flex-col gap-2 px-5 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {año} {marca.nombre}. Todos los derechos reservados.</p>
          <p>
            La información de este sitio es referencial y no constituye una oferta de
            inversión.
          </p>
        </div>
      </div>
    </footer>
  )
}
