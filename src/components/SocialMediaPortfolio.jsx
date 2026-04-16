import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

const PortfolioCard = ({ 
  item, 
  index, 
  activeIndex, 
  portfolioLength, 
  setSelectedId, 
  setActiveIndex, 
  selectedId 
}) => {
  const videoRef = useRef(null);
  // Calculate relative position to active index
  let diff = index - activeIndex;
  
  // Infinite loop correction
  if (diff > portfolioLength / 2) diff -= portfolioLength;
  if (diff < -portfolioLength / 2) diff += portfolioLength;

  const isActive = diff === 0;
  const isNear = Math.abs(diff) === 1;
  const isVisible = Math.abs(diff) <= 2; // Show 5 cards at most

  // Local Mouse Tilt Logic for Universal Interaction
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  // Interactive tilt
  const tiltX = useTransform(mouseYSpring, [-0.5, 0.5], [7, -7]);
  const tiltY = useTransform(mouseXSpring, [-0.5, 0.5], [-7, 7]);

  // Position offsets using element-relative percentage for bulletproof stacking
  const xOffset = `${diff * 85}%`;
  const zOffset = isActive ? 150 : isNear ? 0 : -150;
  const scale = isActive ? 1.1 : isNear ? 0.85 : 0.65;
  const opacity = isActive ? 1 : isNear ? 0.6 : 0.2;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.play();
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    }
  };

  if (!isVisible && !isActive) return null;

  return (
    <motion.div
      layoutId={item.id}
      animate={{ 
        x: xOffset,
        z: zOffset,
        rotateY: diff * -35,
        scale: scale,
        opacity: opacity,
      }}
      transition={{ 
        type: 'spring',
        stiffness: 260,
        damping: 30,
        mass: 1
      }}
      style={{ 
        position: 'absolute',
        width: 'clamp(240px, 50vw, 340px)',
        aspectRatio: '1/1.2',
        zIndex: 10 - Math.abs(diff),
        filter: selectedId && selectedId !== item.id ? 'blur(10px) brightness(0.3)' : 'none',
        transformStyle: 'preserve-3d',
        perspective: 1200
      }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => isActive ? setSelectedId(item.id) : setActiveIndex(index)}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          borderRadius: '32px',
          overflow: 'hidden',
          backgroundColor: '#111',
          border: isActive ? '2px solid rgba(132, 0, 255, 0.5)' : '1px solid rgba(255,255,255,0.1)',
          boxShadow: isActive ? '0 30px 60px rgba(132, 0, 255, 0.2)' : '0 10px 30px rgba(0,0,0,0.5)',
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d',
        }}
        whileTap={{ scale: isActive ? 0.98 : 1 }}
      >
        {item.type === 'video' ? (
          <video 
            ref={videoRef}
            src={item.content}
            poster={item.thumbnail}
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <img src={item.content} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}

        {/* Rolling Overlay */}
        <motion.div 
          animate={{ opacity: isActive ? 1 : 0 }}
          style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '1.5rem',
            pointerEvents: 'none'
          }}
        >
          <h2 style={{ color: 'white', margin: 0, fontSize: 'clamp(1rem, 4vw, 1.35rem)', fontWeight: 800 }}>{item.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', margin: '0.2rem 0 0 0', fontSize: 'clamp(0.7rem, 2.5vw, 0.85rem)', lineHeight: 1.3 }}>{item.description}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const SocialMediaPortfolio = ({ portfolio }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const containerRef = useRef(null);

  if (!portfolio || portfolio.length === 0) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % portfolio.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + portfolio.length) % portfolio.length);
  };

  const selectedItem = portfolio.find(item => item.id === selectedId);

  return (
    <div ref={containerRef} style={{ 
      position: 'relative', 
      minHeight: '70vh', 
      padding: '1.5rem 5%', 
      backgroundColor: '#050505', 
      overflow: 'visible',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Background Sphere Glow */}
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(circle, rgba(132, 0, 255, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* 3D Carousel Container */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2,
        width: '100%',
        maxWidth: '1200px',
        height: '420px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
        transformStyle: 'preserve-3d'
      }}>
        {portfolio.map((item, index) => (
          <PortfolioCard 
            key={item.id}
            item={item}
            index={index}
            activeIndex={activeIndex}
            portfolioLength={portfolio.length}
            setSelectedId={setSelectedId}
            setActiveIndex={setActiveIndex}
            selectedId={selectedId}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
        whileTap={{ scale: 0.9 }}
        onClick={handlePrev}
        style={{ 
          position: 'absolute',
          left: '2rem',
          top: '50%',
          y: '-50%',
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          backgroundColor: 'rgba(255,255,255,0.05)', 
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          zIndex: 20
        }}
      >
        <ChevronLeft size={32} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
        whileTap={{ scale: 0.9 }}
        onClick={handleNext}
        style={{ 
          position: 'absolute',
          right: '2rem',
          top: '50%',
          y: '-50%',
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          backgroundColor: 'rgba(255,255,255,0.05)', 
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          zIndex: 20
        }}
      >
        <ChevronRight size={32} />
      </motion.button>

      {/* Pop-out Modal */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              style={{ 
                position: 'fixed', 
                inset: 0, 
                backgroundColor: 'rgba(0,0,0,0.95)', 
                backdropFilter: 'blur(20px)',
                zIndex: 1000 
              }}
            />
            <div style={{ 
              position: 'fixed', 
              inset: 0, 
              zIndex: 1001, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              pointerEvents: 'none',
              padding: '2rem'
            }}>
              <motion.div
                layoutId={selectedId}
                style={{ 
                  width: '90%', 
                  maxWidth: '450px', 
                  aspectRatio: '9/16',
                  borderRadius: '32px',
                  overflow: 'hidden',
                  backgroundColor: '#111',
                  pointerEvents: 'auto',
                  position: 'relative',
                  boxShadow: '0 40px 100px rgba(0,0,0,1)'
                }}
              >
                {selectedItem.type === 'video' ? (
                  <video 
                    src={selectedItem.content} 
                    autoPlay 
                    muted 
                    loop 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img src={selectedItem.content} alt={selectedItem.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
                
                {/* Modal Close Button */}
                <button 
                  onClick={() => setSelectedId(null)}
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <X size={20} />
                </button>

                {/* Modal Content Info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '2.5rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)'
                  }}
                >
                  <h3 style={{ color: 'white', margin: 0, fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.02em' }}>{selectedItem.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', marginTop: '0.75rem', lineHeight: 1.5 }}>{selectedItem.description}</p>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialMediaPortfolio;
