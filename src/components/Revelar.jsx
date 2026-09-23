import { useRevelar } from '../hooks/useRevelar.js'

/**
 * Envoltorio de revelado. `retraso` escalona los hijos de una misma fila.
 *
 * El estado oculto NO vive en estas clases: vive en CSS, detrás de `html.js`
 * (ver index.css e index.html). Si lo pusiera aquí, el HTML prerenderizado
 * saldría con opacity:0 y un rastreador que no ejecute JavaScript vería la
 * página entera invisible. Con la clase `js` —que pone un script en el head
 * antes del primer pintado— el HTML estático se sirve visible y la animación
 * solo existe donde hay navegador.
 *
 * Solo se animan `opacity` y `transform`: las dos que el navegador resuelve
 * en GPU sin recalcular layout.
 */
export default function Revelar({ children, retraso = 0, className = '', as: Tag = 'div' }) {
  const { ref, visible } = useRevelar()

  return (
    <Tag
      ref={ref}
      data-revelar=""
      data-visible={visible ? 'true' : 'false'}
      className={className}
      style={{ transitionDelay: visible ? `${retraso}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}
