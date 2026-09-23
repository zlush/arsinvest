import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const OCULTO = { x: 0, w: 0, visible: false }

function esActiva(ruta, pathname) {
  return ruta === '/' ? pathname === '/' : pathname.startsWith(ruta)
}

/**
 * Navegación con indicador deslizante.
 *
 * Una sola pastilla viaja entre los enlaces en vez de que cada uno encienda su
 * propio fondo. La diferencia es que el ojo sigue un objeto que se mueve, no
 * una sucesión de luces que se prenden y apagan: se lee como un mecanismo.
 *
 * Es el patrón que vale la pena de las librerías de componentes animados, sin
 * traer Motion ni shadcn detrás.
 *
 * Sobre el rendimiento: se anima `transform` para desplazarla y `width` para
 * ajustarla. `width` toca layout, pero la pastilla está en `position:absolute`,
 * así que recalcula solo su propia caja y no mueve a ningún hermano. La
 * alternativa GPU-pura sería `scaleX`, y sobre un `border-radius` completo
 * deforma la curva en una elipse.
 */
export default function IndicadorNav({ items, className = '' }) {
  const navRef = useRef(null)
  const enlacesRef = useRef([])
  const [indicador, setIndicador] = useState(OCULTO)
  const [sobre, setSobre] = useState(null)
  const { pathname } = useLocation()

  const activo = items.findIndex((item) => esActiva(item.ruta, pathname))

  const medir = useCallback((indice) => {
    const nav = navRef.current
    const enlace = enlacesRef.current[indice]
    if (!nav || !enlace || indice < 0) return setIndicador(OCULTO)

    const cajaNav = nav.getBoundingClientRect()
    const caja = enlace.getBoundingClientRect()
    setIndicador({ x: caja.left - cajaNav.left, w: caja.width, visible: true })
  }, [])

  // El objetivo es el enlace bajo el cursor; si no hay ninguno, la sección
  // activa. Al salir del menú la pastilla vuelve sola a donde estás.
  const objetivo = sobre ?? activo

  useEffect(() => {
    medir(objetivo)
  }, [medir, objetivo])

  useEffect(() => {
    const alRedimensionar = () => medir(objetivo)
    window.addEventListener('resize', alRedimensionar)

    // Las fuentes cambian el ancho de los enlaces al cargar. Sin esto, la
    // primera medición queda tomada con la tipografía de respaldo y la
    // pastilla aparece corrida.
    document.fonts?.ready.then(() => medir(objetivo))

    return () => window.removeEventListener('resize', alRedimensionar)
  }, [medir, objetivo])

  return (
    <nav
      ref={navRef}
      onMouseLeave={() => setSobre(null)}
      className={`relative items-center ${className}`}
      aria-label="Principal"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 -z-0 h-9 rounded-full bg-azul-100 transition-[transform,width,opacity] duration-[320ms] ease-suave motion-reduce:transition-none"
        style={{
          transform: `translateX(${indicador.x}px) translateY(-50%)`,
          width: `${indicador.w}px`,
          opacity: indicador.visible ? 1 : 0,
        }}
      />

      {items.map((item, i) => (
        <NavLink
          key={item.ruta}
          to={item.ruta}
          ref={(nodo) => {
            enlacesRef.current[i] = nodo
          }}
          onMouseEnter={() => setSobre(i)}
          onFocus={() => setSobre(i)}
          onBlur={() => setSobre(null)}
          className={({ isActive }) =>
            `relative z-10 rounded-full px-4 py-2 font-texto text-[15px] font-medium transition-colors duration-300 ${
              isActive ? 'text-azul-700' : 'text-grafito hover:text-azul-700'
            }`
          }
        >
          {item.texto}
        </NavLink>
      ))}
    </nav>
  )
}
