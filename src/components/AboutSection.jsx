import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import aiImg from '../assets/Expert-in/ai-png.png';
import uiImg from '../assets/Expert-in/ui-png.png';
import webdevImg from '../assets/Expert-in/webdev-png.png';
import ecommerceImg from '../assets/Expert-in/ecommerce-png.png';
import animationImg from '../assets/Expert-in/animations-pngg.png';

const ArrowDownRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 7L17 17M17 17V7M17 17H7" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExpertiseCard = ({ imgSrc, title, description }) => (
  <motion.div
    whileHover={{ y: -8 }}
    style={{
      minWidth: '290px',
      maxWidth: '290px',
      height: '380px',
      flex: '0 0 auto',
      backgroundColor: '#1a1a1a',
      borderRadius: '14px',
      padding: '2rem 1.25rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      border: '1px solid rgba(140,80,255,0.08)',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      scrollSnapAlign: 'start',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <img src={imgSrc} alt={title} style={{ maxWidth: '90%', maxHeight: '170px', objectFit: 'contain' }} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '1.25rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'white', margin: 0, fontFamily: 'Inter, sans-serif' }}>{title}</h3>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', lineHeight: 1.55, margin: 0, fontFamily: 'Inter, sans-serif' }}>{description}</p>
    </div>
  </motion.div>
);

const AboutSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const pad = isMobile ? '2rem' : '6%';

  const expertiseData = [
    { imgSrc: aiImg, title: 'AI Dev', description: 'We integrate cutting-edge artificial intelligence into your marketing stack to automate workflows and drive intelligent decision-making.' },
    { imgSrc: uiImg, title: 'UI Design', description: 'We push the boundaries of innovation through creative UI designs, enabling you to distinguish yourself from competitors with stunning visuals.' },
    { imgSrc: webdevImg, title: 'Web Development', description: 'Our proficient team of developers possesses a deep understanding of the latest frontend technologies to build lightning-fast web experiences.' },
    { imgSrc: ecommerceImg, title: 'Ecommerce', description: 'We are deeply passionate about designing custom-tailored solutions for our e-commerce clients to maximize conversions and sales.' },
    { imgSrc: animationImg, title: 'Animation', description: 'We offer top-tier animations in various forms, such as frame-by-frame, stop motion, and fluid motion graphics to captivate your audience.' }
  ];

  return (
    <section style={{ backgroundColor: '#000', overflow: 'hidden' }}>

      <div style={{ padding: isMobile ? '4rem 5%' : '7rem 5%' }}>

        {/* ── GREY BOX: About Us + Expert At heading ── */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          backgroundColor: '#0d0d0d',
          border: '1px solid rgba(140,80,255,0.1)',
          borderRadius: '4px',
          overflow: 'visible',
          boxShadow: '0 0 80px rgba(140,80,255,0.04), inset 0 0 120px rgba(140,80,255,0.02)'
        }}>

          {/* ── ABOUT US ── */}
          <div style={{ padding: isMobile ? `3rem ${pad} 4rem` : `6rem ${pad} 7rem` }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '3rem' : '5rem',
              alignItems: 'flex-start'
            }}>
              {/* Left */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <ArrowDownRightIcon />
                  <span style={{ 
                    fontFamily: 'Inter, sans-serif', 
                    fontSize: 'clamp(1.6rem, 4vw, 3.5rem)', 
                    fontWeight: 400, 
                    background: 'linear-gradient(to right, #a78bfa, #888, #2a2a2a)', 
                    WebkitBackgroundClip: 'text', 
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent', 
                    color: 'transparent',
                    display: 'inline-block',
                    letterSpacing: '0.06em', 
                    lineHeight: 1 
                  }}>
                    A LITTLE
                  </span>
                </div>
                <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontWeight: 400, color: 'white', lineHeight: 0.92, margin: 0 }}>
                  ABOUT US
                </h2>
              </motion.div>

              {/* Right */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {!isMobile && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10rem' }}>
                    <ArrowUpRight size={28} color="#a78bfa" strokeWidth={2.5} />
                  </div>
                )}
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.85, margin: 0, fontFamily: 'Inter, sans-serif' }}>
                  Headquartered in India, our team is dedicated to driving conversions and delivering tangible value to our clients. We are fueled by our passion for creating distinctive digital experiences that set you apart from the sea of ordinary brands in today's market.
                </p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.85, margin: 0, fontFamily: 'Inter, sans-serif' }}>
                  We take the time to deeply understand your business, allowing us to execute on your mission most effectively and craft strategies that resonate with your audience.
                </p>
                <Link to="/#contact" style={{ textDecoration: 'none' }}>
                  <motion.div whileHover={{ x: 8 }} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginTop: '0.5rem', cursor: 'pointer' }}>
                    <span style={{ color: '#a78bfa', fontSize: '0.95rem', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>Read more</span>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowUpRight size={15} color="#a78bfa" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* ── WE ARE EXPERT AT heading ── stays inside grey box with big bottom padding */}
          <div style={{ padding: isMobile ? `3rem ${pad} 8rem` : `5rem ${pad} 45rem` }}>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: '2rem' }}>
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <ArrowDownRightIcon />
                  <span style={{ 
                    fontFamily: 'Inter, sans-serif', 
                    fontSize: isMobile ? 'clamp(1.6rem, 5vw, 3.5rem)' : 'clamp(1.2rem, 3.5vw, 2.8rem)', 
                    fontWeight: 400, 
                    background: 'linear-gradient(to right, #a78bfa, #888, #2a2a2a)', 
                    WebkitBackgroundClip: 'text', 
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent', 
                    color: 'transparent',
                    display: 'inline-block',
                    letterSpacing: '0.06em', 
                    lineHeight: 1 
                  }}>
                    WE ARE
                  </span>
                </div>
                <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: isMobile ? 'clamp(3.5rem, 12vw, 6.5rem)' : 'clamp(2.5rem, 5.5vw, 5rem)', fontWeight: 400, color: 'white', lineHeight: 0.92, margin: 0 }}>
                  EXPERT AT
                </h2>
              </motion.div>

              <Link to="/#contact" style={{ textDecoration: 'none' }}>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} style={{ padding: isMobile ? '1.1rem 3.5rem' : '0.9rem 2.8rem', borderRadius: '100px', backgroundColor: 'transparent', border: '1px solid rgba(140,80,255,0.35)', color: '#a78bfa', fontSize: isMobile ? '1rem' : '0.9rem', cursor: 'pointer', fontWeight: 500, fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>
                  Lets work!
                </motion.button>
              </Link>
            </div>
          </div>

        {/* ── Grey box ENDS here ── */}
        </div>

      </div>

      {/* ── CARDS: Infinite looping marquee ── */}
      <div style={{
        overflow: 'hidden',
        paddingBottom: '6rem',
        marginTop: isMobile ? '-2rem' : '-45rem',
        position: 'relative',
        zIndex: 2,
      }}>
        <div className="marquee-track" style={{
          display: 'flex',
          gap: '1.5rem',
          width: 'fit-content',
          animation: 'marqueeScroll 25s linear infinite',
        }}>
          {/* Duplicate cards for seamless loop */}
          {[...expertiseData, ...expertiseData].map((item, index) => (
            <ExpertiseCard key={index} {...item} />
          ))}
        </div>
      </div>


      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;

