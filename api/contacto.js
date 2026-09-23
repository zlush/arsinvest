import nodemailer from 'nodemailer'

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
  const filas = [
    ['Nombre', nombre],
    ['Correo', correo],
    ['Teléfono', telefono || 'No indicado'],
    ['Motivo', motivoTexto],
  ]

  const avisoTexto = [
    'Nueva consulta desde arsinvest.cl',
    '',
    ...filas.map(([k, v]) => `${k}: ${v}`),
    '',
    'Mensaje:',
    mensaje,
  ].join('\n')

  const avisoHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1B1F24;line-height:1.6">
      <p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6B7075;margin:0 0 8px">
        Nueva consulta desde arsinvest.cl
      </p>
      <h2 style="color:#004582;margin:0 0 20px;font-size:20px">${escapar(motivoTexto)}</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:520px">
        ${filas
          .map(
            ([k, v]) => `<tr>
              <td style="padding:8px 16px 8px 0;color:#6B7075;font-size:13px;white-space:nowrap">${escapar(k)}</td>
              <td style="padding:8px 0;font-size:15px">${escapar(v)}</td>
            </tr>`,
          )
          .join('')}
      </table>
      <p style="margin:24px 0 8px;color:#6B7075;font-size:13px">Mensaje</p>
      <p style="margin:0;white-space:pre-wrap;font-size:15px">${escapar(mensaje)}</p>
    </div>
  `

  const acuseTexto = [
    `Estimado/a ${nombre},`,
    '',
    'Recibimos su consulta y le responderemos a la brevedad.',
    '',
    'Su mensaje:',
    mensaje,
    '',
    'ARS Invest',
    'Estructuramos inversiones para desarrollar proyectos inmobiliarios en Chile.',
  ].join('\n')

  const acuseHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1B1F24;line-height:1.6">
      <p style="font-size:15px;margin:0 0 16px">Estimado/a ${escapar(nombre)},</p>
      <p style="font-size:15px;margin:0 0 16px">
        Recibimos su consulta y le responderemos a la brevedad.
      </p>
      <div style="border-left:2px solid #0094C5;padding:4px 0 4px 16px;margin:0 0 24px">
        <p style="margin:0;white-space:pre-wrap;font-size:15px;color:#545454">${escapar(mensaje)}</p>
      </div>
      <p style="margin:0;font-size:15px;color:#004582;font-weight:bold">ARS Invest</p>
      <p style="margin:4px 0 0;font-size:13px;color:#6B7075">
        Estructuramos inversiones para desarrollar proyectos inmobiliarios en Chile.
      </p>
    </div>
  `

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
      text: acuseTexto,
      html: acuseHtml,
    })

    return res.status(200).json({ ok: true })
  } catch {
    return res.status(502).json({ error: 'No se pudo enviar el correo' })
  }
}
