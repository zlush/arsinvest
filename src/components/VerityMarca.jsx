/**
 * Símbolo de Verity, reconstruido desde el PPTX oficial
 * (docs/verity/logos/image-3-2.png, 800x800). Dos brazos en paralelogramo y
 * una línea de nivel entre ellos: el capital, la inteligencia y la verdad.
 *
 * Coordenadas medidas sobre el PNG; el viewBox recorta el margen blanco.
 * `claro` es la versión principal, para fondo tinta: brazo izquierdo en
 * piedra. La positiva, para fondo claro, lleva el izquierdo en tinta.
 */
export function VeritySimbolo({ claro = false, className = '' }) {
  const izquierdo = claro ? '#EEF0F2' : '#0B1622'
  const bronce = claro ? '#C2A26B' : '#9C7B45'

  return (
    <svg viewBox="80 106 640 586" className={className} aria-hidden="true" focusable="false">
      <polygon points="80,106 226,106 400,520 327,692" fill={izquierdo} />
      <polygon points="574,106 720,106 473,692 400,520" fill={bronce} />
      <rect x="311" y="296" width="178" height="20" fill={bronce} />
    </svg>
  )
}

/** Símbolo + nombre. El nombre va en Marcellus, como en el manual. */
export default function VerityMarca({ claro = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <VeritySimbolo claro={claro} className="h-8 w-auto" />
      <span
        className={`font-verity text-[1.6rem] uppercase leading-none tracking-[0.18em] ${
          claro ? 'text-verity-piedra' : 'text-verity-tinta'
        }`}
      >
        Verity
      </span>
    </span>
  )
}
