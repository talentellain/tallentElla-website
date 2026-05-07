import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Share2, Palette, Settings, Zap } from 'lucide-react';
import { servicesData } from '../data/servicesData';

const iconMap = { Code, Share2, Palette, Settings, Zap };

const ServiceCard = ({ s }) => {
  const IconComponent = iconMap[s.icon] || Zap;
  const displayTitle = s.title.toUpperCase().split(' ').map((word, idx) => (
    <React.Fragment key={idx}>{word}<br /></React.Fragment>
  ));
  return (
    <Link to={`/services/${s.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%', outline: 'none' }} aria-label={`Learn about TalentElla's ${s.title} services`}>
      <div className="modern-service-card" style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '24px' }}>
        <div className="card-giant-text">{displayTitle}</div>
        <div className="card-hover-content">
          <div className="blob-icon-wrapper"><IconComponent size={56} color="#000000" strokeWidth={2.5} /></div>
          <p className="card-hover-desc">{s.description}</p>
        </div>
      </div>
    </Link>
  );
};

const Services = () => {
  const outerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start end', 'start start'] });
  
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);
  // Check if we're on mobile to avoid animated radius gaps
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <>
      <div id="services" ref={outerRef} className="sticky-outer" style={{ zIndex: 20 }}>
        <motion.section
          className="sticky-section"
          style={{ 
            backgroundColor: '#f5f5f0', 
            borderTopLeftRadius: isMobile ? '0px' : borderRad, 
            borderTopRightRadius: isMobile ? '0px' : borderRad, 
            borderTop: '1px solid rgba(0,0,0,0.06)', 
            height: '100dvh' 
          }}
        >
          <div className="services-container-inner" style={{ width: '100%', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="services-header" style={{ maxWidth: '800px', textAlign: 'center', padding: '0 5%', marginBottom: 'clamp(2.5rem, 6vh, 4.5rem)' }}>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: 'clamp(1.6rem, 6vw, 4rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#121212' }}>
                OUR SERVICES
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: '#4a4a4a', fontSize: 'clamp(0.75rem, 2vw, 1rem)', lineHeight: '1.4', fontWeight: 500, marginTop: '0.5rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
                Full-service 360° marketing solutions — brand development, social media marketing, and integrated digital strategies.
              </motion.p>
            </div>
            <div className="services-grid-new" style={{ width: '100%' }}>
              {servicesData.map((s) => <ServiceCard key={s.id} s={s} />)}
            </div>
          </div>
        </motion.section>
      </div>

      <style>{`
        :root { --mobile-rad: 0px; }
        @media (min-width: 769px) { :root { --mobile-rad: borderRad; } } /* This is just a conceptual placeholder, we'll handle it better below */

        .services-container-inner { padding: 12vh 2% 8vh; }
        @media (max-width: 768px) { .services-container-inner { padding: 12vh 2.5% 6vh !important; } }

        .services-grid-new { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2vh; }
        @media (max-width: 1024px) { .services-grid-new { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .services-grid-new { grid-template-columns: 1fr; gap: 1rem; } }

        .modern-service-card { background-color: #ebeae4; min-height: 340px; transition: background-color 0.4s ease; }
        @media (max-width: 768px) { .modern-service-card { min-height: 160px !important; border-radius: 20px !important; } }
        
        .modern-service-card:hover { background-color: #8763df; }
        .card-giant-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-size: clamp(1.2rem,3.5vw,2.8rem); font-weight: 900; color: #121212; line-height: 1; letter-spacing: -0.02em; pointer-events: none; transition: left 0.7s cubic-bezier(0.8,0,0.2,1), transform 0.7s cubic-bezier(0.8,0,0.2,1), opacity 0.5s ease; z-index: 1; width: 100%; text-align: center; }
        @media (max-width: 768px) { .card-giant-text { font-size: 1.6rem !important; } }
        .modern-service-card:hover .card-giant-text { left: 100%; transform: translate(0%,-50%); opacity: 0.05; }
        .card-hover-content { opacity: 0; transform: translateY(20px) scale(0.95); transition: opacity 0.4s ease, transform 0.4s ease; display: flex; flex-direction: column; align-items: center; gap: 1rem; z-index: 5; padding: 0 8%; text-align: center; }
        .modern-service-card:hover .card-hover-content { opacity: 1; transform: translateY(0) scale(1); transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s; }
        .blob-icon-wrapper { width: clamp(60px,8vw,100px); height: clamp(60px,8vw,100px); background-color: #ffcc00; border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; display: flex; justify-content: center; align-items: center; animation: morph-blob 8s ease-in-out infinite alternate; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        @keyframes morph-blob { 0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; } 33% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; } 66% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; } 100% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; } }
        .card-hover-desc { color: #ffffff; font-size: clamp(0.7rem,1.8vw,0.95rem); font-weight: 600; line-height: 1.5; margin: 0; text-shadow: 0 2px 10px rgba(0,0,0,0.3); }
      `}</style>
    </>
  );
};

export default Services;
