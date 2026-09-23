# Brand Kit — ARS Invest

Estructuración de inversiones para desarrollo inmobiliario en Chile.

Los colores de este documento están **muestreados directamente del logo** (`ars_logo.png`, 1426×304), no aproximados. Los ratios de contraste están **calculados**, no estimados.

---

## 1. El nombre y la marca

**ARS** son las iniciales del fundador, Arturo Ready Salamé. Pero *ars* es también, en latín, el **oficio**: la técnica aprendida, el método aplicado. No el talento ni la suerte — la destreza que se ejerce.

Las dos lecturas sirven, y la segunda es la que se defiende en público:

> **ARS es el oficio de estructurar.**

Es exacto. ARS Invest no compra terrenos ni levanta muros: evalúa, estructura, cofirma y supervisa. Lo que aporta es método, y el método es el producto.

**El símbolo** — dos formas geométricas entrelazadas en degradado azul. Léelo como lo que la firma hace: **dos partes que se traban**. El capital del inversionista y la capacidad del constructor, unidos en una estructura que ninguno de los dos sostiene solo. No es un edificio estilizado ni una flecha de crecimiento: es un ensamblaje.

**Uso del nombre:** *ARS Invest*. ARS siempre en mayúsculas (son iniciales), *Invest* en capitalización normal. Nunca "Ars Invest", nunca "ARS INVEST" en cuerpo de texto. La bajada del logo —*Inversiones inmobiliarias*— se mantiene en el logotipo, pero **no** describe el negocio en la web: el negocio es estructurar inversiones para desarrollo, que no es lo mismo que vender inmuebles.

---

## 2. Posicionamiento

**Categoría:** estructuración y coadministración de vehículos de inversión para desarrollo inmobiliario privado en Chile.

**Tesis:** el inversionista que quiere exposición a desarrollo inmobiliario rara vez tiene el tiempo, la red de constructores ni el control de costos para tomarla directamente. ARS es esa capacidad, prestada y firmada.

**Promesa:** participación en el desarrollo completo —evaluación del terreno, estructuración, construcción, comercialización y distribución de resultados— con un administrador que cofirma.

**Diferenciador:** la cofirma y el seguimiento bancario por hitos. No es un fondo al que se le entrega dinero, ni un corretaje que presenta una oportunidad y desaparece. ARS queda adentro del proyecto.

**Prueba, no adjetivos.** La credibilidad de esta marca es numérica y nominal: 11 fondos inmobiliarios administrados, USD 280 millones en ventas acumuladas, vehículos con nombre propio (*Fondo Proyección Radal VII SpA*), constructoras con nombre propio (Constructora ES, CBE). Toda cifra publicada lleva alcance y fecha de corte. Una cifra sin fecha es una cifra que no se puede defender en una reunión.

### Anti-posicionamiento — lo que esta marca nunca debe parecer

1. **Un portal de venta de viviendas.** Es el error dominante del sitio actual: *"De 1.000 a 2900 UF"*, *"departamentos o casas para familias de segmentos B-C1, C2 y C3"*. Ese es el lenguaje de quien le vende un departamento a una familia. El comprador de ARS es el inversionista; la familia compradora está al final de la cadena, no al otro lado de la mesa. **Ningún precio de vivienda en la portada.**
2. Una corredora de propiedades.
3. Una administradora general de fondos regulada — ARS opera vehículos SpA privados, y decir "fondo" a la ligera invita una comparación regulatoria que no corresponde.
4. Una constructora. ARS selecciona y supervisa constructores; no construye.
5. Una fintech o plataforma de inversión digital. Nada de "invierte desde tu celular".

---

## 3. Paleta

### Colores de marca (muestreados del logo)

| Rol | Nombre | Hex | RGB |
|---|---|---|---|
| Primario | Azul estructura | `#004582` | 0, 69, 130 |
| Acento | Azul señal | `#0094C5` | 0, 148, 197 |
| Texto de marca | Grafito | `#545454` | 84, 84, 84 |
| Fondo | Blanco | `#FFFFFF` | 255, 255, 255 |

El degradado del símbolo va de `#004582` a `#0094C5`. **Ese degradado pertenece al logo y solo al logo** (ver reglas de disciplina).

### Escala de azul

| Token | Hex | Uso |
|---|---|---|
| `azul-900` | `#003057` | Pie de página, superficies oscuras profundas |
| `azul-700` | `#004582` | **Color de marca.** Titulares, superficies, botón primario |
| `azul-600` | `#00618F` | Texto de enlace sobre blanco (6.76:1) |
| `azul-500` | `#0074AA` | Hover de enlace, texto sobre blanco en tamaño pequeño (5.15:1) |
| `azul-400` | `#0094C5` | **Acento de marca.** Formas, reglas, íconos, estado activo |
| `azul-100` | `#E3F1F8` | Fondos de bloque, resaltado de fila, etiquetas |

### Neutros

| Token | Hex | Uso |
|---|---|---|
| `tinta` | `#1B1F24` | Texto principal (16.56:1) |
| `grafito` | `#545454` | Wordmark, texto secundario fuerte (7.57:1) |
| `gris-500` | `#6B7075` | Texto secundario, etiquetas, metadatos (5.00:1) |
| `gris-200` | `#DDE3E8` | Divisores, bordes de tabla y tarjeta |
| `niebla` | `#F5F7F9` | Fondo de sección alterna |
| `blanco` | `#FFFFFF` | Fondo principal, superficies |

### Estado de proyecto

Los estados no son decoración: son el compromiso de honestidad del sitio.

| Token | Hex | Uso |
|---|---|---|
| `en-ejecucion` | `#0094C5` | Proyecto activo — azul señal, es el estado vivo de la marca |
| `finalizado` | `#2E7D5B` | Proyecto entregado y cerrado (5.00:1) |
| `alerta` | `#B4452F` | Errores de formulario, validaciones (5.48:1) |

### Reglas de disciplina cromática

1. **El degradado vive en el logo, no en la interfaz.** Las superficies son planas. Ningún fondo, botón ni tarjeta lleva `linear-gradient`. El símbolo ya hace ese trabajo, y repetirlo lo abarata.
2. **El azul señal `#0094C5` es para formas, no para texto.** 3.48:1 sobre blanco no alcanza. Cuando necesites una palabra en azul brillante sobre blanco, usa `azul-500` `#0074AA` o más oscuro.
3. **Un solo azul por superficie.** Azul estructura para fondos oscuros y titulares; azul señal para el elemento que debe capturar el ojo. Si en una sección compiten dos azules por la atención, uno sobra.
4. **Nada de morado.** El morado es de WebGuru y aparece solo en documentos de propuesta. En el sitio de ARS es un color ajeno.

### Accesibilidad — contrastes verificados

| Combinación | Ratio | Veredicto |
|---|---|---|
| Azul estructura `#004582` sobre blanco | 9.66:1 | AAA |
| Blanco sobre azul estructura | 9.66:1 | AAA — texto invertido |
| Blanco sobre azul-900 `#003057` | 13.46:1 | AAA |
| Tinta `#1B1F24` sobre blanco | 16.56:1 | AAA |
| Grafito `#545454` sobre blanco | 7.57:1 | AAA |
| Gris-500 `#6B7075` sobre blanco | 5.00:1 | AA |
| Azul-600 `#00618F` sobre blanco | 6.76:1 | AA |
| Azul-500 `#0074AA` sobre blanco | 5.15:1 | AA |
| Finalizado `#2E7D5B` sobre blanco | 5.00:1 | AA |
| **Azul señal `#0094C5` sobre blanco** | **3.48:1** | **Solo formas o texto ≥24px** |
| **Azul señal sobre azul estructura** | **2.78:1** | **Nunca — ni siquiera en grande** |

**Regla crítica:** el azul señal nunca lleva texto encima ni se usa como texto pequeño. Sobre azul estructura no se usa en absoluto: la combinación que el logo resuelve con un degradado no funciona como texto plano.

---

## 4. Tipografía

| Rol | Fuente | Notas |
|---|---|---|
| Titulares | **Archivo** | Grotesca ancha y sólida. Es la que más se acerca al wordmark del logo sin imitarlo. Institucional, no corporativa genérica. |
| Texto | **Inter** | Neutra, excelente en pantalla, cifras tabulares nativas. Cuerpo, párrafos, formularios. |
| Etiquetas y cifras | **Inter** con `font-variant-numeric: tabular-nums` | Estados, fechas, UF, m², unidades. |

Ambas gratuitas en Google Fonts. **No se usa una serif dramática** (Playfair, Instrument Serif, Cormorant): lee a editorial de lujo o a viña, y el registro correcto aquí es el de una firma que administra dinero ajeno.

### Escala web

| Nivel | Tamaño | Peso | Tracking |
|---|---|---|---|
| H1 | 40–56px | 600 | −2% |
| H2 | 28–34px | 600 | −1% |
| H3 | 20–22px | 600 | 0 |
| Cuerpo | 17–18px | 400 | 0 / interlínea 1.65 |
| Etiqueta | 12–13px | 600 | +8% / mayúsculas |
| Cifra destacada | 32–44px | 600 | tabular-nums |

**Un solo `<h1>` por página.** El sitio actual no tiene ninguno en la portada; es uno de los hallazgos de la evaluación y no se repite.

**Las cifras van en tabulares siempre.** Cuando una ficha dice 288 departamentos y la de al lado dice 66 viviendas, las columnas tienen que alinearse. Es la diferencia entre un inventario y un folleto.

---

## 5. Elemento firma — la etiqueta de estado fechada

El recurso recurrente de la identidad, y el que carga su compromiso público: **ningún estado se publica sin fecha de corte.**

```
▪ EN EJECUCIÓN · ACTUALIZADO 09 · 2026
▪ FINALIZADO · ENTREGADO 2021
▪ TRAYECTORIA A SEPTIEMBRE 2026
▪ ROL DE ARS · ESTRUCTURACIÓN Y COFIRMA
```

**Especificación:** cuadrado de 8px en el color del estado (`en-ejecucion` o `finalizado`), espacio de 10px, texto en Inter 12px mayúsculas, peso 600, tracking +8%, color `gris-500`. La palabra del estado va en el color del estado; la fecha siempre en `gris-500`.

**Dónde aparece:** etiqueta de cada tarjeta y ficha de proyecto, eyebrow de sección, encabezado de las cifras de trayectoria, pie de los artículos del blog.

Es el recurso expresivo de la identidad, y además obliga a decir la verdad sobre cuándo se miró el dato.

---

## 6. Movimiento

El movimiento aquí no decora: da peso. Una firma que administra dinero ajeno no puede leerse como una landing de producto, pero tampoco como un PDF. La regla es que **nada rebote, nada gire y nada llame la atención sobre sí mismo**.

### Curvas

Ninguna transición usa `linear` ni `ease-in-out`: ningún objeto físico se mueve así, y es lo que delata una interfaz sin trabajar.

| Token | Curva | Para qué |
|---|---|---|
| `ease-salida` | `cubic-bezier(0.22, 1, 0.36, 1)` | Revelados y entradas. Arranca rápido y frena largo. |
| `ease-suave` | `cubic-bezier(0.32, 0.72, 0, 1)` | Cambios de estado: hover, header, overlays. |
| `ease-resorte` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro-rebote, solo en elementos de menos de 40px. |

### Los cinco patrones, y ninguno más

1. **Revelado al entrar** — `opacity 0→1` y `translateY(24px→0)` en 900ms. Escalonado de 70–120ms entre hermanos. Componente `<Revelar>`.
2. **Header contráctil** — la barra pasa de 6rem a 4.5rem, el logo baja a 0.88 de escala y aparece el filete inferior, todo en 700ms ligado al scroll.
3. **Indicador deslizante** — una sola pastilla recorre los enlaces del menú en 320ms y vuelve sola a la sección activa al soltar el cursor. Componente `<IndicadorNav>`. La regla es *una* pastilla que viaja, nunca un fondo por enlace que se prende y se apaga: el ojo sigue un objeto con continuidad, y eso es lo que lo hace leer como mecanismo y no como luces.
4. **Hover con masa** — la tarjeta sube 4px y gana un borde azul; la imagen escala a 1.06 en 1200ms; el disco de la flecha se desplaza en diagonal. Los botones se hunden a 0.98 al presionar.
5. **Subrayado que se dibuja** — los enlaces de texto trazan la línea de izquierda a derecha con `scaleX`, en vez de encenderla.

### Reglas duras

- **Solo `transform` y `opacity`.** Nada que dispare layout: ni `top`, ni `width`, ni `height`. Dos excepciones, ambas deliberadas y acotadas a un elemento que no arrastra a ningún hermano: el alto del header, que está `fixed` y por lo tanto fuera del flujo del documento, y el ancho de la pastilla del indicador, que está en `position:absolute` dentro del menú. En los dos casos la alternativa GPU-pura era `scaleX`, y sobre un `border-radius` completo deforma la curva en una elipse.
- **`backdrop-blur` solo en elementos fijos.** En contenido que se desplaza obliga al navegador a repintar en cada frame.
- **`prefers-reduced-motion` apaga todo.** No hay versión degradada: hay versión sin movimiento, y el contenido se sirve ya visible. **`?movimiento=1`** en la URL fuerza las animaciones aunque el sistema pida quietud; es para revisar y presentar el diseño, vive solo en la URL y nunca se guarda.
- **El contenido nunca depende del JavaScript para ser visible.** El estado oculto del revelado vive detrás de `html.js`, una clase que agrega un script en el `<head>`. Sin JavaScript —un rastreador, o un script que falla— la página se sirve completa. Marcar contenido en `opacity: 0` en el HTML estático es, además de frágil, algo que Google puede leer como texto oculto.

**Prohibidos:** parallax, scroll-scrubbing, secciones que se apilan con pin, contadores animados, máquinas de escribir, partículas, rotaciones, glassmorphism sobre contenido, degradados de fondo animados.

### Textura

Grano de película a `0.035` de opacidad, en un pseudo-elemento fijo sin eventos de puntero. Es lo único que impide que las superficies planas se lean como plástico. No es un degradado y no reemplaza a ninguno: el degradado sigue viviendo solo en el logo.

### El campo de topología del hero

Una esfera de 130 nodos conectados por aristas, que gira lentamente sobre `azul-900`. Componente `<CampoTopologia>`, canvas 2D.

Es el único lugar del sitio con fondo oscuro, y es deliberado: el campo solo se lee sobre oscuro. Va sobre `azul-900`, el azul más profundo de la paleta y el mismo del pie de página — **no sobre negro**, que no está en la marca.

**Reglas del campo:**

- **Nativo, nunca en iframe.** La referencia de la que salió venía como un `<iframe srcDoc>` que cargaba Three.js, Tailwind CDN e Iconify desde tres servidores distintos, y escondía adentro una landing falsa con métricas inventadas. Acá la geometría son cuarenta líneas de trigonometría: distribución de Fibonacci sobre la esfera, giro sobre Y, ladeo fijo y divisón por perspectiva. Sin iframe el hero sigue siendo visible para los buscadores, que es innegociable en este sitio.
- **Nodos en blanco, aristas en `azul-400`.** Nada más. La profundidad se comunica con opacidad y tamaño, no con colores nuevos.
- **Cada nodo pulsa con su velocidad y su fase.** Es la regla de abajo, aplicada: 130 osciladores independientes, ninguno sincronizado con otro.
- **El velo hacia la izquierda no es decoración.** El titular tiene que apoyarse sobre azul plano; sin el velo, las aristas cruzan por detrás del texto y le quitan legibilidad.
- **Se detiene fuera de pantalla.** Un `IntersectionObserver` corta el bucle cuando el hero sale del viewport: seguir pintando mientras alguien lee un artículo es quemar batería sin que nadie lo vea.
- **Con `prefers-reduced-motion` dibuja un cuadro y se queda ahí.** Quien pide quietud ve la topología compuesta, no un rectángulo vacío.

**Y la regla que más importa del movimiento en reposo:**

> **Nada se mueve al mismo tiempo que otra cosa.**

Una versión anterior de este hero animaba el grupo entero y sus piezas subían y bajaban como un bloque rígido. Se veía muerta. La razón es simple: un objeto que se desplaza completo no tiene vida; la tiene un conjunto cuyas partes no están sincronizadas.

Cómo se aplica al campo de topología, y cómo se aplica a cualquier cosa que se agregue después:

1. **Periodo y fase propios por pieza.** Los 130 nodos de la esfera pulsan cada uno con su velocidad y su desfase, sorteados al sembrarla. Ninguno coincide con otro.
2. **Si las piezas son pocas, los periodos no deben ser armónicos** — 11s, 9.4s, 12.6s, 8.2s… Sin múltiplo común, la composición no vuelve a alinearse nunca.
3. **Amplitud según la posición.** Lo que está más lejos del apoyo, o más cerca de la cámara, se mueve más.
4. **La profundidad se comunica con opacidad y tamaño**, no con colores nuevos: en el campo, un nodo del fondo es más chico y más tenue que el mismo nodo al frente.
5. **El paralaje también tiene gradiente.** Que todos los elementos respondan igual al cursor es lo que aplana el efecto.
6. **Un evento cada tanto vale más que movimiento constante.** Preferir una pasada de luz cada diez segundos antes que un brillo permanente.

---

## 7. Voz

**Registro:** institucional y verificable. Escribe como el administrador que tendrá que explicar cada línea en una reunión de socios, no como el que está levantando capital en una presentación.

**Sí:**
- Frases afirmativas y cortas.
- Cifras con alcance y fecha de corte: *"11 fondos inmobiliarios administrados, a septiembre de 2026"*.
- Nombres propios: constructoras, vehículos, comunas. La especificidad es la prueba.
- Describir el rol exacto de ARS en cada proyecto, incluso cuando es parcial.
- Español latino neutro. Nunca voseo.

**No:**
- Precios de viviendas, UF por departamento, segmentos socioeconómicos del comprador final.
- "Rentabilidad garantizada", "oportunidad única", "importantes ventajas competitivas" (el titular actual, que no dice nada).
- Proyecciones de retorno sin el escenario y los supuestos que las sostienen.
- Signos de exclamación.
- Cifras sin fecha.

**Frases centrales de marca**
- *Estructuramos inversiones para desarrollar proyectos inmobiliarios en Chile.*
- *Participamos desde el terreno hasta la distribución de resultados.*
- *Coadministramos y cofirmamos: quedamos adentro del proyecto.*
- *Cada cifra con su fecha de corte.*

---

## 8. Aplicaciones

**Sitio web** — fondo blanco, secciones alternas en `niebla`, titulares en azul estructura, pie en `azul-900`. Separadores de sección con regla fina `gris-200`, no con tarjetas flotantes y sombras. Fotografía real de los proyectos, nunca render genérico ni stock de rascacielos. Etiquetas de estado fechadas en cada ficha.

**Fichas de proyecto** — estructura tabular fija: nombre · ubicación · escala · estado con fecha · participantes · rol de ARS. Igual en las doce fichas. Un inventario se lee comparando, y no se puede comparar lo que está maquetado distinto.

**Documentos y presentaciones** — encabezado con etiqueta de estado, márgenes amplios, cifras en tabulares, fuente de cada dato al pie.

**Prohibido en toda pieza:** stock de rascacielos de vidrio · gente en traje dándose la mano · gráficos de barras ascendentes inventados · llaves sobre una mesa · maquetas de casas de juguete · degradados fuera del logo · morado WebGuru · precios de viviendas.

---

## 9. Relación con WebGuru

WebGuru construye y mantiene el sitio. Su identidad —morada— corresponde a las propuestas y documentos de trabajo, nunca al sitio publicado. El sitio de ARS Invest no lleva crédito visible de agencia salvo que ARS lo pida expresamente.

---

## 10. Tokens para desarrollo

```css
:root {
  --azul-900: #003057;
  --azul-700: #004582;
  --azul-600: #00618F;
  --azul-500: #0074AA;
  --azul-400: #0094C5;
  --azul-100: #E3F1F8;

  --tinta: #1B1F24;
  --grafito: #545454;
  --gris-500: #6B7075;
  --gris-200: #DDE3E8;
  --niebla: #F5F7F9;
  --blanco: #FFFFFF;

  --en-ejecucion: #0094C5;
  --finalizado: #2E7D5B;
  --alerta: #B4452F;

  --font-titulo: 'Archivo', system-ui, sans-serif;
  --font-texto: 'Inter', system-ui, sans-serif;
}
```

---

## 11. Datos de marca verificados (al 22 de septiembre de 2026)

Extraídos del sitio publicado. Los marcados **[validar]** requieren confirmación de ARS antes de publicarse.

| Dato | Valor |
|---|---|
| Logo | `arsinvest.cl/wp-content/uploads/2018/12/ars_logo.png` — pedir vectorial (SVG/AI) **[validar]** |
| Correo de contacto | `patricia.corsi@arsinvest.cl` — la propuesta dice "Patricia **Grossi**". Discrepancia de apellido **[validar]** |
| Teléfono | +562 3204 0826 **[validar vigencia]** |
| Dirección | Av. José Alcalde Délano 10545, of. 310, Los Trapenses, Lo Barnechea (Mall Vivo Los Trapenses) |
| Vehículos | SpA con nombre propio: *Fondo Proyección Quinta Norte / Poeta Pedro Prado / Vespucio V / Radal VII SpA* |
| Constructoras socias | Constructora ES, CBE, Grupo Hexxa, Inmobiliaria Perseverancia |
| Arturo Ready Salamé | Fundador y accionista mayoritario · Ingeniero Comercial · +30 años en banca e inversión · arturo@arsinvest.cl · +56 9 4253 4825 |
| Felipe Vergara Moll | Socio · Ingeniero Comercial UDP, Máster en Dirección Financiera UAI · +30 años en el sector financiero · felipe@arsinvest.cl · +56 9 9324 6580 |
| Cifras de trayectoria | 11 fondos inmobiliarios administrados · USD 23M en activos · USD 280M en ventas acumuladas · USD 25M de EBITDA consolidado — **[validar alcance y fecha de corte: son cifras de la carrera de Arturo, no de ARS Invest como firma]** |
