# Sitio Web ARS Invest — Plan de Implementación

**Goal:** Reconstruir arsinvest.cl como un sitio institucional multi-página (5 secciones + blog + 12 fichas de proyecto) que explique el negocio, respalde al equipo con antecedentes verificables y dirija cada consulta al contacto correcto — corrigiendo los hallazgos de la evaluación: 6 fichas apuntando a `test.local`, portada sin `<h1>`, mensaje mezclado con precios de viviendas, contenido de 2018-2019 vigente.

**Architecture:** SPA en React 19 + React Router 7, con pre-renderizado a HTML estático (patrón de `cardus-site/scripts/prerender.js`) para que cada ruta, ficha y artículo sea indexable sin depender de JS. Contenido de proyectos, equipo y artículos vive en `src/content/` como datos estructurados — actualizar una ficha no debe requerir tocar un componente.

**Tech Stack:** React 19, React Router DOM 7, Vite 7, Tailwind CSS 3.4, Lucide React. Sin GSAP ni Spline: la identidad es institucional, y el kit cinemático de `webguru-landing` no aplica aquí (ver `docs/brand-kit.md` §7).

**Identidad:** definida en **[docs/brand-kit.md](../brand-kit.md)** — paleta muestreada del logo real, contrastes WCAG calculados, voz y anti-posicionamiento. Es la fuente de verdad del diseño; este plan no repite sus decisiones.

**Nota sobre TDD:** sitio de contenido sin lógica de negocio compleja. Las dos piezas con lógica real —validación del formulario y filtrado de proyectos por estado— van con Vitest en red-green-refactor (Fase 4). El JSX de maquetación y los copys se verifican en navegador y con el build, no con tests de snapshot.

---

## Estado de los antecedentes — actualizado 22/09/2026

La revisión del sitio publicado resolvió casi todo lo que el PDF dejaba abierto. **Lo que ya tenemos** (ver `docs/brand-kit.md` §10 y `src/content/`):

- Identidad real: logo, azul `#004582`→`#0094C5`, wordmark gris `#545454`.
- Inventario completo: 4 proyectos en ejecución + 8 finalizados, con ubicación, escala y constructora.
- Equipo: Arturo Ready Salamé y Felipe Vergara Moll, con formación, trayectoria y contacto directo.
- Contacto: `patricia.corsi@arsinvest.cl`, +562 3204 0826, Av. José Alcalde Délano 10545 of. 310, Los Trapenses.
- Denominación de vehículos: SpA con nombre propio (*Fondo Proyección Radal VII SpA*, etc.).
- Constructoras socias: Constructora ES, CBE, Grupo Hexxa, Inmobiliaria Perseverancia.

### Lo que sigue abierto — bloquea publicación, no desarrollo

| # | Ítem | Por qué importa |
|---|---|---|
| 1 | **Cifras de trayectoria** | USD 280M en ventas, 11 fondos, USD 25M EBITDA son de **la carrera de Arturo en banca**, no de ARS Invest como firma. Publicarlas como logro de ARS es precisamente la cifra indefendible que la evaluación pide evitar. Hay que decidir: atribuirlas a su biografía personal (correcto) o conseguir las cifras de la firma. |
| 2 | **Patricia Corsi vs. Patricia Grossi** | El sitio dice `patricia.corsi@arsinvest.cl`; la propuesta dice "Gmail de Patricia **Grossi**". Un apellido está mal y el formulario no puede apuntar a una casilla no confirmada. |
| 3 | **Zapallar (5 casas) y Frutillar** | Mencionados en reunión, no publicados. Sin antecedentes no se maquetan. |
| 4 | **Las 2 incorporaciones al equipo** | Nombres, cargos, bios y fotos. |
| 5 | **Logo vectorial** | Solo hay un PNG de 2018 a 1426px. Para retina y favicon hace falta SVG. |
| 6 | **Fechas de los finalizados** | Ninguna ficha publicada tiene fecha de entrega, y la etiqueta de estado de la marca exige fecha. |
| 7 | **Fotografías autorizadas** | Las actuales son de baja resolución y uso no confirmado. |
| 8 | **Acceso a dominio/hosting y medición** | Para desplegar y medir. |

Se construye con lo verificado; lo pendiente se marca en `docs/pendientes-validacion.md` y se resuelve antes de publicar.

---

## Fase 1 — Scaffold y sistema de diseño

### 1.1 Crear el proyecto
```bash
cd "c:\Users\alfre\OneDrive\Escritorio\ANTIGRAVITY PROJECTS\Websites upgraders"
npm create vite@latest ars-invest-site -- --template react
cd ars-invest-site
npm install react-router-dom@^7 lucide-react
npm install -D tailwindcss@^3.4.17 postcss autoprefixer vitest @testing-library/react @testing-library/jest-dom jsdom
npx tailwindcss init -p
```
`ars-invest-site/docs/` ya existe con el plan y el brand kit — no debe sobrescribirse.

**Verificación:** `npm run dev` levanta en `localhost:5173`.

### 1.2 Tokens en `tailwind.config.js`
Transcribir los tokens de `docs/brand-kit.md` §9 tal cual. Nada de inventar variantes nuevas: si falta un tono, se agrega primero al brand kit.

### 1.3 Fuentes en `index.html`
Archivo (600) para titulares, Inter (400/600) para texto. Ambas de Google Fonts, con `display=swap` y `preconnect`.

### 1.4 Estructura de carpetas
```
src/
  components/  Navbar · Footer · Hero · CifrasTrayectoria · ComoTrabajamos
               ProyectosDestacados · ProyectoCard · EtiquetaEstado · EquipoGrid
               ArticuloCard · FormularioContacto · Seo
  pages/       Inicio · QuienesSomos · Proyectos · ProyectoDetalle
               Actualidad · ArticuloDetalle · Contacto · NoEncontrado
  content/     proyectos.js · equipo.js · contacto.js · faq.js · articulos/
  App.jsx · main.jsx · entry-server.jsx · index.css
scripts/       prerender.js
api/           contacto.js
```

`EtiquetaEstado.jsx` implementa el elemento firma del brand kit (§5) — estado + fecha de corte. Se usa en fichas, tarjetas y cifras.

**Commit:** `feat: scaffold con Vite, Tailwind y tokens de marca ARS Invest`

---

## Fase 2 — Navegación y layout

### 2.1 Router (`src/App.jsx`)
| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/quienes-somos` | QuienesSomos |
| `/proyectos` | Proyectos (listado único con filtro de estado) |
| `/proyectos/:slug` | ProyectoDetalle (12 fichas) |
| `/actualidad-inmobiliaria` | Actualidad |
| `/actualidad-inmobiliaria/:slug` | ArticuloDetalle (4 artículos) |
| `/contacto` | Contacto |
| `*` | NoEncontrado |

Sin `/como-invertir`: se retira del menú por instrucción del PDF; su contenido útil se reubica en Cómo trabajamos y FAQ. **Redirección 301** de la ruta vieja a `/#como-trabajamos` para no perder lo indexado.

### 2.2 Navbar
Blanco, fijo, sombra sutil al hacer scroll. Logo a la izquierda; enlaces Inicio · Quiénes somos · Proyectos · Actualidad inmobiliaria; botón azul "Conversemos sobre inversión" a la derecha. Hamburguesa bajo 768px.

### 2.3 Footer
`azul-900`. Marca y bajada, navegación, contacto verificado, aviso legal. Sin indicadores de "sistema operativo" — no aplica.

**Verificación:** recorrer las 8 rutas; `grep -r "test.local" src/` vacío.

**Commit:** `feat: navegación, navbar y footer institucionales`

---

## Fase 3 — Contenido estructurado

### 3.1 `src/content/proyectos.js`
Doce fichas con esquema idéntico: `slug, nombre, estado, fechaEstado, ubicacion, comuna, escala, unidades, descripcion, participantes[], rolARS, vehiculo, fotos[]`.

**En ejecución (4):**
| Proyecto | Ubicación | Escala | Constructora |
|---|---|---|---|
| Villa Alegre 1 y 2 | Sierra Gorda | 66 viviendas, 3 dorm., 64 m², 6 manzanas, construcción industrializada | Constructora ES |
| Playa Quintero | Quintero, Baquedano–Luis Cousiño | 2 torres de 12 pisos, 288 deptos + 4 locales, a 300 m del borde costero | CBE |
| Vista Vergara | 18 Norte 1480, Viña del Mar | 120 familias | CBE |
| Bahía Las Palmas 1, 2 y 3 | Río San Pedro, Forestal, Viña del Mar | 432 familias, 3 torres de 12 pisos | CBE |

**Finalizados (8):** Portal de Torrent · Ankara (Concepción) · Edificio Don Manuel · Altos de Rumié (Villa Alemana) · Edificio Rivne · Edificio Odesa · Edificio Elena · Edificio Borgetto (299 deptos, 20 pisos). Vehículos: Fondo Proyección Quinta Norte / Poeta Pedro Prado / Poeta Pedro Prado VI / Vespucio V / Radal VII SpA.

Las 12 fichas viven en rutas propias bajo `/proyectos/:slug`. **Ninguna apunta a `test.local`** — ese era el hallazgo de corrección inmediata.

### 3.2 `src/content/equipo.js`
Arturo y Felipe con formación, trayectoria y contacto directo verificados. Las cifras grandes se atribuyen explícitamente a la carrera de Arturo (pendiente #1), con la etiqueta de alcance del brand kit — no como logro institucional de ARS.

### 3.3 `src/content/contacto.js`
Correo, teléfono y una sola dirección, reutilizada en texto y mapa. El hallazgo era justamente que texto y mapa mostraban oficinas distintas: un solo dato, una sola fuente.

**Commit:** `feat: contenido estructurado de proyectos, equipo y contacto`

---

## Fase 4 — Páginas

### 4.1 Inicio
Orden exacto del PDF: mensaje principal → trayectoria → cómo trabajamos → proyectos destacados → equipo → artículos → cierre de contacto.

**Hero — copy aprobado por el cliente, textual:**
```
H1  Estructuramos inversiones para desarrollar
    proyectos inmobiliarios en Chile.

    Participamos desde la evaluación del terreno y la estructuración del
    proyecto hasta su construcción, comercialización y distribución de
    resultados, según las condiciones de cada inversión.

    [Conoce nuestros proyectos] → /proyectos
    [Conversemos sobre inversión] → /contacto
```
Un solo `<h1>`. **Ningún precio de vivienda** — se elimina "De 1.000 a 2900 UF" y la segmentación B-C1/C2/C3 del comprador final (brand kit §2, anti-posicionamiento 1).

**Cómo trabajamos:** los siete pasos reales — estudio de terrenos → selección de socios constructores → estructuración → revisión de costos → coadministración y cofirma → seguimiento bancario por hitos → cierre y distribución. Línea de tiempo horizontal en desktop, vertical en móvil.

### 4.2 Quiénes somos
Visión ("Ser una gran plataforma de inversión en la industria inmobiliaria para nuestra red de socios"), forma de trabajo —Directa, Simple, Comprometida, con el texto real de cada una—, equipo y modelo de gestión.

### 4.3 Proyectos + ficha
Listado único con filtro En ejecución / Finalizado. Cada tarjeta con `EtiquetaEstado` fechada. Ficha con la estructura tabular fija del brand kit §7.

### 4.4 Actualidad inmobiliaria
Índice + plantilla. Los 4 artículos con los H2 que el cliente ya definió:
1. **Inversión en desarrollo inmobiliario en Chile: cómo se estructura un proyecto** — vehículos; etapas; responsabilidades; formación y distribución de resultados.
2. **DS49 y desarrollo de proyectos habitacionales en Chile** — contexto; actores; etapas; relación con el desarrollo.
3. **DS10: desarrollo de proyectos de habitabilidad rural** — contexto; características; terreno, infraestructura y ejecución.
4. **DS19: integración social y participación privada** — funcionamiento; participantes; desarrollo, comercialización y seguimiento.

DS49/DS10/DS19 se redactan **verificando contra MINVU/SERVIU**, con fuentes citadas. Usar el skill `seo-content-writer`.

### 4.5 Contacto
Campos: nombre, correo, teléfono (opcional), motivo (inversionista · propietario de terreno · constructora · otra consulta), mensaje.

**Commit por página.**

---

## Fase 5 — Lógica con test

1. **RED** `src/components/FormularioContacto.test.jsx` → `validar()` exige nombre, correo y motivo; teléfono opcional. Falla.
2. **GREEN** implementar `validar()` (patrón de `cardus-site/src/components/FormularioContacto.jsx`).
3. **RED/GREEN** `filtrarProyectos(proyectos, estado)`.
4. **`api/contacto.js`** — serverless Vercel, SMTP directo. Sin GHL: el PDF excluye CRM de esta etapa, y el patrón de webhook queda disponible para la fase 2.
   ```
   SMTP_USER / SMTP_PASS     # App Password sin espacios
   CONTACTO_DESTINO          # casilla de Patricia, pendiente #2
   ```
   Dos correos, con versión texto plano: aviso interno y acuse al visitante.

**Commit:** `feat: validación y filtrado con cobertura de test`

---

## Fase 6 — SEO, prerender y medición

- `Seo.jsx`: title, description, canonical y `og:*` por ruta, con `VITE_SITIO` como base.
- Prerender de las 8 rutas + 12 fichas + 4 artículos (adaptar `cardus-site/scripts/prerender.js`).
- `sitemap.xml` y `robots.txt` generados en el mismo script.
- Redirecciones 301 de las rutas viejas (`/proyectos-en-ejecucion/`, `/proyectos-finalizados/`, `/vision/`, `/como-invertir`) a las nuevas.
- Medición: visitas, clics de contacto, formularios enviados.

**Verificación:** `npm run build`; cada `dist/<ruta>/index.html` con un solo `<h1>` y meta description; `grep -r "test.local" dist/` vacío.

**Commit:** `feat: SEO técnico, prerender y redirecciones`

---

## Fase 7 — Revisión antes de publicar

- [ ] Todos los enlaces abren el destino correcto; cero `test.local`.
- [ ] Proyectos, equipo y cifras validados por ARS; todo estado con fecha.
- [ ] Formulario probado con envío real a la casilla acordada, con confirmación visible.
- [ ] Navegación y formularios en 375px; textos e imágenes legibles.
- [ ] Lighthouse ≥ 90 en Performance, SEO y Accesibilidad.
- [ ] Los 8 pendientes de validación cerrados o explícitamente diferidos por ARS.

---

## Fuera de alcance

CRM, pipeline, asistente virtual, automatizaciones y paneles. Se definen después del lanzamiento, según volumen real de consultas.
