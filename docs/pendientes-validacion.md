# Pendientes de validación con ARS Invest

Actualizado: 22 de septiembre de 2026.

El sitio está construido con los datos verificables del sitio publicado y de la
propuesta. Lo de abajo **bloquea la publicación, no el desarrollo**: cada punto
indica exactamente qué archivo cambia cuando llegue la confirmación.

---

## 1. Cifras de trayectoria — el más importante

**Qué pasa:** el sitio actual muestra 11 fondos inmobiliarios, USD 280M en
ventas acumuladas, USD 23M en activos y USD 25M de EBITDA. Esas cifras
corresponden a **la carrera de Arturo Ready Salamé en banca e inversión**, no a
resultados de ARS Invest como firma.

**Por qué importa:** publicarlas como logro institucional es la cifra
indefendible que la evaluación pidió evitar. Un inversionista que las lea como
resultados de ARS y luego descubra el matiz, pierde confianza en todo lo demás.

**Cómo está resuelto hoy:** viven dentro de la biografía de Arturo, con una
nota de alcance visible al lado, y **no** en un contador de portada. Las cifras
de la portada se calculan del propio inventario (4 proyectos en ejecución, 906
viviendas en desarrollo, 8 finalizados), que sí es verificable.

**Qué se necesita:** decidir entre (a) mantenerlas atribuidas a su biografía
con fecha de corte, o (b) conseguir las cifras de ARS Invest como firma.

**Archivo:** `src/content/equipo.js`

---

## 2. Correo de contacto — Patricia Corsi o Patricia Grossi

**Qué pasa:** el sitio publicado indica `patricia.corsi@arsinvest.cl`. La
propuesta de construcción web menciona el "Gmail de Patricia **Grossi**". Un
apellido está equivocado.

**Qué se necesita:** apellido correcto y casilla operativa. Después, un envío de
prueba con confirmación de recepción.

**Archivos:** `src/content/contacto.js` (dato visible) y la variable
`CONTACTO_DESTINO` en `.env` (destino real del formulario).

---

## 3. Fechas de entrega de los proyectos finalizados

**Qué pasa:** ninguna de las 8 fichas de finalizados tiene fecha en el sitio
actual. La identidad de marca se compromete a que ningún estado se publique sin
fecha de corte, así que las etiquetas hoy dicen **"Fecha por confirmar"** en
pantalla en vez de omitir el dato.

**Qué se necesita:** año de entrega de cada uno.

**Archivo:** `src/content/proyectos.js`, campo `fechaEstado`.

---

## 4. Las dos incorporaciones al equipo

Nombres, cargos, biografías y fotografías. **Archivo:** `src/content/equipo.js`.

---

## 5. Zapallar y Frutillar

Mencionados en reunión (en Zapallar se habló de cinco casas), no publicados en
el sitio actual. Sin antecedentes confirmados no se maquetan fichas.

**Archivo:** `src/content/proyectos.js`.

---

## 6. Material fotográfico autorizado

**Qué pasa:** el sitio usa fotografías descargadas del sitio actual para 7 de
los 12 proyectos. Las 5 restantes muestran un bloque "Imagen en validación".

**Qué se necesita:** confirmación de que las imágenes se pueden usar, y material
para los proyectos que faltan: Altos de Rumié, Edificio Rivne, Edificio Odesa,
Edificio Elena y Edificio Borgetto.

**Carpeta:** `public/img/proyectos/`.

---

## 7. Logo vectorial

El único disponible es un PNG de 2018 a 1426×304 px. Para pantallas retina y
para el favicon en tamaños grandes hace falta el SVG o el archivo original.

**Archivo:** `public/img/ars-logo.png`.

---

## 8. Rol específico de ARS en cada proyecto

Los cuatro proyectos en ejecución declaran "Estructuración de la inversión y
coadministración del proyecto". Falta confirmar si ese rol es exacto para los
cuatro y cuál corresponde a cada finalizado.

**Archivo:** `src/content/proyectos.js`, campo `rolARS`.

---

## 9. Accesos para publicar

Dominio y hosting de arsinvest.cl, y la herramienta de medición que ARS quiera
usar (GA4 u otra). Sin esto no hay despliegue ni métricas de consultas.

---

## 10. Teléfono y dirección

El sitio indica +562 3204 0826 y Av. José Alcalde Délano 10545, oficina 310,
Los Trapenses, Lo Barnechea. Confirmar vigencia de ambos: la evaluación detectó
que el texto y el mapa mostraban oficinas distintas, y ahora ambos salen del
mismo dato, así que basta con validarlo una vez.

**Archivo:** `src/content/contacto.js`.
