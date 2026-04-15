import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ faq, index, isOpen, onToggle, isMobile }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }} 
    transition={{ delay: index * 0.06 }} 
    style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden' }}
  >
    <motion.button 
      onClick={onToggle} 
      whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
      aria-expanded={isOpen} 
      aria-controls={`faq-answer-${index}`} 
      id={`faq-question-${index}`} 
      style={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '0.85rem 0.5rem', 
        background: 'none', 
        border: 'none', 
        cursor: 'pointer', 
        color: '#121212', 
        textAlign: 'left', 
        gap: '1rem',
        borderRadius: '8px',
        transition: 'background-color 0.2s ease'
      }}
    >
      <h3 style={{ fontSize: isMobile ? '1.1rem' : '0.975rem', fontWeight: 700, margin: 0, lineHeight: 1.4, flex: 1, letterSpacing: '-0.01em' }}>{faq.question}</h3>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ flexShrink: 0, color: '#8763df' }}><ChevronDown size={isMobile ? 22 : 18} /></motion.div>
    </motion.button>
    <AnimatePresence>
      {isOpen && (
        <motion.div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}>
          <p style={{ color: '#555', fontSize: isMobile ? '0.95rem' : '0.875rem', lineHeight: 1.6, padding: '0 0.5rem 0.65rem', margin: 0, maxWidth: '800px' }}>{faq.answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const HomeFAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const outerRef = useRef(null);
  const contentWrapRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] });
  const borderRad = useTransform(scrollYProgress, [0, 0.1], ['60px', '0px']);
  const contentY = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '-40%']);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <div 
      id="faq" 
      ref={outerRef} 
      className="sticky-outer" 
      style={{ zIndex: 60, minHeight: '270vh', backgroundColor: '#050508' }}
    >
      <motion.section
        className="sticky-section"
        style={{ 
          backgroundColor: '#f5f5f0', 
          borderTop: '1px solid rgba(0,0,0,0.05)', 
          borderTopLeftRadius: isMobile ? '0px' : borderRad, 
          borderTopRightRadius: isMobile ? '0px' : borderRad,
          height: '100dvh',
          overflow: 'hidden'
        }}
      >
        <motion.div 
          ref={contentWrapRef}
          style={{ width: '100%', height: '100%', padding: '12vh 5% 10vh', display: 'flex', flexDirection: 'column', alignItems: 'center', y: contentY }}
        >
          <div style={{ maxWidth: '820px', width: '100%', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(1rem, 3vh, 2rem)' }}>
              <motion.span 
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="accent-gradient" 
                style={{ fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', fontSize: isMobile ? '0.75rem' : '0.6rem', display: 'block', marginBottom: '0.75rem' }}
              >
                Inquiry & Support
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} 
                style={{ fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.5rem)' : 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 900, marginBottom: '0.4rem', color: '#121212', letterSpacing: '-0.02em' }}
              >
                Common Inquiries
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} 
                style={{ color: '#666', fontSize: '0.85rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.5 }}
              >
                Find answers to specific brand strategy questions here.
              </motion.p>
            </div>

            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              {faqs.map((faq, idx) => (
                <FAQItem key={idx} faq={faq} index={idx} isOpen={openIndex === idx} onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)} isMobile={isMobile} />
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: '#000' }} whileTap={{ scale: 0.95 }} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                style={{ padding: isMobile ? '16px 36px' : '10px 28px', borderRadius: '100px', background: '#121212', color: '#ffffff', border: 'none', fontWeight: 800, fontSize: isMobile ? '0.9rem' : '0.75rem', cursor: 'pointer', letterSpacing: '0.05em', transition: 'background-color 0.3s ease' }}
              >
                FREE STRATEGY CALL
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default HomeFAQ;
