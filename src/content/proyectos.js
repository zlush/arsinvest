/**
 * Inventario de proyectos. Fuente: arsinvest.cl, revisado el 22/09/2026.
 *
 * `fechaEstado: null` significa que el dato no está confirmado, y la etiqueta
 * lo dice en pantalla en vez de inventar una fecha. Es deliberado: la marca se
 * compromete a que ningún estado se publique sin fecha de corte
 * (docs/brand-kit.md §5), y dejarlo visible es lo que fuerza a cerrarlo.
 */

export const ESTADOS = {
  ejecucion: { id: 'ejecucion', nombre: 'En ejecución' },
  finalizado: { id: 'finalizado', nombre: 'Finalizado' },
}

export const proyectos = [
  {
    slug: 'villa-alegre-1-y-2',
    nombre: 'Villa Alegre 1 y 2',
    estado: 'ejecucion',
    fechaEstado: '09 · 2026',
    ubicacion: 'Calle Nueva 4, Calle Existente 1 y Nueva 5 Norte',
    comuna: 'Sierra Gorda',
    escala: '66 viviendas',
    detalle: '6 manzanas · 3 dormitorios · 64 m²',
    descripcion:
      'Seis nuevas manzanas con 66 viviendas de tres dormitorios y 64 m², ejecutadas con construcción industrializada.',
    participantes: ['Constructora ES'],
    rolARS: 'Estructuración de la inversión y coadministración del proyecto',
    foto: '/img/proyectos/villa-alegre-casa.png',
    destacado: true,
  },
  {
    slug: 'playa-quintero',
    nombre: 'Playa Quintero',
    estado: 'ejecucion',
    fechaEstado: '09 · 2026',
    ubicacion: 'Calle Baquedano con Luis Cousiño',
    comuna: 'Quintero',
    escala: '288 departamentos',
    detalle: '2 torres de 12 pisos · 4 locales comerciales',
    descripcion:
      'Dos torres de doce pisos con 144 departamentos cada una y cuatro locales comerciales, en la península de Quintero, a 300 metros del borde costero.',
    participantes: ['CBE'],
    rolARS: 'Estructuración de la inversión y coadministración del proyecto',
    foto: '/img/proyectos/playa-quintero.png',
    destacado: true,
  },
  {
    slug: 'vista-vergara',
    nombre: 'Vista Vergara',
    estado: 'ejecucion',
    fechaEstado: '09 · 2026',
    ubicacion: 'Calle 18 Norte 1480, Lote A',
    comuna: 'Viña del Mar',
    escala: '120 viviendas',
    detalle: 'Cercano a centros comerciales y playas',
    descripcion:
      'Proyecto residencial para 120 familias, próximo a los centros comerciales y las playas de Viña del Mar.',
    participantes: ['CBE'],
    rolARS: 'Estructuración de la inversión y coadministración del proyecto',
    foto: '/img/proyectos/vista-vergara.jpg',
    destacado: true,
  },
  {
    slug: 'bahia-las-palmas',
    nombre: 'Bahía Las Palmas, etapas 1, 2 y 3',
    estado: 'ejecucion',
    fechaEstado: '09 · 2026',
    ubicacion: 'Calle Río San Pedro, Forestal',
    comuna: 'Viña del Mar',
    escala: '432 viviendas',
    detalle: '3 torres de 12 pisos · 3 etapas',
    descripcion:
      'Proyecto para 432 familias dividido en tres torres de doce pisos, desarrollado en tres etapas.',
    participantes: ['CBE'],
    rolARS: 'Estructuración de la inversión y coadministración del proyecto',
    foto: '/img/proyectos/bahia-las-palmas.png',
    destacado: true,
  },

  // --- Finalizados -------------------------------------------------------
  // Las fechas de entrega no están publicadas en ninguna ficha del sitio
  // actual. Pendiente #6 de docs/pendientes-validacion.md.
  {
    slug: 'edificio-borgetto',
    nombre: 'Edificio Borgetto',
    estado: 'finalizado',
    fechaEstado: null,
    ubicacion: 'Cercano a estaciones de Línea 5 del Metro',
    comuna: 'Santiago',
    escala: '299 departamentos',
    detalle: '20 pisos · 1, 2 y 3 dormitorios',
    descripcion:
      'Edificio de veinte pisos con 299 departamentos de uno, dos y tres dormitorios, próximo a estaciones de la Línea 5 del Metro.',
    participantes: [],
    vehiculo: 'Fondo Proyección Radal VII SpA',
    foto: null,
  },
  {
    slug: 'altos-de-rumie',
    nombre: 'Altos de Rumié',
    estado: 'finalizado',
    fechaEstado: null,
    ubicacion: 'Villa Alemana',
    comuna: 'Región de Valparaíso',
    escala: 'Condominio de casas',
    detalle: 'Cinco tipos de casa · clubhouse, gimnasio y piscinas',
    descripcion:
      'Condominio con cinco tipologías de casa, áreas verdes, clubhouse, gimnasio y piscinas.',
    participantes: [],
    vehiculo: 'Fondo Proyección Quinta Norte SpA',
    foto: null,
  },
  {
    slug: 'edificio-odesa',
    nombre: 'Edificio Odesa',
    estado: 'finalizado',
    fechaEstado: null,
    ubicacion: 'Cercano a Metro Intermodal La Cisterna',
    comuna: 'La Cisterna',
    escala: 'Edificio residencial',
    detalle: 'Balcones · terraza con quincho · jardines exclusivos',
    descripcion:
      'Departamentos con balcones, terraza con quincho y jardines exclusivos, junto a la Intermodal La Cisterna.',
    participantes: [],
    vehiculo: 'Fondo Proyección Vespucio V SpA',
    foto: null,
  },
  {
    slug: 'edificio-elena',
    nombre: 'Edificio Elena',
    estado: 'finalizado',
    fechaEstado: null,
    ubicacion: 'Cercano al Parque Fluvial Renato Poblete',
    comuna: 'Quinta Normal',
    escala: 'Edificio residencial',
    detalle: '1, 2 y 3 dormitorios',
    descripcion:
      'Departamentos de uno, dos y tres dormitorios próximos al Parque Fluvial Renato Poblete.',
    participantes: [],
    vehiculo: 'Fondo Proyección Poeta Pedro Prado VI SpA',
    foto: null,
  },
  {
    slug: 'edificio-rivne',
    nombre: 'Edificio Rivne',
    estado: 'finalizado',
    fechaEstado: null,
    ubicacion: 'Cercano al Parque Fluvial Renato Poblete',
    comuna: 'Quinta Normal',
    escala: 'Edificio residencial',
    detalle: '1, 2 y 3 dormitorios',
    descripcion:
      'Departamentos de uno, dos y tres dormitorios próximos al Parque Fluvial Renato Poblete.',
    participantes: [],
    vehiculo: 'Fondo Proyección Poeta Pedro Prado SpA',
    foto: null,
  },
  {
    slug: 'edificio-don-manuel',
    nombre: 'Edificio Don Manuel',
    estado: 'finalizado',
    fechaEstado: null,
    ubicacion: 'Cercano a Metro Gruta de Lourdes y Blanqueado',
    comuna: 'Santiago',
    escala: 'Edificio residencial',
    detalle: '1, 2 y 3 dormitorios · vista panorámica',
    descripcion:
      'Departamentos de uno, dos y tres dormitorios con vista panorámica a Santiago.',
    participantes: [],
    foto: '/img/proyectos/don-manuel.jpg',
  },
  {
    slug: 'ankara',
    nombre: 'Ankara',
    estado: 'finalizado',
    fechaEstado: null,
    ubicacion: 'Barrio residencial con vista al mar',
    comuna: 'Concepción',
    escala: 'Barrio residencial',
    detalle: 'Áreas verdes · sala multiuso · quincho',
    descripcion:
      'Barrio residencial con vista al mar, con áreas verdes, sala multiuso y quincho.',
    participantes: [],
    foto: '/img/proyectos/ankara.jpg',
  },
  {
    slug: 'portal-de-torrent',
    nombre: 'Portal de Torrent',
    estado: 'finalizado',
    fechaEstado: null,
    ubicacion: 'Cercano a Metro Grutas de Lourdes y Autopista Central',
    comuna: 'Santiago',
    escala: 'Edificio residencial',
    detalle: '1, 2 y 3 dormitorios',
    descripcion:
      'Departamentos de uno, dos y tres dormitorios con terminaciones en cerámica, ventanas de PVC y clósets.',
    participantes: [],
    foto: '/img/proyectos/portal-de-torrent.jpg',
  },
]

export function filtrarProyectos(lista, estado) {
  if (!estado || estado === 'todos') return lista
  return lista.filter((p) => p.estado === estado)
}

export function buscarProyecto(slug) {
  return proyectos.find((p) => p.slug === slug)
}

export const proyectosDestacados = proyectos.filter((p) => p.destacado)
