import React from 'react';
import { ArrowLeft, Check, Code, Share2, Palette, Settings, Zap, ArrowUpRight, Shield, Database, LifeBuoy, Rocket, ChevronDown } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import SEO, { generateFAQSchema, generateServiceSchema } from '../components/SEO';
import Footer from '../components/Footer';
import SocialMediaPortfolio from '../components/SocialMediaPortfolio';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const MotionCheck = motion.create(Check);

const iconMap = {
  Code,
  Share2,
  Palette,
  Settings
};

/* ──────────────────────────────────────────────
   GEO: Answer-First Block for AI citation
   ────────────────────────────────────────────── */
// Removed standalone AnswerBlock to merge into hero

/* ──────────────────────────────────────────────
   FAQ Accordion for Service Pages
   ────────────────────────────────────────────── */
const ServiceFAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0);
  if (!faqs || faqs.length === 0) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: 'clamp(1rem, 2vh, 1.8rem)' }}>
        <span className="accent-gradient" style={{ fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.65rem', display: 'block', marginBottom: '0.4rem' }}>
          FAQ
        </span>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, color: '#ffffff', marginBottom: '0.2rem', lineHeight: 1.15 }}>
          Frequently Asked Questions
        </h2>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        {faqs.map((faq, idx) => (
          <div key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
            <button
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`svc-faq-answer-${idx}`}
              id={`svc-faq-question-${idx}`}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'clamp(0.75rem, 1.5vw, 1rem) 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#0a0a0c',
                textAlign: 'left',
                gap: '1rem',
              }}
            >
              <h3 style={{
                fontSize: 'clamp(0.9rem, 2.8vw, 1.05rem)', fontWeight: 700, margin: 0, lineHeight: 1.4, flex: 1, color: '#ffffff'
              }}>
                {faq.question}
              </h3>
              <motion.div
                animate={{ rotate: openIndex === idx ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ flexShrink: 0, color: '#8400ff', opacity: 0.8 }}
              >
                <ChevronDown size={18} />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  id={`svc-faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`svc-faq-question-${idx}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{
                    color: '#888',
                    fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
                    lineHeight: 1.6,
                    paddingBottom: 'clamp(0.6rem, 1.5vw, 1rem)',
                    margin: 0,
                    maxWidth: '750px',
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
   Related Services (Internal Linking)
   ────────────────────────────────────────────── */
const RelatedServices = ({ currentId, isMobile }) => {
  const navigate = useNavigate();
  const related = servicesData.filter(s => s.id !== currentId);
  const currentService = servicesData.find(s => s.id === currentId);
  const linkedIds = currentService?.relatedServices || [];
  const linkedServices = related.filter(s => linkedIds.includes(s.id));
  const displayServices = linkedServices.length >= 2 ? linkedServices : related.slice(0, 2);

  return (
    <div style={{ maxWidth: '1200px', margin: '3rem auto 0', width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.2rem' }}>
        <h3 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.8rem)', fontWeight: 800, color: '#0a0a0c', marginBottom: '0.4rem', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          Explore More Services
        </h3>
        <p style={{ color: '#666', fontSize: '0.9rem', fontWeight: 500 }}>Discover more ways we can help you grow your brand.</p>
      </div>

      <style>{`
        .related-grid-fix {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          width: 100%;
        }
        .rel-card-modern {
          background-color: #ebeae4;
          min-height: 280px;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.4s ease;
          cursor: pointer;
          text-decoration: none;
        }
        .rel-card-modern:hover {
          background-color: #8763df;
        }
        .rel-giant-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(1.2rem, 3vw, 2.2rem);
          font-weight: 900;
          color: #121212;
          line-height: 1;
          letter-spacing: -0.02em;
          text-align: center;
          width: 100%;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
          text-transform: uppercase;
        }
        .rel-card-modern:hover .rel-giant-text {
          opacity: 0.1;
          transform: translate(-50%, -100%);
        }
        .rel-hover-content {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          z-index: 5;
          padding: 0 10%;
          text-align: center;
        }
        .rel-card-modern:hover .rel-hover-content {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.15s;
        }
        .rel-blob-icon {
          width: 60px;
          height: 60px;
          background-color: #ffcc00;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          margin-bottom: 0.5rem;
        }
        .rel-hover-desc {
          color: #fff;
          font-size: 0.85rem;
          font-weight: 600;
          line-height: 1.4;
          margin: 0;
        }
        @media (max-width: 768px) {
          .related-grid-fix {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .rel-card-modern {
            min-height: 180px;
          }
          .rel-giant-text {
            font-size: 1.5rem !important;
          }
        }
      `}</style>

      <div className="related-grid-fix">
        {displayServices.map((s) => {
          const Icon = iconMap[s.icon] || Zap;
          const displayTitle = s.title.toUpperCase().split(' ').map((word, idx) => (
            <React.Fragment key={idx}>{word}<br /></React.Fragment>
          ));
          return (
            <Link
              key={s.id}
              to={`/services/${s.id}`}
              className="rel-card-modern"
              onClick={() => window.scrollTo(0, 0)}
            >
              <div className="rel-giant-text">{displayTitle}</div>
              <div className="rel-hover-content">
                <div className="rel-blob-icon">
                  <Icon size={32} color="#000" strokeWidth={2.5} />
                </div>
                <p className="rel-hover-desc">{s.description}</p>
                <div style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 800, marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  VIEW DETAILS <ArrowUpRight size={14} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const PortfolioCard = ({ work, index, total, scrollProgress, exitPoint }) => {
  const gap = (exitPoint - 0.05) / Math.max(1, total - 1);
  
  const start = index === 0 ? 0 : 0.05 + (index - 1) * gap;
  const end = index === 0 ? 0.05 : 0.05 + index * gap;
  
  const y = useTransform(scrollProgress, [start, end], [index === 0 ? 0 : 800, 0]);
  const scale = useTransform(scrollProgress, [start, end], [index === 0 ? 1 : 0.94, 1]);
  
  const nextStart = end;
  const nextEnd = Math.min(1, nextStart + 0.1);
  const stackScale = useTransform(scrollProgress, [nextStart, nextEnd], [1, 0.96]);
  const stackY = useTransform(scrollProgress, [nextStart, nextEnd], [0, -20]);
  const combinedScale = useTransform(() => stackScale.get() * scale.get());

  return (
    <motion.div 
      style={{ 
        position: 'absolute', 
        top: `calc(12vh + ${index * 2.5}rem)`,
        left: '50%',
        x: '-50%',
        width: '90%', 
        maxWidth: '1100px', 
        zIndex: 10 + index,
        y,
        scale: combinedScale,
        translateY: stackY,
        willChange: 'transform'
      }}
    >
      <div 
        className="mobile-padding-sm"
        style={{ 
          backgroundColor: '#050508', 
          borderRadius: '32px', 
          border: '1px solid rgba(255, 255, 255, 0.18)',
          padding: 'clamp(1.25rem, 4vw, 3rem)',
          boxShadow: '0 60px 120px rgba(0,0,0,1)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div className="flex-col-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 900, opacity: 0.15, lineHeight: 1, color: 'white' }}>0{index + 1}</span>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#8400ff', display: 'block', marginBottom: '0.6rem', opacity: 0.6 }}>Case Study</span>
              <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>{work.title}</h3>
            </div>
          </div>
          <motion.a 
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, backgroundColor: 'white', color: 'black' }}
            style={{ 
              padding: '1rem 2.2rem', 
              borderRadius: '100px', 
              border: '1px solid rgba(255,255,255,0.15)', 
              background: 'transparent', 
              color: 'white', 
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            EXPLORE <ArrowUpRight size={20} />
          </motion.a>
        </div>

        <div style={{ 
          width: '100%', 
          aspectRatio: '2/1.05', 
          borderRadius: '20px', 
          overflow: 'hidden',
          backgroundColor: '#111',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          position: 'relative'
        }}>
          <img 
            src={work.image} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            alt={work.alt || `${work.title} — project by TalentElla, India's 360° marketing agency`}
            loading="lazy"
          />
        </div>
        <div style={{ marginTop: '2.5rem' }}>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: '1.6', maxWidth: '850px' }}>{work.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const PricingCard = ({ plan, idx, isMobile }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = (e) => {
    e.stopPropagation();
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`pricing-card ${expanded ? 'expanded' : ''}`}
      onClick={() => setExpanded(!expanded)}
      style={{ 
        padding: '1.25rem', 
        backgroundColor: idx === 1 ? '#0a0a0c' : 'white', 
        color: idx === 1 ? 'white' : '#0a0a0c',
        borderRadius: '28px', 
        border: idx === 1 ? '1px solid rgba(132, 0, 255, 0.3)' : '1px solid rgba(0,0,0,0.05)',
        boxShadow: idx === 1 ? '0 30px 60px rgba(132, 0, 255, 0.2)' : '0 20px 60px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        position: 'relative',
        cursor: 'pointer',
        width: '100%',
        minHeight: 'auto'
      }}
    >
      {idx === 1 && (
        <span style={{ 
          position: 'absolute', 
          top: '-12px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          backgroundColor: '#8400ff', 
          color: 'white', 
          padding: '0.4rem 1rem', 
          borderRadius: '100px', 
          fontSize: '0.65rem', 
          fontWeight: 900, 
          letterSpacing: '0.05em',
          boxShadow: '0 4px 15px rgba(132, 0, 255, 0.4)',
          whiteSpace: 'nowrap',
          zIndex: 10
        }}>
          MOST POPULAR
        </span>
      )}
      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.1rem', marginTop: '0', fontWeight: 850, lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '100%' }}>{plan.name}</h3>
      {plan.subtitle && <p style={{ fontSize: '0.75rem', color: idx === 1 ? '#888' : '#777', margin: '0 0 0.4rem 0', fontWeight: 500 }}>{plan.subtitle}</p>}
      
      <div className="pricing-value" style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0.1rem 0', display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
        {plan.price}
        {plan.billing && <span style={{ fontSize: '0.7rem', fontWeight: 500, color: idx === 1 ? '#666' : '#888' }}>{plan.billing}</span>}
      </div>
      
      <div className="know-more-mobile" style={{ 
        width: '100%', 
        marginTop: '0.4rem',
        paddingTop: '0.6rem',
        borderTop: `1px dashed ${idx === 1 ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`,
        color: idx === 1 ? '#fff' : '#0a0a0c',
        fontWeight: 700,
        fontSize: '0.78rem',
        display: isMobile ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.4rem'
      }}>
        {expanded ? 'Tap again to close' : 'Tap to know more'} 
        <span style={{ 
          color: '#8400ff', 
          fontSize: '0.9rem',
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease',
          display: 'inline-block'
        }}>
          ↓
        </span>
      </div>
      
      <div className="pricing-features-wrap" style={{ width: '100%' }}>
        <div style={{ width: '100%', height: '1px', backgroundColor: idx === 1 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', margin: '1rem 0' }}></div>
        
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0.8rem 0', display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%' }}>
          {plan.features.map((feature, fIdx) => (
            <li key={fIdx} style={{ fontSize: '0.82rem', color: idx === 1 ? '#aaa' : '#555', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.5rem' }}>
              <Check size={14} style={{ color: '#8400ff', flexShrink: 0 }} /> {feature}
            </li>
          ))}
        </ul>
        <button
          onClick={handleGetStarted}
          aria-label="Book a consultation for this plan"
          style={{ 
            width: '100%', 
            padding: '0.7rem', 
            borderRadius: '100px', 
            border: 'none', 
            backgroundColor: idx === 1 ? 'white' : '#0a0a0c', 
            color: idx === 1 ? '#0a0a0c' : 'white',
            fontWeight: 800,
            cursor: 'pointer',
            fontSize: '0.78rem'
          }}
        >
          Book a Consultation
        </button>
      </div>
    </motion.div>
  );
};

const ServicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find(s => s.id === id);
  const pricingRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  if (!service) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <h1 className="text-gradient">Service Not Found</h1>
        <Link to="/" style={{ color: 'var(--accent)', marginTop: '1rem' }}>Back to Home</Link>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon] || Zap;

  // Generate SEO data
  const seo = service.seo || {};
  const faqSchema = service.faqs ? generateFAQSchema(service.faqs) : null;
  const serviceSchemaData = generateServiceSchema({
    name: service.title,
    description: service.description,
    offers: service.plans ? {
      lowPrice: Math.min(...service.plans.map(p => p.priceNum || 0)),
      highPrice: Math.max(...service.plans.map(p => p.priceNum || 0)),
      count: service.plans.length,
    } : null,
  });
  const breadcrumbs = [
    { name: 'Home', url: 'https://talentella.in/' },
    { name: 'Services', url: 'https://talentella.in/' },
    { name: service.title, url: `https://talentella.in/services/${service.id}/` },
  ];

  return (
    <div style={{ backgroundColor: '#050508', position: 'relative' }}>
      {/* ── SEO Head ── */}
      <SEO
        pageTitle={seo.pageTitle || service.title}
        description={seo.metaDescription || service.description}
        keywords={seo.keywords || ''}
        url={`https://talentella.in/services/${service.id}`}
        faqSchema={faqSchema}
        serviceSchema={serviceSchemaData}
        breadcrumbs={breadcrumbs}
      />

      {/* 1. Internal Header Section (Sticky) */}
      <ServiceHeroSection service={service} isMobile={isMobile} navigate={navigate} />

      {/* 1.5 Offerings Section */}
      <OfferingsSection service={service} isMobile={isMobile} />

      {/* 1.6 FAQ Section */}
      <ServiceFAQSection faqs={service.faqs} isMobile={isMobile} />

      {/* 1.7 Related Services Section */}
      <RelatedServicesSectionComp currentId={service.id} isMobile={isMobile} />

      {/* 3. Pricing Section */}
      <PricingSection service={service} pricingRef={pricingRef} isMobile={isMobile} />

      {/* Footer */}
      <Footer />

    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   Sticky sub-components for ServicePage
   ───────────────────────────────────────────────────────────────────────── */

const OfferingsSection = ({ service, isMobile }) => {
  const outerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start end', 'start start'] });
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);
  return (
    <div ref={outerRef} className="sticky-outer" style={{ zIndex: 15 }}>
      <motion.section className="sticky-section" style={{ backgroundColor: '#f5f5f0', borderTop: '1px solid rgba(0,0,0,0.05)', borderTopLeftRadius: borderRad, borderTopRightRadius: borderRad }}>
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '10vh 0' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
            <div style={{ textAlign: 'center', paddingBottom: isMobile ? '1.5vh' : '3vh' }}>
              <h2 className="hero-title-shimmer-dark" style={{ 
                fontSize: isMobile ? 'clamp(1.4rem, 5vw, 1.8rem)' : 'clamp(2.1rem, 4.5vw, 3.2rem)', 
                fontWeight: 800, 
                marginBottom: '0.4rem',
                lineHeight: 1.25,
                wordBreak: 'break-word',
                maxWidth: '100%'
              }}>
                How we deliver value
              </h2>
              <p style={{ color: '#55555f', fontSize: isMobile ? '0.85rem' : '1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
                Specific specializations tailored to scaling your digital footprint efficiently.
              </p>
            </div>
            <style>{`
              .value-grid-redesign {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1.25rem;
                margin-top: 3rem;
                max-width: 1200px;
                margin-left: auto;
                margin-right: auto;
              }
              @media (max-width: 1024px) {
                .value-grid-redesign {
                  grid-template-columns: repeat(2, 1fr) !important;
                  gap: 0.75rem;
                  margin-top: 2rem;
                }
              }
              @media (max-width: 480px) {
                .value-grid-redesign {
                  gap: 0.5rem;
                }
              }
            `}</style>
            <div className="value-grid-redesign">
              {service.subItems.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial="initial" 
                  whileInView="view" 
                  whileHover="hover" 
                  viewport={{ once: true }}
                  variants={{ 
                    initial: { opacity: 0, y: 20 }, 
                    view: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { delay: idx * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
                    }, 
                    hover: { 
                      y: isMobile ? 0 : -5,
                      backgroundColor: 'rgba(255,255,255,1)',
                      borderColor: '#8400ff',
                      boxShadow: '0 25px 50px rgba(132, 0, 255, 0.08)'
                    } 
                  }}
                  style={{ 
                    padding: isMobile ? '1rem' : '1.2rem 1rem', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start', 
                    gap: isMobile ? '0.5rem' : '0.6rem', 
                    backgroundColor: '#ffffff', 
                    border: '1px solid rgba(0,0,0,0.06)', 
                    borderRadius: isMobile ? '16px' : '20px', 
                    cursor: 'pointer', 
                    transition: 'all 0.4s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: isMobile ? '120px' : 'auto'
                  }}
                >
                  {/* Subtle Numbering */}
                  <div style={{ 
                    position: 'absolute', 
                    top: isMobile ? '0.8rem' : '1.2rem', 
                    right: isMobile ? '0.8rem' : '1.2rem', 
                    fontSize: isMobile ? '1.5rem' : '2rem', 
                    fontWeight: 900, 
                    opacity: 0.02, 
                    lineHeight: 1,
                    userSelect: 'none'
                  }}>
                    0{idx + 1}
                  </div>

                  <motion.div 
                    variants={{ 
                      initial: { scale: 0.8 }, 
                      view: { scale: 1 },
                      hover: { scale: 1.1, backgroundColor: '#8400ff', color: '#fff' }
                    }} 
                    style={{ 
                      width: isMobile ? '32px' : '36px', 
                      height: isMobile ? '32px' : '36px', 
                      borderRadius: isMobile ? '8px' : '10px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      flexShrink: 0,
                      backgroundColor: 'rgba(132,0,255,0.06)',
                      color: '#8400ff',
                      transition: 'all 0.4s ease'
                    }}
                  >
                    <MotionCheck size={isMobile ? 16 : 18} />
                  </motion.div>
                  
                  <div style={{ textAlign: 'left', zIndex: 1, width: '100%' }}>
                    <motion.h3 
                      style={{ 
                        fontSize: isMobile ? '1.25rem' : '1.05rem', 
                        fontWeight: 850, 
                        margin: '0.1rem 0 0.4rem', 
                        color: '#0a0a0c',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2
                      }}
                    >
                      {item}
                    </motion.h3>
                    <p style={{ color: '#666', fontSize: isMobile ? '0.9rem' : '0.8rem', lineHeight: 1.6, margin: 0 }}>
                      Focused on high-performance {service.title.toLowerCase()} results.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

const ServiceFAQSection = ({ faqs, isMobile }) => {
  const outerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start end', 'start start'] });
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);
  return (
    <div ref={outerRef} className="sticky-outer" style={{ zIndex: 20 }}>
      <motion.section className="sticky-section black-purple-gradient" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderTopLeftRadius: borderRad, borderTopRightRadius: borderRad }}>
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '10vh 0' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
            <ServiceFAQ faqs={faqs} />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

const RelatedServicesSectionComp = ({ currentId, isMobile }) => {
  const outerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start end', 'start start'] });
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);
  return (
    <div ref={outerRef} className="sticky-outer" style={{ zIndex: 25 }}>
      <motion.section className="sticky-section" style={{ backgroundColor: '#f5f5f0', borderTop: '1px solid rgba(0,0,0,0.05)', borderTopLeftRadius: borderRad, borderTopRightRadius: borderRad }}>
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '10vh 0' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
            <RelatedServices currentId={currentId} />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

const PricingSection = ({ service, pricingRef: externalRef, isMobile }) => {
  const outerRef = useRef(null);
  const setRefs = (el) => { outerRef.current = el; if (externalRef) externalRef.current = el; };
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start end', 'start start'] });
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);
  return (
    <div ref={setRefs} className="sticky-outer" style={{ zIndex: 30 }}>
      <motion.section className="sticky-section pricing-section-fix black-purple-gradient" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderTopLeftRadius: borderRad, borderTopRightRadius: borderRad, color: '#ffffff' }}>
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: isMobile ? '60px 0 6vh' : 'clamp(90px, 12vh, 140px) 0 6vh' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
            <p style={{ color: '#8400ff', textAlign: 'center', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {service.id === 'visual-identity-design' ? 'BRANDING SERVICES' : service.title.toUpperCase()}
            </p>
            <h2 style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3rem)', fontWeight: 800, textAlign: 'center', marginBottom: '0', color: '#ffffff', lineHeight: 1.25 }}>
              {service.id === 'website-development' ? 'Choose a perfect plan' : service.id === 'social-media-management' ? 'Monthly Packages' : service.id === 'visual-identity-design' ? 'Build Your Brand Identity' : 'Subscription Plans'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: '2rem', fontSize: '1rem', marginTop: '0.4rem' }}>
              Transparent pricing in INR — no hidden fees. All plans include dedicated support.
            </p>
            <style>{`
              .pricing-grid-responsive {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1.5rem;
                width: 100%;
                max-width: 1100px;
                margin: 0 auto;
              }
              .pricing-card-wrapper {
                display: flex;
                height: 100%;
              }
              .popular-offset {
                margin-top: 15px;
              }
              
              @media (max-width: 1024px) {
                .pricing-grid-responsive {
                  grid-template-columns: 1fr;
                  gap: 2.5rem;
                  max-width: 450px;
                }
                .popular-offset {
                  margin-top: 0;
                }
              }
            `}</style>

            <div className="pricing-grid-responsive">
              {service.plans.map((plan, idx) => (
                <div key={idx} className={`pricing-card-wrapper ${idx === 1 ? 'popular-offset' : ''}`}>
                  <PricingCard plan={plan} idx={idx} isMobile={isMobile} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

const MaintenanceSection = ({ data }) => {
  const localIconMap = { Shield, Database, Zap, LifeBuoy, Rocket };
  const outerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start end', 'start start'] });
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);
  return (
    <div ref={outerRef} className="sticky-outer" style={{ zIndex: 35 }}>
      <motion.section className="sticky-section maint-section-fix" style={{ backgroundColor: '#050508', color: 'white', borderTopLeftRadius: borderRad, borderTopRightRadius: borderRad, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(132,0,255,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '10vh 0', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
            <div className="maint-title-fix" style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>{data.title}</motion.h2>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
                Building the site is just the beginning. We ensure your digital assets remain fast, secure, and ahead of the curve.
              </motion.p>
            </div>
            <div className="maint-gap-fix" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
              {data.features.map((item, idx) => {
                const Icon = localIconMap[item.icon] || Shield;
                return (
                  <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.05)' }} className="maint-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.8rem 2rem', borderRadius: '28px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s ease', flex: '1 1 300px', maxWidth: '340px' }}>
                    <div className="maint-icon" style={{ width: '50px', height: '50px', borderRadius: '14px', backgroundColor: 'rgba(132,0,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8400ff', marginBottom: '1.5rem', flexShrink: 0 }}><Icon size={24} /></div>
                    <div className="maint-content">
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem' }}>{item.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
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

const ServiceHeroSection = ({ service, isMobile, navigate }) => {
  const IconComponent = iconMap[service.icon] || Zap;
  return (
    <div className="sticky-outer" style={{ zIndex: 10 }}>
      {/* Robust CSS for Hero Responsiveness */}
      <style>{`
        .hero-responsive-container {
          display: flex;
          flex-direction: row;
          gap: 4rem;
          align-items: flex-start;
          justify-content: space-between;
          width: 100%;
        }
        .hero-content-left {
          flex: 1.2;
          text-align: left;
        }
        .hero-insight-right {
          flex: 0.8;
          max-width: 450px;
          width: 100%;
        }
        .hero-title-responsive {
          font-size: clamp(2.5rem, 6vw, 4.2rem);
          line-height: 1.1;
          margin-bottom: 1.5rem;
          word-break: break-word; /* Prevent hangs */
        }
        .service-icon-box {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-buttons-grid {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          margin-top: 2rem;
        }
        
        @media (max-width: 1024px) {
          .hero-responsive-container {
            flex-direction: column;
            gap: 3rem;
          }
          .hero-content-left {
            text-align: center;
            width: 100%;
          }
          .hero-insight-right {
            max-width: 100%;
            align-self: stretch;
          }
          .hero-title-responsive {
            font-size: clamp(2.1rem, 8vw, 2.8rem);
            line-height: 1.15;
          }
          .hero-buttons-grid {
            flex-direction: column;
            width: 100%;
          }
          .hero-buttons-grid button {
            width: 100% !important;
          }
          .description-wrap {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .description-text {
            text-align: center !important;
            max-width: 100% !important;
          }
          .breadcrumb-nav {
            justify-content: center !important;
            display: flex !important;
          }
        }
      `}</style>

      <section className="sticky-section black-purple-gradient" style={{ height: '100dvh' }}>
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: 'clamp(80px, 12vh, 120px) 5% 6vh' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Breadcrumb navigation */}
              <nav aria-label="Breadcrumb" className="breadcrumb-nav" style={{ marginBottom: '1.2rem' }}>
                <ol style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.75rem', color: '#888' }}>
                  <li><Link to="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link></li>
                  <li style={{ color: '#555' }}>/</li>
                  <li><span style={{ color: '#8400ff', fontWeight: isMobile ? 700 : 400 }}>{service.title}</span></li>
                </ol>
              </nav>

              <div style={{ 
                color: '#8400ff', 
                fontSize: isMobile ? '0.7rem' : '0.8rem', 
                fontWeight: 800, 
                letterSpacing: '0.4em', 
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ width: isMobile ? '20px' : '40px', height: '1px', backgroundColor: '#8400ff' }}></div>
                SERVICE // {service.id.toUpperCase().replace(/-/g, ' ')}
              </div>
              
              {/* SEO: H1 with primary keyword */}
              <h1 className="hero-title-shimmer hero-title-responsive" style={{ 
                fontWeight: 800, 
                textAlign: 'inherit',
                maxWidth: '1200px'
              }}>
                {service.title}
              </h1>

              <div className="hero-responsive-container">
                {/* Primary Content */}
                <div className="hero-content-left">
                  <div className="description-wrap" style={{ 
                    display: 'flex', 
                    gap: '1.2rem', 
                    alignItems: 'flex-start', 
                    marginBottom: '1.5rem' 
                  }}>
                    <div className="service-icon-box" style={{ 
                      borderRadius: '12px', 
                      backgroundColor: 'rgba(132, 0, 255, 0.12)', 
                      color: '#a78bfa', flexShrink: 0,
                      border: '1px solid rgba(132, 0, 255, 0.2)'
                    }}>
                      <IconComponent size={24} />
                    </div>
                    <p className="description-text" style={{ 
                      fontSize: '1rem', 
                      color: '#e2e2e2', 
                      lineHeight: '1.6', 
                      fontWeight: 500, 
                      margin: 0,
                      maxWidth: '600px'
                    }}>
                      {service.description}
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="hero-buttons-grid">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigate('/');
                        setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
                      }}
                      style={{ 
                        padding: '12px 28px', 
                        borderRadius: '100px', 
                        background: 'white', 
                        color: '#0a0a0c', 
                        border: 'none', 
                        fontWeight: 800, 
                        fontSize: '0.82rem', 
                        cursor: 'pointer', 
                        letterSpacing: '0.03em',
                      }}
                    >
                      Free Strategy Call
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigate('/');
                        setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
                      }}
                      style={{ 
                        padding: '12px 28px', 
                        borderRadius: '100px', 
                        background: 'transparent', 
                        color: 'white', 
                        border: '1px solid rgba(255,255,255,0.2)', 
                        fontWeight: 700, 
                        fontSize: '0.82rem', 
                        cursor: 'pointer',
                      }}
                    >
                      Book Consultation
                    </motion.button>
                  </div>
                </div>

                {/* Right Side: Answer block / Insight */}
                {service.answerBlock && (
                  <motion.div
                    className="hero-insight-right"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    style={{ 
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '24px',
                      padding: '1.5rem 2rem',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '2rem', height: '2px', background: '#8400ff' }}></div>
                      <div style={{ paddingTop: '1.25rem' }} itemScope itemType="https://schema.org/Question">
                        <h2 itemProp="name" style={{ color: '#8400ff', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>
                          Key Insight
                        </h2>
                        <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                          <p itemProp="text" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                            {service.answerBlock.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
