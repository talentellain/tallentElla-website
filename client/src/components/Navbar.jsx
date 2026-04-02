import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/talentella-logo.png';

const MobileMenuItem = ({ item, index, handleNavClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const pillImg = "https://images.unsplash.com/photo-1498855926480-d98e83099315?q=80&w=600&auto=format&fit=crop";

    return (
        <a 
            href={`#${item.toLowerCase()}`}
            onClick={(e) => handleNavClick(e, item.toLowerCase())}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            style={{ 
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                padding: '2.5rem 0',
                color: isHovered ? '#000000' : 'white', 
                backgroundColor: isHovered ? '#ffffff' : 'transparent',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
                borderTop: index === 0 ? '1px solid rgba(255,255,255,0.2)' : 'none',
                transition: 'background-color 0.4s ease, color 0.4s ease',
                display: 'block',
                cursor: 'pointer'
            }}
        >
            {/* Base Text (visible when not hovered) */}
            <div style={{ opacity: isHovered ? 0 : 1, transition: 'opacity 0.3s ease', fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: 600, letterSpacing: '0.05em' }}>
                {item}
            </div>

            {/* Marquee (visible when hovered) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                opacity: isHovered ? 1 : 0,
                pointerEvents: 'none',
                transition: 'opacity 0.3s ease'
            }}>
                <motion.div
                    animate={isHovered ? { x: ["0%", "-50%"] } : { x: "0%" }}
                    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        whiteSpace: 'nowrap',
                        width: 'fit-content'
                    }}
                >
                    {/* Repeat exactly elements so we can scroll perfectly 50% */}
                    {[...Array(6)].map((_, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: 600, letterSpacing: '0.05em', margin: '0 1.5rem', color: '#000000' }}>{item}</span>
                            <div style={{
                                width: '70px',
                                height: '35px',
                                borderRadius: '50px',
                                overflow: 'hidden',
                                display: 'inline-block'
                            }}>
                                <img src={pillImg} alt="ocean" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </a>
    );
};

const Navbar = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        
        if (location.pathname !== '/') {
            // Navigate to home and then trigger scroll
            navigate('/');
            setTimeout(() => {
                const el = document.getElementById(targetId);
                if (el) {
                    el.scrollIntoView({ behavior: 'auto' });
                }
            }, 400); // More time for pages with high-quality media
        } else {
            const el = document.getElementById(targetId);
            if (el) {
                // Let Lenis handle the smoothing natively
                el.scrollIntoView({ behavior: 'auto' });
            }
        }
        if (isOpen) setIsOpen(false);
    };

    // Keep the theme detection logic
    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                { id: 'footer', isLight: false },
                { id: 'contact', isLight: true },
                { id: 'process', isLight: false },
                { id: 'projects', isLight: false },
                { id: 'services', isLight: true },
                { id: 'hero', isLight: false },
            ];
            
            let overLight = false;
            
            for (let i = 0; i < sections.length; i++) {
                const sectionEl = document.getElementById(sections[i].id);
                if (sectionEl) {
                    const rect = sectionEl.getBoundingClientRect();
                    if (rect.top <= 100) {
                        overLight = sections[i].isLight;
                        break;
                    }
                }
            }
            
            setIsDarkTheme(overLight);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    const textColor = isDarkTheme ? '#000000' : '#ffffff';
    const borderColor = isDarkTheme ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.1)';
    const glassBg = isDarkTheme ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)';

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100%', 
                zIndex: 1000, 
                padding: '1.2rem 5%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
        >
            {/* Logo */}
            <Link 
                to="/" 
                onClick={(e) => {
                    if (location.pathname === '/') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        window.scrollTo(0, 0);
                    }
                }} 
                style={{ textDecoration: 'none' }}
            >
                <motion.div 
                    style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        pointerEvents: 'auto'
                    }}
                >
                    <img 
                      src={logo} 
                      alt="Talent Ella Logo" 
                      style={{ 
                        height: '45px',
                        width: 'auto',
                        mixBlendMode: isDarkTheme ? 'multiply' : 'screen',
                        filter: isDarkTheme ? 'contrast(1.2)' : 'none',
                        borderRadius: '6px'
                      }} 
                    />
                </motion.div>
            </Link>

            {/* Navigation Card */}
            <motion.div 
                animate={{ 
                    backgroundColor: glassBg,
                    borderColor: borderColor,
                    backdropFilter: 'blur(30px)',
                    boxShadow: isDarkTheme ? '0 10px 40px rgba(0,0,0,0.05)' : '0 10px 40px rgba(0,0,0,0.2)'
                }}
                className="glass-card hidden-mobile"
                style={{ 
                    display: 'flex', 
                    gap: '2.5rem', 
                    padding: '0.4rem 2rem', 
                    borderRadius: '100px',
                    border: '1px solid',
                    pointerEvents: 'auto',
                    transition: 'all 0.4s ease'
                }}
            >
                {['SERVICES', 'PROJECTS', 'PROCESS', 'CONTACT'].map((item, index) => (
                    <motion.a 
                        key={item} 
                        href={`#${item.toLowerCase()}`}
                        onClick={(e) => handleNavClick(e, item.toLowerCase())}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        style={{ 
                            position: 'relative',
                            fontSize: '0.75rem', 
                            fontWeight: 800, 
                            letterSpacing: '0.12em', 
                            color: textColor,
                            opacity: hoveredIndex === index ? 1 : 0.8,
                            transition: 'opacity 0.3s ease',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            padding: '0.2rem 0'
                        }}
                    >
                        {item}
                        {hoveredIndex === index && (
                            <motion.div
                                layoutId="nav-underline"
                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                style={{
                                    position: 'absolute',
                                    bottom: '-2px',
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    backgroundColor: '#8400ff',
                                    borderRadius: '2px'
                                }}
                            />
                        )}
                    </motion.a>
                ))}
            </motion.div>

            {/* Action Button */}
            <div className="hidden-mobile" style={{ pointerEvents: 'auto' }}>
                <Link to="/#contact" onClick={(e) => handleNavClick(e, 'contact')} style={{ textDecoration: 'none' }}>
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ 
                          padding: '0.8rem 2rem', 
                          fontSize: '0.8rem', 
                          fontWeight: 800,
                          borderRadius: '100px',
                          display: 'inline-flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          letterSpacing: '0.05em',
                          backgroundColor: isDarkTheme ? '#0a0a0c' : '#ffffff',
                          color: isDarkTheme ? '#ffffff' : '#0a0a0c',
                          boxShadow: isDarkTheme ? '0 10px 30px rgba(0,0,0,0.15)' : 'none',
                          transition: 'background-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease'
                      }}
                    >
                        GET IN TOUCH
                    </motion.div>
                </Link>
            </div>

            {/* Mobile Hamburger Icon */}
            <div className="show-mobile" style={{ pointerEvents: 'auto' }}>
               <button onClick={toggleMenu} style={{ background: 'none', border: 'none', color: textColor, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                   <Menu size={32} />
               </button>
            </div>

            {/* Mobile Fullscreen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: '#050508',
                            zIndex: 2000,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            padding: '2rem'
                        }}
                    >
                        <button onClick={toggleMenu} style={{ position: 'absolute', top: '1.5rem', right: '5%', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                            <X size={36} />
                        </button>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'center', marginTop: '4rem' }}>
                            {['SERVICES', 'PROJECTS', 'PROCESS', 'CONTACT'].map((item, index) => (
                                <MobileMenuItem 
                                    key={item} 
                                    item={item} 
                                    index={index} 
                                    handleNavClick={handleNavClick} 
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
