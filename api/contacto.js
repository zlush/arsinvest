import nodemailer from 'nodemailer'
import { contacto, direccionCompleta } from '../src/content/contacto.js'

/** Dominio del sitio, para los enlaces del acuse. */
const SITIO = (process.env.VITE_SITIO || 'https://arsinvest.cl').replace(/\/$/, '')

/**
 * Datos de contacto de ARS que van en el pie del acuse.
 *
 * Se importan de src/content/contacto.js en vez de repetirse acá: es el mismo
 * dato que muestra la página de contacto, y tenerlo en dos lugares garantiza
 * que un día digan cosas distintas.
 */
const contactoArs = {
  correo: contacto.correo,
  telefono: contacto.telefono,
  telefonoEnlace: contacto.telefonoEnlace,
  direccion: direccionCompleta,
}

/**
 * Recepción de consultas del formulario. Envía dos correos: el aviso interno a
 * la casilla de ARS y un acuse al visitante.
 *
 * Ambos van en multipart/alternative con versión en texto plano. No es
 * opcional: un correo solo-HTML es señal de spam y estos mensajes tienen que
 * llegar a la bandeja de entrada, no a promociones.
 *
 * CONTACTO_DESTINO está pendiente de confirmación (pendiente #2 del plan): el
 * sitio publicado dice patricia.corsi@arsinvest.cl y la propuesta menciona a
 * "Patricia Grossi". Sin esa variable la función falla explícitamente en vez
 * de perder la consulta en silencio.
 */

const MOTIVOS = {
  inversionista: 'Inversionista',
  propietario: 'Propietario de terreno',
  constructora: 'Constructora',
  verity: 'Verity',
  otra: 'Otra consulta',
}

function escapar(texto = '') {
  return String(texto).replace(/[<>&"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c],
  )
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { SMTP_USER, SMTP_PASS, CONTACTO_DESTINO } = process.env
  if (!SMTP_USER || !SMTP_PASS || !CONTACTO_DESTINO) {
    return res.status(500).json({ error: 'Envío de correo no configurado' })
  }

  const { nombre, correo, telefono, motivo, mensaje } = req.body || {}
  if (!nombre?.trim() || !correo?.trim() || !motivo || !mensaje?.trim()) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' })
  }

  const transporte = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    // La App Password de Google viene con espacios y hay que quitárselos
    // antes del login, o la autenticación falla.
    auth: { user: SMTP_USER, pass: SMTP_PASS.replace(/\s/g, '') },
  })

  const motivoTexto = MOTIVOS[motivo] || motivo
  const telefonoLimpio = (telefono || '').replace(/[^\d+]/g, '')

  // Hora de Chile, no la del servidor: quien lee esto necesita saber cuándo
  // entró la consulta en su propio huso, no en UTC.
  const cuando = new Date().toLocaleString('es-CL', {
    timeZone: 'America/Santiago',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    // 24 horas: con hour12 el locale chileno agrega "a. m." y al lado de la
    // "h" del formato queda "10:41 a. m. h".
    hour12: false,
  })

  // La tabla del HTML lleva solo lo que no está ya a la vista: el motivo vive
  // en la etiqueta de arriba y la fecha debajo del nombre. Repetirlos hacía
  // que el bloque de datos se leyera como relleno.
  const filas = [
    ['Correo', correo],
    ['Teléfono', telefono || 'No indicado'],
  ]

  // En texto plano no hay jerarquía visual, así que ahí sí van todos.
  const avisoTexto = [
    `Nueva consulta · ${motivoTexto}`,
    '',
    `De: ${nombre}`,
    ...filas.map(([k, v]) => `${k}: ${v}`),
    `Motivo: ${motivoTexto}`,
    `Recibida: ${cuando} h`,
    '',
    'Mensaje:',
    mensaje,
    '',
    '---',
    `Responde directamente a este correo y la respuesta le llega a ${nombre}.`,
  ].join('\n')

  /**
   * Aviso interno.
   *
   * Maquetado con tablas y estilos en línea porque Outlook ignora flexbox,
   * grid y las hojas de estilo externas. Ancho 600px, que es el estándar que
   * no se corta en ningún cliente.
   *
   * La decisión de fondo: este correo se lee en el teléfono, entre otras
   * cosas, y la única acción que importa es responder. Por eso el nombre y los
   * dos botones van arriba de todo, antes que la tabla de datos.
   */
  const avisoHtml = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Nueva consulta</title>
</head>
<body style="margin:0;padding:0;background:#F5F7F9;">
<!-- Preencabezado: es la línea que Gmail muestra junto al asunto en la
     bandeja. Sin esto, ahí aparece el primer texto que encuentre. -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">
  ${escapar(motivoTexto)} · ${escapar(nombre)} · ${escapar(mensaje.slice(0, 90))}
</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F5F7F9;">
<tr><td align="center" style="padding:24px 12px;">

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:#FFFFFF;border-radius:12px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">

  <tr>
    <td style="background:#003057;padding:20px 28px;">
      <span style="color:#FFFFFF;font-size:15px;font-weight:bold;letter-spacing:.04em;">ARS INVEST</span>
      <span style="color:#7FC4E0;font-size:11px;letter-spacing:.12em;text-transform:uppercase;float:right;padding-top:4px;">Nueva consulta</span>
    </td>
  </tr>

  <tr>
    <td style="padding:28px 28px 0 28px;">
      <span style="display:inline-block;background:#E3F1F8;color:#00618F;font-size:11px;font-weight:bold;letter-spacing:.1em;text-transform:uppercase;padding:6px 12px;border-radius:999px;">
        ${escapar(motivoTexto)}
      </span>
      <p style="margin:16px 0 4px;font-size:26px;line-height:1.2;color:#004582;font-weight:bold;">
        ${escapar(nombre)}
      </p>
      <p style="margin:0;font-size:13px;color:#6B7075;">${escapar(cuando)} h</p>
    </td>
  </tr>

  <!-- Botones con tabla: Outlook ignora el padding de un <a> suelto y el
       botón quedaría del tamaño del texto. -->
  <tr>
    <td style="padding:22px 28px 0 28px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="background:#004582;border-radius:999px;">
            <a href="mailto:${escapar(correo)}?subject=${encodeURIComponent('Re: su consulta a ARS Invest')}"
               style="display:inline-block;padding:13px 26px;font-size:14px;font-weight:bold;color:#FFFFFF;text-decoration:none;">
              Responder
            </a>
          </td>
          ${
            telefonoLimpio
              ? `<td width="10"></td>
          <td style="border:1px solid #DDE3E8;border-radius:999px;">
            <a href="tel:${escapar(telefonoLimpio)}"
               style="display:inline-block;padding:12px 26px;font-size:14px;font-weight:bold;color:#004582;text-decoration:none;">
              Llamar
            </a>
          </td>`
              : ''
          }
        </tr>
      </table>
    </td>
  </tr>

  <tr>
    <td style="padding:26px 28px 0 28px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        ${filas
          .map(
            ([k, v], i) => `<tr>
          <td style="padding:11px 16px 11px 0;font-size:12px;color:#6B7075;text-transform:uppercase;letter-spacing:.06em;white-space:nowrap;vertical-align:top;${i ? 'border-top:1px solid #EDF1F4;' : ''}">${escapar(k)}</td>
          <td style="padding:11px 0;font-size:15px;color:#1B1F24;vertical-align:top;${i ? 'border-top:1px solid #EDF1F4;' : ''}">${escapar(v)}</td>
        </tr>`,
          )
          .join('')}
      </table>
    </td>
  </tr>

  <tr>
    <td style="padding:24px 28px 0 28px;">
      <p style="margin:0 0 10px;font-size:12px;color:#6B7075;text-transform:uppercase;letter-spacing:.06em;">Mensaje</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F5F7F9;border-radius:8px;">
        <tr><td style="padding:16px 18px;border-left:3px solid #0094C5;border-radius:8px;">
          <p style="margin:0;font-size:15px;line-height:1.65;color:#1B1F24;white-space:pre-wrap;">${escapar(mensaje)}</p>
        </td></tr>
      </table>
    </td>
  </tr>

  <!-- El replyTo del mensaje apunta al visitante, así que Responder ya le
       llega. Decirlo evita que alguien abra otro cliente para contestar. -->
  <tr>
    <td style="padding:24px 28px 28px 28px;">
      <p style="margin:0;padding-top:18px;border-top:1px solid #EDF1F4;font-size:13px;line-height:1.6;color:#6B7075;">
        Responde directamente a este correo: la respuesta le llega a ${escapar(nombre)}.
      </p>
    </td>
  </tr>

</table>

<p style="margin:16px 0 0;font-size:11px;color:#98A1A8;font-family:Arial,Helvetica,sans-serif;">
  Enviado por el formulario de arsinvest.cl
</p>

</td></tr>
</table>
</body>
</html>`

  // Solo el nombre de pila: "Estimado/a María Fernanda Errázuriz" se lee a
  // plantilla. Si el campo trae una sola palabra, queda igual.
  const nombrePila = nombre.trim().split(/\s+/)[0]

  const acuseTexto = [
    `Estimada/o ${nombrePila},`,
    '',
    'Gracias por escribirnos. Su consulta quedó registrada y la revisará una',
    'persona del equipo: en ARS Invest atendemos personalmente a quienes nos',
    'contactan.',
    '',
    'Esto fue lo que nos envió:',
    '',
    mensaje,
    '',
    'Si quiere agregar algo, puede responder directamente a este correo.',
    '',
    'Mientras tanto, puede revisar los proyectos en los que participamos:',
    `${SITIO}/proyectos`,
    '',
    '---',
    'ARS Invest',
    'Estructuramos inversiones para desarrollar proyectos inmobiliarios en Chile.',
    `${contactoArs.telefono} · ${contactoArs.correo}`,
    contactoArs.direccion,
  ].join('\n')

  /**
   * Acuse al visitante.
   *
   * Comparte el sistema visual del aviso interno pero no su estructura: aquel
   * existe para actuar sobre el lead, este para dar confianza. Por eso acá no
   * hay botones de acción sino qué pasa después, y el cierre lleva los datos
   * de la firma en vez de un pie técnico.
   *
   * Es el primer contacto de un inversionista con ARS. Vale lo mismo que la
   * portada del sitio.
   */
  const acuseHtml = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Recibimos su consulta</title>
</head>
<body style="margin:0;padding:0;background:#F5F7F9;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">
  Su consulta quedó registrada. La revisará una persona del equipo de ARS Invest.
</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F5F7F9;">
<tr><td align="center" style="padding:24px 12px;">

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:#FFFFFF;border-radius:12px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">

  <tr>
    <td style="background:#003057;padding:22px 28px;">
      <span style="color:#FFFFFF;font-size:15px;font-weight:bold;letter-spacing:.04em;">ARS INVEST</span>
      <span style="color:#7FC4E0;font-size:11px;letter-spacing:.12em;text-transform:uppercase;float:right;padding-top:4px;">Inversiones inmobiliarias</span>
    </td>
  </tr>

  <tr>
    <td style="padding:30px 28px 0 28px;">
      <p style="margin:0 0 18px;font-size:21px;line-height:1.35;color:#004582;font-weight:bold;">
        Estimada/o ${escapar(nombrePila)}, recibimos su consulta.
      </p>
      <p style="margin:0;font-size:15px;line-height:1.7;color:#1B1F24;">
        Gracias por escribirnos. Su consulta quedó registrada y la revisará una
        persona del equipo: en ARS Invest atendemos personalmente a quienes nos
        contactan.
      </p>
    </td>
  </tr>

  <tr>
    <td style="padding:26px 28px 0 28px;">
      <p style="margin:0 0 10px;font-size:12px;color:#6B7075;text-transform:uppercase;letter-spacing:.06em;">Esto fue lo que nos envió</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F5F7F9;border-radius:8px;">
        <tr><td style="padding:16px 18px;border-left:3px solid #0094C5;border-radius:8px;">
          <p style="margin:0;font-size:15px;line-height:1.65;color:#545454;white-space:pre-wrap;">${escapar(mensaje)}</p>
        </td></tr>
      </table>
      <p style="margin:12px 0 0;font-size:13px;color:#6B7075;">
        Si quiere agregar algo, puede responder directamente a este correo.
      </p>
    </td>
  </tr>

  <tr>
    <td style="padding:26px 28px 0 28px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#E3F1F8;border-radius:8px;">
        <tr><td style="padding:18px 20px;">
          <p style="margin:0 0 6px;font-size:12px;color:#00618F;text-transform:uppercase;letter-spacing:.06em;font-weight:bold;">Mientras tanto</p>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#1B1F24;">
            Puede revisar los proyectos en los que participamos, con su ubicación,
            escala y el rol que cumplimos en cada uno:
            <a href="${SITIO}/proyectos" style="color:#00618F;font-weight:bold;">Ver proyectos</a>
          </p>
        </td></tr>
      </table>
    </td>
  </tr>

  <tr>
    <td style="padding:28px 28px 28px 28px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr><td style="padding-top:20px;border-top:2px solid #004582;">
          <p style="margin:0;font-size:16px;font-weight:bold;color:#004582;">ARS Invest</p>
          <p style="margin:5px 0 0;font-size:13px;line-height:1.6;color:#6B7075;">
            Estructuramos inversiones para desarrollar proyectos inmobiliarios en Chile.
          </p>
          <p style="margin:12px 0 0;font-size:13px;line-height:1.7;color:#6B7075;">
            <a href="tel:${escapar(contactoArs.telefonoEnlace)}" style="color:#00618F;text-decoration:none;">${escapar(contactoArs.telefono)}</a>
            <span style="color:#C3CBD2;">&nbsp;·&nbsp;</span>
            <a href="mailto:${escapar(contactoArs.correo)}" style="color:#00618F;text-decoration:none;">${escapar(contactoArs.correo)}</a>
            <br>${escapar(contactoArs.direccion)}
          </p>
        </td></tr>
      </table>
    </td>
  </tr>

</table>

<p style="margin:16px 0 0;font-size:11px;color:#98A1A8;font-family:Arial,Helvetica,sans-serif;">
  Recibió este correo porque envió una consulta en ${SITIO.replace(/^https?:\/\//, '')}
</p>

</td></tr>
</table>
</body>
</html>`

  try {
    await transporte.sendMail({
      from: `ARS Invest <${SMTP_USER}>`,
      to: CONTACTO_DESTINO,
      replyTo: correo,
      subject: `Consulta web · ${motivoTexto} · ${nombre}`,
      text: avisoTexto,
      html: avisoHtml,
    })

    await transporte.sendMail({
      from: `ARS Invest <${SMTP_USER}>`,
      to: correo,
      subject: 'Recibimos su consulta — ARS Invest',
      // Sin esto, responder el acuse llegaba a la casilla de la agencia que
      // envía por SMTP, no a ARS. Un inversionista que contesta este correo
      // tiene que llegarle al cliente.
      replyTo: CONTACTO_DESTINO,
      text: acuseTexto,
      html: acuseHtml,
    })

    return res.status(200).json({ ok: true })
  } catch {
    return res.status(502).json({ error: 'No se pudo enviar el correo' })
  }
}
