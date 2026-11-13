# Bitácora — ARS Invest (arsinvest.cl)

## 2026-11-13 — Sitio nuevo publicado en arsinvest.cl
- Hecho: en el Zone Editor del cPanel (cuenta en int14.cpanelhost.cl, clave nueva entregada por Alfredo), `A` de `arsinvest.cl` pasó de 138.117.148.164 a `76.76.21.21` y `CNAME` de `www` de `arsinvest.cl` a `cname.vercel-dns.com`, ambos con TTL 3600. El resto de la zona no se tocó: MX de Google, DKIM, SPF, `mail`, `cpanel`, `webmail` y `ftp`. Antes del cambio se guardó un respaldo de la zona fuera del repo, en el scratchpad de la sesión.
- Hecho: `noindex` retirado de [vercel.json](../vercel.json) y `VITE_SITIO=https://arsinvest.cl` definido en Vercel (Production). Deploy a producción con alias en arsinvest.cl.
- Verificado: Vercel da los dos dominios como bien configurados. https://arsinvest.cl, www, /quienes-somos, /verity y /contacto responden 200 con certificado válido, y http redirige a https (308). robots.txt dice `Allow` con sitemap, el canonical apunta a arsinvest.cl y no hay `X-Robots-Tag`. El DNS de Google ya resuelve la IP nueva, los 5 MX siguen y cpanel.arsinvest.cl responde.
- Pendiente: probar el formulario de contacto con un envío real (no se hizo para no mandar correo a Patricia sin aviso). Los puntos de [pendientes-validacion.md](pendientes-validacion.md) se publicaron abiertos, con autorización de Alfredo. Para volver atrás, `A` a 138.117.148.164 en el Zone Editor. La clave del cPanel pasó por el chat: cambiarla.

## 2026-11-09 — Diagnóstico para publicar en arsinvest.cl
- Hecho: revisión de solo lectura (whois de NIC Chile, DNS público, configuración de Vercel). No se tocó cPanel, DNS ni Vercel.
- Hallazgo: los nameservers son `ns1/ns2.cpanelhost.cl`, así que los registros se editan en el Zone Editor del cPanel y no hace falta la clave de NIC Chile. El correo está en Google (MX) y no depende del registro A. Titular del dominio: administradora proyeccion rentas inmobiliarias spa; vence el 03-07-2027.
- Hallazgo: para abrir el sitio hay que agregar el dominio en Vercel, cambiar `A` de la raíz y `www`, definir `VITE_SITIO` y quitar el `X-Robots-Tag: noindex` de [vercel.json](../vercel.json).
- Hecho: Alfredo autorizó publicar con los puntos de [pendientes-validacion.md](pendientes-validacion.md) abiertos. `arsinvest.cl` y `www.arsinvest.cl` agregados al proyecto en Vercel (verificados; falta el DNS). Sin cambios en cPanel: el acceso automatizado con la clave fue bloqueado por el control de permisos antes de iniciar sesión.
- Hallazgo (2026-11-11): la cuenta no está en `ap9.cpanelhost.cl` (no responde: 190.107.177.59) sino en `int14.cpanelhost.cl` (138.117.148.164). Funcionan `https://cpanel.arsinvest.cl` y `https://int14.cpanelhost.cl:2083`. `cpanel`, `webmail`, `mail` y `ftp` tienen registros `A` propios, así que no se caen al cambiar la raíz.
- Pendiente (Alfredo): en Zone Editor, registro `A` de `arsinvest.cl` a `76.76.21.21` y `CNAME` de `www` a `cname.vercel-dns.com`. Después: `VITE_SITIO`, quitar `noindex`, deploy y verificación en vivo. Cambiar la clave del cPanel: circuló por WhatsApp y por el chat.

## 2026-11-03 — Fuera los correos y celulares personales de Felipe y Arturo
- Hecho: retirados `arturo@` / `felipe@arsinvest.cl` y sus celulares de [src/content/equipo.js](../src/content/equipo.js) (/quienes-somos) y de `socios` en [src/content/verity.js](../src/content/verity.js) (cierre de las páginas de Verity, que ahora muestra solo los nombres). El contacto queda en el formulario y el correo general de [src/content/contacto.js](../src/content/contacto.js). El test del formulario ya no usa el celular de Arturo.
- Decisión (Alfredo): quitarlos del sitio.
- Verificado: tests 6/6, build de 25 rutas y ninguna coincidencia de esos correos ni números en `src/`, `api/` ni `dist/`. Commit `8874f39`, publicado en Vercel y subido a GitHub; en vivo, 0 coincidencias en /, /quienes-somos, /contacto y las cuatro páginas de Verity.
- Pendiente: los datos siguen en documentos internos de `docs/` (no publicados) y en caché de buscadores si alguna vez se indexó la versión de Vercel (el sitio tiene `noindex`).

## 2026-11-02 — Alfredo Grossi en el equipo
- Hecho: Alfredo Grossi agregado como tercer integrante en [src/content/equipo.js](../src/content/equipo.js), con foto en `public/img/equipo/alfredo.webp` (600×900, 30 KB). Aparece en la portada y en /quienes-somos. El perfil viene de cardus.cl/nosotros. [src/components/EquipoRetrato.jsx](../src/components/EquipoRetrato.jsx) ahora muestra correo y teléfono solo si existen.
- Verificado: tests 6/6 y build de 25 rutas. En el HTML prerenderizado de / y /quienes-somos. Sin scroll horizontal a 1440 ni a 390px y sin errores de consola.
- Pendiente (Alfredo): confirmar el cargo en ARS ("Socio · Agentización empresarial"), el correo y el teléfono, y si va también entre los socios de contacto de Verity. Commit `2693b43`, publicado en Vercel y subido a GitHub (`main` al día con `origin`); verificado en vivo en / y /quienes-somos.

## 2026-11-02 — Verity publicada en Vercel
- Hecho: commit `5a830df` en `main` (sección Verity, arreglos de accesibilidad y acuse rediseñado del formulario) y deploy a producción de Vercel: https://ars-invest-site.vercel.app/verity
- Verificado: /verity, /verity/macrolotes, /verity/power-center y /verity/agentizacion responden 200 con su `<h1>`; el menú enlaza a /verity y el formulario ofrece "Quiero conversar sobre Verity". Tests 6/6 y build de 25 rutas antes del deploy.
- Pendiente (Alfredo): `git push` a GitHub (no se hizo). arsinvest.cl sigue en cPanel con el sitio antiguo; el sitio nuevo sigue con `noindex`.

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
