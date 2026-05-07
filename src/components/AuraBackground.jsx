import React from 'react';
import { motion } from 'framer-motion';

const AuraBackground = ({ accentColor = "#8400ff" }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ backgroundColor: '#050508' }}>
      {/* 1. Noise Texture (SVG Filter based) */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay z-[1]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* 2. Glowing Aura Blobs */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full"
          style={{
            background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
            willChange: 'transform',
          }}
        />
        
        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 80, 0],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full"
          style={{
            background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
            willChange: 'transform',
          }}
        />

        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] opacity-[0.1]"
          style={{
            background: `radial-gradient(ellipse at center, ${accentColor} 0%, transparent 60%)`,
            willChange: 'transform',
          }}
        />
      </div>

      {/* 3. Technical Grid & Lines */}
      <div className="absolute inset-0 z-[2] opacity-[0.15]">
        {/* Horizontal Lines */}
        <div className="absolute top-[25%] left-0 w-full h-[1px] bg-white" />
        <div className="absolute top-[48%] left-0 w-full h-[1px] bg-white" />
        <div className="absolute top-[72%] left-0 w-full h-[1px] bg-white" />
        
        {/* Vertical Lines */}
        <div className="absolute left-[35%] top-0 h-full w-[1px] bg-white" />
        <div className="absolute left-[70%] top-0 h-full w-[1px] bg-white" />

        {/* Intersection Markers (Small crosshairs) */}
        {[
          { t: '25%', l: '35%' },
          { t: '25%', l: '70%' },
          { t: '48%', l: '35%' },
          { t: '48%', l: '70%' },
          { t: '72%', l: '35%' },
          { t: '72%', l: '70%' }
        ].map((pos, i) => (
          <div key={i} className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" style={{ top: pos.t, left: pos.l }}>
            <div className="absolute w-full h-[0.5px] bg-white/40" />
            <div className="absolute h-full w-[0.5px] bg-white/40" />
            <div className="w-1 h-1 bg-white rounded-full opacity-50" />
          </div>
        ))}
      </div>

      {/* 4. Technical Labels */}
      <div className="absolute inset-0 z-[3] font-mono select-none overflow-hidden">
        <div className="absolute top-[49%] left-[71%] text-[8px] sm:text-[10px] text-white/40 tracking-[0.4em] uppercase whitespace-nowrap hidden sm:block">
          SPACE // CORE_SYS
        </div>

        {/* Vertical Side Labels */}
        <div className="absolute top-[40%] left-[2%] text-[7px] sm:text-[9px] text-white/20 tracking-[0.5em] uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          DATA_STREAM // SEC_04
        </div>
        <div className="absolute bottom-[10%] right-[2%] text-[7px] sm:text-[9px] text-white/20 tracking-[0.5em] uppercase" style={{ writingMode: 'vertical-rl' }}>
          PROT_V2.0.6 // REFC_99
        </div>
      </div>

      {/* 5. Additional Decorative Elements */}
      <div className="absolute top-[10%] right-[10%] w-[60px] sm:w-[100px] h-[60px] sm:h-[100px] border border-white/5 z-[2]" />
      <div className="absolute bottom-[15%] left-[5%] w-[100px] sm:w-[150px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-[2]" />
    </div>
  );
};

export default AuraBackground;
