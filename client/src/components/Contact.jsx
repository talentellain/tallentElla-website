import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Linkedin } from 'lucide-react';

const Contact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });
  const borderProgress = useTransform(scrollYProgress, [0, 1], ["60px", "0px"]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `New Inquiry from ${formData.fullName}`;
    const body = `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:talentella.in@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div id="contact" ref={containerRef} style={{ position: 'relative', minHeight: '250vh', zIndex: 40, marginBottom: '-100vh' }}>
      <motion.section className="section-overlap" style={{ 
        position: 'sticky',
        top: 0,
        backgroundColor: '#f8f9fc',
        padding: '12vh 5%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        color: '#0a0a0c',
        borderTopLeftRadius: borderProgress,
        borderTopRightRadius: borderProgress,
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        overflow: 'hidden'
      }}>
        {/* Floating Decorative Element */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: '5%',
            bottom: '20%',
            width: '180px',
            height: '180px',
            background: 'linear-gradient(135deg, #aa3bff 0%, #7d26cd 100%)',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
            filter: 'blur(30px)',
            opacity: 0.15,
            zIndex: 1
          }}
        />

        <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div className="auto-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(2rem, 6vw, 8rem)', alignItems: 'center' }}>
            
            {/* Left Side: Massive Heading */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1 }}
              >
                <h2 style={{ 
                  fontSize: 'clamp(3.5rem, 8vw, 6rem)', 
                  fontWeight: 900, 
                  lineHeight: 0.9, 
                  textTransform: 'uppercase', 
                  letterSpacing: '-0.04em',
                  color: '#0a0a0c',
                  margin: 0
                }}>
                  {["LET'S", "GET IN", "TOUCH"].map((line, lineIdx) => (
                    <motion.div 
                      key={lineIdx} 
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false }}
                      style={{ display: 'block', overflow: 'hidden' }}
                    >
                      {line.split("").map((letter, i) => (
                        <motion.span
                          key={i}
                          variants={{
                            hidden: { opacity: 0, y: '100%' },
                            visible: { 
                              opacity: 1, 
                              y: 0, 
                              transition: { 
                                duration: 0.8, 
                                delay: (lineIdx * 5 + i) * 0.04,
                                ease: [0.16, 1, 0.3, 1] 
                              } 
                            }
                          }}
                          style={{ display: 'inline-block', whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </motion.div>
                  ))}
                </h2>
                <a 
                  href="mailto:talentella.in@gmail.com" 
                  style={{ 
                    display: 'inline-block', 
                    marginTop: '2.5rem', 
                    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', 
                    color: '#0a0a0c', 
                    textDecoration: 'underline',
                    fontWeight: 600,
                    opacity: 0.8
                  }}
                >
                  talentella.in@gmail.com
                </a>
              </motion.div>
            </div>

            {/* Right Side: Minimalist Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ width: '100%', maxWidth: '550px' }}
            >
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999' }}>Full Name*</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      borderBottom: '1px solid #ddd', 
                      padding: '0.8rem 0',
                      color: '#0a0a0c',
                      fontSize: '1.1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }} 
                    onFocus={(e) => e.target.style.borderColor = '#0a0a0c'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                </div>

                <div className="grid-col-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999' }}>Email*</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        borderBottom: '1px solid #ddd', 
                        padding: '0.8rem 0',
                        color: '#0a0a0c',
                        fontSize: '1.1rem',
                        outline: 'none'
                      }} 
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999' }}>Phone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        borderBottom: '1px solid #ddd', 
                        padding: '0.8rem 0',
                        color: '#0a0a0c',
                        fontSize: '1.1rem',
                        outline: 'none'
                      }} 
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999' }}>Message</label>
                  <textarea 
                    rows="2" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      borderBottom: '1px solid #ddd', 
                      padding: '0.8rem 0',
                      color: '#0a0a0c',
                      fontSize: '1.1rem',
                      outline: 'none',
                      resize: 'none'
                    }} 
                  />
                </div>

                <motion.button 
                  type="submit"
                  whileHover={{ backgroundColor: '#0a0a0c', color: 'white' }}
                  whileTap={{ scale: 0.98 }}
                  style={{ 
                    background: 'none', 
                    color: '#0a0a0c', 
                    border: '1.5px solid #0a0a0c', 
                    borderRadius: '100px', 
                    padding: '1.2rem 3rem', 
                    fontSize: '0.9rem', 
                    fontWeight: 800, 
                    letterSpacing: '0.2rem',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    marginTop: '1rem',
                    transition: 'all 0.3s ease',
                    alignSelf: 'flex-start'
                  }}
                >
                  SEND
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
