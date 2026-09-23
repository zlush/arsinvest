/**
 * Equipo. Fuente: arsinvest.cl/vision/, revisado el 22/09/2026.
 *
 * Las cifras grandes (11 fondos, USD 280M en ventas) son de la carrera de
 * Arturo en banca e inversión, NO resultados de ARS Invest como firma.
 * Por eso viven dentro de su biografía y no en un contador de portada:
 * publicarlas como logro institucional es exactamente la cifra indefendible
 * que la evaluación pidió evitar. Pendiente #1.
 */

export const equipo = [
  {
    slug: 'arturo-ready-salame',
    nombre: 'Arturo Ready Salamé',
    cargo: 'Fundador y accionista mayoritario',
    foto: '/img/equipo/arturo.png',
    formacion: 'Ingeniero Comercial · Formación internacional en Londres y Madrid',
    bio: 'Más de treinta años en banca, inversión y desarrollo inmobiliario. Desarrolló su carrera en Banco Santander, en banca privada, riesgo y financiamiento corporativo.',
    trayectoria: [
      { cifra: '11', unidad: 'fondos inmobiliarios administrados' },
      { cifra: 'USD 280M', unidad: 'en ventas acumuladas' },
      { cifra: 'USD 25M', unidad: 'de EBITDA consolidado' },
    ],
    correo: 'arturo@arsinvest.cl',
    telefono: '+56 9 4253 4825',
  },
  {
    slug: 'felipe-vergara-moll',
    nombre: 'Felipe Vergara Moll',
    cargo: 'Socio',
    foto: '/img/equipo/felipe.png',
    formacion:
      'Ingeniero Comercial, Universidad Diego Portales · Máster en Dirección Financiera, Universidad Adolfo Ibáñez',
    bio: 'Más de treinta años en el sector financiero, especializado en inversiones, tesorería y mesa de dinero. Ha trabajado en Tanner Servicios Financieros, Banco BCI, Banmerchant Capital y Banco Santander.',
    trayectoria: [],
    correo: 'felipe@arsinvest.cl',
    telefono: '+56 9 9324 6580',
  },
]

/** Alcance y fecha de corte de toda cifra publicada. Brand kit §2. */
export const alcanceTrayectoria =
  'Cifras correspondientes a la trayectoria profesional de Arturo Ready Salamé en banca e inversión inmobiliaria, previa y paralela a ARS Invest. Alcance y fecha de corte en validación con la firma.'
