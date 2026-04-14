import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Share2, Palette, Settings, Zap } from 'lucide-react';
import { servicesData } from '../data/servicesData';

const iconMap = {
  Code,
  Share2,
  Palette,
  Settings,
  Zap
};

const ServiceCard = ({ s }) => {
  const IconComponent = iconMap[s.icon] || Zap;
  
  const displayTitle = s.title.toUpperCase().split(' ').map((word, idx) => (
    <React.Fragment key={idx}>
      {word}
      <br />
    </React.Fragment>
  ));

  return (
    <Link to={`/service/${s.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%', outline: 'none' }}>
      <div className="modern-service-card" style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: '24px'
      }}>
        {/* Giant Text */}
        <div className="card-giant-text">
          {displayTitle}
        </div>

        {/* Inner Content (Icon + Text) — revealed on hover */}
        <div className="card-hover-content">
          <div className="blob-icon-wrapper">
            <IconComponent size={56} color="#000000" strokeWidth={2.5} />
          </div>
          <p className="card-hover-desc">
            {s.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Services = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });
  const borderProgress = useTransform(scrollYProgress, [0, 1], ["50px", "0px"]);

  return (
    <div id="services" ref={containerRef} style={{ position: 'relative', minHeight: '200vh', zIndex: 20, marginBottom: '-100vh' }}>
      <motion.section className="section-overlap" style={{ 
        zIndex: 20, 
        backgroundColor: '#0a0a0c',
        padding: '12vh 2% 5vh 2%',
        overflow: 'hidden', 
        borderTopLeftRadius: borderProgress, 
        borderTopRightRadius: borderProgress,
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div className="services-header" style={{ flexShrink: 0, marginBottom: '2vh', maxWidth: '800px', textAlign: 'center', padding: '0 5%' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              style={{ fontSize: 'clamp(1.6rem, 6vw, 4rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em', color: '#ffffff' }}
            >
              OUR SERVICES
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ color: '#888888', fontSize: 'clamp(0.75rem, 2vw, 1rem)', lineHeight: '1.4', fontWeight: 500, marginTop: '0.5rem', maxWidth: '600px', margin: '0.5rem auto 0' }}
            >
              Premium marketing and branding solutions to scale your digital presence.
            </motion.p>
          </div>

          {/* Cards Grid */}
          <div className="services-grid-new" style={{ flexGrow: 1, minHeight: 0 }}>
            {servicesData.map((s, i) => (
              <ServiceCard key={s.id} s={s} index={i} />
            ))}
          </div>

        </div>

        <style>{`
          /* === Grid Layout === */
          .services-grid-new {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            background-color: transparent;
            gap: 2vh;
            width: 100%;
          }

          @media (max-width: 1024px) {
            .services-grid-new {
              grid-template-columns: repeat(2, 1fr);
              grid-template-rows: auto auto;
            }
          }

          @media (max-width: 768px) {
            .services-grid-new {
              grid-template-columns: 1fr;
              grid-template-rows: repeat(3, 1fr);
              gap: 1.5vw;
            }
          }

          /* === Card Base === */
          .modern-service-card {
            background-color: #1f1f1f;
            transition: background-color 0.4s ease;
          }
          .modern-service-card:hover {
            background-color: #8763df;
          }

          /* === Giant Title Text === */
          .card-giant-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: clamp(1.2rem, 3.5vw, 2.8rem);
            font-weight: 900;
            color: #eeeeee;
            line-height: 1;
            letter-spacing: -0.02em;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            pointer-events: none;
            transition: left 0.7s cubic-bezier(0.8, 0, 0.2, 1), transform 0.7s cubic-bezier(0.8, 0, 0.2, 1), opacity 0.5s ease;
            z-index: 1;
            width: 100%;
            text-align: center;
          }

          @media (max-width: 768px) {
            .card-giant-text {
              font-size: clamp(1.4rem, 6vw, 2rem);
            }
          }

          /* === Hover: slide text right === */
          .modern-service-card:hover .card-giant-text {
            left: 100%;
            transform: translate(0%, -50%);
            opacity: 0.05;
          }

          /* === Hover reveal content === */
          .card-hover-content {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            transition: opacity 0.4s ease 0s, transform 0.4s ease 0s;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            z-index: 5;
            padding: 0 8%;
            text-align: center;
          }

          .modern-service-card:hover .card-hover-content {
            opacity: 1;
            transform: translateY(0) scale(1);
            transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
          }

          /* === Blob Icon === */
          .blob-icon-wrapper {
            width: clamp(60px, 8vw, 100px);
            height: clamp(60px, 8vw, 100px);
            background-color: #ffcc00;
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: morph-blob 8s ease-in-out infinite alternate;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }

          @keyframes morph-blob {
            0%   { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
            33%  { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
            66%  { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
            100% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
          }

          .card-hover-desc {
            color: #ffffff;
            font-size: clamp(0.7rem, 1.8vw, 0.95rem);
            font-weight: 600;
            line-height: 1.5;
            margin: 0;
            text-shadow: 0 2px 10px rgba(0,0,0,0.3);
          }
        `}</style>
      </motion.section>
    </div>
  );
};

export default Services;
