import { ArrowLeft, Check, Code, Share2, Palette, Settings, Zap, ArrowUpRight, Shield, Database, LifeBuoy, Rocket } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import Footer from '../components/Footer';
import ReviewsSection from '../components/ReviewsSection';
import SocialMediaPortfolio from '../components/SocialMediaPortfolio';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const MotionCheck = motion.create(Check);

const iconMap = {
  Code,
  Share2,
  Palette,
  Settings
};

const PortfolioCard = ({ work, index, total, scrollProgress, exitPoint }) => {
  // Use the mathematically calculated exitPoint passed from parent
  const gap = (exitPoint - 0.05) / Math.max(1, total - 1);
  
  const start = index === 0 ? 0 : 0.05 + (index - 1) * gap;
  const end = index === 0 ? 0.05 : 0.05 + index * gap;
  
  // y: flying in effect
  const y = useTransform(scrollProgress, [start, end], [index === 0 ? 0 : 800, 0]);
  const scale = useTransform(scrollProgress, [start, end], [index === 0 ? 1 : 0.94, 1]);
  
  // Stacking/Scaling effect
  const nextStart = end;
  const nextEnd = Math.min(1, nextStart + 0.1);
  const stackScale = useTransform(scrollProgress, [nextStart, nextEnd], [1, 0.96]);
  const stackY = useTransform(scrollProgress, [nextStart, nextEnd], [0, -20]);
  const combinedScale = useTransform(() => stackScale.get() * scale.get());

  return (
    <motion.div 
      style={{ 
        position: 'absolute', 
        top: `calc(12vh + ${index * 2.5}rem)`, // Staggered offset mirroring internal logic
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
            alt={work.title}
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
        <button style={{ 
          width: '100%', 
          padding: '1rem', 
          borderRadius: '100px', 
          border: 'none', 
          backgroundColor: idx === 1 ? 'white' : '#0a0a0c', 
          color: idx === 1 ? '#0a0a0c' : 'white',
          fontWeight: 800,
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}>
          GET STARTED
        </button>
      </div>
    </motion.div>
  );
};

const ServicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find(s => s.id === id);
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: borderPortfolioProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });
  const borderPortfolioRad = useTransform(borderPortfolioProgress, [0, 1], ["60px", "0px"]);

  const pricingRef = useRef(null);
  const { scrollYProgress: borderPricingProgress } = useScroll({
    target: pricingRef,
    offset: ["start end", "start start"]
  });
  const borderPricingRad = useTransform(borderPricingProgress, [0, 1], ["60px", "0px"]);

  if (!service) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <h1 className="text-gradient">Service Not Found</h1>
        <Link to="/" style={{ color: 'var(--accent)', marginTop: '1rem' }}>Back to Home</Link>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon] || Zap;

  return (
    <div style={{ backgroundColor: '#050508', position: 'relative' }}>
      
      {/* 1. Internal Header Section */}
      <div style={{ position: 'relative', minHeight: '200vh', zIndex: 10 }}>
        <section className="section-overlap svc-header-section" style={{ backgroundColor: '#0c0c10', paddingTop: 'clamp(130px, 18vh, 180px)', paddingBottom: 'clamp(80px, 12vh, 120px)' }}>
          <style>{`
            @media (max-width: 768px) {
              .svc-header-section {
                padding-top: 160px !important;
                padding-bottom: 80px !important;
                justify-content: center !important;
              }
            }
          `}</style>
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
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
                SERVICE // {service.id.toUpperCase().replace('-', ' ')}
              </div>
              
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
            </motion.div>
          </div>
        </section>
      </div>

      {/* 1.5 Offerings Section */}
      <div style={{ position: 'relative', minHeight: '200vh', zIndex: 15, marginTop: '-100vh' }}>
        <section className="section-overlap" style={{ 
          backgroundColor: '#f8f9fc',
          borderTopLeftRadius: '60px',
          borderTopRightRadius: '60px',
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.05)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
            <div 
              style={{ 
                textAlign: 'center', 
                height: '25vh', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'flex-end',
                paddingBottom: '4vh'
              }}
            >
              <h2 className="hero-title-shimmer-dark" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
                How we deliver value
              </h2>
              <p style={{ color: '#55555f', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                Specific specializations tailored to scaling your digital footprint efficiently.
              </p>
            </div>

            <div className="value-grid-fix" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '1.25rem', 
              marginTop: '2rem' 
            }}>
              {service.subItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial="initial"
                  whileInView="view"
                  whileHover="hover"
                  viewport={{ once: false }}
                  variants={{
                    initial: { opacity: 0, x: -25, y: 15, backgroundColor: '#ffffff' },
                    view: { 
                      opacity: 1, x: 0, y: 0,
                      backgroundColor: '#ffffff',
                      transition: { delay: idx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                    },
                    hover: { 
                      scale: 1.03, 
                      x: 10,
                      backgroundColor: '#8763df', // Logo matching purple
                      borderColor: 'transparent',
                      boxShadow: '0 20px 40px rgba(135, 99, 223, 0.3)'
                    }
                  }}
                  style={{ 
                    padding: '1.5rem 2.5rem', 
                    display: 'flex', 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    gap: '1.5rem',
                    backgroundColor: '#ffffff', // White by default
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    borderRadius: '24px',
                    cursor: 'pointer',
                    transition: 'background-color 0.4s ease, border-color 0.4s ease'
                  }}
                  className="value-card"
                >
                  <motion.div 
                    variants={{
                      initial: { scale: 0, rotate: -45, backgroundColor: 'rgba(132, 0, 255, 0.08)' },
                      view: { 
                        scale: 1, rotate: 0, backgroundColor: 'rgba(132, 0, 255, 0.08)',
                        transition: { delay: idx * 0.08 + 0.2, type: 'spring', damping: 12 }
                      },
                      hover: { 
                        scale: 1.1,
                        backgroundColor: 'rgba(255, 255, 255, 0.25)'
                      }
                    }}
                    className="value-icon"
                    style={{ 
                      width: '44px', 
                      height: '44px', 
                      borderRadius: '12px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <MotionCheck 
                      size={20} 
                      variants={{
                        initial: { color: '#8400ff' },
                        view: { color: '#8400ff' },
                        hover: { color: '#ffffff' }
                      }}
                    />
                  </motion.div>
                  <motion.h3 
                    variants={{
                      initial: { color: '#0a0a0c' },
                      view: { color: '#0a0a0c' },
                      hover: { color: '#ffffff' }
                    }}
                    style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}
                  >
                    {item}
                  </motion.h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 2. Portfolio Section (Dynamic Stack) */}
      <div 
        ref={containerRef}
        style={{ 
          position: 'relative', 
          minHeight: service.id === 'social-media-management' ? '220vh' : `${(service.portfolio.length * 120 + 150)}vh`, 
          zIndex: 22, 
          marginTop: '-100vh',
          backgroundColor: '#050508',
          borderTopLeftRadius: '60px',
          borderTopRightRadius: '60px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.5)'
        }}>
          {/* Sticky Section - Pinned while scrolling through containerRef */}
        <motion.section style={{ 
            position: 'sticky', 
            top: 0, 
            height: '100vh', 
            width: '100%',
            overflow: 'hidden',
            borderTopLeftRadius: borderPortfolioRad,
            borderTopRightRadius: borderPortfolioRad
          }}>
            {/* Heading Area */}
            <div 
              style={{ 
                textAlign: 'center', 
                height: '25vh', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'flex-end',
                paddingBottom: '2vh'
              }}
            >
              <h2 
                className="hero-title-shimmer"
                style={{ 
                  fontSize: 'clamp(1.8rem, 8vw, 5.5rem)', 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  letterSpacing: '-0.04em',
                  margin: 0
                }}
              >
                {(service.id === 'social-media-management' ? "OUR WORKS" : "PROJECTS").split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ 
                      duration: 0.4, 
                      delay: i * 0.03,
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </h2>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{ fontSize: '0.65rem', letterSpacing: '0.5em', textTransform: 'uppercase', marginTop: '0.5rem', color: 'white' }}
              >
                DIGITAL CRAFTSMANSHIP
              </motion.span>
            </div>
    
            {/* Project Display (Conditional) */}
            <div style={{ position: 'relative', width: '100%', height: '80vh', overflow: 'visible' }}>
              {service.id === 'social-media-management' ? (
                <SocialMediaPortfolio portfolio={service.portfolio} />
              ) : (
                <>
                  {service.portfolio.map((work, idx) => {
                    const total = service.portfolio.length;
                    const exitPoint = 0.75;
                    const gap = (exitPoint - 0.05) / Math.max(1, total - 1);
                    
                    return (
                      <PortfolioCard 
                        key={idx} 
                        work={work} 
                        index={idx} 
                        total={total} 
                        scrollProgress={scrollYProgress}
                        exitPoint={exitPoint}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </motion.section>
        </div>

        {/* Optional Maintenance Section (Only for Web Dev) */}
        {service.id === 'website-development' && service.maintenance && (
          <MaintenanceSection data={service.maintenance} />
        )}

      {/* 3. Pricing Section (Overlaps Maintenance for Web Dev or Projects otherwise) */}
      <div ref={pricingRef} style={{ position: 'relative', minHeight: '250vh', zIndex: 30, marginTop: '-100vh' }}>
        <motion.section className="section-overlap pricing-section-fix" style={{ 
          position: 'sticky',
          top: 0,
          height: '100vh',
          backgroundColor: '#f8f9fc', 
          color: '#0a0a0c', 
          paddingTop: 'clamp(60px, 10vh, 100px)', 
          paddingBottom: 'clamp(40px, 6vh, 80px)',
          borderTopLeftRadius: borderPricingRad,
          borderTopRightRadius: borderPricingRad,
          boxShadow: '0 -20px 80px rgba(0,0,0,0.08)',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 5%' }}>
             <p style={{ color: '#8400ff', textAlign: 'center', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
               {service.id === 'visual-identity-design' ? "BRANDING SERVICES" : service.title.toUpperCase()}
             </p>
             <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, textAlign: 'center', marginBottom: '0', color: '#0a0a0c', lineHeight: 1.2 }}>
                {service.id === 'website-development' ? "Choose a perfect plan" : service.id === 'social-media-management' ? "Monthly Packages" : service.id === 'visual-identity-design' ? "Build Your Brand Identity" : "Subscription Plans"}
             </h2>
             <p style={{ color: '#55555f', textAlign: 'center', marginBottom: '2.5rem', fontSize: '1.1rem', marginTop: '0.5rem' }}>
             </p>
             
             <div className="auto-grid pricing-grid-fix" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', width: '100%' }}>
                {service.plans.map((plan, idx) => (
                  <PricingCard key={idx} plan={plan} idx={idx} />
                ))}
             </div>
          </div>
        </motion.section>
      </div>

      {/* 4. Reviews Section (Sliding up over Pricing) */}
      <div style={{ position: 'relative', zIndex: 40, marginTop: '-100vh' }}>
        <ReviewsSection />
      </div>

      {/* 5. Footer Section (Sliding up over Reviews) */}
      <div style={{ position: 'relative', zIndex: 50, marginTop: '-100vh', minHeight: '100vh' }}>
        <Footer />
      </div>

    </div>
  );
};

const MaintenanceSection = ({ data }) => {
  const iconMap = { Shield, Database, Zap, LifeBuoy, Rocket };
  const containerRef = useRef(null);
  const { scrollYProgress: borderProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });
  const borderRad = useTransform(borderProgress, [0, 1], ["60px", "0px"]);

  return (
    <div ref={containerRef} style={{ position: 'relative', minHeight: '200vh', zIndex: 25, marginTop: '-100vh' }}>
      <motion.section className="section-overlap maint-section-fix" style={{ 
        position: 'sticky',
        top: 0,
        height: '100vh',
        backgroundColor: '#050508', 
        color: 'white', 
        paddingTop: '180px', 
        paddingBottom: '120px',
        borderTopLeftRadius: borderRad,
        borderTopRightRadius: borderRad,
        boxShadow: '0 -20px 80px rgba(0,0,0,0.5)',
        overflow: 'hidden'
      }}>
        {/* Glow Effects */}
        <div style={{ position: 'absolute', top: '-10%', left: '10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(132, 0, 255, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 5%', position: 'relative', zIndex: 2 }}>
          <div className="maint-title-fix" style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}
            >
              {data.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}
            >
              Building the site is just the beginning. We ensure your digital assets remain fast, secure, and ahead of the curve.
            </motion.p>
          </div>

          <div className="maint-gap-fix" style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {data.features.map((item, idx) => {
              const Icon = iconMap[item.icon] || Shield;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className="maint-card"
                  style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1.8rem 2rem', 
                    borderRadius: '28px', 
                    backgroundColor: 'rgba(255,255,255,0.02)', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.3s ease',
                    flex: '1 1 300px',
                    maxWidth: '340px'
                  }}
                >
                  <div className="maint-icon" style={{ width: '50px', height: '50px', borderRadius: '14px', backgroundColor: 'rgba(132, 0, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8400ff', marginBottom: '1.5rem', flexShrink: 0 }}>
                    <Icon size={24} />
                  </div>
                  <div className="maint-content">
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem' }}>{item.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ServicePage;
