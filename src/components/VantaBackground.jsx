import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min';

const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    // Vanta expects THREE to be on window
    window.THREE = THREE;

    if (!vantaEffect && vantaRef.current) {
      try {
        const effectFn = WAVES.default || WAVES;
        if (typeof effectFn === 'function') {
          setVantaEffect(
            effectFn({
              el: vantaRef.current,
              THREE: THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              color: 0x111116,
              shininess: 30.0,
              waveHeight: 15.0,
              waveSpeed: 0.5,
              zoom: 0.8,
            })
          );
        }
      } catch (err) {
        console.error('Vanta initialization error:', err);
      }
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
};

export default VantaBackground;
