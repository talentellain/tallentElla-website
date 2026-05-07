import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import { servicesData } from '../data/servicesData';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Project Assets
import onepieceImg from '../assets/onepiece.png';
import k72Img from '../assets/K72.png';
import dentwiseImg from '../assets/dentwise.png';

const allFeatured = [
  { id: 1, title: 'One Piece', category: 'E-COMMERCE', image: onepieceImg, link: 'https://one-piece-eight-henna.vercel.app/' },
  { id: 2, title: 'K27 Animation', category: 'BRAND IDENTITY', image: k72Img, link: 'https://react-animated-web-l9i8.vercel.app/' },
  { id: 3, title: 'Thrifty Clothing', category: 'WEB DEVELOPMENT', image: '/projects/image.png', link: 'https://thrifty-clothing-frontend.vercel.app/home' },
  { id: 4, title: 'Symetra Main', category: 'ENTERPRISE', image: '/projects/image copy.png', link: 'https://symetra-main.vercel.app/' },
  { id: 5, title: 'Astro Portfolio', category: 'CREATIVE DEV', image: '/projects/astro-portfolio.png', link: 'https://astro-portfolio-opal-ten.vercel.app/' },
  { id: 6, title: 'Adidas Concept', category: 'MOTION DESIGN', image: '/projects/addidas.png', link: 'https://addidas-animated.vercel.app/' },
  { id: 7, title: 'Ring Portfolio', category: 'UX/UI DESIGN', image: '/projects/rig.png', link: 'https://ring-portfolio.vercel.app/' },
];

const HorizontalWork = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={targetRef} style={{ height: '600vh', position: 'relative', backgroundColor: '#050505' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <motion.div style={{ x, display: 'flex', gap: '4vw', padding: '0 5%' }}>
          {allFeatured.map((project) => (
            <div key={project.id} style={{ width: '70vw', flexShrink: 0, position: 'relative' }}>
              <div style={{ position: 'relative', height: '60vh', width: '100%', overflow: 'hidden', borderRadius: '12px' }}>
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={project.image} 
                  alt={project.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '3rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 800, letterSpacing: '0.2em' }}>{project.category}</span>
                    <h3 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'white', fontWeight: 900, margin: '0.5rem 0' }}>{project.title}</h3>
                  </div>
                  
                  <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <motion.div
                      whileHover={{ scale: 1.05, backgroundColor: 'white', color: 'black' }}
                      style={{ 
                        padding: '1rem 2rem', 
                        borderRadius: '100px', 
                        border: '1px solid white', 
                        color: 'white', 
                        fontSize: '0.8rem', 
                        fontWeight: 800,
                        letterSpacing: '0.05em',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      VISIT LIVE
                    </motion.div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const PortfolioPage = () => {
  const smmPortfolio = servicesData.find(s => s.id === 'social-media-management')?.portfolio || [];

  return (
    <div style={{ backgroundColor: '#050505', color: 'white', fontFamily: 'Outfit, sans-serif' }}>
      <SEO 
        pageTitle="Immersive Portfolio | TalentElla Agency"
        description="Experience the future of digital marketing. Explore our award-winning work in branding, development, and social media."
      />
      <Navbar />

      {/* Hero Section */}
      <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          background: 'radial-gradient(circle at 50% 50%, rgba(114, 38, 255, 0.15) 0%, transparent 70%)',
          zIndex: 0
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 5%' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 800, letterSpacing: '0.4em', textTransform: 'uppercase', display: 'block', marginBottom: '2rem' }}>[ curated showcase ]</span>
            <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.9, margin: 0, textTransform: 'uppercase' }}>
              Impactful<br />Works.
            </h1>
          </motion.div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4rem', maxWidth: '1400px', marginInline: 'auto' }}>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', maxWidth: '300px', textAlign: 'left', lineHeight: 1.6 }}
            >
              We don't just create assets; we build legacies. Every pixel is a promise of performance.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              style={{ textAlign: 'right' }}
            >
              <span style={{ fontSize: '4rem', fontWeight: 900, color: 'rgba(255,255,255,0.1)', display: 'block' }}>2026</span>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>REDEFINING EXCELLENCE</span>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}
        >
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, white, transparent)' }} />
        </motion.div>
      </section>

      {/* Main Works - Horizontal Scroll */}
      <HorizontalWork />

      {/* Project Grid - High Density */}
      <section style={{ padding: '20vh 5%', backgroundColor: '#000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '6rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1rem' }}>The Archive</h2>
            <div style={{ width: '100px', height: '4px', backgroundColor: '#a78bfa' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
            {smmPortfolio.map((p, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                style={{ 
                  aspectRatio: '16/9', 
                  backgroundColor: 'rgba(255,255,255,0.02)', 
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {p.type === 'video' ? (
                  <video 
                    src={p.content} 
                    autoPlay muted loop playsInline 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} 
                  />
                ) : (
                  <img src={p.image || p.thumbnail} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                )}
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
                  <h4 style={{ margin: 0, fontWeight: 700 }}>{p.title}</h4>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{p.category || 'Production'}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      
      <style>{`
        .accent-gradient {
          background: linear-gradient(90deg, #a78bfa, #8763df);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default PortfolioPage;
