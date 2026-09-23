/**
 * `?movimiento=1` fuerza las animaciones aunque el sistema pida quietud.
 *
 * Existe para revisar el diseño desde un equipo que tiene activado "reducir
 * movimiento", y para presentar el sitio en una reunión sin tener que tocar
 * las preferencias de accesibilidad del sistema operativo.
 *
 * Vive solo en la URL, sin `localStorage`: no puede quedarse encendido para un
 * visitante real que llegó por un enlace. La clase la pone un script en el
 * <head> antes del primer pintado (ver index.html), así que el CSS ya la ve
 * cuando aplica el primer estilo, y sobrevive a la navegación interna porque
 * nunca se quita.
 */

export const MOVIMIENTO_FORZADO =
  typeof document !== 'undefined' &&
  document.documentElement.classList.contains('movimiento')

export const SIN_MOVIMIENTO =
  typeof window !== 'undefined' &&
  !MOVIMIENTO_FORZADO &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
