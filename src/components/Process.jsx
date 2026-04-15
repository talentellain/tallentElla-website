import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  { title: 'Discovery', desc: 'We dive deep into your business goals, target audience, and market landscape across India to find your competitive edge as a brand.' },
  { title: 'Strategy', desc: 'Crafting a bespoke 360° marketing roadmap that combines brand storytelling with data-driven tactical execution for maximum ROI.' },
  { title: 'Execution', desc: 'Bringing the vision to life with world-class design, social media marketing, content creation, and integrated marketing solutions.' },
  { title: 'Optimization', desc: 'Continuous monitoring, analytics, and reporting to ensure sustained digital growth and lead generation across all channels.' },
];

const Process = () => {
  const outerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start end', 'start start'] });
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);

  return (
    <div id="process" ref={outerRef} className="sticky-outer" style={{ zIndex: 30 }}>
      <motion.section
        className="sticky-section"
        style={{ backgroundColor: '#0c0c10', borderTop: '1px solid rgba(255,255,255,0.05)', borderTopLeftRadius: borderRad, borderTopRightRadius: borderRad }}
      >
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '12vh 5%' }}>
          <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
            <div className="flex-col-mobile process-gap-fix" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
              <div className="process-header" style={{ flex: '1 1 400px' }}>
                <span className="accent-gradient" style={{ fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem', display: 'block', marginBottom: '1.5rem' }}>How We Work</span>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1.5rem' }} className="text-gradient">Our Process for <br /> Digital Success.</h2>
                <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
                  As a full-service digital marketing agency, we don't just make things look pretty. We build integrated marketing solutions that drive lead generation, brand growth, and measurable results for businesses across India.
                </p>
              </div>
              <div className="process-cards-wrapper" style={{ flex: '1 1 500px', display: 'grid', gap: '0.8rem' }}>
                {steps.map((step, i) => (
                  <motion.div key={i} whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -60 }} viewport={{ once: true, amount: 0.1 }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="glass-card process-card" style={{ padding: '1.5rem 2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div className="number-circle" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)', background: 'rgba(170,59,255,0.1)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                      <p style={{ color: 'var(--muted)', lineHeight: '1.5', fontSize: '0.95rem' }}>{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Process;
