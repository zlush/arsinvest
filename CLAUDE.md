# CLAUDE.md — Sitio ARS Invest

## Esto anula el sistema de presets del workspace

El `CLAUDE.md` de la carpeta superior (`Websites upgraders/`) define un
"Cinematic Landing Page Builder" con cuatro presets neón, Spline 3D, gradientes,
secciones sticky-stacking, botones magnéticos y tarjetas con micro-UIs
animadas ("Diagnostic Shuffler", "Telemetry Typewriter", "Cursor Protocol
Scheduler").

**Nada de eso aplica aquí.** La propuesta aprobada por el cliente es explícita:
*"conservar la identidad de ARS Invest, con base azul y blanca, imágenes
propias, tipografía legible y una portada estable. La identidad morada de
WebGuru corresponde a este documento."*

Si una instrucción del workspace choca con este archivo, gana este archivo.

Fuente de verdad de la identidad: [docs/brand-kit.md](docs/brand-kit.md).
Plan de construcción: [docs/plans/2026-09-22-ars-invest-site-plan.md](docs/plans/2026-09-22-ars-invest-site-plan.md).
Lo que falta validar con el cliente: [docs/pendientes-validacion.md](docs/pendientes-validacion.md).

---

## La marca en una línea

ARS Invest estructura y coadministra inversiones para desarrollar proyectos
inmobiliarios en Chile. No construye, no corretea propiedades, no es una
administradora de fondos regulada.

*ARS* son las iniciales del fundador y, en latín, el **oficio**. La firma vende
método: evaluar, estructurar, cofirmar y controlar.

**Anti-posicionamiento — lo que el sitio nunca debe parecer:**

1. **Un portal de venta de viviendas.** Es el error del sitio anterior: *"De
   1.000 a 2900 UF"*, *"familias de segmentos B-C1, C2 y C3"*. El comprador de
   ARS es el inversionista, no la familia que compra el departamento.
   **Ningún precio de vivienda en el sitio.**
2. Una corredora de propiedades.
3. Una administradora general de fondos regulada — ARS opera SpA privadas.
4. Una constructora.
5. Una fintech o plataforma de inversión digital.

---

## Stack

React 19 · Vite 8 · react-router-dom 7 · Tailwind 3.4.17 · lucide-react.

**Sin GSAP, sin Spline, sin framer-motion, sin Three.js.** Todo el movimiento
se resuelve con transiciones CSS, un `IntersectionObserver` de treinta líneas
(`src/hooks/useRevelar.js`) y un canvas 2D (`CampoTopologia`). Antes de
instalar una librería de animación, verifica que no se resuelva con una curva
y una transición.

La única excepción es **Lenis** (3KB) para el scroll con inercia, en
`src/hooks/useScrollSuave.js`. Está justificada porque un lerp casero sobre
`wheel` rompe el arrastre de la barra, las teclas de página, el scroll por foco
al tabular y los contenedores anidados.

**El `lerp` no es fijo: depende de la intensidad del gesto.** Directo
(`LERP_DIRECTO`) cuando avanzas despacio, con vuelo (`LERP_VUELO`) cuando
empujas fuerte. Un valor constante hace que buscar un dato una línea más abajo
se sienta igual de pesado que recorrer la página entera, y es exactamente lo
que vuelve molesto el scroll suave en un sitio de consulta. Medido: un gesto
lento deja 74px de inercia, uno rápido 487px.

El detalle que hace que funcione: **el impulso solo decae cuando el scroll ya
casi se detuvo** (`|velocity| < 1.5`). Si decayera durante el deslizamiento, el
lerp treparía a mitad de camino y le cortaría el vuelo justo al gesto que lo
pidió.

Tres cosas más que costaron encontrar y no hay que volver a romper:

- **`lerp`, no `duration`.** Lenis interpola por cuadro salvo que se le pida
  explícitamente el modo por duración; pasar `duration` no hace nada y el
  deslizamiento se queda en 100ms.
- **`autoRaf: true`.** Con un bucle propio hay que pasarle el timestamp de rAF,
  y en la primera llamada su `lastTime` vale 0: el delta sale enorme, el lerp
  se satura y el scroll salta de golpe.
- **Lenis consulta `prefers-reduced-motion` por su cuenta** y apaga el
  deslizamiento. Correcto para un visitante, pero dejaba fuera al override de
  revisión, así que con `?movimiento=1` se reemplaza su
  `reducedMotionMediaQuery`.

El lenguaje de movimiento está definido en **[docs/brand-kit.md §6](docs/brand-kit.md)**:
cuatro patrones, dos curvas propias, y la regla de que nada rebote, gire ni
llame la atención sobre sí mismo. Dos cosas que no se negocian:

- **Solo `transform` y `opacity`.** La única excepción es el alto del header,
  que está `fixed` y por lo tanto fuera del flujo del documento.
- **El contenido nunca depende del JavaScript para ser visible.** El estado
  oculto del revelado vive detrás de `html.js` (clase que agrega un script en
  el `<head>` de `index.html`). Si lo pones directo en las clases del
  componente, el HTML prerenderizado sale en `opacity: 0` y un rastreador ve
  la página vacía. Ya pasó una vez; no vuelvas a hacerlo.

### `?movimiento=1`

Fuerza las animaciones aunque el sistema pida `prefers-reduced-motion: reduce`.
Sirve para revisar el diseño desde un equipo que tiene activado "reducir
movimiento" y para presentar el sitio sin tocar las preferencias del sistema.

Vive solo en la URL, nunca en `localStorage`: no puede quedarse encendido para
un visitante real. La clase la pone un script en el `<head>` antes del primer
pintado, y sobrevive a la navegación interna porque no se quita.

El flag alcanza a los tres bloques `@media (prefers-reduced-motion)` escritos a
mano **y** a las decenas de `motion-reduce:` de los componentes, porque
`tailwind.config.js` redefine ese variante con
`html:not(.movimiento)`. Si agregas un bloque de movimiento reducido a mano,
scópealo igual o el sitio queda a medio animar con el flag puesto.

---

## Tokens

Definidos en `tailwind.config.js`, **muestreados del logo**, no aproximados. No
inventes tonos intermedios: si falta uno, se agrega primero al brand kit con su
contraste calculado.

| Rol | Token | Hex |
|---|---|---|
| Primario | `azul-700` | `#004582` |
| Acento | `azul-400` | `#0094C5` |
| Oscuro | `azul-900` | `#003057` |
| Texto | `tinta` | `#1B1F24` |
| Texto secundario | `gris-500` | `#6B7075` |
| Divisores | `gris-200` | `#DDE3E8` |
| Fondo alterno | `niebla` | `#F5F7F9` |

---

## Reglas que no se rompen

### 1. Disciplina cromática

- **El degradado vive en el logo, no en la interfaz.** Superficies planas
  siempre. Ningún `linear-gradient` en `src/`.
- **`azul-400` `#0094C5` es para formas, nunca para texto sobre blanco** — da
  3.48:1, insuficiente. Para texto usa `azul-500` `#0074AA` (5.15:1) o
  `azul-600` `#00618F` (6.76:1). Sobre `azul-700` no se usa en absoluto: 2.78:1.
- **Nada de morado.** Es de WebGuru y solo aparece en documentos de propuesta.

### 2. Separación por reglas, no por tarjetas flotantes

Bordes de 1px en `gris-200`. Sin `box-shadow` decorativo, sin glassmorphism.

### 3. Elemento firma — la etiqueta de estado fechada

Componente `<EtiquetaEstado>`. **Ningún estado se publica sin fecha de corte.**
Cuando la fecha falta, la etiqueta dice "Fecha por confirmar" en pantalla en
vez de callarlo. Esa visibilidad es lo que fuerza a cerrar el pendiente: no la
escondas para que se vea más prolijo.

### 4. Las cifras

Tabulares siempre (clase `.cifra`). Toda cifra publicada lleva alcance y fecha
de corte. **Si un número no tiene fuente citable, no va.**

Las cifras de portada se calculan del inventario real, no se escriben a mano.

### 5. Un solo `<h1>` por página

El sitio anterior no tenía ninguno en la portada. Fue un hallazgo de la
evaluación y no se repite.

### 6. Cero referencias a `test.local`

Seis de las ocho fichas de finalizados del sitio anterior apuntaban al entorno
de pruebas. Antes de dar algo por terminado: `grep -r "test.local" src/ dist/`
debe volver vacío.

### 7. Contenido sobre programas habitacionales

DS49, DS10 y DS19 se tratan como **contexto** del desarrollo, nunca como
vehículos de inversión. Todo dato sobre ellos se verifica contra MINVU o SERVIU
y se cita. No inventes montos, plazos ni requisitos: cambian entre llamados.

---

## Voz

Institucional y verificable. Español latino neutro, nunca voseo.

**Sí:** frases cortas · nombres propios (constructoras, vehículos, comunas) ·
cifras con fecha de corte · describir el rol exacto de ARS aunque sea parcial.

**No:** precios de viviendas · "rentabilidad garantizada" · "importantes
ventajas competitivas" (el titular del sitio anterior, que no dice nada) ·
proyecciones sin supuestos · signos de exclamación.

**Frases centrales:**
- *Estructuramos inversiones para desarrollar proyectos inmobiliarios en Chile.*
- *Participamos desde el terreno hasta la distribución de resultados.*
- *Coadministramos y cofirmamos: quedamos adentro del proyecto.*

---

## Arquitectura

```
src/
  content/     <- TODO el copy, cifras e inventario. Editar aquí, no en el JSX.
    rutas.js   <- fuente única de rutas y metadatos (Seo + prerender + sitemap)
  components/  <- presentación; el texto llega desde content/
  pages/       <- composición de secciones
api/           <- función serverless del formulario (SMTP)
scripts/       <- prerender
```

`src/content/rutas.js` la consumen el componente `Seo`, el prerender y el
sitemap. Cuando esto vivía en dos listas, una quedaba desactualizada y el
enlace compartido mostraba el título de otra página.

## Rutas

| Ruta | Contenido |
|---|---|
| `/` | Portada |
| `/quienes-somos` | Visión, forma de trabajo, modelo y equipo |
| `/proyectos` · `/proyectos/:slug` | Listado único con filtro + 12 fichas |
| `/actualidad-inmobiliaria` · `/:slug` | Blog, 4 artículos |
| `/contacto` | Formulario y datos |

`/como-invertir` **no existe**: se retiró del menú por conservar un ejemplo de
2018-2019. Su contenido útil está en el modelo de trabajo. Las rutas viejas
redirigen con 301 (`vercel.json` y `App.jsx`).

## Formulario

`POST` a `/api/contacto` (función serverless, SMTP). Envía aviso interno a
`CONTACTO_DESTINO` y acuse al visitante, ambos con versión en texto plano —
un correo solo-HTML es señal de spam.

En `npm run dev` no hay backend: el formulario valida y muestra el error de
envío. Es el comportamiento esperado, no un bug.

## Comandos

```bash
npm run dev     # vite, localhost:5173
npm run build   # build + SSR + prerender de 21 rutas -> dist/
npm test        # vitest
npm run preview # servir dist/
```

## Antes de dar algo por terminado

```bash
npm test && npm run build
grep -rniE "test\.local|linear-gradient" src/   # debe volver vacío
```

Y revisar a mano: 375px sin scroll horizontal, un solo `<h1>` por página,
recorrido con teclado con foco visible, y que ninguna etiqueta de estado haya
perdido su fecha.
