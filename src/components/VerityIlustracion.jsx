/**
 * Ilustraciones de la propuesta de Arturo, recoloreadas a la paleta de Verity
 * (src/assets/verity/). Van en línea y no como <img>: dentro de un <img> el
 * SVG no ve las fuentes de la página y sus rótulos caerían a la del sistema.
 *
 * Pesan 22 KB comprimidas entre las diez, así que se cargan todas juntas.
 */
const SVGS = import.meta.glob('../assets/verity/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function svgDe(nombre) {
  return SVGS[`../assets/verity/${nombre}.svg`]
}

/**
 * `oscura`: el dibujo es para fondo oscuro y su panel va en tinta.
 * `sobreOscuro`: la figura está sobre una sección oscura, así que el pie de
 * foto va claro aunque el panel sea blanco.
 */
export default function VerityIlustracion({
  nombre,
  pie,
  oscura = false,
  sobreOscuro = false,
  className = '',
}) {
  const svg = svgDe(nombre)
  if (!svg) return null

  return (
    <figure className={className}>
      <div
        className={`rounded-2xl border p-4 sm:p-6 [&>svg]:block [&>svg]:h-auto [&>svg]:w-full ${
          oscura ? 'border-white/10 bg-verity-tinta' : 'border-gris-200 bg-white'
        }`}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {pie && (
        <figcaption
          className={`mt-3 text-pretty text-[13px] leading-relaxed ${
            sobreOscuro ? 'text-verity-piedra/70' : 'text-gris-500'
          }`}
        >
          {pie}
        </figcaption>
      )}
    </figure>
  )
}
