import { useEffect, useRef, useState } from 'react'
import { SIN_MOVIMIENTO } from '../lib/movimiento.js'

export { SIN_MOVIMIENTO }

/**
 * Red de seguridad para los saltos de scroll.
 *
 * IntersectionObserver solo avisa cuando se cruza un umbral. Si alguien salta
 * con un ancla o arrastra la barra hasta el pie, un bloque pasa de "debajo del
 * viewport" (ratio 0) a "encima del viewport" (ratio 0) sin cruzar nada: el
 * observer no dispara nunca y ese bloque se queda invisible para siempre. Es
 * exactamente lo que pasaba con la ficha de Arturo.
 *
 * Un solo listener para todo el sitio, con 150ms de espera: corre cuando el
 * scroll se detiene, no en cada frame, así que las lecturas de geometría no
 * compiten con el desplazamiento.
 */
const pendientes = new Set()
let temporizador = null
let escuchando = false

function revisarPendientes() {
  for (const revisar of pendientes) revisar()
}

function alScrollear() {
  clearTimeout(temporizador)
  temporizador = setTimeout(revisarPendientes, 150)
}

function registrar(revisar) {
  pendientes.add(revisar)
  if (!escuchando) {
    window.addEventListener('scroll', alScrollear, { passive: true })
    escuchando = true
  }
  return () => {
    pendientes.delete(revisar)
    if (pendientes.size === 0 && escuchando) {
      window.removeEventListener('scroll', alScrollear)
      clearTimeout(temporizador)
      escuchando = false
    }
  }
}

export function useRevelar({ margen = '0px 0px -12% 0px' } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(SIN_MOVIMIENTO)

  useEffect(() => {
    if (SIN_MOVIMIENTO) return setVisible(true)

    const nodo = ref.current
    if (!nodo) return

    let vivo = true
    const mostrar = () => {
      if (!vivo) return
      vivo = false
      setVisible(true)
      observer.disconnect()
      quitarRegistro()
    }

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) mostrar()
      },
      { rootMargin: margen, threshold: 0.05 },
    )
    observer.observe(nodo)

    // Si el bloque ya quedó dentro o por encima del viewport, se muestra.
    const revisar = () => {
      if (!vivo || !ref.current) return
      const caja = ref.current.getBoundingClientRect()
      if (caja.top < window.innerHeight) mostrar()
    }
    const quitarRegistro = registrar(revisar)

    return () => {
      vivo = false
      observer.disconnect()
      quitarRegistro()
    }
  }, [margen])

  return { ref, visible }
}

/**
 * Posición de scroll expresada como los dos estados que necesita el header.
 * `progreso` va de 0 a 1 en los primeros 120px, que es lo que dura la
 * contracción de la barra.
 */
export function useScroll(limite = 120) {
  const [progreso, setProgreso] = useState(0)

  useEffect(() => {
    let frame = null

    const medir = () => {
      frame = null
      setProgreso(Math.min(1, window.scrollY / limite))
    }

    // rAF: el evento puede dispararse muchas veces por frame y solo la última
    // medición sirve.
    const alMover = () => {
      if (frame === null) frame = requestAnimationFrame(medir)
    }

    medir()
    window.addEventListener('scroll', alMover, { passive: true })
    return () => {
      window.removeEventListener('scroll', alMover)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [limite])

  return progreso
}
