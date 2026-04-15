import React from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Users, Shield, BarChart3, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const stats = [
  { number: '50+', label: 'Brands Served', icon: Users },
  { number: '200+', label: 'Projects Delivered', icon: TrendingUp },
  { number: '95%', label: 'Client Retention', icon: Award },
  { number: '3x', label: 'Average ROI Boost', icon: BarChart3 },
];

const eeatSignals = [
  {
    icon: Award,
    title: 'Experience',
    description:
      'Founded in 2026, TalentElla brings hands-on experience across 50+ brands in India — from early-stage startups to established enterprises in retail, tech, healthcare, and education.',
  },
  {
    icon: Zap,
    title: 'Expertise',
    description:
      'Our team combines certified digital marketers, brand strategists, UI/UX designers, and full-stack developers. We specialize in integrated marketing solutions and omnichannel marketing strategies for the Indian market.',
  },
  {
    icon: Shield,
    title: 'Authoritativeness',
    description:
      'Recognized as a leading 360° marketing agency in India, TalentElla delivers measurable results with transparent analytics and reporting. Our client portfolio spans diverse industries across India.',
  },
  {
    icon: TrendingUp,
    title: 'Trustworthiness',
    description:
      'We build trust through transparent pricing in INR, detailed performance reports, dedicated account managers, and a 95% client retention rate. Every project is backed by clear deliverables and timelines.',
  },
];

const AboutPage = () => {
  return (
    <div style={{ backgroundColor: '#0a0a0c', minHeight: '100vh' }}>
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
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: 'clamp(2rem, 4vh, 3rem)', textAlign: 'center' }}
        >
          Built on Trust & Results
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {eeatSignals.map((signal, idx) => {
            const Icon = signal.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.04)' }}
                style={{
                  padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                  borderRadius: '24px',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: 'rgba(132,0,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8400ff', marginBottom: '1.25rem' }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.6rem', color: '#fff' }}>{signal.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>{signal.description}</p>
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
