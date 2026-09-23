/**
 * Un solo dato de ubicación, reutilizado en el texto y en el mapa. El hallazgo
 * de la evaluación era justamente que texto y mapa mostraban oficinas
 * distintas: si hay una sola fuente, no pueden divergir.
 *
 * El correo está tomado del sitio publicado (patricia.corsi@arsinvest.cl); la
 * propuesta menciona "Patricia Grossi". El apellido está en validación
 * (pendiente #2) y el formulario apunta a CONTACTO_DESTINO, no a este valor.
 */

export const contacto = {
  correo: 'patricia.corsi@arsinvest.cl',
  telefono: '+562 3204 0826',
  telefonoEnlace: '+56232040826',
  direccion: {
    calle: 'Av. José Alcalde Délano 10545, oficina 310',
    sector: 'Los Trapenses, Lo Barnechea',
    referencia: 'Mall Vivo Los Trapenses',
    ciudad: 'Santiago, Chile',
  },
}

export const direccionCompleta = [
  contacto.direccion.calle,
  contacto.direccion.sector,
  contacto.direccion.ciudad,
].join(', ')

export const mapaUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  direccionCompleta,
)}&output=embed`
