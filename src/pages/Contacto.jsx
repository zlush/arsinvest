import { Mail, MapPin, Phone } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import FormularioContacto from '../components/FormularioContacto.jsx'
import { contacto, direccionCompleta, mapaUrl } from '../content/contacto.js'

export default function Contacto() {
  return (
    <>
      <Seo ruta="/contacto" />

      <section className="border-b border-gris-200 bg-niebla">
        <div className="mx-auto w-full max-w-contenido px-5 py-16 sm:px-8 lg:py-20">
          <p className="etiqueta text-azul-500">Contacto</p>
          <h1 className="mt-5 max-w-3xl">Conversemos sobre inversión.</h1>
          <p className="mt-6 max-w-lectura text-[18px] leading-relaxed text-tinta/85">
            Díganos desde dónde nos escribe —inversionista, propietario de un terreno o
            constructora— y dirigimos su consulta a quien corresponde.
          </p>
        </div>
      </section>

      <section className="seccion">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <h2 className="sr-only">Formulario de contacto</h2>
            <FormularioContacto />
          </div>

          <aside>
            <h2 className="text-[1.15rem]">Datos directos</h2>
            <ul className="mt-6 space-y-5 text-[16px]">
              <li className="flex gap-3.5">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-azul-400" aria-hidden="true" />
                <span>
                  <span className="etiqueta block">Correo</span>
                  <a href={`mailto:${contacto.correo}`} className="enlace">
                    {contacto.correo}
                  </a>
                </span>
              </li>
              <li className="flex gap-3.5">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-azul-400" aria-hidden="true" />
                <span>
                  <span className="etiqueta block">Teléfono</span>
                  <a href={`tel:${contacto.telefonoEnlace}`} className="text-tinta/85">
                    {contacto.telefono}
                  </a>
                </span>
              </li>
              <li className="flex gap-3.5">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-azul-400" aria-hidden="true" />
                <span>
                  <span className="etiqueta block">Oficina</span>
                  <span className="text-tinta/85">
                    {contacto.direccion.calle}
                    <br />
                    {contacto.direccion.sector}
                    <br />
                    <span className="text-gris-500">{contacto.direccion.referencia}</span>
                  </span>
                </span>
              </li>
            </ul>

            {/* El mapa toma la misma dirección que el texto de arriba: una sola
                fuente, para que no puedan divergir como en el sitio anterior. */}
            <div className="mt-8 overflow-hidden rounded border border-gris-200">
              <iframe
                src={mapaUrl}
                title={`Ubicación de la oficina de ARS Invest: ${direccionCompleta}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
