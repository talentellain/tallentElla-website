import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import SmoothScroll from './components/SmoothScroll';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import PortfolioPage from './pages/PortfolioPage';
import StaticBackground from './components/StaticBackground';
import ScrollToTop from './components/ScrollToTop';

/** Redirect from old /service/:id to new /services/:id URL structure */
function ServiceRedirect() {
  const { id } = useParams();
  return <Navigate to={`/services/${id}`} replace />;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <StaticBackground />
      <SmoothScroll>
        <div className="page-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Clean URL structure: /services/website-development */}
            <Route path="/services/:id" element={<ServicePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            {/* Redirect old /service/:id URLs to /services/:id for SEO */}
            <Route path="/service/:id" element={<ServiceRedirect />} />
          </Routes>
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
