import { renderToString } from 'react-dom/server'
// React Router 7 consolidó todo en `react-router`: `react-router-dom/server`
// ya no existe y StaticRouter se exporta desde el paquete raíz.
import { StaticRouter } from 'react-router'
import App from './App.jsx'
import './index.css'

export { RUTAS } from './content/rutas.js'

export function render(ruta) {
  return renderToString(
    <StaticRouter location={ruta}>
      <App />
    </StaticRouter>,
  )
}
