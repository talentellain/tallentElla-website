import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, TrendingUp, Users, Shield, BarChart3, Zap } from 'lucide-react';

const stats = [
  { number: '50+', label: 'Brands Served', icon: Users },
  { number: '200+', label: 'Projects Delivered', icon: TrendingUp },
  { number: '95%', label: 'Client Retention', icon: Award },
  { number: '3x', label: 'Average ROI Boost', icon: BarChart3 },
];

const eeatSignals = [
  { icon: Award, title: 'Experience', description: 'Founded in 2026, TalentElla brings hands-on experience across 50+ brands in India — from early-stage startups to established enterprises in retail, tech, healthcare, and education.' },
  { icon: Zap, title: 'Expertise', description: 'Our team combines certified digital marketers, brand strategists, UI/UX designers, and full-stack developers. We specialize in integrated marketing solutions and omnichannel marketing strategies for the Indian market.' },
  { icon: Shield, title: 'Authoritativeness', description: 'Recognized as a leading 360° marketing agency in India, TalentElla delivers measurable results with transparent analytics and reporting. Our client portfolio spans diverse industries across India.' },
  { icon: TrendingUp, title: 'Trustworthiness', description: 'We build trust through transparent pricing in INR, detailed performance reports, dedicated account managers, and a 95% client retention rate. Every project is backed by clear deliverables and timelines.' },
];

const WhyTalentElla = () => {
  const outerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start end', 'start start'] });
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);

  return (
    <div id="why-talentella" ref={outerRef} className="sticky-outer" style={{ zIndex: 25 }}>
      <motion.section
        className="sticky-section"
        style={{ backgroundColor: '#0c0c10', borderTop: '1px solid rgba(255,255,255,0.05)', borderTopLeftRadius: borderRad, borderTopRightRadius: borderRad }}
      >
        {/* Decorative glows */}
        <div style={{ position: 'absolute', top: '10%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(132,0,255,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(0,210,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '12vh 0 8vh', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '1400px', width: '100%', padding: '0 5%', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vh, 3.5rem)' }}>
              <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="accent-gradient" style={{ fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.75rem', display: 'block', marginBottom: '1rem' }}>Why Choose Us</motion.span>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="hero-title-shimmer" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '0.75rem' }}>Why TalentElla?</motion.h2>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                India's trusted 360° marketing agency combining creative excellence with data-driven strategy. We don't just market — we build brands that last.
              </motion.p>
            </div>
            <div className="flex-col-mobile" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1rem, 3vw, 3rem)', marginBottom: 'clamp(2rem, 4vh, 3.5rem)', flexWrap: 'wrap' }}>
              {stats.map((stat, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} style={{ textAlign: 'center', flex: '1 1 140px', maxWidth: '200px' }}>
                  <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{stat.number}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.4rem', fontWeight: 600, letterSpacing: '0.05em' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
            <div className="flex-col-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {eeatSignals.map((signal, idx) => {
                const Icon = signal.icon;
                return (
                  <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.04)' }} style={{ padding: 'clamp(1.25rem, 2vw, 2rem)', borderRadius: '24px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.3s ease' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: 'rgba(132,0,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8400ff', marginBottom: '1rem' }}><Icon size={24} /></div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.6rem', color: '#fff' }}>{signal.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{signal.description}</p>
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
