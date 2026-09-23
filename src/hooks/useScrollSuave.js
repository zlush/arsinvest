import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { MOVIMIENTO_FORZADO, SIN_MOVIMIENTO } from '../lib/movimiento.js'

/**
 * Scroll con inercia.
 *
 * Es la única dependencia de animación del proyecto y está justificada: un
 * lerp casero sobre el evento `wheel` se escribe en cuarenta líneas, pero
 * rompe el arrastre de la barra, las teclas de página, el scroll por foco al
 * tabular y los contenedores anidados. Lenis resuelve todo eso en 3KB
 * comprimidos.
 *
 * Lo importante para este sitio: Lenis v1 mueve el scroll real de la ventana,
 * no transforma un contenedor. Si transformara —como hacía Locomotive— los
 * revelados dejarían de dispararse, porque IntersectionObserver mide contra el
 * viewport y no vería nada moverse.
 *
 * El `lerp` no es fijo: se mueve con la intensidad del gesto. Con un valor
 * constante, buscar un dato una línea más abajo se siente igual de pesado que
 * recorrer la página entera, y es lo que hace que el scroll suave moleste en
 * un sitio de consulta. Acá va directo cuando avanzas despacio y agarra vuelo
 * cuando empujas fuerte. Los tres números que gobiernan eso están abajo.
 */
/** Lerp cuando el gesto es lento: el contenido sigue a la rueda casi 1 a 1. */
const LERP_DIRECTO = 0.3
/** Lerp cuando el gesto es rápido: el scroll agarra vuelo y sigue solo. */
const LERP_VUELO = 0.055
/** Píxeles de rueda acumulados a partir de los cuales el vuelo es máximo. */
const TECHO_IMPULSO = 850

export default function useScrollSuave() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Quien pide quietud conserva el scroll nativo del sistema. La inercia es
    // justamente el tipo de movimiento que molesta con sensibilidad vestibular.
    if (SIN_MOVIMIENTO) return

    const lenis = new Lenis({
      // `lerp`, no `duration`. Lenis usa interpolación por cuadro salvo que se
      // le pida explícitamente el modo por duración, así que pasar `duration`
      // con `lerp` presente no hace nada: el deslizamiento se quedaba en unos
      // 100ms y no se notaba. Más bajo es más largo.
      // Valor de arranque: lo reemplaza `ajustarLerp` en cada cuadro.
      lerp: LERP_DIRECTO,
      smoothWheel: true,
      // En táctil no: los teléfonos ya traen su propia inercia y encimarle
      // otra se siente como lag.
      syncTouch: false,
      // Que Lenis maneje su propio requestAnimationFrame.
      //
      // Con un bucle propio hay que pasarle el timestamp de rAF, y en la
      // primera llamada su `lastTime` vale 0: el delta sale de varios miles de
      // milisegundos, el lerp se satura y el scroll salta de golpe en vez de
      // deslizarse. Se veía como que la opción no hacía nada.
      autoRaf: true,
    })

    // Lenis consulta `prefers-reduced-motion` por su cuenta y apaga el
    // deslizamiento si el sistema lo pide. Es el comportamiento correcto, pero
    // deja fuera al override de revisión: en un equipo con "reducir
    // movimiento" activado, `?movimiento=1` animaba todo el sitio menos el
    // scroll. La consulta es una propiedad de instancia, así que se reemplaza
    // por una que nunca coincide. Solo ocurre con el flag puesto.
    if (MOVIMIENTO_FORZADO) {
      lenis.reducedMotionMediaQuery = {
        matches: false,
        addEventListener() {},
        removeEventListener() {},
      }
    }

    lenisRef.current = lenis
    document.documentElement.classList.add('scroll-suave')

    // Sonda para ajustar el deslizamiento desde la consola. `import.meta.env.DEV`
    // lo elimina del build de producción.
    if (import.meta.env.DEV) window.__lenis = lenis

    // --- Vuelo según la velocidad -----------------------------------------
    // Un lerp fijo hace que todo gesto dure lo mismo: buscar un dato una línea
    // más abajo se siente igual de pesado que recorrer la página entera. Acá
    // el lerp se mueve con la intensidad de la entrada — directo cuando vas
    // despacio, con vuelo cuando empujas fuerte.
    let impulso = 0
    let frameLerp = null

    const sumarImpulso = (delta) => {
      impulso = Math.min(TECHO_IMPULSO, impulso + Math.abs(delta))
    }

    const alRodar = (e) => sumarImpulso(e.deltaY)
    window.addEventListener('wheel', alRodar, { passive: true })

    const ajustarLerp = () => {
      frameLerp = requestAnimationFrame(ajustarLerp)

      // El impulso solo baja cuando el scroll ya casi se detuvo. Si decayera
      // durante el deslizamiento, el lerp treparía a mitad de camino y le
      // cortaría el vuelo justo al gesto que lo pidió.
      if (Math.abs(lenis.velocity) < 1.5) impulso *= 0.9

      const t = Math.min(1, impulso / TECHO_IMPULSO)
      const suave = t * t * (3 - 2 * t) // smoothstep
      const objetivo = LERP_DIRECTO - suave * (LERP_DIRECTO - LERP_VUELO)

      // El propio lerp se mueve con lerp: sin esto el cambio de régimen se
      // nota como un tirón.
      lenis.options.lerp += (objetivo - lenis.options.lerp) * 0.15
    }
    ajustarLerp()

    // Anclas internas: sin esto el salto lo haría el navegador por su cuenta y
    // Lenis quedaría desincronizado de la posición real.
    const alHacerClic = (e) => {
      const enlace = e.target.closest?.('a[href^="#"]')
      const hash = enlace?.getAttribute('href')
      if (!hash || hash === '#') return
      const destino = document.querySelector(hash)
      if (!destino) return
      e.preventDefault()
      lenis.scrollTo(destino, { offset: -112 }) // alto del header
    }
    document.addEventListener('click', alHacerClic)

    return () => {
      document.removeEventListener('click', alHacerClic)
      window.removeEventListener('wheel', alRodar)
      if (frameLerp !== null) cancelAnimationFrame(frameLerp)
      document.documentElement.classList.remove('scroll-suave')
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
