import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import fgImage from '../assets/fg.png';

const Hero = () => {
  const heroWrapperRef = useRef(null);
  const titleWrapRef = useRef(null);
  const mountainRef = useRef(null);
  const contentRefs = useRef([]);

  // Reset array on render to avoid stale refs
  contentRefs.current = [];
  const addToContentRefs = (el) => {
    if (el && !contentRefs.current.includes(el)) {
      contentRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Dynamically import GSAP to reduce initial bundle and improve LCP
    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline();

      // Initial setups for GSAP
      gsap.set(titleWrapRef.current, { opacity: 0, y: 60, scale: 1.1 });
      gsap.set(heroWrapperRef.current, { scale: 1.05 }); 
      gsap.set(mountainRef.current, { y: '25%' }); 
      gsap.set(contentRefs.current, { opacity: 0, y: 40 });

      tl.to(titleWrapRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.6,
        ease: 'expo.out',
      })
      .to(heroWrapperRef.current, {
        scale: 0.95,
        duration: 2.2,
        ease: 'power2.inOut',
      }, '-=0.4')
      .to(mountainRef.current, {
        y: '0%',
        duration: 2.2,
        ease: 'power2.inOut',
      }, '<')
      .to(contentRefs.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'expo.out',
      }, '-=0.2');

      return () => tl.kill();
    });
  }, []);

  return (
    <div id="hero" className="sticky-outer" style={{ zIndex: 10 }}>
      <section 
        className="sticky-section" 
        style={{ 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          overflow: 'hidden',
          justifyContent: 'center'
        }}
      >
        {/* Main scaled container */}
        <div 
          ref={heroWrapperRef}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, transformOrigin: 'center center' }}
        >
          {/* LAYER 10: Behind Mountain (Title + Subtitle) */}
          <div style={{ position: 'absolute', zIndex: 10, top: 0, left: 0, width: '100%', height: '100%' }}>
            <div style={{ position: 'relative', maxWidth: '1600px', width: '100%', margin: '0 auto', height: '100%', transformStyle: 'preserve-3d' }}>
              <div className="hero-title-block" style={{ 
                position: 'absolute', 
                top: '36%',
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: '100%', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '0 5%'
              }}>
                <div 
                  ref={addToContentRefs}
                  className="accent-gradient"
                  style={{ fontWeight: 800, letterSpacing: '0.4em', fontSize: 'clamp(0.6rem, 1.5vw, 0.85rem)', marginBottom: '1rem', display: 'block', textTransform: 'uppercase' }}
                >
                  The Future of Marketing
                </div>
                
                {/* SEO: Single H1 with primary keyword used naturally */}
                <h1 
                  ref={titleWrapRef}
                  className="hero-title-3d"
                  style={{ 
                    fontSize: 'clamp(2.2rem, 8.5vw, 12rem)', 
                    marginBottom: '0',
                    lineHeight: 0.85,
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    paddingBottom: '0.1em'
                  }}
                >
                  TALENTELLA
                </h1>
              </div>
            </div>
          </div>

          {/* LAYER 20: Foreground Mountains Overlay */}
          <div 
            ref={mountainRef}
            className="hero-mountain"
            style={{
              position: 'absolute',
              bottom: '-20%', 
              left: '-20%', 
              width: '140%', 
              height: '120%', 
              pointerEvents: 'none',
              zIndex: 20, 
              backgroundImage: `url(${fgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'bottom center',
              backgroundRepeat: 'no-repeat'
            }}
            role="img"
            aria-label="TalentElla hero background — India's leading 360 degree marketing agency creative landscape"
          />

          {/* LAYER 30: Intro and Content Over Mountain */}
          <div style={{ position: 'absolute', zIndex: 30, top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <div style={{ position: 'relative', maxWidth: '1600px', width: '100%', margin: '0 auto', height: '100%' }}>
              
              {/* Bottom Left Content — Primary keyword in first 100 words */}
              <div 
                ref={addToContentRefs}
                style={{ 
                  position: 'absolute', 
                  bottom: '12%', 
                  left: '4%', 
                  textAlign: 'left', 
                  maxWidth: '380px',
                  pointerEvents: 'auto'
                }}
              >
                <h2 style={{ fontSize: 'clamp(0.75rem, 2.5vw, 1rem)', fontWeight: 800, margin: '0 0 0.5rem 0', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#fff' }}>
                  India's 360° Marketing Agency
                </h2>
                <p style={{ 
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 'clamp(0.75rem, 2vw, 0.95rem)', 
                  margin: '0 0 1.5rem 0', 
                  lineHeight: '1.6',
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  TalentElla is a full-service digital marketing agency offering integrated marketing solutions — from brand development and social media marketing to lead generation and influencer marketing across India.
                </p>
                
                {/* SEO CTA Button */}
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  aria-label="Get a free strategy call from TalentElla — India's 360 degree marketing agency"
                  style={{ 
                    fontSize: '0.85rem', 
                    padding: '12px 28px', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    backgroundColor: '#fff',
                    color: '#000',
                    borderRadius: '50px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Get a Free Strategy Call <ArrowRight size={16} />
                </motion.button>
              </div>

              {/* Bottom Right Content */}
              <div 
                ref={addToContentRefs} 
                className="hidden-mobile"
                style={{ 
                  position: 'absolute', 
                  bottom: '20%', 
                  right: '5%', 
                  textAlign: 'right', 
                  maxWidth: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '1.5rem',
                  pointerEvents: 'auto'
                }}
              >
                <div style={{ textAlign: 'right' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 0.5rem 0', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#fff' }}>
                    Integrated Marketing Solutions
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)', margin: 0, lineHeight: 1.6 }}>
                    Est. 2026. Elevating brands through omnichannel marketing solutions — blending online and offline strategies for maximum impact across India.
                  </p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Scroll to explore
                  </span>
                  <motion.div 
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    aria-label="Scroll down to explore TalentElla's marketing services"
                    style={{ 
                      cursor: 'pointer', 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      border: '1px solid rgba(255,255,255,0.3)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <ChevronDown size={18} color="white" />
                  </motion.div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Responsive overrides for hero title position and mountain zoom */}
      <style>{`
        /* Tablet: push title down a bit, zoom mountain */
        @media (max-width: 1024px) {
          .hero-title-block {
            top: 34% !important;
          }
          .hero-mountain {
            height: 140% !important;
            bottom: -25% !important;
            width: 160% !important;
            left: -30% !important;
          }
        }
        /* Mobile: push title further down, mountain covers more */
        @media (max-width: 768px) {
          .hero-title-block {
            top: 36% !important;
          }
          .hero-mountain {
            height: 160% !important;
            bottom: -30% !important;
            width: 200% !important;
            left: -50% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
