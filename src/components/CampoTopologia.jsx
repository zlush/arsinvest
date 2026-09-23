import { useEffect, useRef } from 'react'
import { SIN_MOVIMIENTO } from '../lib/movimiento.js'
import { proyectos } from '../content/proyectos.js'

/**
 * Campo de topología, versión 2.
 *
 * Es la versión nativa del componente de 21st.dev: el original venía como un
 * <iframe srcDoc> que cargaba Three.js, Tailwind Play CDN e Iconify desde tres
 * servidores distintos y escondía adentro una landing falsa. Acá la geometría
 * son cuarenta líneas de trigonometría sobre un canvas 2D, así que no hay
 * iframe —el hero sigue siendo visible para los buscadores— ni dependencia de
 * red en runtime.
 *
 * Qué cambia respecto de la v1, que era una esfera girando y nada más:
 *
 *  1. Los nodos dejan de ser todos iguales. Doce son nodos de proyecto —uno
 *     por cada proyecto real del inventario— y se leen más grandes y en azul
 *     señal. La red deja de ser decorativa y pasa a tener jerarquía.
 *  2. Las aristas transportan señales. Cada tanto sale un pulso desde un nodo
 *     de proyecto y se propaga por la red saltando de vecino en vecino, con
 *     ramificación decreciente. Es capital recorriendo una estructura, que es
 *     lo que hace la firma.
 *  3. La esfera responde al cursor con unos pocos grados de inclinación. No
 *     orbita: se asoma.
 *  4. Hay entrada. Los nodos aparecen escalonados desde el centro y las
 *     aristas se encienden después, en vez de estar ahí desde el primer
 *     cuadro.
 */

const NODOS = 140
const UMBRAL = 0.46 // distancia 3D máxima para dibujar una arista
const INCLINACION = 0.22 // ladeo base de la esfera, en radianes
const PERSPECTIVA = 2.6
const NIVELES_ALFA = 7 // cubos de opacidad para dibujar las aristas por lote

const ENTRADA = 95 // cuadros que dura la aparición de los nodos
const CADA_SEÑAL = 85 // cuadros entre una cascada y la siguiente
const VIDA_PULSO = 46 // cuadros que tarda un pulso en recorrer una arista
const SALTOS_MAX = 4 // profundidad de la ramificación

/** Distribución de Fibonacci: reparte N puntos sobre la esfera sin agruparlos. */
function sembrar() {
  // Un nodo de proyecto por cada proyecto real, repartidos por la esfera.
  const cadaCuantos = Math.floor(NODOS / proyectos.length)
  const puntos = []

  for (let i = 0; i < NODOS; i++) {
    const phi = Math.acos(-1 + (2 * i) / NODOS)
    const theta = Math.sqrt(NODOS * Math.PI) * phi
    puntos.push({
      x: Math.cos(theta) * Math.sin(phi),
      y: Math.sin(theta) * Math.sin(phi),
      z: Math.cos(phi),
      proyecto: i % cadaCuantos === 0 && i / cadaCuantos < proyectos.length,
      base: Math.random() * 1.1 + 0.7,
      velocidad: Math.random() * 0.021 + 0.014,
      fase: Math.random() * Math.PI * 2,
      // Escalonado de entrada por latitud: la esfera se llena de abajo hacia
      // arriba en vez de aparecer entera.
      demora: ((i / NODOS) * 0.55 + Math.random() * 0.35) * ENTRADA,
      brillo: 0, // lo levantan los pulsos que llegan
    })
  }
  return puntos
}

function tejer(puntos) {
  const aristas = []
  const vecinas = puntos.map(() => [])

  for (let i = 0; i < puntos.length; i++) {
    for (let j = i + 1; j < puntos.length; j++) {
      const dx = puntos[i].x - puntos[j].x
      const dy = puntos[i].y - puntos[j].y
      const dz = puntos[i].z - puntos[j].z
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (d >= UMBRAL) continue

      const k = aristas.length
      aristas.push({ a: i, b: j, fuerza: 1 - d / UMBRAL })
      vecinas[i].push(k)
      vecinas[j].push(k)
    }
  }
  return { aristas, vecinas }
}

export default function CampoTopologia({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const puntos = sembrar()
    const { aristas, vecinas } = tejer(puntos)
    const proy = puntos.map(() => ({ x: 0, y: 0, z: 0, r: 0, luz: 0, vivo: 0 }))
    const indicesProyecto = puntos.reduce((acc, p, i) => (p.proyecto ? [...acc, i] : acc), [])

    /** Pulsos activos: { arista, desde, t, saltos } */
    let pulsos = []

    let ancho = 0
    let alto = 0
    let radio = 0
    let frame = null
    let t = 0
    // Inclinación que aporta el cursor, suavizada hacia el objetivo.
    let ladeoX = 0
    let ladeoY = 0
    let objX = 0
    let objY = 0

    const medir = () => {
      const caja = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      ancho = caja.width
      alto = caja.height
      canvas.width = Math.round(ancho * dpr)
      canvas.height = Math.round(alto * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      radio = Math.min(ancho, alto) * 0.42
    }

    /** Lanza una cascada desde un nodo de proyecto al azar. */
    const emitir = () => {
      const origen = indicesProyecto[(Math.random() * indicesProyecto.length) | 0]
      for (const k of vecinas[origen]) {
        if (Math.random() < 0.55) pulsos.push({ arista: k, desde: origen, t: 0, saltos: 0 })
      }
    }

    const avanzarPulsos = () => {
      const nuevos = []
      for (const pulso of pulsos) {
        pulso.t += 1 / VIDA_PULSO
        if (pulso.t < 1) {
          nuevos.push(pulso)
          continue
        }
        // Llegó al otro extremo: enciende el nodo y quizá se ramifica.
        const arista = aristas[pulso.arista]
        const destino = arista.a === pulso.desde ? arista.b : arista.a
        puntos[destino].brillo = 1

        if (pulso.saltos >= SALTOS_MAX) continue
        // La probabilidad baja con la distancia al origen: la señal se apaga
        // sola en vez de saturar la red.
        const prob = 0.42 - pulso.saltos * 0.09
        for (const k of vecinas[destino]) {
          if (k === pulso.arista) continue
          if (Math.random() < prob) {
            nuevos.push({ arista: k, desde: destino, t: 0, saltos: pulso.saltos + 1 })
          }
        }
      }
      pulsos = nuevos
    }

    const dibujar = () => {
      const cx = ancho / 2
      const cy = alto / 2
      const avance = Math.min(1, t / ENTRADA)

      const giroY = t * 0.0022 + ladeoY
      const giroZ = t * 0.0007
      const inclina = INCLINACION + ladeoX
      const cosY = Math.cos(giroY)
      const senY = Math.sin(giroY)
      const cosI = Math.cos(inclina)
      const senI = Math.sin(inclina)
      const cosZ = Math.cos(giroZ)
      const senZ = Math.sin(giroZ)

      for (let i = 0; i < puntos.length; i++) {
        const p = puntos[i]

        // Giro sobre Y, después ladeo sobre X, después un giro lento sobre Z.
        const x = p.x * cosY - p.z * senY
        let z = p.x * senY + p.z * cosY
        const y = p.y * cosI - z * senI
        z = p.y * senI + z * cosI

        const escala = (radio * PERSPECTIVA) / (PERSPECTIVA + z)
        const pulso = (Math.sin(t * p.velocidad + p.fase) + 1) / 2
        const prof = 0.46 + ((1 - z) / 2) * 0.54

        // Entrada: el nodo crece desde el centro cuando le toca su turno.
        const nacido = Math.max(0, Math.min(1, (t - p.demora) / 26))
        const suave = nacido * nacido * (3 - 2 * nacido) // smoothstep

        p.brillo *= 0.94 // el encendido por señal se apaga solo

        const q = proy[i]
        q.x = cx + (x * cosZ - y * senZ) * escala * (0.55 + suave * 0.45)
        q.y = cy + (x * senZ + y * cosZ) * escala * (0.55 + suave * 0.45)
        q.z = z
        q.vivo = suave
        q.proyecto = p.proyecto

        const tamañoBase = p.proyecto ? p.base * 1.9 + 1.1 : p.base
        q.r = (tamañoBase + pulso * 1.7 + p.brillo * 2.2) * (escala / radio) * suave
        q.luz = (0.38 + pulso * 0.62) * prof * suave + p.brillo * 0.45
      }

      ctx.clearRect(0, 0, ancho, alto)

      // --- Aristas, por lotes de opacidad ---------------------------------
      // Cambiar strokeStyle por arista son cuatrocientos cambios de estado en
      // cada cuadro. Agrupadas en siete cubos, son siete.
      const aparicionAristas = Math.max(0, Math.min(1, (t - ENTRADA * 0.45) / (ENTRADA * 0.8)))
      if (aparicionAristas > 0) {
        const cubos = Array.from({ length: NIVELES_ALFA }, () => [])
        for (const arista of aristas) {
          const a = proy[arista.a]
          const b = proy[arista.b]
          if (a.vivo < 0.05 || b.vivo < 0.05) continue
          const prof = 1 - (a.z + b.z) / 4
          const alfa = arista.fuerza * 0.58 * prof * aparicionAristas
          if (alfa <= 0.02) continue
          const cubo = Math.min(NIVELES_ALFA - 1, (alfa * NIVELES_ALFA * 1.7) | 0)
          cubos[cubo].push(a, b)
        }

        ctx.lineWidth = 1
        for (let k = 0; k < NIVELES_ALFA; k++) {
          const puntosCubo = cubos[k]
          if (!puntosCubo.length) continue
          const alfa = ((k + 0.5) / (NIVELES_ALFA * 1.7)).toFixed(3)
          ctx.strokeStyle = `rgba(0, 148, 197, ${alfa})`
          ctx.beginPath()
          for (let i = 0; i < puntosCubo.length; i += 2) {
            ctx.moveTo(puntosCubo[i].x, puntosCubo[i].y)
            ctx.lineTo(puntosCubo[i + 1].x, puntosCubo[i + 1].y)
          }
          ctx.stroke()
        }
      }

      // --- Señales en tránsito --------------------------------------------
      ctx.lineCap = 'round'
      ctx.lineWidth = 1.6
      for (const pulso of pulsos) {
        const arista = aristas[pulso.arista]
        const desde = proy[pulso.desde]
        const hasta = proy[arista.a === pulso.desde ? arista.b : arista.a]
        // Estela corta detrás de la cabeza, no la arista entera encendida.
        const cabeza = pulso.t
        const cola = Math.max(0, cabeza - 0.32)
        const prof = 1 - (desde.z + hasta.z) / 4
        const desvanece = Math.sin(pulso.t * Math.PI) // entra y sale
        const alfa = 0.85 * prof * desvanece * (1 - pulso.saltos / (SALTOS_MAX + 2))
        if (alfa <= 0.03) continue

        ctx.strokeStyle = `rgba(255, 255, 255, ${alfa.toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(desde.x + (hasta.x - desde.x) * cola, desde.y + (hasta.y - desde.y) * cola)
        ctx.lineTo(desde.x + (hasta.x - desde.x) * cabeza, desde.y + (hasta.y - desde.y) * cabeza)
        ctx.stroke()
      }

      // --- Nodos ------------------------------------------------------------
      for (const q of proy) {
        if (q.vivo < 0.02) continue
        ctx.fillStyle = q.proyecto
          ? `rgba(120, 205, 235, ${Math.min(1, q.luz * 1.25).toFixed(3)})`
          : `rgba(255, 255, 255, ${q.luz.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(q.x, q.y, Math.max(0.4, q.r), 0, Math.PI * 2)
        ctx.fill()
      }

      // Aro de los nodos de proyecto, ya entrada la animación.
      if (avance > 0.9) {
        ctx.lineWidth = 1
        ctx.strokeStyle = 'rgba(0, 148, 197, 0.45)'
        ctx.beginPath()
        for (const q of proy) {
          if (!q.proyecto || q.z > 0.35) continue
          ctx.moveTo(q.x + q.r + 3.5, q.y)
          ctx.arc(q.x, q.y, q.r + 3.5, 0, Math.PI * 2)
        }
        ctx.stroke()
      }
    }

    const animar = () => {
      t += 1
      // Suavizado del ladeo: el cursor propone, la esfera llega despacio.
      ladeoX += (objX - ladeoX) * 0.045
      ladeoY += (objY - ladeoY) * 0.045

      if (t > ENTRADA && t % CADA_SEÑAL === 0) emitir()
      avanzarPulsos()
      dibujar()
      frame = requestAnimationFrame(animar)
    }

    medir()

    if (SIN_MOVIMIENTO) {
      // Un cuadro compuesto, con la entrada terminada: quien pide quietud ve
      // la topología, no un rectángulo vacío.
      t = ENTRADA * 4
      dibujar()
      return
    }

    animar()

    const alMover = (e) => {
      if (window.matchMedia('(pointer: coarse)').matches) return
      const caja = canvas.getBoundingClientRect()
      const nx = (e.clientX - (caja.left + caja.width / 2)) / (caja.width / 2)
      const ny = (e.clientY - (caja.top + caja.height / 2)) / (caja.height / 2)
      // Pocos grados: se asoma, no orbita.
      objY = Math.max(-1, Math.min(1, nx)) * 0.28
      objX = Math.max(-1, Math.min(1, ny)) * 0.2
    }
    window.addEventListener('mousemove', alMover, { passive: true })

    // Fuera de pantalla no se dibuja: seguir pintando mientras alguien lee un
    // artículo es quemar batería sin que nadie lo vea.
    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting && frame === null) animar()
        else if (!entrada.isIntersecting && frame !== null) {
          cancelAnimationFrame(frame)
          frame = null
        }
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    const alRedimensionar = () => {
      medir()
      dibujar()
    }
    window.addEventListener('resize', alRedimensionar)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', alRedimensionar)
      window.removeEventListener('mousemove', alMover)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      /* Decorativo: la página ya dice lo que hace ARS en el h1 y en la bajada.
         Anunciarlo otra vez a un lector de pantalla es ruido. */
      aria-hidden="true"
    />
  )
}
