import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SmoothScroll from './components/SmoothScroll';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import StaticBackground from './components/StaticBackground';

function App() {
  return (
    <Router>
      <StaticBackground />
      <SmoothScroll>
        <div className="page-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service/:id" element={<ServicePage />} />
          </Routes>
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
