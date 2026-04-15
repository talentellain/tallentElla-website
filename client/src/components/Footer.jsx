import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
const Footer = () => {
    const buttonRef = useRef(null);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"]
    });
    const borderRad = useTransform(scrollYProgress, [0, 1], ["60px", "0px"]);

    useEffect(() => {
        const btn = buttonRef.current;
        if (!btn) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = btn.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 1,
                ease: 'elastic.out(1, 0.3)'
            });
        };

        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            btn.removeEventListener('mousemove', handleMouseMove);
            btn.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <motion.footer id="footer" ref={containerRef} style={{ 
            zIndex: 50, 
            position: 'relative', 
            backgroundColor: '#050508', 
            minHeight: '110vh', 
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '0 -40px 100px rgba(0,0,0,0.5)',
            borderTopLeftRadius: borderRad,
            borderTopRightRadius: borderRad,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '10vh 5% 12vh'
        }}>
            {/* Subtle Center Glow */}
            <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                width: '60vw',
                height: '60vw',
                background: 'radial-gradient(circle, rgba(170, 59, 255, 0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 1
            }}></div>

            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <span className="accent-gradient" style={{ fontWeight: 800, letterSpacing: '0.4em', fontSize: '0.8rem', textTransform: 'uppercase', display: 'block', marginBottom: '2rem' }}>
                        The Next Step
                    </span>
                    <h2 
                        className="hero-title-shimmer" 
                        style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', marginBottom: '4rem', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.02em' }}
                    >
                        Ready to <br /> Scale?
                    </h2>
                </motion.div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div ref={buttonRef} style={{ display: 'inline-block' }}>
                        <motion.button 
                            className="btn-primary" 
                            style={{ 
                                padding: 'clamp(1rem, 3vw, 1.8rem) clamp(2rem, 5vw, 4.5rem)', 
                                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                                borderRadius: '100px',
                                background: 'white',
                                color: 'black',
                                border: 'none',
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                            }}
                        >
                            Start a Project <ArrowUpRight size={24} />
                        </motion.button>
                    </div>
                </div>
            </div>

            <div className="flex-col-mobile" style={{ 
                position: 'relative', 
                zIndex: 2, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-end',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                paddingTop: '3rem',
                flexWrap: 'wrap',
                gap: '2rem'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ fontWeight: 800, letterSpacing: '-1px', fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}>
                        TALENT<span style={{ color: 'var(--accent)', marginLeft: '4px' }}>ELLA</span>
                        <div style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%', marginLeft: '4px' }}></div>
                    </div>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem', maxWidth: '300px' }}>
                        Crafting digital excellence through imagination and precision.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)' }}>Connect</span>
                        <div style={{ display: 'flex', gap: '1.5rem', color: 'white' }}>
                            <motion.a href="https://www.instagram.com/talentella.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: 'var(--accent)' }} style={{ cursor: 'pointer', color: 'inherit' }}><Instagram size={20} /></motion.a>
                            <motion.div whileHover={{ scale: 1.2, color: 'var(--accent)' }} style={{ cursor: 'pointer' }}><Twitter size={20} /></motion.div>
                            <motion.a href="https://www.linkedin.com/company/talentella/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BoCez94fpRBmgazPJzx3LPw%3D%3D" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: 'var(--accent)' }} style={{ cursor: 'pointer', color: 'inherit' }}><Linkedin size={20} /></motion.a>
                            <motion.a href="mailto:talentella.in@gmail.com" whileHover={{ scale: 1.2, color: 'var(--accent)' }} style={{ cursor: 'pointer', color: 'inherit' }}><Mail size={20} /></motion.a>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'right' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)' }}>Legal</span>
                        <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                            © 2026 TALENT ELLA. ALL RIGHTS RESERVED.
                        </div>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
