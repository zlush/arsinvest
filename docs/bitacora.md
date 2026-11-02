# Bitácora — ARS Invest (arsinvest.cl)

## 2026-10-29 — Sección Verity (4 páginas) y auditoría del sitio
- Hecho: `/verity` con las tres líneas y una página por línea: `/verity/macrolotes`, `/verity/power-center`, `/verity/agentizacion` ([src/pages/Verity.jsx](../src/pages/Verity.jsx), [src/pages/VerityLinea.jsx](../src/pages/VerityLinea.jsx), contenido en [src/content/verity.js](../src/content/verity.js)). "Verity" en el menú y el pie; motivo "Quiero conversar sobre Verity" en el formulario y en `api/contacto.js`.
- Hecho: identidad de Verity dentro del sitio de ARS (enfoque A): tinta, profundo, bronce y piedra; títulos en Marcellus; logo reconstruido en SVG; diez ilustraciones de la propuesta de Arturo recoloreadas ([src/assets/verity/](../src/assets/verity/)). Tokens y contrastes en [docs/brand-kit.md §12](brand-kit.md).
- Hecho: guardados en el proyecto [docs/verity/propuesta-arturo.html](verity/propuesta-arturo.html) y [docs/verity/Verity-Identidad-de-marca.pdf](verity/Verity-Identidad-de-marca.pdf).
- Hecho (auditoría con impeccable): texto azul-400 sin contraste AA en portada y Quiénes somos, curva con rebote en botones y pasos, `<h1>`→`<h3>` en /proyectos y línea de 93 caracteres en el equipo. Corregidos; la curva `ease-resorte` se retiró del brand kit.
- Verificado: `npm test` (6/6), build con 25 rutas prerenderizadas, detector sin avisos de contraste, rebote ni encabezados en las páginas corregidas; las 4 de Verity sin scroll horizontal a 390px, un `<h1>` por página y sin errores de consola.
- Decisión: se omitió "UF 5,3 MM en ventas en 9 proyectos" (sin fuente). Se publicó el caso ilustrativo de Power Center con su advertencia y supuestos, porque venía en la propuesta aprobada por Felipe.
- Pendiente (Alfredo): el JS pasó de 112 a 147 KB comprimido (contenido e ilustraciones de Verity); decidir si conviene separarlo. Siguen fuera de regla, de antes: degradados en el héroe de la portada y en los retratos del equipo, sombra al pasar sobre `.tarjeta` y barra con desenfoque translúcido. Commit y despliegue.
- Pendiente (ARS): confirmar el caso de Power Center con cifras en UF y cuál visión de Verity va (Chile con tres líneas, o Latinoamérica con deuda privada).

## 2026-10-29 — Correo de Arturo con el material de Verity
- Hecho: Arturo envió "web ars invest Verity" (29-oct, 06:31) con tres adjuntos: "Verity · ARS Invest.html" (ideas de las nuevas áreas), "Verity_Identidad_de_Marca.pptx" y "Verity — Identidad de marca.pdf" (logos). Felipe respondió a las 11:00 aprobando la presentación y pidiendo incorporarla al sitio "a la brevedad posible".
- Hecho: revisados los tres adjuntos. La propuesta de Arturo (16 páginas: inicio + 5 por línea, con el Power Center de la presentación: 6 fases, Exit 1/Exit 2, alianza comercial y caso ilustrativo en UF) reemplaza como base a mi borrador, porque es la que aprobó Felipe. Logos extraídos del PPTX a [docs/verity/logos/](verity/logos/). Identidad Verity: Tinta #0B1622, Profundo #13293D, Bronce #C2A26B, Bronce texto #9C7B45, Piedra #EEF0F2; Marcellus + Manrope.
- Pendiente (Alfredo): elegir enfoque de implementación (Verity dentro de arsinvest.cl con su propia paleta, todo en azul ARS, o micrositio aparte).
- Pendiente (ARS): visión distinta entre la identidad (Latinoamérica, incluye deuda privada) y la propuesta web (Chile, tres líneas); fuente de "UF 5,3 MM en ventas en 9 proyectos"; confirmar que el caso ilustrativo de Power Center con cifras en UF puede publicarse.

## 2026-10-28 — Contenido de Verity para el sitio (16 páginas)
- Hecho: documento con textos, estructura, rutas e imágenes de las tres líneas nuevas de Verity (Macro Lotes, Power Center, Agentización Empresarial) más una página central: [docs/verity/contenido-verity.html](verity/contenido-verity.html). Publicado como artifact privado: https://claude.ai/artifact/8dKD3BtPK31NFjEuAZz4Xh
- Hecho: Agentización Empresarial resume cardus.cl con sus titulares textuales y usa las cuatro imágenes reales de Cardus (Unsplash, licencia comercial). Macro Lotes y Power Center llevan la dirección fotográfica de cada página, sin fotos de banco.
- Decisión: las tres pestañas van agrupadas bajo un menú "Verity"; como pestañas sueltas el menú no cabe en notebook. El formulario suma los motivos "retailer" y "comprador de lote".
- Decisión: no se implementa en el sitio hasta que ARS valide el contenido.
- Pendiente (Alfredo): enviar el PDF de Verity Power Center, que no llegó con el encargo; hay que contrastar esas páginas con él.
- Pendiente (ARS): relación societaria Verity–ARS, revisión legal de subdivisión de terrenos, de crédito directo a compradores y del aviso de no oferta de valores, aporte de terrenos en Power Center, equipo de Cardus, fotografía propia y costo de la primera evaluación. Detalle en la sección "Pendientes de validación" del documento.
