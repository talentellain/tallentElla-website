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
        backgroundImage: `url('/bg5.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        opacity: 0.9,
      }}
    />
  );
};

export default StaticBackground;
