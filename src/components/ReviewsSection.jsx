import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const reviewsData = [
  {
    id: 1,
    name: "Amanda K.",
    role: "Medtech Visuals",
    text: "Alex created detailed 3D models for our medical training program, and the quality was outstanding. The models were precise, realistic, and incredibly useful for our team. We're thrilled with the outcome.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda"
  },
  {
    id: 2,
    name: "Michael T.",
    role: "Photosphere Innovations",
    text: "Alex brought our product concept to life in a way we never thought possible. The 3D model was so detailed and realistic... it helped us secure investors and streamline the manufacturing process. Highly recommend!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
  },
  {
    id: 3,
    name: "David R.",
    role: "Apex Interactive",
    text: "Alex's 3D character designs exceeded our expectations. The level of detail and responsiveness throughout the project was outstanding. Our game wouldn't be the same without their contributions.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
  },
  {
    id: 4,
    name: "Rachel M.",
    role: "Metaform Creations",
    text: "Alex's unique 3D designs made our NFT collection a huge success. The art was breathtaking, and their professionalism made the entire process smooth and enjoyable. Looking forward to collaborating again!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel"
  },
  {
    id: 5,
    name: "James C.",
    role: "Innova Dynamics",
    text: "The 3D prototypes Alex created were perfect for testing our new product. The accuracy and precision made it easy to identify flaws and move forward with confidence. Excellent work!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
  },
  {
    id: 6,
    name: "Megan S.",
    role: "Goldedge Marketing",
    text: "The 3D render Alex produced for our campaign turned heads! It added a dynamic edge to our visuals, making our brand stand out. The results were beyond impressive!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Megan"
  }
];

const ReviewCard = ({ review }) => (
  <motion.div
    whileHover={{ scale: 1.02, borderColor: 'rgba(114, 38, 255, 0.4)', boxShadow: '0 15px 35px rgba(114, 38, 255, 0.1)' }}
    style={{
      minWidth: '320px',
      padding: '1.25rem',
      backgroundColor: '#ffffff',
      border: '1px solid rgba(114, 38, 255, 0.08)',
      borderRadius: '20px',
      margin: '0 0.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.6rem',
      cursor: 'pointer',
      transition: 'all 0.4s ease',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <img 
        src={review.avatar} 
        alt={review.name} 
        style={{ 
          width: '30px', 
          height: '30px', 
          borderRadius: '50%', 
          backgroundColor: 'rgba(114, 38, 255, 0.05)',
          border: '1px solid rgba(114, 38, 255, 0.1)'
        }} 
        loading="lazy"
        decoding="async"
      />
      <div>
        <h4 style={{ color: '#0a0a0c', margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>{review.name}</h4>
        <p style={{ color: '#7226FF', margin: 0, fontSize: '0.65rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>{review.role}</p>
      </div>
    </div>
    <p style={{ color: '#444444', fontSize: '0.85rem', lineHeight: '1.4', margin: 0, fontWeight: 500 }}>
      "{review.text}"
    </p>
  </motion.div>
);

const ReviewsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Alternating row movements - High Velocity
  const row1X = useTransform(scrollYProgress, [0, 1], [0, -2800]);
  const row2X = useTransform(scrollYProgress, [0, 1], [-2800, 0]);
  const row3X = useTransform(scrollYProgress, [0, 1], [0, -2800]);

  const { scrollYProgress: borderScroll } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });
  const borderRad = useTransform(borderScroll, [0, 1], ["80px", "0px"]);

  return (
    <motion.section 
      ref={containerRef} 
      style={{ 
        backgroundColor: '#ffffff', 
        position: 'relative',
        zIndex: 50,
        borderTopLeftRadius: borderRad,
        borderTopRightRadius: borderRad,
        minHeight: '200vh', 
        boxShadow: '0 -60px 150px rgba(114, 38, 255, 0.08), 0 -20px 40px rgba(0,0,0,0.03)',
        backgroundImage: `
          radial-gradient(circle at 10% 10%, rgba(114, 38, 255, 0.04) 0%, transparent 40%),
          radial-gradient(circle at 90% 90%, rgba(114, 38, 255, 0.04) 0%, transparent 40%)
        `
      }}
    >
      {/* Sticky Container - Positioned to clear fixed Navbar and fit all cards */}
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        paddingTop: '80px', 
        overflow: 'hidden' 
      }}>
        <div style={{ padding: '0 8%', marginBottom: '2.5rem' }}>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ color: '#7226FF', fontWeight: 700, letterSpacing: '0.3em', margin: '0 0 0.5rem 0', fontSize: '0.75rem' }}
          >
            REVIEWS // CLIENT SUCCESS
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            style={{ color: '#0a0a0c', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, margin: 0, letterSpacing: '-0.05em', lineHeight: 1.1 }}
          >
            What They <span style={{ color: 'rgba(114, 38, 255, 0.4)' }}>Are Saying</span>
            <span style={{ marginLeft: '15px', fontSize: '0.8em' }}>💜</span>
          </motion.h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', padding: '1vh 0' }}>
          <motion.div style={{ display: 'flex', x: row1X }}>
            {[...reviewsData, ...reviewsData, ...reviewsData, ...reviewsData, ...reviewsData].map((review, i) => (
              <ReviewCard key={`row1-${i}`} review={review} />
            ))}
          </motion.div>

          <motion.div style={{ display: 'flex', x: row2X }}>
            {[...reviewsData, ...reviewsData, ...reviewsData, ...reviewsData, ...reviewsData].map((review, i) => (
              <ReviewCard key={`row2-${i}`} review={review} />
            ))}
          </motion.div>

          <motion.div style={{ display: 'flex', x: row3X }}>
            {[...reviewsData, ...reviewsData, ...reviewsData, ...reviewsData, ...reviewsData].map((review, i) => (
              <ReviewCard key={`row3-${i}`} review={review} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ReviewsSection;
