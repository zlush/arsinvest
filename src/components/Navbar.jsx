import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navegacion } from '../content/sitio.js'
import { useScroll } from '../hooks/useRevelar.js'
import IndicadorNav from './IndicadorNav.jsx'

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const progreso = useScroll(120)
  const { pathname } = useLocation()
  const compacto = progreso > 0.5

  useEffect(() => {
    setAbierto(false)
  }, [pathname])

  // Con el overlay abierto el fondo no debe desplazarse detrás.
  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [abierto])

  useEffect(() => {
    const alPresionar = (e) => e.key === 'Escape' && setAbierto(false)
    window.addEventListener('keydown', alPresionar)
    return () => window.removeEventListener('keydown', alPresionar)
  }, [])

  return (
    <header
      /* La barra está fija: cambiar su alto no reflota el documento, porque
         está fuera del flujo. El borde inferior aparece con opacidad en vez
         de agregarse, para que no salte un píxel al cruzar el umbral. */
      className={`fixed inset-x-0 top-0 z-40 transition-[height,background-color,backdrop-filter] duration-700 ease-suave motion-reduce:transition-none ${
        compacto
          ? 'h-16 bg-white/85 backdrop-blur-xl sm:h-[4.5rem]'
          : 'h-20 bg-white sm:h-24'
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gris-200 transition-opacity duration-700 ease-suave ${
          compacto ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="mx-auto flex h-full w-full max-w-contenido items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          to="/"
          aria-label="ARS Invest, ir al inicio"
          className="shrink-0 origin-left transition-transform duration-700 ease-suave motion-reduce:transition-none"
          style={{ transform: `scale(${1 - progreso * 0.12})` }}
        >
          <img
            src="/img/ars-logo.png"
            alt="ARS Invest"
            className="h-9 w-auto sm:h-11"
            width="1426"
            height="304"
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <IndicadorNav items={navegacion} className="flex gap-1" />

          <Link to="/contacto" className="group boton-primario">
            Conversemos
            <span className="boton-disco bg-white/15">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </div>

        {/* Hamburguesa que se convierte en X: las dos líneas rotan y se
            encuentran, no desaparecen para que aparezca otro icono. */}
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-[1.5px] w-full bg-azul-700 transition-transform duration-500 ease-suave motion-reduce:transition-none ${
                abierto ? 'top-1/2 rotate-45' : 'top-0.5'
              }`}
            />
            <span
              className={`absolute left-0 block h-[1.5px] w-full bg-azul-700 transition-transform duration-500 ease-suave motion-reduce:transition-none ${
                abierto ? 'top-1/2 -rotate-45' : 'bottom-0.5'
              }`}
            />
          </span>
        </button>
      </div>

      {/* Overlay móvil. Se mantiene montado para que la salida también anime. */}
      <div
        id="menu-movil"
        aria-hidden={!abierto}
        className={`fixed inset-0 top-0 -z-10 bg-white/95 backdrop-blur-2xl transition-opacity duration-500 ease-suave lg:hidden motion-reduce:transition-none ${
          abierto ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav
          className="mx-auto flex h-full max-w-contenido flex-col justify-center gap-2 px-6 pb-20"
          aria-label="Principal móvil"
        >
          {[...navegacion, { texto: 'Contacto', ruta: '/contacto' }].map((item, i) => (
            <NavLink
              key={item.ruta}
              to={item.ruta}
              end={item.ruta === '/'}
              tabIndex={abierto ? 0 : -1}
              className={({ isActive }) =>
                `border-b border-gris-200 py-5 font-titulo text-[1.75rem] font-semibold tracking-[-0.02em] transition-[opacity,transform] duration-700 ease-salida motion-reduce:transition-none ${
                  isActive ? 'text-azul-700' : 'text-grafito'
                } ${abierto ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`
              }
              /* Escalonado: cada enlace entra 70ms después del anterior. */
              style={{ transitionDelay: abierto ? `${120 + i * 70}ms` : '0ms' }}
            >
              {item.texto}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
