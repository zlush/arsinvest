import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { motivosContacto } from '../content/sitio.js'

const VACIO = { nombre: '', correo: '', telefono: '', motivo: '', mensaje: '' }

export function validar(datos) {
  const errores = {}

  if (!datos.nombre.trim()) errores.nombre = 'Indique su nombre.'

  if (!datos.correo.trim()) {
    errores.correo = 'Indique un correo de contacto.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.correo.trim())) {
    errores.correo = 'El correo no tiene un formato válido.'
  }

  // El teléfono es opcional: exigirlo en un primer contacto cuesta envíos. Solo
  // se valida si escribieron algo, y de forma permisiva, porque llegan números
  // chilenos y extranjeros con formatos muy distintos.
  if (datos.telefono.trim() && datos.telefono.replace(/\D/g, '').length < 8) {
    errores.telefono = 'El teléfono parece incompleto.'
  }

  if (!datos.motivo) errores.motivo = 'Seleccione el motivo de su consulta.'
  if (!datos.mensaje.trim()) errores.mensaje = 'Escriba brevemente su consulta.'

  return errores
}

const campoBase =
  'w-full rounded border bg-white px-4 py-3 font-texto text-[16px] text-tinta placeholder:text-gris-500/70 focus:border-azul-400'

function Campo({ id, etiqueta, error, opcional, children }) {
  return (
    <div>
      <label htmlFor={id} className="etiqueta block text-grafito">
        {etiqueta}
        {opcional && <span className="ml-2 normal-case tracking-normal text-gris-500">(opcional)</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-[14px] text-estado-alerta">
          {error}
        </p>
      )}
    </div>
  )
}

export default function FormularioContacto() {
  const [datos, setDatos] = useState(VACIO)
  const [errores, setErrores] = useState({})
  const [estado, setEstado] = useState('inicial') // inicial | enviando | enviado | error

  const actualizar = (campo) => (e) => {
    setDatos((prev) => ({ ...prev, [campo]: e.target.value }))
    if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: undefined }))
  }

  const bordeDe = (campo) => (errores[campo] ? 'border-estado-alerta' : 'border-gris-200')

  const enviar = async (e) => {
    e.preventDefault()
    const encontrados = validar(datos)
    setErrores(encontrados)
    if (Object.keys(encontrados).length > 0) return

    setEstado('enviando')
    try {
      const respuesta = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      })
      if (!respuesta.ok) throw new Error('Respuesta no exitosa')
      setDatos(VACIO)
      setEstado('enviado')
    } catch {
      setEstado('error')
    }
  }

  if (estado === 'enviado') {
    return (
      <div className="rounded border border-estado-finalizado/30 bg-estado-finalizado/5 p-8">
        <h3 className="text-[1.15rem] text-estado-finalizado">Recibimos su consulta</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-tinta/80">
          Gracias por escribirnos. Le responderemos al correo que nos indicó.
        </p>
        <button
          type="button"
          onClick={() => setEstado('inicial')}
          className="mt-6 font-texto text-[15px] font-semibold text-azul-600 hover:text-azul-500"
        >
          Enviar otra consulta
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} noValidate className="space-y-6">
      <Campo id="nombre" etiqueta="Nombre" error={errores.nombre}>
        <input
          id="nombre"
          type="text"
          autoComplete="name"
          value={datos.nombre}
          onChange={actualizar('nombre')}
          aria-invalid={Boolean(errores.nombre)}
          aria-describedby={errores.nombre ? 'nombre-error' : undefined}
          className={`${campoBase} ${bordeDe('nombre')}`}
        />
      </Campo>

      <div className="grid gap-6 sm:grid-cols-2">
        <Campo id="correo" etiqueta="Correo" error={errores.correo}>
          <input
            id="correo"
            type="email"
            autoComplete="email"
            value={datos.correo}
            onChange={actualizar('correo')}
            aria-invalid={Boolean(errores.correo)}
            aria-describedby={errores.correo ? 'correo-error' : undefined}
            className={`${campoBase} ${bordeDe('correo')}`}
          />
        </Campo>

        <Campo id="telefono" etiqueta="Teléfono" error={errores.telefono} opcional>
          <input
            id="telefono"
            type="tel"
            autoComplete="tel"
            value={datos.telefono}
            onChange={actualizar('telefono')}
            aria-invalid={Boolean(errores.telefono)}
            aria-describedby={errores.telefono ? 'telefono-error' : undefined}
            className={`${campoBase} ${bordeDe('telefono')}`}
          />
        </Campo>
      </div>

      <Campo id="motivo" etiqueta="Motivo de la consulta" error={errores.motivo}>
        <select
          id="motivo"
          value={datos.motivo}
          onChange={actualizar('motivo')}
          aria-invalid={Boolean(errores.motivo)}
          aria-describedby={errores.motivo ? 'motivo-error' : undefined}
          className={`${campoBase} ${bordeDe('motivo')}`}
        >
          <option value="">Seleccione una opción</option>
          {motivosContacto.map((opcion) => (
            <option key={opcion.valor} value={opcion.valor}>
              {opcion.texto}
            </option>
          ))}
        </select>
      </Campo>

      <Campo id="mensaje" etiqueta="Mensaje" error={errores.mensaje}>
        <textarea
          id="mensaje"
          rows={5}
          value={datos.mensaje}
          onChange={actualizar('mensaje')}
          aria-invalid={Boolean(errores.mensaje)}
          aria-describedby={errores.mensaje ? 'mensaje-error' : undefined}
          className={`${campoBase} ${bordeDe('mensaje')} resize-y`}
        />
      </Campo>

      {estado === 'error' && (
        <p role="alert" className="rounded border border-estado-alerta/30 bg-estado-alerta/5 p-4 text-[15px] text-estado-alerta">
          No pudimos enviar su consulta. Vuelva a intentarlo o escríbanos directamente por
          correo.
        </p>
      )}

      <button
        type="submit"
        disabled={estado === 'enviando'}
        className="group boton-primario disabled:opacity-60"
      >
        {estado === 'enviando' ? 'Enviando…' : 'Enviar consulta'}
        <span className="boton-disco bg-white/15">
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </button>
    </form>
  )
}
