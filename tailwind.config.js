import plugin from 'tailwindcss/plugin'

/** Tokens transcritos de docs/brand-kit.md §10. Si falta un tono, se agrega
 *  primero al brand kit: ahí viven los contrastes verificados. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        azul: {
          900: '#003057',
          700: '#004582',
          600: '#00618F',
          500: '#0074AA',
          400: '#0094C5',
          100: '#E3F1F8',
        },
        tinta: '#1B1F24',
        grafito: '#545454',
        gris: {
          500: '#6B7075',
          200: '#DDE3E8',
        },
        niebla: '#F5F7F9',
        estado: {
          ejecucion: '#0094C5',
          finalizado: '#2E7D5B',
          alerta: '#B4452F',
        },
      },
      fontFamily: {
        titulo: ['Archivo', 'system-ui', 'sans-serif'],
        texto: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        etiqueta: '0.08em',
      },
      /* Curvas propias. `ease-in-out` y `linear` son las que delatan una
         interfaz sin trabajar: ningún objeto físico se mueve así. */
      transitionTimingFunction: {
        salida: 'cubic-bezier(0.22, 1, 0.36, 1)', // revelados y entradas
        suave: 'cubic-bezier(0.32, 0.72, 0, 1)', // cambios de estado
        resorte: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // micro-rebote
      },
      maxWidth: {
        contenido: '72rem',
        lectura: '44rem',
      },
    },
  },
  plugins: [
    /**
     * Redefine el variante `motion-reduce:` para que respete `?movimiento=1`.
     *
     * Por defecto Tailwind lo compila a una media query pura, y una media
     * query no se puede anular con una clase. Sin esto, el override de URL
     * funcionaría en el CSS escrito a mano pero no en las decenas de
     * `motion-reduce:transition-none` que hay en los componentes, y el sitio
     * quedaría a medio animar.
     */
    plugin(({ addVariant }) => {
      addVariant('motion-reduce', [
        '@media (prefers-reduced-motion: reduce) { html:not(.movimiento) & }',
      ])
    }),
  ],
}
