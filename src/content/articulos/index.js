/**
 * Artículos del blog. La estructura de H2 viene definida en la propuesta de
 * construcción web; el contenido sobre DS49, DS10 y DS19 está verificado
 * contra MINVU y SERVIU, con las fuentes citadas al pie de cada artículo.
 *
 * Los programas habitacionales se tratan como CONTEXTO del desarrollo
 * inmobiliario, nunca como vehículos de inversión: son cosas distintas y
 * confundirlas orienta mal al lector.
 *
 * Cada bloque del cuerpo es { tipo, ... } para que la plantilla mantenga la
 * jerarquía semántica (un h1, h2 reales) sin inyectar HTML crudo.
 */

export const articulos = [
  {
    slug: 'inversion-desarrollo-inmobiliario-chile',
    titulo: 'Inversión en desarrollo inmobiliario en Chile: cómo se estructura un proyecto',
    categoria: 'Inversión',
    fecha: '2026-09-22',
    fechaTexto: '22 de septiembre de 2026',
    autor: 'ARS Invest',
    descripcionSeo:
      'Cómo se estructura una inversión en desarrollo inmobiliario en Chile: vehículos, etapas del proyecto, responsabilidades y distribución de resultados.',
    bajada:
      'Qué vehículo se usa, quién responde por qué y en qué momento se forman y distribuyen los resultados de un proyecto inmobiliario privado.',
    cuerpo: [
      {
        tipo: 'p',
        texto:
          'Invertir en desarrollo inmobiliario no es comprar una propiedad terminada. Es participar en la creación del activo: se entra cuando todavía hay un terreno y un permiso, y se sale cuando las unidades están vendidas y los resultados repartidos. Entre una cosa y la otra hay una estructura legal, un presupuesto y un calendario de hitos bancarios que determinan casi todo el riesgo.',
      },
      { tipo: 'h2', texto: 'Vehículos de inversión' },
      {
        tipo: 'p',
        texto:
          'En el desarrollo privado chileno, lo habitual es constituir una sociedad por acciones (SpA) por proyecto. Cada SpA tiene un objeto acotado —desarrollar ese proyecto y no otro—, su propia contabilidad y sus propios socios. Es lo que permite que un inversionista sepa exactamente a qué está expuesto.',
      },
      {
        tipo: 'p',
        texto:
          'Esa separación por proyecto es deliberada. Si un desarrollo se atrasa, el problema queda contenido en su sociedad y no contamina a los demás. La contrapartida es que cada vehículo se evalúa por separado: no hay diversificación automática por el solo hecho de participar en varios.',
      },
      {
        tipo: 'nota',
        texto:
          'Una SpA privada de proyecto no es lo mismo que un fondo de inversión público fiscalizado por la CMF. Las reglas de información, rescate y supervisión son distintas, y conviene tenerlo claro antes de comparar rentabilidades.',
      },
      { tipo: 'h2', texto: 'Etapas del desarrollo privado' },
      {
        tipo: 'lista',
        items: [
          'Evaluación del terreno: ubicación, normativa aplicable, capacidad constructiva y precio de suelo.',
          'Estructuración: constitución del vehículo, definición de aportes y condiciones de cada socio.',
          'Permisos y proyecto: anteproyecto, permiso de edificación y cierre del presupuesto.',
          'Financiamiento: línea de construcción bancaria, con desembolsos asociados a hitos de avance.',
          'Construcción: ejecución de obra con control de costos y plazos contra el presupuesto aprobado.',
          'Comercialización: venta en verde o en blanco, y luego de unidades terminadas.',
          'Cierre: recepción municipal, escrituración, pago del crédito y distribución de resultados.',
        ],
      },
      { tipo: 'h2', texto: 'Responsabilidades: quién responde por qué' },
      {
        tipo: 'p',
        texto:
          'Un proyecto reúne al menos a tres partes con responsabilidades distintas. El inversionista aporta capital y asume el riesgo del negocio. La constructora ejecuta la obra y responde por plazo, costo y calidad conforme a su contrato. El administrador estructura, controla y coordina: revisa el presupuesto, hace seguimiento del avance y de los desembolsos, y responde por que las decisiones se tomen con información oportuna.',
      },
      {
        tipo: 'p',
        texto:
          'La cofirma es el mecanismo concreto que hace exigible esa última responsabilidad. Cuando el administrador debe firmar junto al socio constructor los movimientos relevantes, deja de ser un observador con opinión y pasa a ser parte del control.',
      },
      { tipo: 'h2', texto: 'Formación y distribución de resultados' },
      {
        tipo: 'p',
        texto:
          'El resultado de un proyecto se forma por diferencia entre los ingresos por venta de unidades y la suma del costo del terreno, el costo de construcción, los gastos de financiamiento, la comercialización y los costos de administración. No se realiza de manera pareja en el tiempo: durante la construcción solo hay egresos, y los ingresos se concentran al final, cuando se escritura.',
      },
      {
        tipo: 'p',
        texto:
          'Por eso la distribución ocurre típicamente al cierre, una vez pagado el crédito de construcción y cumplidas las obligaciones del proyecto. Las condiciones específicas —orden de prelación, plazos, eventuales distribuciones parciales— se fijan en el pacto de accionistas de cada vehículo, y son el documento que hay que leer antes de comprometer capital.',
      },
      {
        tipo: 'nota',
        texto:
          'Toda proyección de retorno depende de supuestos de precio de venta, velocidad de comercialización y costo de construcción. Una proyección sin sus supuestos a la vista no es información: es una expectativa.',
      },
    ],
    enlaceSalida: {
      texto: 'Así trabajamos en ARS Invest, paso a paso',
      ruta: '/quienes-somos#como-trabajamos',
    },
    fuentes: [],
  },

  {
    slug: 'ds49-proyectos-habitacionales-chile',
    titulo: 'DS49 y desarrollo de proyectos habitacionales en Chile',
    categoria: 'Programas habitacionales',
    fecha: '2026-09-22',
    fechaTexto: '22 de septiembre de 2026',
    autor: 'ARS Invest',
    descripcionSeo:
      'Qué es el DS49, quiénes participan en un proyecto habitacional bajo este programa y cómo se relaciona con el desarrollo inmobiliario en Chile.',
    bajada:
      'El Fondo Solidario de Elección de Vivienda explicado desde la vereda del desarrollo: quiénes participan y qué exige un proyecto para existir.',
    cuerpo: [
      {
        tipo: 'p',
        texto:
          'El DS49 —Fondo Solidario de Elección de Vivienda— es un programa del Ministerio de Vivienda y Urbanismo dirigido a familias que no son propietarias y se encuentran en situación de vulnerabilidad social y necesidad habitacional. Permite comprar una vivienda ya construida o construir uno o varios conjuntos, en ambos casos sin crédito hipotecario.',
      },
      { tipo: 'h2', texto: 'Contexto del programa' },
      {
        tipo: 'p',
        texto:
          'El aporte del Estado se compone de un subsidio base de 800 UF, que puede aumentar según la ubicación geográfica de la vivienda y mediante subsidios complementarios que dependen de las características del grupo familiar y de la vivienda a adquirir. Entre los requisitos de postulación están ser mayor de 18 años, contar con cédula de identidad vigente y mantener una cuenta de ahorro para la vivienda con un mínimo de 10 UF al último día hábil del mes anterior a la postulación.',
      },
      {
        tipo: 'p',
        texto:
          'El programa opera mediante llamados, que el MINVU abre con condiciones específicas. Algunos son colectivos y están dirigidos a grupos organizados; otros se enfocan en construcción en nuevos terrenos, en comunas de vocación rural, o en proyectos con autoconstrucción asistida e industrialización.',
      },
      { tipo: 'h2', texto: 'Actores que intervienen' },
      {
        tipo: 'lista',
        items: [
          'Las familias postulantes, individualmente o como grupo organizado.',
          'La Entidad Patrocinante, que acompaña técnica y socialmente al grupo durante el proceso.',
          'El SERVIU regional, que administra el llamado, revisa los proyectos y fiscaliza.',
          'El propietario del terreno, cuando el proyecto contempla construcción en nuevos terrenos.',
          'La constructora, responsable de ejecutar la obra según el proyecto aprobado.',
        ],
      },
      { tipo: 'h2', texto: 'Etapas del proyecto' },
      {
        tipo: 'p',
        texto:
          'Un proyecto bajo este programa recorre la búsqueda y calificación del terreno, el desarrollo del proyecto técnico y su ingreso a evaluación, la obtención de permisos, la asignación del subsidio mediante el llamado correspondiente, la construcción y, finalmente, la recepción y entrega de las viviendas a las familias.',
      },
      {
        tipo: 'p',
        texto:
          'Los plazos los marcan el calendario de llamados y la revisión técnica del SERVIU, no la voluntad del desarrollador. Es la diferencia práctica más importante respecto de un proyecto privado: aquí el cronograma es en buena parte administrativo.',
      },
      { tipo: 'h2', texto: 'Relación con el desarrollo habitacional' },
      {
        tipo: 'p',
        texto:
          'Para quien desarrolla, el DS49 define de antemano el estándar de la vivienda, el perfil del destinatario y el marco de financiamiento. Eso acota el riesgo comercial —la demanda está identificada antes de construir— y, a cambio, reduce los grados de libertad en diseño, precio y plazos.',
      },
      {
        tipo: 'p',
        texto:
          'La aparición de llamados orientados a industrialización es relevante para el rubro: los sistemas de construcción industrializada permiten acortar plazos de obra y estandarizar calidad, dos variables que en este tipo de proyectos pesan más que en el desarrollo privado tradicional.',
      },
      {
        tipo: 'nota',
        texto:
          'El DS49 es un programa de subsidio habitacional, no un instrumento de inversión. Participar en el desarrollo de un proyecto que se acoge a él es una decisión de negocio distinta de postular al beneficio, y no debe confundirse con él.',
      },
    ],
    enlaceSalida: {
      texto: 'Ver los proyectos que desarrollamos',
      ruta: '/proyectos',
    },
    fuentes: [
      {
        texto: 'MINVU — Subsidio para construir una vivienda DS49',
        url: 'https://www.minvu.gob.cl/beneficio/vivienda/subsidio-para-construir-una-vivienda-de-hasta-950-uf-ds49/',
      },
      {
        texto: 'SERVIU Metropolitano — Fondo Solidario de Elección de Vivienda (DS49)',
        url: 'https://serviumetropolitana.minvu.gob.cl/fondo-solidario-de-eleccion-de-vivienda-ds49/',
      },
    ],
  },

  {
    slug: 'ds10-habitabilidad-rural',
    titulo: 'DS10: desarrollo de proyectos de habitabilidad rural',
    categoria: 'Programas habitacionales',
    fecha: '2026-09-22',
    fechaTexto: '22 de septiembre de 2026',
    autor: 'ARS Invest',
    descripcionSeo:
      'Qué es el Programa de Habitabilidad Rural (DS10), a quién está dirigido y qué condiciones impone el territorio al desarrollo de estos proyectos.',
    bajada:
      'Un programa donde el terreno ya tiene dueño y la infraestructura define la factibilidad antes que el diseño.',
    cuerpo: [
      {
        tipo: 'p',
        texto:
          'El Programa de Habitabilidad Rural, conocido como DS10, está dirigido a familias que requieren una solución habitacional y viven en zonas rurales o en localidades urbanas de hasta 5.000 habitantes. Su diseño reconoce explícitamente las particularidades culturales, geográficas y productivas de esos territorios.',
      },
      { tipo: 'h2', texto: 'Contexto del programa' },
      {
        tipo: 'p',
        texto:
          'Una de sus modalidades permite construir la vivienda en el sitio donde la familia ya reside, y puede postularse de forma individual o colectiva. La vivienda resultante debe contar al menos con dos dormitorios, cocina, baño y estar-comedor.',
      },
      {
        tipo: 'p',
        texto:
          'Esa condición —construir en el sitio del residente— cambia la naturaleza del proyecto. No hay que comprar suelo ni definir una localización: el emplazamiento está dado, y con él sus accesos, su pendiente y su relación con las redes existentes.',
      },
      { tipo: 'h2', texto: 'Características de los proyectos' },
      {
        tipo: 'lista',
        items: [
          'Emplazamiento disperso: las viviendas rara vez están contiguas, a diferencia de un conjunto urbano.',
          'Soluciones adaptadas al clima y a la actividad productiva de cada territorio.',
          'Escala menor por unidad, con mayor peso relativo de la logística y el traslado de materiales.',
          'Participación directa de las familias en la definición de la solución.',
        ],
      },
      { tipo: 'h2', texto: 'Terreno, infraestructura y ejecución' },
      {
        tipo: 'p',
        texto:
          'En un proyecto rural, la factibilidad se juega antes que el diseño. Agua, electricidad, tratamiento de aguas servidas y acceso vehicular determinan si la solución es viable y cuánto cuesta. Dos sitios a pocos kilómetros de distancia pueden tener costos muy distintos por esta sola razón.',
      },
      {
        tipo: 'p',
        texto:
          'La ejecución enfrenta condiciones que un proyecto urbano no tiene: distancias largas para el abastecimiento, ventanas de trabajo acotadas por clima y menor disponibilidad de mano de obra local especializada. Planificar la obra con ese supuesto, y no con el de la ciudad, es lo que separa un proyecto que se cumple de uno que se atrasa.',
      },
      {
        tipo: 'nota',
        texto:
          'Las condiciones, montos y requisitos de cada llamado los define el MINVU y varían entre convocatorias. La información vigente siempre está en las fuentes oficiales.',
      },
    ],
    enlaceSalida: {
      texto: 'Conversemos sobre desarrollo de proyectos',
      ruta: '/contacto',
    },
    fuentes: [
      {
        texto: 'SERVIU Metropolitano — Programa de Habitabilidad Rural (DS10)',
        url: 'https://serviumetropolitana.minvu.gob.cl/programa-de-habitabilidad-rural-ds10/',
      },
      {
        texto: 'MINVU — Habitabilidad Rural, construcción en sitio del residente',
        url: 'https://www.minvu.gob.cl/beneficio/vivienda/programa-de-habitabilidad-rural-construccion-en-sitio-del-residente-localidades-de-hasta-5-000-habitantes/',
      },
    ],
  },

  {
    slug: 'ds19-integracion-social-inmobiliaria',
    titulo: 'DS19: integración social y participación privada en proyectos inmobiliarios',
    categoria: 'Programas habitacionales',
    fecha: '2026-09-22',
    fechaTexto: '22 de septiembre de 2026',
    autor: 'ARS Invest',
    descripcionSeo:
      'Cómo funciona el Programa de Integración Social y Territorial (DS19) y qué rol cumple el desarrollador privado en este tipo de proyectos.',
    bajada:
      'El programa donde el desarrollador privado construye, comercializa y responde, con cuotas reservadas para familias de menores ingresos.',
    cuerpo: [
      {
        tipo: 'p',
        texto:
          'El Programa de Integración Social y Territorial, DS19, permite que familias de distintas realidades socioeconómicas accedan a su primera vivienda con apoyo del Estado, en proyectos ubicados en barrios bien localizados, próximos a servicios y con estándares de diseño, equipamiento y áreas verdes.',
      },
      { tipo: 'h2', texto: 'Funcionamiento general' },
      {
        tipo: 'p',
        texto:
          'A diferencia de otros programas, aquí el proyecto lo desarrolla y comercializa un privado. El componente de integración se materializa en cuotas: una parte de las unidades del conjunto queda reservada para familias de menores ingresos que aplican su subsidio a la compra.',
      },
      {
        tipo: 'p',
        texto:
          'Desde 2022, el MINVU habilitó una plataforma digital que abre procesos públicos de inscripción para las personas interesadas en aplicar su subsidio a esas cuotas reservadas en proyectos DS19 seleccionados.',
      },
      { tipo: 'h2', texto: 'Participantes' },
      {
        tipo: 'lista',
        items: [
          'La empresa desarrolladora, que presenta el proyecto, lo construye y lo comercializa.',
          'El MINVU y el SERVIU, que seleccionan los proyectos y administran la asignación de subsidios.',
          'Las familias compradoras, con y sin subsidio, que conviven en el mismo conjunto.',
          'La entidad financiera, cuando la compra requiere crédito hipotecario complementario.',
        ],
      },
      { tipo: 'h2', texto: 'Desarrollo, comercialización y seguimiento' },
      {
        tipo: 'p',
        texto:
          'Para el desarrollador, el DS19 combina dos lógicas. Una parte del conjunto se vende en condiciones de mercado y la otra se coloca en cuotas reservadas con precio y perfil definidos por el programa. El proyecto debe cumplir simultáneamente los estándares de localización y equipamiento exigidos y los requisitos de calidad que impone la venta privada.',
      },
      {
        tipo: 'p',
        texto:
          'El seguimiento abarca el avance de obra, la asignación efectiva de las cuotas y la escrituración. La velocidad de colocación de las unidades reservadas puede diferir de la de las unidades libres, y esa diferencia es una variable de flujo que conviene modelar desde el inicio, no descubrir a mitad de camino.',
      },
      {
        tipo: 'nota',
        texto:
          'Los requisitos, montos y condiciones de los llamados DS19 cambian entre convocatorias. Antes de tomar cualquier decisión, verifique la información vigente en MINVU o SERVIU.',
      },
    ],
    enlaceSalida: {
      texto: 'Hablemos si representa a una constructora o tiene un terreno',
      ruta: '/contacto',
    },
    fuentes: [
      {
        texto: 'MINVU — Programa de Integración Social y Territorial, DS19',
        url: 'https://www.minvu.gob.cl/beneficio/vivienda/subsidio-de-integracion-social-y-territorial-ds19/',
      },
      {
        texto: 'MINVU — Nuevo sistema de inscripción Programa DS19',
        url: 'https://www.minvu.gob.cl/nuevo-sistema-de-inscripcion-programa-de-integracion-social-y-territorial-ds19/',
      },
    ],
  },
]

export function buscarArticulo(slug) {
  return articulos.find((a) => a.slug === slug)
}
