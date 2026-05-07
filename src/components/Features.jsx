import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Rocket, Flag, Pause, PiggyBank, ArrowUpRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay = 0, isMobile, minH }) => (
  <motion.div
    initial={isMobile ? {} : { opacity: 0, y: 20 }}
    whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    style={{
      backgroundColor: '#000',
      padding: isMobile ? '1.5rem' : '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: minH || (isMobile ? '180px' : '280px'),
      border: isMobile ? 'none' : '1px solid rgba(255,255,255,0.03)',
      transition: 'all 0.3s ease',
      minWidth: isMobile ? 'auto' : 'auto',
      scrollSnapAlign: 'center',
      gap: '1rem',
      borderRadius: 0,
      backdropFilter: 'none'
    }}
    whileHover={isMobile ? {} : { backgroundColor: '#121212', borderColor: 'rgba(167, 139, 250, 0.2)' }}
  >
    <div style={{ 
      width: '36px', 
      height: '36px', 
      borderRadius: '10px', 
      backgroundColor: 'rgba(167, 139, 250, 0.1)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: '#a78bfa',
      marginBottom: isMobile ? '1rem' : '1.5rem',
      border: '1px solid rgba(167, 139, 250, 0.2)'
    }}>
      <Icon size={16} />
    </div>
    <div>
      <h3 style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 800, color: 'white', marginBottom: '0.8rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>{title}</h3>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{description}</p>
    </div>
  </motion.div>
);

const Features = () => {
  const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section style={{ backgroundColor: '#000', padding: isMobile ? '60px 0' : '120px 5%', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Bento Grid Layout */}
        <div style={{ 
          display: isMobile ? 'grid' : 'grid', 
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
          gridAutoRows: isMobile ? 'auto' : 'minmax(280px, auto)',
          gap: '1px', 
          backgroundColor: 'rgba(255,255,255,0.05)', 
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          
          {/* Main Title Box */}
          <div style={{ 
            gridColumn: isMobile ? 'span 2' : 'span 2', 
            backgroundColor: '#000', 
            padding: isMobile ? '2.5rem 1.5rem' : '3rem',
            textAlign: isMobile ? 'center' : 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ 
                fontSize: isMobile ? 'clamp(2.4rem, 10vw, 3.2rem)' : 'clamp(2rem, 6vw, 3.5rem)', 
                fontWeight: 900, 
                color: 'white', 
                margin: 0, 
                textTransform: 'uppercase', 
                letterSpacing: '-0.04em',
                lineHeight: 1
              }}
            >
              FEATURES
            </motion.h2>
            <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '2rem' }}>
               <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.25rem', fontWeight: 500, margin: 0, maxWidth: '250px' }}>Launch your next project with ease.</p>
               <ArrowUpRight size={48} color="#a78bfa" strokeWidth={2} />
            </div>
          </div>

          {/* Cards directly in the grid */}
          <div style={{ gridColumn: isMobile ? 'span 2' : 'auto', backgroundColor: '#000' }}>
            <FeatureCard 
              icon={MousePointer2}
              title="Unlimited Requests"
              description="Unlimited task requests. Prioritize what you need."
              delay={0.1}
              isMobile={isMobile}
              minH={isMobile ? '150px' : null}
            />
          </div>

          <div style={{ gridColumn: isMobile ? 'auto' : 'auto', backgroundColor: '#000' }}>
            <FeatureCard 
              icon={Rocket}
              title="Launch Fast"
              description="Requests tasks immediately after subscribing."
              delay={0.2}
              isMobile={isMobile}
            />
          </div>

          {/* Spacer only on desktop to maintain bento flow */}
          {!isMobile && <div style={{ backgroundColor: '#000' }} />}

          <div style={{ gridColumn: isMobile ? 'auto' : 'auto', backgroundColor: '#000' }}>
            <FeatureCard 
              icon={Flag}
              title="Start Today"
              description="Get started immediately with 2-day average."
              delay={0.3}
              isMobile={isMobile}
            />
          </div>

          <div style={{ gridColumn: isMobile ? 'auto' : 'auto', backgroundColor: '#000' }}>
            <FeatureCard 
              icon={Pause}
              title="Pause Anytime"
              description="Easily pause or cancel subscription at any point."
              delay={0.4}
              isMobile={isMobile}
            />
          </div>

          <div style={{ gridColumn: isMobile ? 'auto' : 'auto', backgroundColor: '#000' }}>
            <FeatureCard 
              icon={PiggyBank}
              title="Affordable"
              description="Save up to 70% compared to full-time developers."
              delay={0.5}
              isMobile={isMobile}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
