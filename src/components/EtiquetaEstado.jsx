import { ESTADOS } from '../content/proyectos.js'

const COLOR = {
  ejecucion: 'bg-estado-ejecucion text-azul-500',
  finalizado: 'bg-estado-finalizado text-estado-finalizado',
}

/**
 * Elemento firma de la identidad (docs/brand-kit.md §5): el estado nunca va
 * solo, siempre con su fecha de corte. Cuando la fecha falta, la etiqueta lo
 * declara en vez de callarlo — es el compromiso público de la marca.
 */
export default function EtiquetaEstado({ estado, fecha, className = '' }) {
  const info = ESTADOS[estado]
  if (!info) return null

  const [fondo, texto] = COLOR[estado].split(' ')

  return (
    <p className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      <span className={`h-2 w-2 shrink-0 ${fondo}`} aria-hidden="true" />
      <span className={`etiqueta ${texto}`}>{info.nombre}</span>
      <span className="etiqueta" aria-hidden="true">
        ·
      </span>
      <span className="etiqueta">
        {fecha ? `Actualizado ${fecha}` : 'Fecha por confirmar'}
      </span>
    </p>
  )
}
