import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  { 
    title: 'Discovery', 
    desc: 'We dive deep into your business goals, target audience, and market landscape across India to find your competitive edge as a brand.',
    color: '#8763df'
  },
  { 
    title: 'Strategy', 
    desc: 'Crafting a bespoke 360° marketing roadmap that combines brand storytelling with data-driven tactical execution for maximum ROI.',
    color: '#ffcc00'
  },
  { 
    title: 'Execution', 
    desc: 'Bringing the vision to life with world-class design, social media marketing, content creation, and integrated marketing solutions.',
    color: '#a78bfa'
  },
  { 
    title: 'Optimization', 
    desc: 'Continuous monitoring, analytics, and reporting to ensure sustained digital growth and lead generation across all channels.',
    color: '#ffffff'
  },
];

const Process = () => {
  const outerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start end', 'start start'] });
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  return (
    <div id="process" ref={outerRef} className="sticky-outer" style={{ zIndex: 50 }}>
      <motion.section
        className="sticky-section"
        style={{ 
          backgroundColor: '#050508', 
          borderTop: '1px solid rgba(255,255,255,0.05)', 
          borderTopLeftRadius: isMobile ? '0px' : borderRad, 
          borderTopRightRadius: isMobile ? '0px' : borderRad,
          height: isMobile ? 'auto' : '100vh',
          minHeight: isMobile ? '100vh' : 'auto',
          overflow: 'hidden',
          padding: isMobile ? '60px 0' : '0'
        }}
      >
        <div className="hide-scrollbar" style={{ width: '100%', height: '100%', overflowY: 'auto', padding: isMobile ? '0 5%' : '10vh 5%' }}>
          <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.1fr', gap: isMobile ? '2rem' : '6rem', alignItems: 'flex-start' }}>
              
              {/* Sticky Header Side */}
              <div style={{ position: isMobile ? 'static' : 'sticky', top: '0' }}>
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  style={{ fontWeight: 800, letterSpacing: '0.4em', textTransform: 'uppercase', fontSize: '0.65rem', color: '#a78bfa', display: 'block', marginBottom: '1.2rem' }}
                >
                  METHODOLOGY
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.2rem', color: 'white', lineHeight: 1.1, fontWeight: 400 }}
                >
                  Our Process for <br /> <span style={{ fontStyle: 'italic' }}>Digital Success.</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '2rem', maxWidth: isMobile ? '100%' : '450px' }}
                >
                  We don't just build brands; we engineer digital growth. Our 360° approach ensures every touchpoint is optimized for maximum impact.
                </motion.p>
              </div>

              {/* Steps Scroll Side */}
              <div style={{ display: 'grid', gap: isMobile ? '0.8rem' : '1.2rem' }}>
                {steps.map((step, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: isMobile ? 0 : i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{ 
                      padding: isMobile ? '1.8rem 1.5rem' : '2.5rem 2.2rem', 
                      position: 'relative',
                      backgroundColor: 'rgba(255,255,255,0.02)', 
                      borderRadius: '24px', 
                      border: '1px solid rgba(255,255,255,0.05)',
                      overflow: 'hidden',
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    {/* Oversized Outlined Number */}
                    <div style={{ 
                      position: 'absolute', 
                      top: isMobile ? '0.5rem' : '1.2rem', 
                      right: isMobile ? '0.5rem' : '1.2rem', 
                      fontSize: isMobile ? '3rem' : '5.5rem', 
                      fontWeight: 900, 
                      lineHeight: 1,
                      WebkitTextStroke: '1px rgba(255,255,255,0.04)',
                      color: 'transparent',
                      fontFamily: 'Outfit, sans-serif',
                      pointerEvents: 'none'
                    }}>
                      0{i + 1}
                    </div>

                    <div style={{ position: 'relative', zIndex: 2 }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: step.color, marginBottom: '1.2rem', boxShadow: `0 0 15px ${step.color}` }}></div>
                      <h3 style={{ fontSize: isMobile ? '1.2rem' : '1.4rem', fontWeight: 700, marginBottom: '0.8rem', color: 'white', letterSpacing: '-0.01em' }}>{step.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: '1.6', fontSize: isMobile ? '0.85rem' : '0.95rem', maxWidth: '85%' }}>{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </motion.section>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Process;
