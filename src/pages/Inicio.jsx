import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import Revelar from '../components/Revelar.jsx'
import CampoTopologia from '../components/CampoTopologia.jsx'
import { DatosSitio } from '../components/DatosEstructurados.jsx'
import ProyectoCard from '../components/ProyectoCard.jsx'
import { portada, comoTrabajamos, formaDeTrabajo, sociosConstructores } from '../content/sitio.js'
import { proyectosDestacados, proyectos } from '../content/proyectos.js'
import { equipo } from '../content/equipo.js'
import { articulos } from '../content/articulos/index.js'

const enEjecucion = proyectos.filter((p) => p.estado === 'ejecucion')
const viviendasEnEjecucion = enEjecucion.reduce(
  (total, p) => total + (parseInt(p.escala.replace(/\D/g, ''), 10) || 0),
  0,
)

export default function Inicio() {
  return (
    <>
      <Seo ruta="/" imagen="/img/proyectos/playa-quintero.png" />
      <DatosSitio />

      {/* Portada. Un solo <h1> en toda la página: el sitio anterior no tenía
          ninguno, y era uno de los hallazgos de la evaluación. */}
      {/* El campo de topología necesita fondo oscuro para leerse. Va sobre
          `azul-900`, que es el azul más oscuro de la marca y el mismo del pie,
          no sobre negro: el negro no está en la paleta. */}
      <section className="relative overflow-hidden bg-azul-900">
        {/* Halo detrás de la esfera. Le da cuerpo al centro y evita que el
            campo se lea como ruido suelto sobre el azul. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-6%] top-1/2 hidden h-[44rem] w-[44rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,148,197,0.20)_0%,rgba(0,148,197,0.07)_42%,rgba(0,148,197,0)_68%)] blur-2xl lg:block"
        />
        <CampoTopologia className="pointer-events-none absolute inset-y-0 right-0 h-full w-full opacity-70 lg:w-[62%] lg:opacity-100" />
        {/* Velo hacia la izquierda: el titular se apoya sobre azul plano y las
            aristas no compiten con el texto. */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#003057_0%,#003057_28%,rgba(0,48,87,0.72)_52%,rgba(0,48,87,0.15)_78%,rgba(0,48,87,0)_100%)] lg:bg-[linear-gradient(to_right,#003057_0%,#003057_34%,rgba(0,48,87,0.55)_58%,rgba(0,48,87,0)_88%)]" />

        <div className="relative mx-auto w-full max-w-contenido px-5 py-20 sm:px-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-32">
          <div>
            {/* Escalonado de entrada: cada bloque entra 90ms después del
                anterior. El ojo sigue el orden de lectura en vez de recibir
                la pantalla entera de golpe. */}
            <Revelar>
              {/* azul-400 sobre azul-900 da 3.9:1: en texto no alcanza AA. */}
              <p className="etiqueta text-azul-100">Inversión en desarrollo inmobiliario</p>
            </Revelar>
            <Revelar retraso={90}>
              <h1 className="mt-6 text-white">{portada.titulo}</h1>
            </Revelar>
            <Revelar retraso={180}>
              <p className="mt-7 max-w-xl text-[19px] leading-relaxed text-white/75">
                {portada.bajada}
              </p>
            </Revelar>
            <Revelar retraso={270} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to={portada.botonPrimario.ruta} className="group boton-claro">
                {portada.botonPrimario.texto}
                <span className="boton-disco bg-azul-100">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link to={portada.botonSecundario.ruta} className="group boton-borde-claro">
                {portada.botonSecundario.texto}
                <span className="boton-disco bg-white/10">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </Revelar>
          </div>

          {/* La columna derecha queda vacía a propósito: es el espacio que
              ocupa el campo de topología, que está detrás en posición
              absoluta. Sin ella el titular se extendería sobre la esfera. */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </section>

      {/* Trayectoria verificable: solo cifras que se sostienen en el propio
          inventario del sitio. Las cifras de banca son de la carrera de Arturo
          y viven en su biografía, no aquí. */}
      <section className="border-b border-gris-200">
        <div className="mx-auto w-full max-w-contenido px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-0">
            {[
              { cifra: enEjecucion.length, texto: 'proyectos en ejecución' },
              { cifra: viviendasEnEjecucion.toLocaleString('es-CL'), texto: 'viviendas en desarrollo' },
              { cifra: proyectos.length - enEjecucion.length, texto: 'proyectos finalizados' },
            ].map((item, i) => (
              <Revelar
                key={item.texto}
                retraso={i * 110}
                /* Filete vertical entre cifras en vez de tarjetas: es la
                   separación de un informe, no la de un dashboard. */
                className={i > 0 ? 'sm:border-l sm:border-gris-200 sm:pl-10' : ''}
              >
                <p className="cifra text-[3rem] leading-none sm:text-[3.5rem]">{item.cifra}</p>
                <p className="mt-3 text-[15px] text-gris-500">{item.texto}</p>
              </Revelar>
            ))}
          </div>
          <p className="etiqueta mt-12">Inventario vigente a septiembre de 2026</p>
        </div>
      </section>

      {/* Cómo trabajamos. Reemplaza a "Cómo invertir", retirada del menú. */}
      <section id="como-trabajamos" className="seccion border-b border-gris-200">
        <Revelar className="max-w-lectura">
          <p className="etiqueta text-azul-500">Modelo de trabajo</p>
          <h2 className="mt-5">Participamos en el proyecto completo, no solo en el cierre.</h2>
          <p className="mt-6 text-[18px] leading-relaxed text-tinta/80">
            Nuestra forma de trabajo es directa, simple y comprometida: buscamos y atendemos
            personalmente a los inversionistas, operamos a través de una sociedad en la que
            participan del negocio y, como administradores, velamos por sus intereses.
          </p>
        </Revelar>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-gris-200 bg-gris-200 sm:grid-cols-2 lg:grid-cols-4">
          {comoTrabajamos.map((paso, i) => (
            <Revelar
              key={paso.paso}
              as="li"
              retraso={i * 70}
              /* Son siete pasos en una grilla par: el último ocupa el hueco
                 sobrante en vez de dejar una celda vacía al final. */
              className={`group bg-white p-7 transition-colors duration-500 ease-suave hover:bg-niebla ${
                i === comoTrabajamos.length - 1 ? 'sm:col-span-2' : ''
              }`}
            >
              <p className="cifra text-[15px] text-azul-500 transition-transform duration-500 ease-suave group-hover:-translate-y-0.5 motion-reduce:transition-none">
                {paso.paso}
              </p>
              <h3 className="mt-4 text-[1.05rem]">{paso.titulo}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-gris-500">{paso.texto}</p>
            </Revelar>
          ))}
        </ol>

        <p className="mt-8 text-[15px] text-gris-500">
          Socios constructores con los que hemos desarrollado proyectos:{' '}
          <span className="text-tinta">{sociosConstructores.join(' · ')}</span>
        </p>
      </section>

      {/* Proyectos destacados */}
      <section className="seccion border-b border-gris-200 bg-niebla">
        <Revelar className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-lectura">
            <p className="etiqueta text-azul-500">Proyectos</p>
            <h2 className="mt-5">En ejecución hoy</h2>
          </div>
          <Link to="/proyectos" className="group enlace-flecha">
            Ver todos los proyectos
            <span className="boton-disco h-7 w-7 bg-white">
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </Link>
        </Revelar>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {proyectosDestacados.map((proyecto, i) => (
            <Revelar key={proyecto.slug} retraso={i * 90} className="flex">
              <ProyectoCard proyecto={proyecto} />
            </Revelar>
          ))}
        </div>
      </section>

      {/* Equipo */}
      <section className="seccion border-b border-gris-200">
        <Revelar className="max-w-lectura">
          <p className="etiqueta text-azul-500">Equipo</p>
          <h2 className="mt-5">Quienes responden por cada proyecto</h2>
        </Revelar>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:gap-14">
          {equipo.map((persona, i) => (
            <Revelar key={persona.slug} retraso={i * 120} className="group flex gap-6">
              <div className="w-28 shrink-0 overflow-hidden rounded-xl bg-azul-900 sm:w-32">
                <img
                  src={persona.foto}
                  alt={`${persona.nombre}, ${persona.cargo} de ARS Invest`}
                  loading="lazy"
                  width="551"
                  height="897"
                  className="aspect-[4/5] w-full object-cover object-top transition-transform duration-[1200ms] ease-suave group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
              <div className="min-w-0 border-t-2 border-azul-700 pt-5">
                <h3 className="text-[1.15rem]">{persona.nombre}</h3>
                <p className="etiqueta mt-2">{persona.cargo}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-tinta/80">{persona.bio}</p>
              </div>
            </Revelar>
          ))}
        </div>

        <Revelar retraso={200}>
          <Link to="/quienes-somos" className="group enlace-flecha mt-12">
            Conoce al equipo completo
            <span className="boton-disco h-7 w-7 bg-azul-100">
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </Link>
        </Revelar>
      </section>

      {/* Artículos */}
      <section className="seccion border-b border-gris-200 bg-niebla">
        <Revelar className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-lectura">
            <p className="etiqueta text-azul-500">Actualidad inmobiliaria</p>
            <h2 className="mt-5">Cómo funciona el desarrollo inmobiliario en Chile</h2>
          </div>
          <Link to="/actualidad-inmobiliaria" className="group enlace-flecha">
            Ver todos los artículos
            <span className="boton-disco h-7 w-7 bg-white">
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </Link>
        </Revelar>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {articulos.slice(0, 3).map((articulo, i) => (
            <Revelar key={articulo.slug} retraso={i * 100} className="flex">
              <article className="tarjeta group flex flex-col p-7">
                <p className="etiqueta text-azul-500">{articulo.categoria}</p>
                <h3 className="mt-4 text-[1.15rem] transition-colors duration-300 group-hover:text-azul-600">
                  <Link to={`/actualidad-inmobiliaria/${articulo.slug}`}>
                    <span className="absolute inset-0 z-10" aria-hidden="true" />
                    {articulo.titulo}
                  </Link>
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-gris-500">{articulo.bajada}</p>
                <span className="enlace-flecha mt-auto pt-6">
                  Leer artículo
                  <span className="boton-disco h-7 w-7 bg-azul-100">
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </span>
              </article>
            </Revelar>
          ))}
        </div>
      </section>

      {/* Cierre de contacto */}
      <section className="relative overflow-hidden bg-azul-700">
        <div className="mx-auto w-full max-w-contenido px-5 py-20 sm:px-8 lg:py-28">
          <Revelar>
            <h2 className="max-w-3xl text-white">
              ¿Evalúa participar en un proyecto inmobiliario?
            </h2>
          </Revelar>
          <Revelar retraso={110}>
            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-white/80">
              Cuéntenos si invierte, si tiene un terreno o si representa a una constructora.
              Respondemos personalmente.
            </p>
          </Revelar>
          <Revelar retraso={220}>
            <Link to="/contacto" className="group boton-claro mt-10">
              Conversemos sobre inversión
              <span className="boton-disco bg-azul-100">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </Revelar>
        </div>
      </section>
    </>
  )
}
