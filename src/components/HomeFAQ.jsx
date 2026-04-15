import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ faq, index, isOpen, onToggle }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
    <button onClick={onToggle} aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} id={`faq-question-${index}`} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'clamp(1rem, 2vw, 1.5rem) 0', background: 'none', border: 'none', cursor: 'pointer', color: '#fff', textAlign: 'left', gap: '1rem' }}>
      <h3 style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', fontWeight: 600, margin: 0, lineHeight: 1.4, flex: 1 }}>{faq.question}</h3>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ flexShrink: 0, color: '#8400ff' }}><ChevronDown size={20} /></motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', lineHeight: 1.7, paddingBottom: 'clamp(1rem, 2vw, 1.5rem)', margin: 0, maxWidth: '800px' }}>{faq.answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const HomeFAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const outerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start end', 'start start'] });
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);

  return (
    <div id="faq" ref={outerRef} className="sticky-outer" style={{ zIndex: 28 }}>
      <motion.section
        className="sticky-section"
        style={{ backgroundColor: '#050508', borderTop: '1px solid rgba(255,255,255,0.05)', borderTopLeftRadius: borderRad, borderTopRightRadius: borderRad }}
      >
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '12vh 0 10vh' }}>
          <div style={{ maxWidth: '900px', width: '100%', padding: '0 5%', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
              <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="accent-gradient" style={{ fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.75rem', display: 'block', marginBottom: '1rem' }}>Frequently Asked Questions</motion.span>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="hero-title-shimmer" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '0.75rem' }}>Got Questions?</motion.h2>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                Everything you need to know about TalentElla's 360° marketing services, pricing, and how we help brands grow across India.
              </motion.p>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {faqs.map((faq, idx) => (
                <FAQItem key={idx} faq={faq} index={idx} isOpen={openIndex === idx} onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)} />
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginTop: 'clamp(2rem, 3vh, 3rem)' }}>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>Still have questions? Let's talk about your brand goals.</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '14px 36px', borderRadius: '100px', background: 'white', color: '#0a0a0c', border: 'none', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', letterSpacing: '0.05em' }}>
                Get a Free Strategy Call
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomeFAQ;
