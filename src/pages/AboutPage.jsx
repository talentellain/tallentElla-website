import React from 'react';
import { motion } from 'framer-motion';
import { aboutStats as stats, eeatSignals } from '../data/aboutData';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const AboutPage = () => {
  return (
    <div className="black-purple-gradient" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative glows */}
      <div style={{ position: 'absolute', top: '5%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(132,0,255,0.08) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '40%', left: '5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(0,210,255,0.06) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(132,0,255,0.05) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />

      <SEO
        pageTitle="About TalentElla — India's 360° Marketing Agency"
        description="Learn why TalentElla is India's trusted 360° marketing agency. 50+ brands served, 200+ projects delivered, 95% client retention. Experience, expertise, and results."
        keywords="about talentella, why talentella, 360 degree marketing agency india, digital marketing agency about us"
        url="https://talentella.in/about"
      />

      {/* ── Hero ── */}
      <section
        style={{
          paddingTop: 'clamp(130px, 18vh, 180px)',
          paddingBottom: 'clamp(60px, 10vh, 100px)',
          padding: 'clamp(130px, 18vh, 180px) 5% clamp(60px, 10vh, 100px)',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <ol style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.75rem', color: '#888' }}>
            <li><Link to="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link></li>
            <li style={{ color: '#555' }}>/</li>
            <li><span style={{ color: '#8400ff' }}>About</span></li>
          </ol>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="accent-gradient"
            style={{ fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.75rem', display: 'block', marginBottom: '1rem' }}
          >
            Why Choose Us
          </span>
          <h1
            className="hero-title-shimmer"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: '1.5rem' }}
          >
            Why TalentElla?
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', maxWidth: '650px', lineHeight: 1.7, marginBottom: 0 }}>
            India's trusted 360° marketing agency combining creative excellence with data-driven strategy. We don't just market — we build brands that last.
          </p>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '0 5% clamp(60px, 10vh, 100px)', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2rem',
            padding: 'clamp(2rem, 4vw, 3rem)',
            borderRadius: '32px',
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(132,0,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8400ff' }}>
                    <Icon size={22} />
                  </div>
                </div>
                <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{stat.number}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.4rem', fontWeight: 600, letterSpacing: '0.05em' }}>{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── E-E-A-T Cards ── */}
      <section style={{ padding: '0 5% clamp(80px, 12vh, 120px)', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hero-title-shimmer"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 800, color: '#fff', marginBottom: 'clamp(2.5rem, 5vh, 4rem)', textAlign: 'center' }}
        >
          Built on Trust & Results
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {eeatSignals.map((signal, idx) => {
            const Icon = signal.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.04)', borderColor: `${signal.color}40` }}
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                  borderRadius: '32px',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Subtle inner glow matching home page */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `radial-gradient(circle at top left, ${signal.color}10 0%, transparent 60%)`, pointerEvents: 'none' }} />
                
                <div style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '16px', 
                  backgroundColor: `${signal.color}15`, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: signal.color, 
                  marginBottom: '1.5rem',
                  border: `1px solid ${signal.color}20`
                }}>
                  <Icon size={28} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem', color: '#fff', letterSpacing: '-0.01em' }}>{signal.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>{signal.fullDescription}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '0 5% clamp(80px, 12vh, 120px)', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '1.5rem' }}>
            Ready to grow your brand with India's leading 360° marketing agency?
          </p>
          <Link to="/#contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300)}
              style={{ padding: '14px 36px', borderRadius: '100px', background: 'white', color: '#0a0a0c', border: 'none', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', letterSpacing: '0.05em' }}
            >
              Get a Free Strategy Call
            </motion.button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
