/**
 * Contenido institucional. Textos de visión y forma de trabajo tomados de
 * arsinvest.cl/vision/ (22/09/2026); el mensaje de portada viene aprobado en
 * la propuesta de construcción web.
 */

export const marca = {
  nombre: 'ARS Invest',
  bajada: 'Inversiones inmobiliarias',
  descripcion:
    'Estructuramos inversiones para desarrollar proyectos inmobiliarios en Chile.',
}

export const navegacion = [
  { texto: 'Inicio', ruta: '/' },
  { texto: 'Quiénes somos', ruta: '/quienes-somos' },
  { texto: 'Proyectos', ruta: '/proyectos' },
  { texto: 'Actualidad inmobiliaria', ruta: '/actualidad-inmobiliaria' },
]

export const portada = {
  titulo: 'Estructuramos inversiones para desarrollar proyectos inmobiliarios en Chile.',
  bajada:
    'Participamos desde la evaluación del terreno y la estructuración del proyecto hasta su construcción, comercialización y distribución de resultados, según las condiciones de cada inversión.',
  botonPrimario: { texto: 'Conoce nuestros proyectos', ruta: '/proyectos' },
  botonSecundario: { texto: 'Conversemos sobre inversión', ruta: '/contacto' },
}

export const vision =
  'Ser una gran plataforma de inversión en la industria inmobiliaria para nuestra red de socios.'

export const formaDeTrabajo = [
  {
    titulo: 'Directa',
    texto: 'Buscamos y atendemos personalmente a nuestros inversionistas.',
  },
  {
    titulo: 'Simple',
    texto:
      'Operamos a través de una sociedad en la que los inversionistas participan del negocio.',
  },
  {
    titulo: 'Comprometida',
    texto: 'Como administradores, velamos por los intereses de quienes invierten con nosotros.',
  },
]

/** Los siete pasos reales del modelo. Reemplaza a la sección "Cómo invertir",
 *  que se retira del menú por conservar un ejemplo de 2018-2019. */
export const comoTrabajamos = [
  {
    paso: '01',
    titulo: 'Estudio de terrenos',
    texto: 'Evaluamos la ubicación, la normativa aplicable y el potencial del terreno.',
  },
  {
    paso: '02',
    titulo: 'Selección de socios constructores',
    texto: 'Elegimos a la constructora según su capacidad de ejecución y su historial.',
  },
  {
    paso: '03',
    titulo: 'Estructuración',
    texto:
      'Definimos el vehículo de inversión y las condiciones bajo las que participa cada socio.',
  },
  {
    paso: '04',
    titulo: 'Revisión de costos',
    texto: 'Revisamos el presupuesto del proyecto antes de comprometer capital.',
  },
  {
    paso: '05',
    titulo: 'Coadministración y cofirma',
    texto: 'Administramos junto al socio constructor y cofirmamos las decisiones del proyecto.',
  },
  {
    paso: '06',
    titulo: 'Seguimiento bancario por hitos',
    texto: 'Controlamos el avance y los desembolsos contra los hitos comprometidos con el banco.',
  },
  {
    paso: '07',
    titulo: 'Cierre y distribución',
    texto:
      'Cerramos el proyecto y distribuimos los resultados según las condiciones de cada inversión.',
  },
]

export const sociosConstructores = [
  'Constructora ES',
  'CBE',
  'Grupo Hexxa',
  'Inmobiliaria Perseverancia',
]

export const motivosContacto = [
  { valor: 'inversionista', texto: 'Soy inversionista' },
  { valor: 'propietario', texto: 'Soy propietario de un terreno' },
  { valor: 'constructora', texto: 'Represento a una constructora' },
  { valor: 'otra', texto: 'Otra consulta' },
]
