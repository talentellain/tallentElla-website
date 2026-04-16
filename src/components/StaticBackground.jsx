import React from 'react';
import bgImage from '../assets/bg5.png'; // Assuming bg5.png since bg5.jpg didn't exist in assets

const StaticBackground = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        backgroundColor: '#000', // Ensure dark theme behind
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        opacity: 0.9,
      }}
    />
  );
};

export default StaticBackground;
