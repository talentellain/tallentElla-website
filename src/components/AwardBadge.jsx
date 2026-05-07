import React from 'react';
import { motion } from 'framer-motion';

const AwardBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        pointerEvents: 'none'
      }}
    >
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '10px 15px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        width: '80px'
      }}>
        <span style={{ 
          fontSize: '0.5rem', 
          fontWeight: 800, 
          color: 'rgba(255,255,255,0.4)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em' 
        }}>
          Awwwards.
        </span>
        <div style={{ 
          width: '30px', 
          height: '30px', 
          backgroundColor: '#fff', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#000',
          fontWeight: 900,
          fontSize: '0.7rem'
        }}>
          SOTD
        </div>
        <span style={{ 
          fontSize: '0.55rem', 
          fontWeight: 700, 
          color: '#fff', 
          textAlign: 'center',
          lineHeight: 1
        }}>
          Site of the Day
        </span>
      </div>
    </motion.div>
  );
};

export default AwardBadge;
