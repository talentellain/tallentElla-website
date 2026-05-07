import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const formulas = [
  { label: 'CREATIVITY', color: '#a78bfa' },
  { label: 'PRECISION', color: '#fff' },
  { label: 'RESULTS', color: '#ffcc00' }
];

const weBring = [
  { 
    title: 'TAILORED STRATEGIES', 
    why: 'We craft marketing solutions that fit your business, not the other way around.',
    experience: '7+ years',
    approach: 'We dive deep into your market to understand your audience.'
  },
  { 
    title: 'CREATIVE BRILLIANCE', 
    why: 'We push boundaries and challenge the norm to keep your brand fresh and exciting.',
    experience: 'Over 150 projects',
    approach: 'We blend data, trends, and a touch of magic to develop ideas that work.'
  },
  { 
    title: 'END-TO-END SERVICE', 
    why: 'From concept to execution, we\'re with you every step of the way, ensuring every detail shines.',
    experience: 'Over 5,500 hours',
    approach: 'We are making sure all parts of your strategy align for maximum impact.'
  },
  { 
    title: 'RESULTS YOU CAN SEE', 
    why: 'We deliver results you can measure. Transparency and ROI are at the core of what we do.',
    experience: 'More than 250 workers',
    approach: 'Continuous improvement through data analysis and optimization.'
  }
];

const engagementLevels = [
  { pct: '10%', label: 'IDEATION' },
  { pct: '25%', label: 'DEVELOPMENT' },
  { pct: '50%', label: 'TESTING' },
  { pct: '75%', label: 'LAUNCH' },
  { pct: '100%', label: 'RESULTS' }
];

const WhyTalentElla = () => {
  const outerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start end', 'start start'] });
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;

  return (
    <div id="why-talentella" style={{ backgroundColor: '#000', position: 'relative', zIndex: 50 }}>
      <section
        style={{ 
          borderTop: '1px solid rgba(255,255,255,0.05)', 
          padding: isMobile ? '80px 0' : '120px 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ width: '100%', height: '100%', overflowY: isMobile ? 'visible' : 'auto', padding: isMobile ? '0 5%' : '10vh 5%' }}>
          <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
            
            {/* Top Section: Our Winning Formula */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr', gap: isMobile ? '2rem' : '3rem', marginBottom: isMobile ? '4rem' : '6rem', alignItems: 'center', position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>[our winning formula]</span>
                <h2 style={{ fontSize: 'clamp(5rem, 15vw, 12rem)', fontWeight: 900, lineHeight: 0.8, color: 'white', letterSpacing: '-0.05em', margin: 0, fontFamily: 'Outfit, sans-serif' }}>2026</h2>
              </div>
              <div style={{ display: 'grid', gap: '0.8rem', position: 'relative', maxWidth: isMobile ? '100%' : '350px' }}>
                {formulas.map((f, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{ 
                      padding: '1.2rem 2rem', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '4px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white',
                      fontWeight: 800,
                      letterSpacing: '0.3em',
                      fontSize: '0.8rem',
                      backgroundColor: 'rgba(255,255,255,0.02)'
                    }}
                  >
                    {f.label}
                  </motion.div>
                ))}

                {/* The L-Shaped Arrow (Desktop only) */}
                {!isMobile && (
                  <svg 
                    style={{ position: 'absolute', top: '40%', left: '100%', width: '250px', height: '200px', overflow: 'visible', pointerEvents: 'none', marginLeft: '1rem' }}
                    viewBox="0 0 250 200"
                  >
                    <motion.path 
                      d="M 0 50 L 180 50 L 180 220" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.2)" 
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                    <motion.path 
                      d="M 175 215 L 180 225 L 185 215" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.2)" 
                      strokeWidth="2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Middle Section: Editorial Table */}
            <div style={{ marginBottom: isMobile ? '4rem' : '8rem', overflowX: isMobile ? 'auto' : 'visible' }}>
              <div style={{ minWidth: isMobile ? '100%' : 'auto' }}>
                {!isMobile && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr 2fr', gap: '2rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>/WE BRING</span>
                    <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>/WHY</span>
                    <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>/EXPERIENCE</span>
                    <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>/APPROACH</span>
                  </div>
                )}
                {weBring.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={!isMobile ? { backgroundColor: 'rgba(255,255,255,0.06)' } : {}}
                    transition={{ duration: 0.3 }}
                    className="group"
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: isMobile ? '1fr' : '1.5fr 2fr 1fr 2fr', 
                      gap: isMobile ? '1rem' : '2rem', 
                      padding: isMobile ? '2rem 0' : '1.5rem 1rem', 
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      position: 'relative',
                      cursor: 'pointer',
                      margin: isMobile ? '0' : '0 -1rem'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {isMobile && <span style={{ fontSize: '0.5rem', color: 'rgba(167,139,250,0.6)', letterSpacing: '0.1em' }}>/WE BRING</span>}
                      <span style={{ fontWeight: 800, color: 'white', fontSize: isMobile ? '0.9rem' : '0.75rem' }}>{item.title}</span>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {isMobile && <span style={{ fontSize: '0.5rem', color: 'rgba(167,139,250,0.6)', letterSpacing: '0.1em' }}>/WHY</span>}
                      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: isMobile ? '0.85rem' : '0.75rem', lineHeight: 1.4 }}>{item.why}</span>
                    </div>

                    <div style={{ display: isMobile ? 'grid' : 'flex', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {isMobile && <span style={{ fontSize: '0.5rem', color: 'rgba(167,139,250,0.6)', letterSpacing: '0.1em' }}>/EXPERIENCE</span>}
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: isMobile ? '0.85rem' : '0.75rem' }}>{item.experience}</span>
                      </div>
                      {isMobile && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.5rem', color: 'rgba(167,139,250,0.6)', letterSpacing: '0.1em' }}>/APPROACH</span>
                          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.4 }}>{item.approach}</span>
                        </div>
                      )}
                    </div>

                    {!isMobile && (
                      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', lineHeight: 1.4 }}>{item.approach}</span>
                    )}
                    
                    {/* Hover Image Reveal (Desktop only) */}
                    {!isMobile && (
                      <div className="hover-image" style={{ 
                        position: 'absolute', 
                        right: '15%', 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        width: '80px',
                        height: '80px',
                        opacity: 0,
                        pointerEvents: 'none',
                        transition: 'all 0.4s ease',
                        zIndex: 10,
                        background: 'linear-gradient(45deg, #a78bfa, #ffcc00)',
                        borderRadius: '8px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                      }}></div>
                    )}

                    <style>{`
                      .group:hover .hover-image {
                        opacity: 1;
                        right: 18%;
                      }
                    `}</style>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Section: Engagement Levels */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '3rem' : '4rem', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2.5rem', display: 'block' }}>[engagement levels]</span>
                <div style={{ position: 'relative', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
                  {/* Timeline track */}
                  <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '12px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', transform: 'translateY(-50%)' }} />
                  {engagementLevels.map((level, i) => (
                    <div key={i} style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                      <div style={{ fontWeight: 900, color: 'white', fontSize: '1.2rem', marginBottom: '1.5rem' }}>{level.pct}</div>
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: level.pct === '100%' ? '#fff' : '#333', border: level.pct === '100%' ? 'none' : '4px solid #1a1a1a', margin: '0 auto' }}></div>
                      <div style={{ fontSize: '0.5rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginTop: '1rem' }}>{level.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: isMobile ? 'left' : 'right', alignSelf: 'flex-end' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'white', fontWeight: 700, lineHeight: 1.2, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                  WE DON'T JUST MEET <br /> MILESTONES; WE ELEVATE THEM <br /> INTO LASTING ACHIEVEMENTS.
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, maxWidth: isMobile ? '100%' : '500px', marginLeft: 'auto' }}>
                  Our team thrives on collaboration, creativity, and precision. At every stage—whether ideation, development, or launch—we align expertise with client goals to ensure measurable success. By combining innovative thinking with meticulous execution, we transform concepts into impactful results that exceed expectations.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyTalentElla;
