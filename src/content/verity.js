/**
 * Contenido de Verity: la sección /verity y una página por línea de negocio.
 *
 * Fuente: la propuesta web de Arturo Ready ("Verity · ARS Invest", 29/10/2026,
 * aprobada por Felipe Vergara), guardada en docs/verity/propuesta-arturo.html.
 * Allí eran 16 páginas; aquí cada línea queda en una sola, con los textos
 * condensados pero sin cambiar lo que dicen.
 *
 * Se dejó fuera "UF 5,3 MM en ventas en 9 proyectos de ARS Invest": no tiene
 * fuente citable (docs/bitacora.md, pendiente de ARS).
 *
 * Cada página de línea es una lista de bloques. VerityLinea.jsx sabe dibujar
 * cuatro tipos: 'texto', 'grilla', 'pasos' y 'ficha'. Power Center agrega
 * 'caso' y Agentización 'cifras'.
 */

export const avisoLegal =
  'La información de esta página es referencial. No constituye una oferta pública de valores ni una recomendación de inversión. Las condiciones de cada proyecto se informan en sus documentos de suscripción.'

export const portadaVerity = {
  etiqueta: 'Verity · Sociedad vinculada a ARS Invest',
  titulo:
    'Suelo, renta comercial e inteligencia artificial, estructurados con disciplina financiera.',
  bajada:
    'Verity es la nueva sociedad que se suma a ARS Invest para administrar tres líneas de negocio: el desarrollo de macrolotes, el desarrollo de power centers y la agentización empresarial. Reúne la experiencia de sus socios en banca, deuda privada e inversión inmobiliaria con tecnología aplicada a la gestión.',
}

export const lineasResumen = {
  etiqueta: 'Tres líneas de negocio',
  titulo:
    'Una misma forma de trabajar: analizar a fondo, financiar en el mercado chileno y ejecutar de punta a punta.',
}

export const sociedad = {
  etiqueta: 'La sociedad',
  titulo: 'Visión y misión de Verity',
  texto:
    'Verity nace para ampliar el campo de acción de ARS Invest más allá de la vivienda: hacia el suelo, los activos comerciales de renta y la tecnología que hace más eficiente la gestión de empresas e inversiones.',
  vision:
    'Ser una plataforma de referencia en Chile para convertir suelo, proyectos y empresas en activos rentables, financiados y bien gobernados.',
  mision:
    'Buscar, analizar, estructurar y financiar proyectos con rigor técnico y financiero, y acompañar a inversionistas y socios desde la originación hasta la salida.',
}

export const principios = {
  etiqueta: 'Principios',
  titulo: 'Cuatro criterios que se aplican en las tres líneas',
  items: [
    {
      titulo: 'Rigor antes de invertir',
      texto:
        'Cada oportunidad pasa por un análisis cualitativo y cuantitativo, con una decisión explícita de avanzar o detenerse antes de comprometer capital.',
    },
    {
      titulo: 'Un vehículo por proyecto',
      texto:
        'Cada proyecto se estructura en una sociedad independiente, con contabilidad separada y reglas de gobierno acordadas desde el inicio.',
    },
    {
      titulo: 'Intereses alineados',
      texto:
        'Los administradores co-invierten junto a los inversionistas y recuperan sus costos cuando el proyecto cierra su financiamiento o su venta.',
    },
    {
      titulo: 'Un equipo de punta a punta',
      texto:
        'El mismo equipo acompaña el proyecto desde el análisis de mercado hasta la venta, sin brechas entre asesores separados.',
    },
  ],
}

export const publicos = {
  etiqueta: 'Para quién trabajamos',
  titulo: 'Inversionistas, family offices, empresas y propietarios de suelo',
  items: [
    'Inversionistas y multi family offices que buscan proyectos inmobiliarios estructurados, con un vehículo independiente y reportes periódicos.',
    'Empresas de gran tamaño que quieren llevar la inteligencia artificial a su operación diaria con control y resultados medibles.',
    'Propietarios de terrenos que desean vender o aportar su suelo a un proyecto con financiamiento y gestión profesional.',
    'Retailers y operadores que buscan nuevas ubicaciones con contratos de largo plazo.',
  ],
}

export const socios = [
  {
    nombre: 'Felipe Vergara Moll',
    correo: 'felipe@arsinvest.cl',
    telefono: '+56 9 9324 6580',
    telefonoEnlace: '+56993246580',
  },
  {
    nombre: 'Arturo Ready Salamé',
    correo: 'arturo@arsinvest.cl',
    telefono: '+56 9 4253 4825',
    telefonoEnlace: '+56942534825',
  },
]

export const cierre = {
  titulo: 'Conversemos sobre su proyecto, su terreno o su empresa.',
  texto: 'Los socios de Verity atienden personalmente a inversionistas, propietarios y empresas.',
}

/* --------------------------------------------------------------------------
 * Las tres líneas. El orden del arreglo es el orden en la sección.
 * ------------------------------------------------------------------------ */

const macrolotes = {
  slug: 'macrolotes',
  numero: '01',
  nombre: 'Verity Macrolotes',
  tema: 'Suelo urbanizado',
  resumen:
    'Búsqueda, análisis y financiamiento de terrenos, con o sin subdivisión, para desarrollar permisos, urbanización integral y venta de lotes con financiamiento de largo plazo.',
  miniatura: 'mini-ml',
  hero: {
    titulo: 'Del terreno bruto al lote urbanizado, con permisos y financiamiento.',
    bajada:
      'Verity Macrolotes busca y analiza terrenos, gestiona su financiamiento en el mercado chileno y levanta inversionistas para comprarlos o recibirlos en aporte, con o sin subdivisión. Luego desarrolla los permisos, la urbanización integral y la venta de los lotes a clientes finales, con financiamiento de largo plazo.',
    ilustracion: 'ml-hero',
    pie: 'Plano esquemático de un macrolote: lotes vendidos, lotes disponibles y área verde.',
  },
  bloques: [
    {
      tipo: 'texto',
      etiqueta: 'Propósito de la línea',
      titulo:
        'Habilitar suelo de forma ordenada, para que propietarios, inversionistas y compradores ganen con el mismo proyecto.',
      parrafos: [
        'En Chile hay grandes paños de terreno con buena ubicación que no se desarrollan porque falta capital, gestión de permisos o un plan financiero que conecte la compra del suelo con la venta final. Verity Macrolotes integra esas piezas en una sola gestión.',
      ],
      columnas: [
        {
          titulo: 'Visión',
          texto:
            'Ser el estructurador de referencia en Chile para transformar grandes paños de suelo en lotes urbanizados, con permisos aprobados y financiamiento disponible para quien los compra.',
        },
        {
          titulo: 'Misión',
          texto:
            'Identificar terrenos con potencial, validarlos con análisis cualitativo y cuantitativo, reunir el capital y la deuda necesarios, y conducir cada proyecto hasta la entrega y el financiamiento de sus lotes.',
        },
        {
          titulo: 'Objetivo',
          texto:
            'Crear valor comprando o recibiendo suelo a valor de terreno bruto y vendiéndolo como lotes urbanizados, con títulos saneados, permisos aprobados y crédito de largo plazo para el comprador.',
        },
      ],
    },
    {
      tipo: 'grilla',
      etiqueta: 'Servicios de la línea',
      titulo:
        'Siete capacidades integradas, desde la búsqueda del terreno hasta el crédito del comprador',
      items: [
        {
          titulo: 'Búsqueda y originación',
          texto:
            'Prospección activa de terrenos y contacto con propietarios que quieren vender o aportar su suelo a un proyecto.',
        },
        {
          titulo: 'Análisis cualitativo',
          texto:
            'Normativa vigente, uso de suelo, títulos y gravámenes, factibilidades de agua, alcantarillado, electricidad y vialidad, entorno y demanda.',
        },
        {
          titulo: 'Análisis cuantitativo',
          texto:
            'Cabida y loteo preliminar, costo de urbanización, precio por metro cuadrado, flujo de caja, rentabilidad y escenarios de sensibilidad.',
        },
        {
          titulo: 'Gestión de financiamiento',
          texto:
            'Deuda para la compra y la urbanización con bancos y fondos de deuda privada del mercado financiero chileno.',
        },
        {
          titulo: 'Inversionistas y puesta en marcha',
          texto:
            'Levantamiento de capital, constitución del vehículo del proyecto, suscripción de acciones y definición del gobierno corporativo.',
        },
        {
          titulo: 'Permisos y urbanización integral',
          texto:
            'Tramitación de subdivisión, loteo y obras, y ejecución de vialidad, agua potable, alcantarillado, aguas lluvia, electrificación, alumbrado y áreas verdes.',
        },
        {
          titulo: 'Venta y financiamiento de largo plazo',
          texto:
            'Comercialización de los lotes, escrituración y financiamiento de largo plazo para el comprador final, mediante venta a plazo del propio vehículo o crédito de instituciones financieras.',
        },
      ],
    },
    {
      tipo: 'pasos',
      etiqueta: 'El proceso',
      titulo: 'Seis etapas, con una decisión de avance al cierre de cada una',
      bajada:
        'El capital entra solo cuando el terreno ha demostrado que sostiene el proyecto, y cada etapa deja un entregable verificable por los inversionistas.',
      items: [
        {
          titulo: 'Originación',
          texto:
            'Búsqueda de terrenos, primer filtro normativo y de ubicación, y acuerdo de confidencialidad y exclusividad con el propietario.',
          hito: 'Ficha del terreno',
        },
        {
          titulo: 'Evaluación',
          texto:
            'Análisis cualitativo y cuantitativo, cabida y loteo preliminar, revisión de títulos y factibilidades, modelo financiero inicial.',
          hito: 'Go / No-go',
        },
        {
          titulo: 'Estructuración',
          texto:
            'Constitución del vehículo, levantamiento de capital y de deuda, y compra o aporte formal del terreno.',
          hito: 'Cierre financiero',
        },
        {
          titulo: 'Permisos',
          texto:
            'Proyecto de loteo y urbanización, aprobaciones municipales y sectoriales, y factibilidades definitivas de servicios.',
          hito: 'Permisos aprobados',
        },
        {
          titulo: 'Urbanización integral',
          texto:
            'Licitación, adjudicación y supervisión de obras: vialidad, redes sanitarias, aguas lluvia, electrificación, alumbrado y áreas verdes.',
          hito: 'Recepción de obras',
        },
        {
          titulo: 'Venta y financiamiento',
          texto:
            'Comercialización, escrituración, financiamiento de largo plazo al comprador y devolución de capital y utilidad.',
          hito: 'Cierre del vehículo',
        },
      ],
    },
    {
      tipo: 'grilla',
      etiqueta: 'Inversión',
      titulo: 'Capital y deuda del mercado chileno, ordenados en un vehículo por proyecto',
      bajada:
        'Cada terreno se desarrolla en una sociedad independiente. Los inversionistas aportan capital, la deuda financia la compra y la urbanización, y la venta de lotes devuelve primero la deuda y luego el capital con su rentabilidad.',
      ilustracion: 'ml-structure',
      pie: 'Flujo de recursos de un proyecto tipo.',
      items: [
        {
          rotulo: 'Capa 1 · Capital',
          titulo: 'Inversionistas',
          texto:
            'Family offices, inversionistas calificados y el propietario que aporta su terreno. Suscriben acciones del vehículo y reciben dividendos o la recompra de sus acciones al cierre.',
        },
        {
          rotulo: 'Capa 2 · Deuda de desarrollo',
          titulo: 'Bancos y fondos de deuda privada',
          texto:
            'Financian la compra del terreno y las obras de urbanización, con el terreno y el proyecto como respaldo y desembolsos asociados al avance.',
        },
        {
          rotulo: 'Capa 3 · Financiamiento al comprador',
          titulo: 'Crédito de largo plazo',
          texto:
            'Venta a plazo del propio vehículo o crédito de instituciones financieras, para que el cliente final pueda pagar su lote en el tiempo.',
        },
      ],
    },
    {
      tipo: 'grilla',
      etiqueta: 'Para propietarios de terrenos',
      titulo: 'Si tiene un terreno, lo evaluamos con usted',
      bajada:
        'Muchos paños con buen potencial siguen sin desarrollarse porque su dueño no cuenta con el capital, el equipo o el tiempo para hacerlo. Verity ofrece tres caminos.',
      items: [
        {
          rotulo: 'Liquidez',
          titulo: 'Venta',
          texto:
            'El vehículo del proyecto compra el terreno. El propietario recibe el precio acordado, al contado o en cuotas ligadas a hitos del proyecto.',
        },
        {
          rotulo: 'Plusvalía',
          titulo: 'Aporte',
          texto:
            'El terreno se aporta al vehículo y el propietario participa del resultado. Captura el mayor valor que genera la urbanización, sin gestionar el proyecto.',
        },
        {
          rotulo: 'Equilibrio',
          titulo: 'Mixta',
          texto:
            'Una parte del valor se paga en dinero y otra se mantiene como participación en el proyecto.',
        },
      ],
    },
    {
      tipo: 'ficha',
      etiqueta: 'Evaluación preliminar',
      titulo: 'Antecedentes que se piden para evaluar un terreno',
      filas: [
        ['Dominio', 'Inscripción de dominio vigente y certificado de hipotecas y gravámenes'],
        ['Rol', 'Rol de avalúo del Servicio de Impuestos Internos'],
        ['Normativa', 'Certificado de informaciones previas de la municipalidad'],
        ['Ubicación', 'Plano o archivo KMZ con los deslindes del predio'],
        ['Opcional', 'Levantamiento topográfico, estudios o factibilidades existentes'],
      ],
    },
  ],
}

const powerCenter = {
  slug: 'power-center',
  numero: '02',
  nombre: 'Verity Power Center',
  tema: 'Renta comercial',
  resumen:
    'Desarrollo de centros comerciales de conveniencia: terreno, cabida, contratos con retailers, financiamiento, construcción, estabilización y venta a inversionistas institucionales.',
  miniatura: 'mini-pc',
  hero: {
    titulo:
      'Centros comerciales de conveniencia, desarrollados para su venta a inversionistas institucionales.',
    bajada:
      'Verity Power Center busca terrenos, valida su cabida y factibilidad, firma contratos con retailers de distintas áreas, financia la compra y la construcción en el mercado de capitales chileno, estabiliza los flujos del activo y lo vende a inversionistas institucionales.',
    ilustracion: 'pc-hero',
    pie: 'Elevación esquemática de un power center tipo.',
  },
  bloques: [
    {
      tipo: 'texto',
      etiqueta: 'Qué es un power center',
      titulo: 'Un formato de renta estable, cercano al consumidor',
      parrafos: [
        'Un power center es un centro comercial abierto, de uno o dos niveles, con tiendas ancla de gran formato, como un supermercado o una tienda de mejoramiento del hogar, acompañadas de tiendas menores y estacionamiento en superficie frente a los locales. El strip center es su versión de menor escala, orientada a la conveniencia del barrio.',
        'Su atractivo para el inversionista institucional está en los contratos de arriendo de largo plazo con operadores conocidos, que generan un flujo predecible.',
      ],
      columnas: [
        {
          titulo: 'Visión',
          texto:
            'Ser un desarrollador y estructurador de referencia en Chile en power centers y strip centers, reconocido por entregar activos con contratos firmados, flujos estables y una salida institucional clara.',
        },
        {
          titulo: 'Misión',
          texto:
            'Integrar en un solo equipo el análisis comercial, la estructuración financiera y la gestión de la construcción, para llevar cada proyecto desde el terreno hasta su venta con menos riesgo y mejor precio de salida.',
        },
        {
          titulo: 'Objetivo',
          texto:
            'Crear activos de renta comercial con contratos de largo plazo, un ingreso operacional estabilizado y una tasa de capitalización atractiva para compradores institucionales.',
        },
      ],
    },
    {
      tipo: 'pasos',
      etiqueta: 'Modelo de negocio',
      titulo: 'De un terreno a un activo de renta en ocho pasos',
      bajada:
        'El valor se crea en la diferencia entre lo que cuesta desarrollar el activo y lo que un inversionista institucional paga por sus flujos estabilizados.',
      ilustracion: 'pc-siteplan',
      pie: 'Planta esquemática: terreno de 25.000 m² y 10.200 m² arrendables.',
      items: [
        {
          titulo: 'Búsqueda activa de terrenos',
          texto:
            'Identificación de ubicaciones con flujo, accesibilidad y demanda insatisfecha de comercio de conveniencia.',
        },
        {
          titulo: 'Análisis de cabida',
          texto:
            'Superficie arrendable posible según la normativa, el programa comercial y los estacionamientos exigidos.',
        },
        {
          titulo: 'Prefactibilidad y factibilidad',
          texto:
            'Mercado, normativa, costos, plazos y modelo financiero, con una decisión go / no-go antes de comprar.',
        },
        {
          titulo: 'Contratos con retailers',
          texto:
            'Precolocación de locales y firma de contratos con anclas y operadores de distintas áreas de negocio.',
        },
        {
          titulo: 'Financiamiento',
          texto:
            'Capital y deuda en el mercado de capitales chileno para la compra del terreno y el desarrollo.',
        },
        {
          titulo: 'Construcción',
          texto:
            'Licitación, adjudicación y supervisión de la obra, permisos y recepciones finales.',
        },
        {
          titulo: 'Estabilización de flujos',
          texto:
            'Puesta en marcha, ocupación objetivo y administración hasta lograr un ingreso operacional estable.',
        },
        {
          titulo: 'Venta institucional',
          texto:
            'Valorización de los flujos, estructuración de la venta y negociación con inversionistas institucionales.',
        },
      ],
    },
    {
      tipo: 'grilla',
      etiqueta: 'Mix comercial',
      titulo: 'Operadores de distintas áreas de negocio, con roles distintos en el centro',
      items: [
        {
          rotulo: 'Ancla',
          titulo: 'Atrae el flujo',
          texto:
            'Supermercado o mejoramiento del hogar. Gran superficie, contrato largo y renta por m² menor.',
        },
        {
          rotulo: 'Semi-ancla',
          titulo: 'Amplía el motivo de visita',
          texto:
            'Gimnasio, farmacia o tienda intermedia. Complementan al ancla y extienden el horario de uso.',
        },
        {
          rotulo: 'Tiendas menores',
          titulo: 'Aporta la renta',
          texto:
            'Servicios, comida, salud y belleza. Menor superficie y mayor renta por m², con rotación más alta.',
        },
        {
          rotulo: 'Pad',
          titulo: 'Monetiza el frente',
          texto:
            'Locales independientes hacia la calle, como comida rápida o sucursales de servicios.',
        },
      ],
    },
    {
      tipo: 'grilla',
      etiqueta: 'El proceso',
      titulo: 'Seis fases, una decisión de avance y dos ventanas de salida',
      bajada:
        'Si la validación resulta negativa, el proyecto se detiene antes de comprometer capital de inversionistas. El proyecto puede venderse con anteproyecto aprobado y contratos clave (Exit 1) o como activo construido y estabilizado (Exit 2).',
      ilustracion: 'pc-phases',
      pie: 'Mapa de etapas, con los puntos de decisión y de salida.',
      items: [
        {
          rotulo: 'Fase 1',
          titulo: 'Originación',
          texto:
            'Búsqueda de mercados y oportunidades, factibilidad normativa y aporte de terreno, proyecto o activos.',
        },
        {
          rotulo: 'Fase 2 · Go / No-go',
          titulo: 'Validación',
          texto:
            'Mercado potencial, propuesta de valor, posicionamiento, masterplan y análisis financiero del activo.',
        },
        {
          rotulo: 'Fase 3 · Exit 1',
          titulo: 'Desarrollo',
          texto:
            'Precolocación de locales, cierre de contratos clave, anteproyecto de arquitectura y estrategia financiera.',
        },
        {
          rotulo: 'Fase 4',
          titulo: 'Estructuración',
          texto:
            'Modelo financiero, vehículo de inversión y levantamiento de capital y deuda bancaria.',
        },
        {
          rotulo: 'Fase 5',
          titulo: 'Construcción y recepciones',
          texto:
            'Arquitectura, permisos, licitación y gerenciamiento de la obra, recepciones finales.',
        },
        {
          rotulo: 'Fase 6 · Exit 2',
          titulo: 'Colocación',
          texto:
            'Valorización de flujos, negociación con inversionistas finales y venta del activo.',
        },
      ],
    },
    {
      tipo: 'ficha',
      etiqueta: 'Alianza y gobierno',
      titulo: 'Un solo equipo responsable de punta a punta',
      bajada:
        'Verity lidera las etapas financieras y de ejecución, y trabaja en alianza con un socio especialista en estrategia comercial y diseño de valor. Cada socio lidera sus etapas, sin capacidades duplicadas.',
      filas: [
        ['Vehículo', 'Sociedad independiente por proyecto, con contabilidad separada'],
        ['Decisiones', 'Cada socio lidera sus etapas; inversión y gasto se deciden por consenso'],
        [
          'Costos de viabilidad',
          'Estudios, topografía, costos legales y diseño los asumen los socios gestores',
        ],
        [
          'Honorarios',
          'Diferidos; los socios gestores los recuperan al cierre del financiamiento o de la venta',
        ],
        [
          'Constructora',
          'La obra queda en manos de un tercero; la licitación y la supervisión quedan en Verity',
        ],
      ],
    },
    {
      tipo: 'caso',
      etiqueta: 'Caso ilustrativo',
      titulo: 'Un proyecto tipo, en números',
      bajada:
        'La lógica financiera de un power center de 10.200 m² arrendables sobre un terreno de 25.000 m². Un activo de renta se valoriza dividiendo su ingreso operacional neto estabilizado (NOI) por la tasa de capitalización que exige el comprador; si el proyecto rinde sobre su costo más que esa tasa, la diferencia es la utilidad del desarrollo.',
      advertencia:
        'Ejemplo ilustrativo con cifras preliminares, pendientes de validación. No corresponde a un proyecto en comercialización ni constituye una oferta o recomendación de inversión.',
      indicadores: [
        { valor: 'UF 39.530', texto: 'NOI estabilizado al año' },
        { valor: '7,0%', texto: 'Cap rate de salida' },
        { valor: '8,4%', texto: 'Yield on cost' },
        { valor: '20%', texto: 'Utilidad sobre costo (meta)' },
      ],
      tabla: {
        titulo: 'Programa comercial y renta',
        columnas: ['Local', 'GLA (m²)', 'UF/m²/mes', 'Ocupación', 'Renta anual (UF)'],
        filas: [
          ['Tiendas menores', '4.000', '0,76', '93%', '33.926,4'],
          ['Supermercado', '4.500', '0,25', '100%', '13.500,0'],
          ['Gimnasio', '1.200', '0,25', '100%', '3.600,0'],
          ['Tienda intermedia', '500', '0,28', '100%', '1.680,0'],
        ],
        total: ['Total', '10.200', '—', '—', '52.706,4'],
      },
      supuestos: [
        ['Costo del terreno', 'UF 185.000 (7,4 UF/m² sobre 25.000 m²)'],
        ['Construcción y soft costs', 'UF 285.600 (28,0 UF/m² sobre 10.200 m² GLA)'],
        ['Costo total de desarrollo', 'UF 470.600'],
        ['Margen NOI', '75%'],
        ['Valor de salida', 'UF 564.711,4 (NOI ÷ 7,0%)'],
        ['Utilidad sobre costo', 'UF 94.111,4'],
      ],
    },
  ],
}

const agentizacion = {
  slug: 'agentizacion',
  numero: '03',
  nombre: 'Verity Agentización Empresarial',
  tema: 'IA empresarial',
  resumen:
    'Infraestructura de inteligencia artificial para empresas: agentes conectados a la información de la compañía, con reglas claras y una persona que aprueba. Operada con la marca Cardus.',
  miniatura: 'mini-ag',
  marcaOperadora: {
    texto: 'Operada con la marca Cardus',
    url: 'https://cardus.cl',
  },
  hero: {
    titulo: 'Inteligencia artificial que trabaja para las personas de su empresa.',
    bajada:
      'La tercera línea de Verity lleva la inteligencia artificial desde la prueba a la operación diaria. Integra los datos, sistemas y procesos de la empresa bajo controles comunes, para que cada área produzca más, reduzca trabajo manual y aproveche mejor sus oportunidades de crecimiento.',
    ilustracion: 'ag-hero',
    pie: 'Un orquestador central conectado a los sistemas de la empresa y a una persona que aprueba.',
    oscura: true,
  },
  bloques: [
    {
      tipo: 'texto',
      etiqueta: 'Propósito',
      titulo: 'Que la IA trabaje para las personas de la empresa, y no al revés.',
      parrafos: [
        'El objetivo es devolverle tiempo al equipo para decidir, atender clientes y hacer crecer el negocio. Para lograrlo, los agentes trabajan conectados a la información real de la compañía, dentro de permisos definidos y con una persona que aprueba las decisiones importantes.',
      ],
      columnas: [
        {
          titulo: 'Visión',
          texto:
            'Ser el socio de referencia para empresas e instituciones de inversión que quieren operar con agentes de inteligencia artificial conectados a su información, gobernados por reglas claras y medidos por sus resultados.',
        },
        {
          titulo: 'Misión',
          texto:
            'Diseñar, implementar y acompañar la infraestructura de inteligencia artificial de nuestros clientes, conectada a su información, gobernada por reglas claras y evaluada por los resultados que produce.',
        },
      ],
    },
    {
      tipo: 'pasos',
      etiqueta: 'Cómo funciona',
      titulo: 'Cinco pasos, de la solicitud al registro',
      bajada:
        'Cada solicitud del equipo recorre un camino controlado: se verifica quién pide y qué puede usar, un orquestador reparte el trabajo entre agentes especializados y una persona aprueba el resultado antes de que salga.',
      ilustracion: 'ag-flow',
      pie: 'Recorrido de una solicitud, con registro inalterable de cada paso.',
      ilustracionOscura: true,
      items: [
        {
          titulo: 'El equipo pide',
          texto: 'Por correo, chat o voz, en el lenguaje de todos los días.',
        },
        {
          titulo: 'Se verifica el acceso',
          texto: 'Quién pide y a qué información puede acceder según su rol.',
        },
        {
          titulo: 'Se reparte el trabajo',
          texto: 'El orquestador asigna cada tarea al agente que corresponde.',
        },
        {
          titulo: 'Se prepara el resultado',
          texto: 'Los agentes preparan, revisan y consolidan la respuesta.',
        },
        {
          titulo: 'Una persona decide',
          texto: 'Aprueba el borrador y la acción queda registrada.',
        },
      ],
    },
    {
      tipo: 'grilla',
      etiqueta: 'Método de implementación',
      titulo: 'Cuatro fases, y se escala solo con evidencia',
      bajada:
        'La inteligencia artificial se implementa, no se compra. Un taller ejecutivo elige un proceso, lo dimensiona con datos reales y fija las metas de un primer piloto. Solo si el piloto cumple, se amplía.',
      items: [
        {
          rotulo: 'Fase 1',
          titulo: 'Descubrimiento',
          texto:
            'Se mapean los procesos actuales, sus entregables, quién los opera y qué información necesitan.',
        },
        {
          rotulo: 'Fase 2',
          titulo: 'Diseño y accesos',
          texto:
            'Se definen resultados esperados, permisos y aprobadores antes de conectar datos reales.',
        },
        {
          rotulo: 'Fase 3',
          titulo: 'Construcción y validación',
          texto: 'Se construye con los datos y reglas de la empresa, y se prueba con los usuarios.',
        },
        {
          rotulo: 'Fase 4',
          titulo: 'Despliegue y escala',
          texto:
            'Se lanza, se mide el uso y se amplía a otros procesos cuando el primero demuestra resultados.',
        },
      ],
    },
    {
      tipo: 'ficha',
      etiqueta: 'Controles',
      titulo: 'Cinco reglas que se fijan antes de conectar datos reales',
      bajada:
        'Determinan qué tan autónomo puede ser cada flujo. La autonomía se amplía solo cuando la calidad está demostrada y una persona identificada lo decide.',
      filas: [
        [
          'Solo lectura',
          'Acceso de lectura por defecto; la escritura se habilita flujo por flujo cuando la calidad está probada',
        ],
        [
          'Permisos mínimos',
          'Cada agente tiene permisos enumerados y accede solo a las fuentes declaradas',
        ],
        ['Borradores', 'Las comunicaciones externas quedan como borrador; las envía una persona'],
        [
          'Registro',
          'Bitácora que no se puede editar ni borrar, con consultas, fuentes leídas y resultados',
        ],
        [
          'Autonomía',
          'Nivel de autonomía declarado por flujo, que solo sube por decisión explícita de una persona',
        ],
      ],
    },
    {
      tipo: 'grilla',
      etiqueta: 'Integración con las otras líneas',
      titulo: 'La misma infraestructura, aplicada a macrolotes y power centers',
      bajada:
        'Verity usa la agentización en su propia operación. Los agentes preparan el trabajo y el equipo decide.',
      items: [
        {
          rotulo: 'Macrolotes',
          titulo: 'Evaluación de terrenos',
          texto:
            'Lectura de certificados de informaciones previas, títulos y normativa, y una ficha comparable de cada terreno.',
        },
        {
          rotulo: 'Macrolotes',
          titulo: 'Seguimiento de permisos y ventas',
          texto:
            'Calendario de trámites, alertas de plazos y estado de la cartera de lotes y créditos.',
        },
        {
          rotulo: 'Power Center',
          titulo: 'Cabida y prefactibilidad',
          texto:
            'Primer cálculo de superficie arrendable, renta y caso de negocio a partir de los datos del terreno.',
        },
        {
          rotulo: 'Power Center',
          titulo: 'Gestión de contratos con retailers',
          texto:
            'Seguimiento de negociaciones, vencimientos, reajustes y cláusulas de cada contrato de arriendo.',
        },
        {
          rotulo: 'Ambas líneas',
          titulo: 'Reportes a inversionistas',
          texto:
            'Informes periódicos consolidados de avance físico, financiero y comercial de cada vehículo.',
        },
        {
          rotulo: 'Ambas líneas',
          titulo: 'Data room y due diligence',
          texto:
            'Orden, revisión y trazabilidad de la documentación para financistas y compradores.',
        },
      ],
    },
    {
      tipo: 'cifras',
      etiqueta: 'Trayectoria del equipo',
      items: [
        { valor: '70+', texto: 'años de experiencia combinada' },
        {
          valor: '40+',
          texto: 'empresas con IA y automatización implementadas',
        },
        { valor: '9', texto: 'países con operaciones' },
      ],
      nota: 'Cifras de la trayectoria de los integrantes del equipo antes de Cardus y Verity. No corresponden a resultados de clientes de la línea.',
    },
  ],
}

export const lineas = [macrolotes, powerCenter, agentizacion]

export function lineaDe(slug) {
  return lineas.find((l) => l.slug === slug)
}
