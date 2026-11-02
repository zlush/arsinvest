/**
 * Previsualiza los correos del formulario sin enviarlos.
 *
 *   node scripts/previa-correo.mjs
 *
 * Deja `previa-aviso.html` y `previa-acuse.html` en la raíz para abrirlos en
 * el navegador. Editar HTML de correo a ciegas —con tablas, estilos en línea
 * y las rarezas de Outlook— es donde se cuelan los errores.
 *
 * Cómo funciona: copia `api/contacto.js` reemplazando el import de nodemailer
 * por un stub que en vez de enviar acumula los mensajes. Así se prueba el
 * handler real, no una copia del template que se desactualiza.
 */

import { writeFileSync, readFileSync, unlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..')
// El temporal vive en api/ y no en la raiz: si no, los imports relativos del
// handler (../src/content/...) resuelven un nivel mas arriba y fallan.
const TEMPORAL = join(RAIZ, 'api', '_previa_tmp.mjs')

const fuente = readFileSync(join(RAIZ, 'api/contacto.js'), 'utf8').replace(
  "import nodemailer from 'nodemailer'",
  'const nodemailer = { createTransport: () => ({ sendMail: async (m) => { globalThis.__enviados.push(m); return {} } }) }',
)
writeFileSync(TEMPORAL, fuente)

globalThis.__enviados = []
process.env.SMTP_USER = 'contacto@webguru.cl'
process.env.SMTP_PASS = 'stub'
process.env.CONTACTO_DESTINO = 'destino@ejemplo.cl'

const { default: handler } = await import(pathToFileURL(TEMPORAL).href)

/** Consulta de ejemplo. Cámbiala para probar casos límite: sin teléfono,
 *  nombre muy largo, mensaje de una línea. */
const consulta = {
  nombre: 'María Fernanda Errázuriz',
  correo: 'mf.errazuriz@familyoffice.cl',
  telefono: '+56 9 8123 4567',
  motivo: 'inversionista',
  mensaje:
    'Buenas tardes.\n\nRepresento a un family office con interés en desarrollo inmobiliario en la V Región. Vimos la ficha de Bahía Las Palmas y nos gustaría entender las condiciones de participación y el calendario de aportes.\n\nQuedo atenta.',
}

await handler({ method: 'POST', body: consulta }, { status: () => ({ json: () => {} }) })
unlinkSync(TEMPORAL)

const [aviso, acuse] = globalThis.__enviados

writeFileSync(join(RAIZ, 'previa-aviso.html'), aviso.html)
writeFileSync(join(RAIZ, 'previa-acuse.html'), acuse.html)

console.log('AVISO INTERNO')
console.log('  asunto :', aviso.subject)
console.log('  para   :', aviso.to)
console.log('  replyTo:', aviso.replyTo)
console.log('\nACUSE AL VISITANTE')
console.log('  asunto :', acuse.subject)
console.log('  para   :', acuse.to)
console.log('\nEscritos: previa-aviso.html y previa-acuse.html')
console.log('\n--- TEXTO PLANO DEL AVISO ---\n' + aviso.text)
