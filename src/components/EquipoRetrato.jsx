import { Mail, Phone } from 'lucide-react'
import Revelar from './Revelar.jsx'

/**
 * Retrato editorial. Las fotos vienen con fondo de follaje oscuro, así que el
 * marco se apoya en `azul-900`: el recorte se funde con el fondo en vez de
 * recortarse contra blanco, que es donde se notaría que son fotos de estudio
 * de distinto encuadre.
 *
 * `invertido` alterna el lado de la foto. Una grilla de retratos todos
 * alineados a la izquierda se lee como listado de personal; alternados, como
 * una nota.
 */
export default function EquipoRetrato({ persona, alcance, invertido = false }) {
  return (
    <Revelar
      as="article"
      /* Al invertir hay que mover también la columna angosta, no solo el
         orden: si no, la foto cae en la columna de 1fr y queda más grande que
         la del retrato anterior. */
      className={`grid items-center gap-8 lg:gap-16 ${
        invertido
          ? 'lg:grid-cols-[1fr_minmax(0,26rem)] lg:[&>figure]:order-2'
          : 'lg:grid-cols-[minmax(0,26rem)_1fr]'
      }`}
    >
      <figure className="group relative overflow-hidden rounded-2xl bg-azul-900">
        <img
          src={persona.foto}
          alt={`${persona.nombre}, ${persona.cargo} de ARS Invest`}
          loading="lazy"
          width="551"
          height="897"
          className="aspect-[4/5] w-full object-cover object-top transition-transform duration-[1200ms] ease-suave group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(0,48,87,0.92),rgba(0,48,87,0))] p-6 pt-14">
          <p className="font-titulo text-[1.35rem] font-semibold tracking-[-0.02em] text-white">
            {persona.nombre}
          </p>
          <p className="etiqueta mt-1.5 text-white/70">{persona.cargo}</p>
        </figcaption>
      </figure>

      <div>
        <p className="text-[15px] leading-relaxed text-gris-500">{persona.formacion}</p>

        <p className="mt-5 text-[19px] leading-relaxed text-tinta/85">{persona.bio}</p>

        {persona.trayectoria.length > 0 && (
          <>
            <div className="mt-9 grid gap-7 border-t border-gris-200 pt-8 sm:grid-cols-3">
              {persona.trayectoria.map((dato) => (
                <div key={dato.unidad}>
                  <p className="cifra text-[2rem] leading-none">{dato.cifra}</p>
                  <p className="mt-2 text-[13px] leading-snug text-gris-500">{dato.unidad}</p>
                </div>
              ))}
            </div>
            {/* El alcance va pegado a la cifra, no en una nota al pie que nadie
                lee. Brand kit §2: toda cifra con su alcance. */}
            <p className="mt-5 border-l-2 border-azul-400 pl-4 text-[13px] leading-relaxed text-gris-500">
              {alcance}
            </p>
          </>
        )}

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
          <a href={`mailto:${persona.correo}`} className="enlace-flecha">
            <Mail className="h-4 w-4 text-azul-400" aria-hidden="true" />
            {persona.correo}
          </a>
          <a
            href={`tel:${persona.telefono.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 text-tinta/80 transition-colors duration-300 hover:text-azul-600"
          >
            <Phone className="h-4 w-4 text-azul-400" aria-hidden="true" />
            {persona.telefono}
          </a>
        </div>
      </div>
    </Revelar>
  )
}
