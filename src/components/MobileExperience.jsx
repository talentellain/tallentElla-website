import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import frontMockup from '../assets/screen/front-png.png';
import leftMockup from '../assets/screen/left-png.png';
import rightMockup from '../assets/screen/right screeen.png';

const MobileExperience = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  // Top-level hooks (must always be called in the same order)
  const leftYTransform = useTransform(scrollYProgress, [0, 0.5], [250, -190]);
  const leftOpacityTransform = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  const centerScaleTransform = useTransform(scrollYProgress, [0.3, 0.6], [1, 1.3]);
  const centerYTransform = useTransform(scrollYProgress, [0.1, 0.6], [250, 190]);
  const centerOpacityTransform = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const rightYTransform = useTransform(scrollYProgress, [0.2, 0.7], [250, -410]);
  const rightOpacityTransform = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  return (
    <section 
      ref={containerRef}
      style={{ 
        backgroundColor: '#000', 
        padding: isMobile ? '40px 0' : '0', 
        overflow: 'hidden',
        position: 'relative',
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex',
        alignItems: isMobile ? 'center' : 'flex-end', 
        justifyContent: 'center'
      }}
    >
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        width: '100%',
        height: isMobile ? 'auto' : '100vh',
        gap: isMobile ? '40px' : '24px', 
        padding: isMobile ? '0 20px' : '24px', 
        backgroundColor: '#000'
      }}>
        
        {/* Left Box */}
        <div style={{ 
          backgroundColor: '#0c0c0c', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          overflow: 'hidden',
          position: 'relative',
          padding: isMobile ? '10px' : '0 2%',
          height: isMobile ? '380px' : 'auto',
          borderRadius: isMobile ? '32px' : '0'
        }}>
          <motion.div
            style={{
              rotate: isMobile ? 0 : -2, 
              width: '100%', 
              maxWidth: isMobile ? '100%' : '800px', 
              scale: isMobile ? 1.1 : 1.4, 
              transformOrigin: 'center center',
              y: isMobile ? 0 : leftYTransform, 
              x: isMobile ? 0 : '-15%', 
              opacity: isMobile ? 1 : leftOpacityTransform
            }}
          >
            <img 
              src={leftMockup} 
              alt="Our Works View" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxHeight: isMobile ? 'none' : '150vh', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))'
              }} 
            />
          </motion.div>
        </div>

        {/* Center Box */}
        <div style={{ 
          backgroundColor: '#0c0c0c', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          overflow: 'hidden',
          position: 'relative',
          padding: isMobile ? '10px' : '0 2%',
          height: isMobile ? '380px' : 'auto',
          borderRadius: isMobile ? '32px' : '0'
        }}>
          <motion.div
            style={{
              scale: isMobile ? 1.1 : centerScaleTransform,
              width: '100%', 
              maxWidth: isMobile ? '100%' : '900px',
              transformOrigin: 'center center',
              y: isMobile ? 0 : centerYTransform, 
              opacity: isMobile ? 1 : centerOpacityTransform
            }}
          >
            <img 
              src={frontMockup} 
              alt="Main Experience View" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxHeight: isMobile ? 'none' : '160vh', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.8))'
              }} 
            />
          </motion.div>
        </div>

        {/* Right Box */}
        <div style={{ 
          backgroundColor: '#0c0c0c', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          overflow: 'hidden',
          position: 'relative',
          padding: isMobile ? '10px' : '0 2%',
          height: isMobile ? '380px' : 'auto',
          borderRadius: isMobile ? '32px' : '0'
        }}>
          <motion.div
            style={{
              rotate: isMobile ? 0 : 1, 
              width: '100%', 
              maxWidth: isMobile ? '100%' : '800px', 
              scale: isMobile ? 1.1 : 1.4, 
              transformOrigin: 'center center', 
              y: isMobile ? 0 : rightYTransform,
              x: isMobile ? 0 : '8%', 
              opacity: isMobile ? 1 : rightOpacityTransform
            }}
          >
            <img 
              src={rightMockup} 
              alt="Contact View" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxHeight: isMobile ? 'none' : '150vh',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))'
              }} 
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default MobileExperience;
