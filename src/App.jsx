import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import useScrollSuave from './hooks/useScrollSuave.js'
import Inicio from './pages/Inicio.jsx'
import QuienesSomos from './pages/QuienesSomos.jsx'
import Proyectos from './pages/Proyectos.jsx'
import ProyectoDetalle from './pages/ProyectoDetalle.jsx'
import Actualidad from './pages/Actualidad.jsx'
import ArticuloDetalle from './pages/ArticuloDetalle.jsx'
import Contacto from './pages/Contacto.jsx'
import Verity from './pages/Verity.jsx'
import VerityLinea from './pages/VerityLinea.jsx'
import NoEncontrado from './pages/NoEncontrado.jsx'

function AlCambiarDeRuta({ lenis }) {
  const { pathname } = useLocation()
  useEffect(() => {
    // Al cambiar de página el salto es instantáneo: animar el recorrido
    // completo hasta arriba haría que la página nueva entre a media altura.
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])
  return null
}

export default function App() {
  const lenis = useScrollSuave()

  return (
    <div className="grano flex min-h-dvh flex-col">
      <AlCambiarDeRuta lenis={lenis} />
      <Navbar />
      <main id="contenido" className="flex-1 pt-20 sm:pt-24">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/proyectos/:slug" element={<ProyectoDetalle />} />
          <Route path="/actualidad-inmobiliaria" element={<Actualidad />} />
          <Route path="/actualidad-inmobiliaria/:slug" element={<ArticuloDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/verity" element={<Verity />} />
          <Route path="/verity/:linea" element={<VerityLinea />} />

          {/* Rutas del sitio anterior. Se conservan como redirección para no
              perder lo ya indexado por buscadores. */}
          <Route path="/vision" element={<Navigate to="/quienes-somos" replace />} />
          <Route path="/proyectos-en-ejecucion" element={<Navigate to="/proyectos?estado=ejecucion" replace />} />
          <Route path="/proyectos-finalizados" element={<Navigate to="/proyectos?estado=finalizado" replace />} />
          <Route path="/como-invertir" element={<Navigate to="/quienes-somos#como-trabajamos" replace />} />

          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
