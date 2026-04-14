import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import dentwise from '../assets/dentwise.png';
import k72 from '../assets/K72.png';
import onepiece from '../assets/onepiece.png';

const projects = [
  {
    id: '01',
    client: 'DentWise AI',
    desc: 'Intelligent dental assistant platform with 24/7 AI-patient interaction.',
    image: dentwise,
    link: 'https://smart-dent-ai-app.vercel.app/',
  },
  {
    id: '02',
    client: 'K72 Agency',
    desc: 'Award-winning creative agency portal with cinematic animations.',
    image: k72,
    link: 'https://react-animated-web-l9i8.vercel.app/',
  },
  {
    id: '03',
    client: 'One Piece Legacy',
    desc: 'Immersive storytelling experience for the legendary pirate saga.',
    image: onepiece,
    link: 'https://one-piece-eight-henna.vercel.app/',
  }
];

const ProjectCard = ({ project, index, scrollProgress }) => {
  const videoRef = useRef(null);
  // Re-calibrated for 3 cards: finish all by 0.6 to handle overlap height
  const start = index === 0 ? 0 : (index === 1 ? 0.1 : 0.35);
  const end = index === 0 ? 0 : (index === 1 ? 0.35 : 0.6);
  
  const y = useTransform(scrollProgress, [start, end], [index === 0 ? 0 : 700, 0]);
  const scale = useTransform(scrollProgress, [start, end], [index === 0 ? 1 : 0.94, 1]);
  
  const nextStart = index === 0 ? 0.1 : (index === 1 ? 0.35 : 0.6);
  const stackScale = useTransform(scrollProgress, [nextStart, nextStart + 0.15], [1, 0.96]);
  const stackY = useTransform(scrollProgress, [nextStart, nextStart + 0.15], [0, -20]);
  const combinedScale = useTransform(() => stackScale.get() * scale.get());

  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.play();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleExplore = () => {
    window.open(project.link, '_blank', 'noopener,noreferrer');
  };

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
          <div style={{ display: 'flex', gap: 'clamp(1rem, 3vw, 2.5rem)', alignItems: 'center' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 900, opacity: 0.15, lineHeight: 1 }}>{project.id}</span>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--accent)', display: 'block', marginBottom: '0.6rem', opacity: 0.6 }}>Project Reveal</span>
              <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>{project.client}</h3>
            </div>
          </div>
          
          <motion.button 
            onClick={handleExplore}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05, backgroundColor: 'white', color: 'black' }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              padding: 'clamp(0.6rem, 2vw, 1rem) clamp(1rem, 3vw, 2.2rem)', 
              borderRadius: '100px', 
              border: '1px solid rgba(255,255,255,0.15)', 
              background: 'transparent', 
              color: 'white', 
              fontWeight: 700,
              fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              zIndex: 20
            }}
          >
            EXPLORE <ArrowUpRight size={20} />
          </motion.button>
        </div>

        <div 
          onClick={handleExplore}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ 
            width: '100%', 
            aspectRatio: '2/1.05', 
            borderRadius: '20px', 
            overflow: 'hidden',
            backgroundColor: '#111',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            cursor: 'pointer'
          }}
        >
          {project.video ? (
            <video 
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <img 
              src={project.image} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              alt={project.client}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: borderScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });
  const borderProgress = useTransform(borderScrollProgress, [0, 1], ["60px", "0px"]);

  return (
    <div id="projects" ref={containerRef} style={{ 
      position: 'relative', 
      minHeight: '500vh', 
      zIndex: 22,
      marginBottom: '-100vh' 
    }}>
      <motion.section style={{ 
        position: 'sticky', 
        top: 0, 
        height: '100vh', 
        width: '100%',
        backgroundColor: '#050508',
        overflow: 'hidden',
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        borderTopLeftRadius: borderProgress,
        borderTopRightRadius: borderProgress,
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
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
              fontSize: 'clamp(3rem, 10vw, 5.5rem)', 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '-0.04em',
              margin: 0
            }}
          >
            {"PROJECTS".split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ 
                  duration: 0.8, 
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                style={{ display: 'inline-block' }}
              >
                {letter}
              </motion.span>
            ))}
          </h2>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: false }}
            transition={{ delay: 0.8, duration: 1 }}
            style={{ fontSize: '0.65rem', letterSpacing: '0.5em', textTransform: 'uppercase', marginTop: '0.5rem' }}
          >
            Digital Craftsmanship
          </motion.span>
        </div>

        {/* Project Cards Stack */}
        <div style={{ position: 'relative', width: '100%', height: '80vh' }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} scrollProgress={scrollYProgress} />
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Projects;
