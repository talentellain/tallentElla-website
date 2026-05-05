import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { Play } from 'lucide-react';

import jeetVideo from '../assets/video/jeet-insta-01.mp4';
import samikshaVideo from '../assets/video/samiksha.mp4';
import manishVideo from '../assets/video/manish-insta.mp4';

const videos = [
  { id: 1, title: "Social Media Campaign 1", src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", videoSrc: manishVideo },
  { id: 2, title: "Brand Identity", src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", videoSrc: samikshaVideo },
  { id: 3, title: "Commercial Shoot", src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", videoSrc: jeetVideo },
  { id: 4, title: "Event Coverage", src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", videoSrc: samikshaVideo },
  { id: 5, title: "Corporate Story", src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", videoSrc: manishVideo },
];

// Calculate 3D perspective outside of component render cycle for performance
const getPerspectiveTransform = (index, total) => {
  const center = Math.floor(total / 2);
  const diff = index - center; 
  
  const rotateY = diff * -15; 
  const scale = 1 + Math.abs(diff) * 0.15; 
  const x = diff * Math.abs(diff) * 18; 
  
  return { rotateY, scale, x, diff };
};

// LazyVideo component ensures we only auto-play videos that are actively on screen
const LazyVideo = ({ src, poster, isVisible }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(() => {}); // Catch autoplay rejections safely
    } else if (!isVisible && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isVisible]);

  return (
    <video 
      ref={videoRef}
      src={src}
      poster={poster}
      muted 
      loop 
      playsInline
      preload="metadata" // Save massive bandwidth by only loading first frame initially
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      aria-hidden="true" // Decorative background videos don't need screen reader narration
    />
  );
};

const VideoSection = () => {
  const containerRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  // Create rounded border animation
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'start start'] });
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);
  
  // Track if this section is visible to determine if videos should play
  const isSectionInView = useInView(containerRef, { margin: "200px 0px" });

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <div className="sticky-outer" ref={containerRef} style={{ zIndex: 35 }}>
      <motion.section 
        className="sticky-section"
        style={{
          backgroundColor: '#0a0a0c', // TalentElla dark background
          color: '#ffffff', // White text
          borderTopLeftRadius: isMobile ? '0px' : borderRad,
          borderTopRightRadius: isMobile ? '0px' : borderRad,
          height: '100dvh'
        }}
      >
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4vh 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', padding: '0 1.5rem', paddingBottom: '6rem', width: '100%', position: 'relative' }}>
        


        {/* Heading */}
        <h2 style={{
          fontSize: isMobile ? 'clamp(2rem, 8vw, 2.8rem)' : 'clamp(1.4rem, 2.5vw, 2.2rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          color: '#ffffff',
          maxWidth: '600px',
          margin: '2rem auto 0 auto',
          letterSpacing: '-0.02em'
        }}>
          Engage Audiences<br/>with Stunning Videos
        </h2>

        {/* Decorative Top Arrow */}
        {!isMobile && (
          <div style={{ position: 'absolute', right: '10%', top: '15%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--sans)', fontStyle: 'italic', transform: 'rotate(5deg)', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.5)' }}>
              Elevate<br/>your brand
            </span>
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: '-40px', top: '10px' }}>
              <path d="M10 20 Q 50 10 80 50" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M70 45 L 80 50 L 75 60" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}

        {/* Carousel / Cards Area */}
        {/* IMPORTANT: overflow and perspective cannot coexist on the same element.
            We use a two-layer approach: outer handles scroll, inner handles 3D. */}
        <div style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginTop: '2rem',
          marginBottom: '2rem',
          overflowX: isMobile ? 'auto' : 'visible',
          overflowY: isMobile ? 'hidden' : 'visible',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          touchAction: isMobile ? 'pan-x' : 'auto', // Tell browser: handle horizontal panning
        }}>
          {/* Inner 3D container — perspective must be on a separate element from overflow */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: isMobile ? '0.75rem' : '1.5rem',
            height: isMobile ? '360px' : '280px',
            perspective: '1200px',
            transform: isMobile ? 'none' : 'translateY(6rem)',
            paddingLeft: isMobile ? '1rem' : '0',
            paddingRight: isMobile ? '1rem' : '0',
            width: isMobile ? 'max-content' : '100%',
            minWidth: '100%',
          }}>
          {videos.map((video, idx) => {
            const { rotateY, scale, x, diff } = getPerspectiveTransform(idx, videos.length);
            
            return (
              <motion.div
                layoutId={`video-card-${video.id}`}
                onClick={() => setSelectedVideo(video)}
                role="button"
                tabIndex={0}
                aria-label={`Play ${video.title}`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedVideo(video); }}
                key={video.id}
                // Mobile: animate immediately on mount (no whileInView delay)
                // Desktop: animate on scroll-reveal for cinematic effect
                initial={{ opacity: isMobile ? 1 : 0, scale: isMobile ? scale : 0.5, rotateY: isMobile ? rotateY : 0 }}
                {...(isMobile ? {
                  animate: { opacity: 1, rotateY: rotateY, scale: scale, x: 0 }
                } : {
                  whileInView: { opacity: 1, rotateY: rotateY, scale: scale, x: x },
                  viewport: { once: true }
                })}
                transition={{ duration: 0.8, delay: isMobile ? 0 : idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: diff === 0 
                    ? (isMobile ? '210px' : '240px') 
                    : Math.abs(diff) === 1 
                      ? (isMobile ? '190px' : '230px') 
                      : (isMobile ? '170px' : '210px'),
                  height: diff === 0 ? '110%' : '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  position: 'relative',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  zIndex: 20 - Math.abs(diff),
                  cursor: 'pointer',
                }}
              >
                {video.videoSrc ? (
                  <LazyVideo 
                    src={video.videoSrc}
                    poster={video.src}
                    isVisible={isSectionInView}
                  />
                ) : (
                  <img 
                    src={video.src} 
                    alt={video.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)',
                  zIndex: 1
                }} />
              </motion.div>
            );
          })}

          </div> {/* End inner 3D container */}
        </div> {/* End outer scroll wrapper */}


        </div>
        </div>
      </motion.section>

      {/* Pop-up Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(12px)',
              zIndex: 9999, // Sit over everything including sticky layout
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: isMobile ? '1rem' : '2rem'
            }}
            onClick={() => setSelectedVideo(null)} // Click outside to close
          >
            {/* The Expanded Card Magic Transition */}
            <motion.div
              layoutId={`video-card-${selectedVideo.id}`}
              role="dialog"
              aria-modal="true"
              aria-label={`Now playing: ${selectedVideo.title}`}
              style={{
                height: '90vh', // Take up most of the screen vertically
                maxHeight: '900px',
                maxWidth: '100%',
                aspectRatio: '9/16', // Instagram Reels Portrait Aspect Ratio
                backgroundColor: '#0a0a0c',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()} // Don't close when clicking the video itself
            >
              {selectedVideo.videoSrc ? (
                <video 
                  src={selectedVideo.videoSrc}
                  autoPlay 
                  controls // Provide user controls when expanded
                  preload="auto" // Expanded video should load completely
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <img 
                  src={selectedVideo.src} 
                  alt={selectedVideo.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedVideo(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '1.5rem',
                  zIndex: 10,
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(170, 59, 255, 0.8)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)'}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoSection;
