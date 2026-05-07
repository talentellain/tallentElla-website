import React from 'react';
import { ArrowLeft, Check, Code, Share2, Palette, Settings, Zap, ArrowUpRight, Shield, Database, LifeBuoy, Rocket, ChevronDown, ChevronUp } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const iconMap = {
  Code,
  Share2,
  Palette,
  Settings,
  Zap
};

/* ──────────────────────────────────────────────
   ServiceCard (Mirrored from Services.jsx)
   ────────────────────────────────────────────── */
const ServiceCard = ({ s }) => {
  const IconComponent = iconMap[s.icon] || Zap;
  const displayTitle = s.title.toUpperCase().split(' ').map((word, idx) => (
    <React.Fragment key={idx}>{word}<br /></React.Fragment>
  ));
  return (
    <Link to={`/services/${s.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%', outline: 'none' }}>
      <div className="modern-service-card" style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '24px' }}>
        <div className="card-giant-text">{displayTitle}</div>
        <div className="card-hover-content">
          <div className="blob-icon-wrapper"><IconComponent size={56} color="#000000" strokeWidth={2.5} /></div>
          <p className="card-hover-desc">{s.description}</p>
        </div>
      </div>
    </Link>
  );
};

/* ──────────────────────────────────────────────
   Expert Insight Section
   ────────────────────────────────────────────── */
const ExpertInsightSection = ({ service, isMobile }) => {
  if (!service.answerBlock) return null;
  return (
    <section style={{ padding: isMobile ? '80px 5%' : '140px 8%', backgroundColor: '#050508', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(167,139,250,0.03) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', marginBottom: '2.5rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#a78bfa', boxShadow: '0 0 15px #a78bfa' }}></div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a78bfa', letterSpacing: '0.4em', textTransform: 'uppercase' }}>Expert Perspective</span>
          </div>
          <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
            <h2 itemProp="text" style={{ color: 'white', fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', lineHeight: 1.5, fontWeight: 500, margin: 0, fontFamily: '"Playfair Display", serif', fontStyle: 'italic' }}>"{service.answerBlock.answer}"</h2>
          </div>
          <div style={{ marginTop: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>TalentElla Core Insight</span>
            <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────
   FAQ Accordion
   ────────────────────────────────────────────── */
const ServiceFAQ = ({ faqs, isMobile }) => {
  const [openIndex, setOpenIndex] = useState(0);
  if (!faqs || faqs.length === 0) return null;
  return (
    <div style={{ 
      maxWidth: '1400px', 
      margin: '0 auto', 
      display: 'flex', 
      flexDirection: isMobile ? 'column' : 'row', 
      gap: isMobile ? '3rem' : '8rem', 
      alignItems: 'flex-start',
      padding: isMobile ? '0 5%' : '0' 
    }}>
      {/* Left Column: Title & CTA */}
      <div style={{ 
        flex: isMobile ? 'none' : '1.5', 
        width: '100%',
        position: isMobile ? 'static' : 'sticky', 
        top: '100px',
        textAlign: isMobile ? 'center' : 'left',
        marginBottom: isMobile ? '2rem' : '0'
      }}>
        <h2 style={{ 
          fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.4rem)' : 'clamp(2.5rem, 5vw, 4.5rem)', 
          fontWeight: 900, 
          lineHeight: 0.9, 
          color: 'white', 
          margin: '0 0 1.2rem 0', 
          textTransform: 'uppercase', 
          letterSpacing: '-0.04em',
          wordBreak: isMobile ? 'break-word' : 'normal',
          overflowWrap: isMobile ? 'break-word' : 'normal',
          whiteSpace: isMobile ? 'normal' : 'nowrap'
        }}>
          QUESTIONS<br /><span style={{ color: '#a78bfa' }}>ANSWERED</span>
        </h2>
        <p style={{ 
          color: 'rgba(255,255,255,0.4)', 
          fontSize: '0.9rem', 
          lineHeight: 1.5, 
          marginBottom: '2rem', 
          maxWidth: isMobile ? '100%' : '300px',
          margin: isMobile ? '0 auto 2rem auto' : '0 0 2rem 0'
        }}>
          Have a specific query? Our experts are here to provide the clarity you need.
        </p>
        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: '#c4b5fd' }}
          style={{ 
            padding: isMobile ? '1rem 2.2rem' : '1rem 2rem', 
            borderRadius: '100px', 
            background: '#a78bfa', 
            color: '#000', 
            border: 'none', 
            fontWeight: 800, 
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            cursor: 'pointer',
            letterSpacing: '0.05em',
            transition: '0.3s ease',
            margin: isMobile ? '0 auto' : '0'
          }}
        >
          Ask a Question
        </motion.button>
      </div>

      {/* Right Column: Accordion */}
      <div style={{ flex: isMobile ? 'none' : '2.5', width: '100%', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {faqs.map((faq, idx) => (
          <div key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)} 
              style={{ 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: isMobile ? '2.2rem 0' : '2rem 0', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                color: 'white', 
                textAlign: 'left' 
              }}
            >
              <h3 style={{ 
                fontSize: isMobile ? '0.9rem' : '0.95rem', 
                fontWeight: 800, 
                margin: 0, 
                color: openIndex === idx ? '#a78bfa' : 'white',
                textTransform: 'uppercase',
                maxWidth: '85%',
                transition: '0.3s ease',
                lineHeight: 1.4
              }}>
                {faq.question}
              </h3>
              <span style={{ fontSize: isMobile ? '1.2rem' : '1.2rem', color: openIndex === idx ? '#a78bfa' : 'rgba(255,255,255,0.2)', fontWeight: 300, transition: '0.3s ease' }}>
                {openIndex === idx ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: 'auto', opacity: 1 }} 
                  exit={{ height: 0, opacity: 0 }} 
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{ 
                    color: 'rgba(255,255,255,0.5)', 
                    fontSize: isMobile ? '0.9rem' : '0.9rem', 
                    lineHeight: 1.6, 
                    paddingBottom: isMobile ? '2.2rem' : '2rem', 
                    margin: 0,
                    maxWidth: '100%'
                  }}>
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   Related Services
   ────────────────────────────────────────────── */
const RelatedServices = ({ currentId, isMobile }) => {
  const related = servicesData.filter(s => s.id !== currentId);
  return (
    <section style={{ padding: isMobile ? '80px 5%' : '140px 5%', backgroundColor: '#f5f5f0', color: '#000', textAlign: 'center' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, textTransform: 'uppercase', color: '#121212', marginBottom: '1rem' }}>EXPLORE MORE SERVICES</h2>
        <p style={{ color: '#4a4a4a', fontSize: '1rem', marginBottom: '4rem', fontWeight: 500 }}>Discover more ways we can help you grow your brand.</p>
        <div className="services-grid-new" style={{ width: '100%' }}>
          {related.map(s => <ServiceCard key={s.id} s={s} />)}
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────────
   Pricing Card
   ────────────────────────────────────────────── */
const PricingCard = ({ plan, idx, isMobile }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div 
      layout
      onClick={() => isMobile && setIsExpanded(!isExpanded)}
      style={{ 
        padding: isMobile ? '1.5rem' : '2.2rem 1.8rem', 
        backgroundColor: idx === 1 ? 'rgba(167,139,250,0.05)' : 'rgba(255,255,255,0.02)', 
        borderRadius: '24px', 
        border: idx === 1 ? '1px solid rgba(167,139,250,0.3)' : '1px solid rgba(255,255,255,0.05)', 
        height: 'auto', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: isMobile ? 'pointer' : 'default',
        position: 'relative',
        backdropFilter: 'blur(10px)',
        transition: 'background-color 0.3s ease'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', margin: 0 }}>{plan.name}</h3>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: '0.2rem 0 0' }}>Perfect for growth</p>
        </div>
        {idx === 1 && (
          <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '0.3rem 0.6rem', background: '#a78bfa', color: '#000', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Popular
          </span>
        )}
      </div>

      <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'white', margin: '1.2rem 0' }}>
        {plan.price}<span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', fontWeight: 500, marginLeft: '0.4rem' }}>one-time</span>
      </div>

      {isMobile && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          color: '#a78bfa', 
          fontSize: '0.8rem', 
          fontWeight: 700, 
          borderTop: isExpanded ? 'none' : '1px dashed rgba(255,255,255,0.1)', 
          paddingTop: isExpanded ? '0' : '1rem', 
          marginTop: isExpanded ? '0' : '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {isExpanded ? 'Tap to close' : 'Tap to know more'} 
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      )}

      <AnimatePresence>
        {(!isMobile || isExpanded) && (
          <motion.div
            initial={isMobile ? { height: 0, opacity: 0 } : {}}
            animate={isMobile ? { height: 'auto', opacity: 1 } : {}}
            exit={isMobile ? { height: 0, opacity: 0 } : {}}
            style={{ overflow: 'hidden' }}
          >
            <ul style={{ listStyle: 'none', padding: isMobile ? '1.2rem 0' : '0', margin: '1rem 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem', borderTop: isMobile ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              {plan.features.map((f, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(167,139,250,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={10} color="#a78bfa" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={(e) => { e.stopPropagation(); navigate('/'); }} 
              style={{ 
                width: '100%', 
                padding: '1rem', 
                borderRadius: '14px', 
                border: 'none', 
                background: idx === 1 ? '#a78bfa' : '#fff', 
                color: '#000', 
                fontWeight: 800, 
                cursor: 'pointer', 
                fontSize: '0.85rem',
                transition: '0.3s ease',
                marginBottom: isMobile ? '1.2rem' : '0'
              }}
            >
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ──────────────────────────────────────────────
   Main Service Page
   ────────────────────────────────────────────── */
const ServicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find(s => s.id === id);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 968 : false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => setIsMobile(window.innerWidth <= 968);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [id]);

  if (!service) return null;
  const IconComponent = iconMap[service.icon] || Zap;

  return (
    <div style={{ backgroundColor: '#000', color: 'white', minHeight: '100vh' }}>
      <SEO pageTitle={service.seo?.pageTitle || service.title} description={service.seo?.metaDescription || service.description} />
      
      <section style={{ 
        minHeight: '100vh', 
        padding: '100px 5%', 
        textAlign: 'center', 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(167,139,250,0.05) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            style={{ 
              fontSize: isMobile ? 'clamp(1.2rem, 7.5vw, 2rem)' : 'clamp(2.2rem, 7vw, 4.2rem)', 
              fontWeight: 900, 
              lineHeight: 0.9, 
              letterSpacing: isMobile ? '-0.05em' : '-0.04em', 
              background: 'linear-gradient(to bottom, #fff 40%, #a78bfa)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              margin: 0, 
              textTransform: 'uppercase', 
              width: '100%', 
              padding: isMobile ? '0 2%' : '0 1rem'
            }}
          >
            {service.title.split(' ').map((word, i) => (<span key={i} style={{ display: 'block' }}>{word}</span>))}
          </motion.h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', marginTop: '1.8rem', maxWidth: '550px', margin: '1.8rem auto 0' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa', flexShrink: 0 }}><IconComponent size={18} /></div>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.45)', textAlign: 'left', margin: 0, lineHeight: 1.4 }}>{service.description}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '2.5rem', justifyContent: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
            <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/')} style={{ padding: '0.8rem 2.2rem', borderRadius: '100px', background: '#fff', color: '#000', border: 'none', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>Free Strategy Call <ArrowUpRight size={16} /></motion.button>
            <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/')} style={{ padding: '0.8rem 2.2rem', borderRadius: '100px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>Book Consultation</motion.button>
          </div>
        </div>
      </section>

      <ExpertInsightSection service={service} isMobile={isMobile} />

      <section style={{ padding: isMobile ? '60px 5%' : '80px 5%', backgroundColor: '#050508' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: '#a78bfa', fontWeight: 700, letterSpacing: '0.2em', fontSize: '0.65rem' }}>CORE OFFERINGS</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 850, marginTop: '0.4rem', letterSpacing: '-0.02em' }}>Engineered for Growth</h2>
          </div>
          <div style={{ 
            display: isMobile ? 'flex' : 'grid', 
            gridTemplateColumns: isMobile ? 'none' : 'repeat(3, 1fr)', 
            gap: isMobile ? '1rem' : '1.2rem', 
            maxWidth: '1100px', 
            margin: '0 auto',
            overflowX: isMobile ? 'auto' : 'visible',
            scrollSnapType: isMobile ? 'x mandatory' : 'none',
            WebkitOverflowScrolling: 'touch',
            padding: isMobile ? '0 5% 20px 5%' : '0'
          }} className="no-scrollbar">
            {service.subItems.map((item, idx) => {
              const lowerTitle = item.title.toLowerCase();
              let Icon = Zap;
              if (lowerTitle.includes('web') || lowerTitle.includes('app')) Icon = Code;
              if (lowerTitle.includes('e-com') || lowerTitle.includes('shop')) Icon = Rocket;
              if (lowerTitle.includes('design') || lowerTitle.includes('responsive')) Icon = Palette;
              if (lowerTitle.includes('seo') || lowerTitle.includes('search')) Icon = Shield;
              if (lowerTitle.includes('api') || lowerTitle.includes('database')) Icon = Database;
              if (lowerTitle.includes('perf') || lowerTitle.includes('speed')) Icon = Zap;
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 15 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: idx * 0.05 }} 
                  whileHover={isMobile ? {} : { y: -5, backgroundColor: 'rgba(167, 139, 250, 0.08)', borderColor: 'rgba(167, 139, 250, 0.3)' }} 
                  style={{ 
                    padding: isMobile ? '2.2rem 1.8rem' : '1.8rem 1.5rem', 
                    backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                    border: '1px solid rgba(255, 255, 255, 0.05)', 
                    borderRadius: '22px', 
                    position: 'relative', 
                    overflow: 'hidden', 
                    backdropFilter: 'blur(10px)', 
                    transition: 'all 0.3s ease',
                    minWidth: isMobile ? '88%' : 'auto',
                    scrollSnapAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.2rem'
                  }}
                >
                  <div style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', fontSize: '1.8rem', fontWeight: 900, color: 'rgba(255, 255, 255, 0.03)', lineHeight: 1 }}>0{idx + 1}</div>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(167, 139, 250, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa', marginBottom: '1.2rem' }}><Icon size={18} /></div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', marginBottom: '0.6rem', letterSpacing: '-0.01em' }}>{item.title}</h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{item.description}</p>
                </motion.div>
              );
            })}
          </div>

          {isMobile && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              {service.subItems.map((_, i) => (
                <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(167,139,250,0.3)' }}></div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{ padding: isMobile ? '60px 5%' : '70px 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#a78bfa', fontWeight: 700, letterSpacing: '0.2em', fontSize: '0.65rem' }}>PRICING</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 850, marginTop: '0.4rem' }}>Transparent Investment</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.2rem' }}>{service.plans.map((p, i) => <PricingCard key={i} plan={p} idx={i} isMobile={isMobile} />)}</div>
        </div>
      </section>

      <section style={{ padding: isMobile ? '60px 5%' : '100px 5%', backgroundColor: '#050508' }}>
        <ServiceFAQ faqs={service.faqs} isMobile={isMobile} />
      </section>
      
      <RelatedServices currentId={id} isMobile={isMobile} />
      <Footer />

      <style>{`
        .services-grid-new { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
        @media (max-width: 768px) { .services-grid-new { grid-template-columns: 1fr; } }
        .modern-service-card { background-color: #ebeae4; min-height: 400px; transition: background-color 0.4s ease; }
        @media (max-width: 768px) { .modern-service-card { min-height: 250px !important; } }
        .modern-service-card:hover { background-color: #8763df; }
        .card-giant-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-size: clamp(1.2rem,3.5vw,2.8rem); font-weight: 900; color: #121212; line-height: 1; letter-spacing: -0.02em; pointer-events: none; transition: left 0.7s cubic-bezier(0.8,0,0.2,1), transform 0.7s cubic-bezier(0.8,0,0.2,1), opacity 0.5s ease; z-index: 1; width: 100%; text-align: center; }
        .modern-service-card:hover .card-giant-text { left: 100%; transform: translate(0%,-50%); opacity: 0.05; }
        .card-hover-content { opacity: 0; transform: translateY(20px) scale(0.95); transition: opacity 0.4s ease, transform 0.4s ease; display: flex; flex-direction: column; align-items: center; gap: 1rem; z-index: 5; padding: 0 8%; text-align: center; }
        .modern-service-card:hover .card-hover-content { opacity: 1; transform: translateY(0) scale(1); transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s; }
        .blob-icon-wrapper { width: 90px; height: 90px; background-color: #ffcc00; border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; display: flex; justify-content: center; align-items: center; animation: morph-blob 8s ease-in-out infinite alternate; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        @keyframes morph-blob { 0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; } 33% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; } 66% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; } 100% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; } }
        .card-hover-desc { color: #ffffff; font-size: 0.9rem; font-weight: 600; line-height: 1.5; margin: 0; }
      `}</style>
    </div>
  );
};

export default ServicePage;
