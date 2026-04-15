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
const AnswerBlock = ({ answerBlock }) => {
  if (!answerBlock) return null;
  return (
    <div 
      itemScope 
      itemType="https://schema.org/Question"
      style={{
        maxWidth: '800px',
        margin: '0 auto 2rem',
        padding: 'clamp(1.25rem, 3vw, 2rem)',
        backgroundColor: 'rgba(132, 0, 255, 0.06)',
        border: '1px solid rgba(132, 0, 255, 0.15)',
        borderRadius: '20px',
      }}
    >
      <h2 
        itemProp="name"
        style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}
      >
        {answerBlock.question}
      </h2>
      <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
        <p 
          itemProp="text"
          style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', lineHeight: 1.7, margin: 0 }}
        >
          {answerBlock.answer}
        </p>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   FAQ Accordion for Service Pages
   ────────────────────────────────────────────── */
const ServiceFAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0);
  if (!faqs || faqs.length === 0) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)' }}>
        <span className="accent-gradient" style={{ fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.7rem', display: 'block', marginBottom: '0.75rem' }}>
          FAQ
        </span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#0a0a0c', marginBottom: '0.5rem' }}>
          Frequently Asked Questions
        </h2>
      </div>

      <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        {faqs.map((faq, idx) => (
          <div key={idx} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
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
                padding: 'clamp(0.9rem, 2vw, 1.25rem) 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#0a0a0c',
                textAlign: 'left',
                gap: '1rem',
              }}
            >
              <h3 style={{
                fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)', fontWeight: 600, margin: 0, lineHeight: 1.4, flex: 1,
              }}>
                {faq.question}
              </h3>
              <motion.div
                animate={{ rotate: openIndex === idx ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ flexShrink: 0, color: '#8400ff' }}
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
                    color: '#555',
                    fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
                    lineHeight: 1.7,
                    paddingBottom: 'clamp(0.9rem, 2vw, 1.25rem)',
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
const RelatedServices = ({ currentId }) => {
  const related = servicesData.filter(s => s.id !== currentId);
  const currentService = servicesData.find(s => s.id === currentId);
  const linkedIds = currentService?.relatedServices || [];
  const linkedServices = related.filter(s => linkedIds.includes(s.id));
  const displayServices = linkedServices.length >= 2 ? linkedServices : related.slice(0, 2);

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto 0', width: '100%' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0a0a0c', marginBottom: '1rem', textAlign: 'center', letterSpacing: '0.05em' }}>
        Explore More Services
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {displayServices.map((s) => {
          const Icon = iconMap[s.icon] || Zap;
          return (
            <Link
              key={s.id}
              to={`/services/${s.id}`}
              style={{ textDecoration: 'none' }}
              aria-label={`Explore TalentElla's ${s.title} — ${s.seo?.primaryKeyword || 'marketing'} services`}
            >
              <motion.div
                whileHover={{ y: -4, backgroundColor: '#f0ecf9' }}
                style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: '16px',
                  backgroundColor: '#fff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  backgroundColor: 'rgba(132, 0, 255, 0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#8400ff', flexShrink: 0
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0a0a0c', fontSize: '0.95rem' }}>{s.title}</div>
                  <div style={{ color: '#888', fontSize: '0.75rem', marginTop: '0.2rem' }}>{s.seo?.primaryKeyword}</div>
                </div>
              </motion.div>
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

const PricingCard = ({ plan, idx }) => {
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
        padding: '2.5rem 2rem', 
        backgroundColor: idx === 1 ? '#0a0a0c' : 'white', 
        color: idx === 1 ? 'white' : '#0a0a0c',
        borderRadius: '32px', 
        border: '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        position: 'relative',
        cursor: 'pointer'
      }}
    >
      {idx === 1 && <span style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', backgroundColor: '#8400ff', color: 'white', padding: '0.35rem 1rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 800 }}>MOST POPULAR</span>}
      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.2rem', marginTop: '0' }}>{plan.name}</h3>
      {plan.subtitle && <p style={{ fontSize: '0.85rem', color: idx === 1 ? '#aaa' : '#777', margin: '0 0 1rem 0' }}>{plan.subtitle}</p>}
      
      <div className="pricing-value" style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0.4rem 0', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        {plan.price}
        {plan.billing && <span style={{ fontSize: '1rem', fontWeight: 500, color: idx === 1 ? '#888' : '#888' }}>{plan.billing}</span>}
      </div>
      
      <div className="know-more-mobile" style={{ 
        width: '100%', 
        marginTop: '0.5rem',
        paddingTop: '0.8rem',
        borderTop: `1px dashed ${idx === 1 ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`,
        color: idx === 1 ? '#fff' : '#0a0a0c',
        fontWeight: 700,
        fontSize: '0.85rem',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        Tap to know more <span style={{ color: '#8400ff', fontSize: '1rem' }}>↓</span>
      </div>
      
      <div className="pricing-features-wrap" style={{ width: '100%' }}>
        <div style={{ width: '100%', height: '1px', backgroundColor: idx === 1 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', margin: '1.25rem 0' }}></div>
        
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%' }}>
          {plan.features.map((feature, fIdx) => (
            <li key={fIdx} style={{ fontSize: '0.9rem', color: idx === 1 ? '#bbb' : '#555', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.6rem' }}>
              <Check size={16} style={{ color: '#8400ff', flexShrink: 0 }} /> {feature}
            </li>
          ))}
        </ul>
        <button
          onClick={handleGetStarted}
          aria-label="Book a consultation for this plan"
          style={{ 
            width: '100%', 
            padding: '1rem', 
            borderRadius: '100px', 
            border: 'none', 
            backgroundColor: idx === 1 ? 'white' : '#0a0a0c', 
            color: idx === 1 ? '#0a0a0c' : 'white',
            fontWeight: 800,
            cursor: 'pointer',
            fontSize: '0.9rem'
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

      {/* 1. Internal Header Section */}
      <section className="svc-header-section" style={{ backgroundColor: '#0c0c10', paddingTop: 'clamp(130px, 18vh, 180px)', paddingBottom: 'clamp(80px, 12vh, 120px)' }}>
        <style>{`
          @media (max-width: 768px) {
            .svc-header-section { padding-top: 160px !important; padding-bottom: 80px !important; }
          }
        `}</style>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Breadcrumb navigation */}
              <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
                <ol style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.75rem', color: '#888' }}>
                  <li><Link to="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link></li>
                  <li style={{ color: '#555' }}>/</li>
                  <li><span style={{ color: '#8400ff' }}>{service.title}</span></li>
                </ol>
              </nav>

              <div style={{ 
                color: '#8400ff', 
                fontSize: '0.8rem', 
                fontWeight: 800, 
                letterSpacing: '0.4em', 
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ width: '40px', height: '1px', backgroundColor: '#8400ff' }}></div>
                SERVICE // {service.id.toUpperCase().replace(/-/g, ' ')}
              </div>
              
              {/* SEO: H1 with primary keyword */}
              <h1 className="hero-title-shimmer" style={{ 
                fontSize: 'clamp(1.8rem, 7vw, 6.5rem)', 
                fontWeight: 800, 
                marginBottom: '2.5rem', 
                lineHeight: 1.1,
                textAlign: 'left',
                wordWrap: 'break-word'
              }}>
                {service.title}
              </h1>

              <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }} className="flex-col-mobile">
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '16px', 
                  backgroundColor: 'rgba(132, 0, 255, 0.1)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#8400ff',
                  flexShrink: 0
                }}>
                  <IconComponent size={32} />
                </div>
                <p style={{ fontSize: '1.25rem', color: '#888', lineHeight: '1.7', maxWidth: '750px', textAlign: 'left' }}>
                  {service.description}
                </p>
              </div>

              {/* GEO: Answer-first block */}
              <div style={{ marginTop: '2.5rem' }}>
                <AnswerBlock answerBlock={service.answerBlock} />
              </div>

              {/* CTA */}
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
                  }}
                  aria-label="Get a free strategy call for this service"
                  style={{
                    padding: '14px 32px',
                    borderRadius: '100px',
                    background: 'white',
                    color: '#0a0a0c',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    letterSpacing: '0.03em',
                  }}
                >
                  Get a Free Strategy Call
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
                  }}
                  aria-label="Book a consultation"
                  style={{
                    padding: '14px 32px',
                    borderRadius: '100px',
                    background: 'transparent',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    letterSpacing: '0.03em',
                  }}
                >
                  Let's Grow Your Brand
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

      {/* 1.5 Offerings Section */}
      <OfferingsSection service={service} />

      {/* 1.6 FAQ Section */}
      <ServiceFAQSection faqs={service.faqs} />

      {/* 1.7 Related Services Section */}
      <RelatedServicesSectionComp currentId={service.id} />

      {/* 3. Pricing Section */}
      <PricingSection service={service} pricingRef={pricingRef} />

      {/* Footer */}
      <Footer />

    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   Sticky sub-components for ServicePage
   ───────────────────────────────────────────────────────────────────────── */

const OfferingsSection = ({ service }) => {
  const outerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start end', 'start start'] });
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);
  return (
    <div ref={outerRef} className="sticky-outer" style={{ zIndex: 15 }}>
      <motion.section className="sticky-section" style={{ backgroundColor: '#f8f9fc', borderTop: '1px solid rgba(0,0,0,0.05)', borderTopLeftRadius: borderRad, borderTopRightRadius: borderRad }}>
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '10vh 0' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
            <div style={{ textAlign: 'center', paddingBottom: '4vh' }}>
              <h2 className="hero-title-shimmer-dark" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '0.5rem' }}>How we deliver value</h2>
              <p style={{ color: '#55555f', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Specific specializations tailored to scaling your digital footprint efficiently.</p>
            </div>
            <div className="value-grid-fix" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '2rem' }}>
              {service.subItems.map((item, idx) => (
                <motion.div key={idx} initial="initial" whileInView="view" whileHover="hover" viewport={{ once: true }}
                  variants={{ initial: { opacity: 0, x: -25, y: 15, backgroundColor: '#ffffff' }, view: { opacity: 1, x: 0, y: 0, backgroundColor: '#ffffff', transition: { delay: idx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }, hover: { scale: 1.03, x: 10, backgroundColor: '#8763df', borderColor: 'transparent', boxShadow: '0 20px 40px rgba(135,99,223,0.3)' } }}
                  className="value-card" style={{ padding: '1.5rem 2.5rem', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1.5rem', backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '24px', cursor: 'pointer', transition: 'background-color 0.4s ease, border-color 0.4s ease' }}
                >
                  <motion.div variants={{ initial: { scale: 0, rotate: -45, backgroundColor: 'rgba(132,0,255,0.08)' }, view: { scale: 1, rotate: 0, backgroundColor: 'rgba(132,0,255,0.08)', transition: { delay: idx * 0.08 + 0.2, type: 'spring', damping: 12 } }, hover: { scale: 1.1, backgroundColor: 'rgba(255,255,255,0.25)' } }} className="value-icon" style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MotionCheck size={20} variants={{ initial: { color: '#8400ff' }, view: { color: '#8400ff' }, hover: { color: '#ffffff' } }} />
                  </motion.div>
                  <motion.h3 variants={{ initial: { color: '#0a0a0c' }, view: { color: '#0a0a0c' }, hover: { color: '#ffffff' } }} style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}>{item}</motion.h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

const ServiceFAQSection = ({ faqs }) => {
  const outerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start end', 'start start'] });
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);
  return (
    <div ref={outerRef} className="sticky-outer" style={{ zIndex: 20 }}>
      <motion.section className="sticky-section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.05)', borderTopLeftRadius: borderRad, borderTopRightRadius: borderRad }}>
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '10vh 0' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
            <ServiceFAQ faqs={faqs} />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

const RelatedServicesSectionComp = ({ currentId }) => {
  const outerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start end', 'start start'] });
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);
  return (
    <div ref={outerRef} className="sticky-outer" style={{ zIndex: 25 }}>
      <motion.section className="sticky-section" style={{ backgroundColor: '#f8f9fc', borderTop: '1px solid rgba(0,0,0,0.05)', borderTopLeftRadius: borderRad, borderTopRightRadius: borderRad }}>
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '10vh 0' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
            <RelatedServices currentId={currentId} />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

const PricingSection = ({ service, pricingRef: externalRef }) => {
  const outerRef = useRef(null);
  const setRefs = (el) => { outerRef.current = el; if (externalRef) externalRef.current = el; };
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start end', 'start start'] });
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);
  return (
    <div ref={setRefs} className="sticky-outer" style={{ zIndex: 30 }}>
      <motion.section className="sticky-section pricing-section-fix" style={{ backgroundColor: '#f8f9fc', borderTop: '1px solid rgba(0,0,0,0.05)', borderTopLeftRadius: borderRad, borderTopRightRadius: borderRad, color: '#0a0a0c' }}>
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: 'clamp(60px,10vh,100px) 0 clamp(40px,6vh,80px)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
            <p style={{ color: '#8400ff', textAlign: 'center', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {service.id === 'visual-identity-design' ? 'BRANDING SERVICES' : service.title.toUpperCase()}
            </p>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: '0', color: '#0a0a0c', lineHeight: 1.2 }}>
              {service.id === 'website-development' ? 'Choose a perfect plan' : service.id === 'social-media-management' ? 'Monthly Packages' : service.id === 'visual-identity-design' ? 'Build Your Brand Identity' : 'Subscription Plans'}
            </h2>
            <p style={{ color: '#55555f', textAlign: 'center', marginBottom: '2.5rem', fontSize: '1.1rem', marginTop: '0.5rem' }}>
              Transparent pricing in INR — no hidden fees. All plans include dedicated support.
            </p>
            <div className="auto-grid pricing-grid-fix" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', width: '100%' }}>
              {service.plans.map((plan, idx) => <PricingCard key={idx} plan={plan} idx={idx} />)}
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

export default ServicePage;
