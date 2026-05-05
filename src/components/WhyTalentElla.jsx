import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { aboutStats as stats, eeatSignals } from '../data/aboutData';

const WhyTalentElla = () => {
  const outerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start end', 'start start'] });
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;

  return (
    <div id="why-talentella" ref={outerRef} className="sticky-outer" style={{ zIndex: 50 }}>
      <style>
        {`
          .stats-grid-wte {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2.5rem;
            width: 100%;
          }
          .cards-grid-wte {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            width: 100%;
          }
          @media (max-width: 1024px) {
            .stats-grid-wte {
              grid-template-columns: repeat(2, 1fr);
              gap: 0.75rem;
            }
            .cards-grid-wte {
              grid-template-columns: repeat(2, 1fr);
              gap: 0.75rem;
            }
            .card-wte {
              min-height: 180px;
            }
          }
          @media (max-width: 480px) {
            .stats-grid-wte {
              gap: 0.5rem;
              margin-bottom: 1.5rem !important;
            }
            .cards-grid-wte {
              gap: 0.5rem;
            }
            .card-wte {
              min-height: 140px;
              padding: 1rem 0.75rem !important;
            }
          }
        `}
      </style>
      <motion.section
        className="sticky-section black-purple-gradient"
        style={{ 
          borderTop: '1px solid rgba(255,255,255,0.05)', 
          borderTopLeftRadius: isMobile ? '0px' : borderRad, 
          borderTopRightRadius: isMobile ? '0px' : borderRad,
          height: '100dvh'
        }}
      >
        {/* Decorative glows */}
        <div style={{ position: 'absolute', top: '10%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(132,0,255,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(0,210,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ width: '100%', height: 'auto', maxHeight: '100%', overflowY: 'auto', padding: isMobile ? '8vh 0 6vh' : '12vh 10% 8vh', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '1400px', width: '100%', padding: '0 5%', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)' }}>
              <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="accent-gradient" style={{ fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.75rem', display: 'block', marginBottom: '1rem' }}>Why Choose Us</motion.span>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="hero-title-shimmer" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Why TalentElla?</motion.h2>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
                India's trusted 360° marketing agency combining creative excellence with data-driven strategy. We don't just market — we build brands that last.
              </motion.p>
            </div>

            <div className="stats-grid-wte" style={{ marginBottom: isMobile ? '1.5rem' : 'clamp(2rem, 4vh, 3rem)' }}>
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: idx * 0.1 }} 
                  style={{ 
                    textAlign: 'center',
                    padding: isMobile ? '0.8rem 0.5rem' : '1rem 1rem',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{ fontSize: isMobile ? '1.6rem' : 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>{stat.number}</div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.4rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</div>
                                </motion.div>
              ))}
            </div>

            <div className="cards-grid-wte">
              {eeatSignals.map((signal, idx) => {
                const Icon = signal.icon;
                return (
                  <motion.div 
                    key={idx} 
                    className="card-wte"
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: idx * 0.1 }} 
                    whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(132,0,255,0.3)' }} 
                    style={{ 
                      padding: isMobile ? '1rem 1rem' : '1.5rem 1.75rem', 
                      borderRadius: isMobile ? '24px' : '32px', 
                      backgroundColor: 'rgba(255,255,255,0.02)', 
                      border: '1px solid rgba(255,255,255,0.06)', 
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: isMobile ? '0.5rem' : '0.8rem',
                      height: '100%',
                      alignSelf: 'stretch',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Subtle inner glow */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `radial-gradient(circle at top left, ${signal.color}10 0%, transparent 60%)`, pointerEvents: 'none' }} />
                    
                    <div style={{ 
                      width: isMobile ? '38px' : '48px', 
                      height: isMobile ? '38px' : '48px', 
                      borderRadius: '12px', 
                      backgroundColor: `${signal.color}15`, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: signal.color, 
                      flexShrink: 0,
                      border: `1px solid ${signal.color}20`
                    }}>
                      <Icon size={isMobile ? 20 : 24} />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h3 style={{ fontSize: isMobile ? '0.85rem' : '1.1rem', fontWeight: 800, marginBottom: '0.2rem', color: '#fff', letterSpacing: '-0.01em' }}>{signal.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: isMobile ? '0.68rem' : '0.85rem', lineHeight: 1.4, margin: 0 }}>{signal.shortDescription}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default WhyTalentElla;
