import { describe, expect, it } from 'vitest'
import { validar } from './FormularioContacto.jsx'
import { filtrarProyectos } from '../content/proyectos.js'

const VALIDO = {
  nombre: 'Ana Pérez',
  correo: 'ana@correo.cl',
  telefono: '',
  motivo: 'inversionista',
  mensaje: 'Quisiera conocer las condiciones de participación.',
}

describe('validar formulario de contacto', () => {
  it('exige nombre, correo, motivo y mensaje', () => {
    const errores = validar({ nombre: '', correo: '', telefono: '', motivo: '', mensaje: '' })
    expect(errores.nombre).toBeDefined()
    expect(errores.correo).toBeDefined()
    expect(errores.motivo).toBeDefined()
    expect(errores.mensaje).toBeDefined()
  })

  it('acepta un envío válido sin teléfono, porque es opcional', () => {
    expect(validar(VALIDO)).toEqual({})
  })

  it('rechaza un correo con formato inválido', () => {
    expect(validar({ ...VALIDO, correo: 'ana@correo' }).correo).toBeDefined()
  })

  it('solo valida el teléfono si trae contenido', () => {
    expect(validar({ ...VALIDO, telefono: '123' }).telefono).toBeDefined()
    expect(validar({ ...VALIDO, telefono: '+56 9 4253 4825' }).telefono).toBeUndefined()
  })
})

describe('filtrarProyectos', () => {
  const lista = [
    { slug: 'a', estado: 'ejecucion' },
    { slug: 'b', estado: 'finalizado' },
    { slug: 'c', estado: 'ejecucion' },
  ]

  it('devuelve la lista completa sin filtro o con "todos"', () => {
    expect(filtrarProyectos(lista)).toHaveLength(3)
    expect(filtrarProyectos(lista, 'todos')).toHaveLength(3)
  })

  it('filtra por estado', () => {
    expect(filtrarProyectos(lista, 'ejecucion').map((p) => p.slug)).toEqual(['a', 'c'])
    expect(filtrarProyectos(lista, 'finalizado').map((p) => p.slug)).toEqual(['b'])
  })
})
