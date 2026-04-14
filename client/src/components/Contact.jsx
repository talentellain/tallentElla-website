import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

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
  
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      from_name: formData.fullName,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((result) => {
        setStatus('success');
        setFormData({ fullName: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000); // clear success msg after 5s
      }, (error) => {
        console.error(error.text);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <div id="contact" ref={containerRef} className="relative z-40" style={{ minHeight: '250vh', marginBottom: '-100vh' }}>
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
          className="absolute left-[5%] bottom-[20%] w-[180px] h-[180px] z-1 blur-[30px] opacity-15"
          style={{
            background: 'linear-gradient(135deg, #aa3bff 0%, #7d26cd 100%)',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          }}
        />

        <div className="max-w-[1400px] w-full mx-auto relative z-10 px-6 sm:px-10">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-32 items-center">
            
            {/* Left Side: Massive Heading */}
            <div className="flex flex-col gap-10 text-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-[clamp(4rem,9vw,7.5rem)] font-black leading-[0.85] uppercase tracking-tighter text-[#0a0a0c] m-0">
                  {["LET'S", "GET IN", "TOUCH"].map((line, lineIdx) => (
                    <motion.div 
                      key={lineIdx} 
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false }}
                      className="block overflow-hidden pb-2"
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
                          className={`inline-block ${letter === ' ' ? 'whitespace-pre' : 'whitespace-normal'}`}
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </motion.div>
                  ))}
                </h2>
                <a 
                  href="mailto:talentella.in@gmail.com" 
                  className="inline-block mt-12 text-[clamp(1.2rem,2.5vw,1.8rem)] text-[#0a0a0c] font-semibold border-b-[3px] border-[#0a0a0c] pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-colors"
                >
                  talentella.in@gmail.com
                </a>
              </motion.div>
            </div>

            {/* Right Side: Ultra Premium Minimalist Layout */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full max-w-[650px] mx-auto xl:mx-0"
            >
              <form 
                onSubmit={handleSubmit} 
                className="flex flex-col gap-10 w-full"
              >
                
                {/* Full Name */}
                <div className="relative w-full group">
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Your Name *"
                    disabled={status === 'loading'}
                    className="w-full bg-transparent border-b-[2px] border-black/10 py-5 text-xl md:text-2xl text-[#0a0a0c] font-medium placeholder-black/30 outline-none transition-all duration-300 focus:border-[#0a0a0c] disabled:opacity-50"
                    style={{ padding: '20px 0' }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
                  {/* Email */}
                  <div className="relative w-full group">
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email Address *"
                      disabled={status === 'loading'}
                      className="w-full bg-transparent border-b-[2px] border-black/10 py-5 text-xl md:text-2xl text-[#0a0a0c] font-medium placeholder-black/30 outline-none transition-all duration-300 focus:border-[#0a0a0c] disabled:opacity-50"
                      style={{ padding: '20px 0' }}
                    />
                  </div>
                  {/* Phone */}
                  <div className="relative w-full group">
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      disabled={status === 'loading'}
                      className="w-full bg-transparent border-b-[2px] border-black/10 py-5 text-xl md:text-2xl text-[#0a0a0c] font-medium placeholder-black/30 outline-none transition-all duration-300 focus:border-[#0a0a0c] disabled:opacity-50"
                      style={{ padding: '20px 0' }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="relative w-full group">
                  <textarea 
                    rows="3" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your project *"
                    disabled={status === 'loading'}
                    className="w-full bg-transparent border-b-[2px] border-black/10 py-5 text-xl md:text-2xl text-[#0a0a0c] font-medium placeholder-black/30 outline-none resize-none transition-all duration-300 focus:border-[#0a0a0c] disabled:opacity-50"
                    style={{ padding: '20px 0' }}
                  />
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-[#0a0a0c] bg-green-100/50 p-5 rounded-2xl font-bold">
                    <CheckCircle size={24} className="text-green-600" />
                    <span>Message received loud and clear!</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-[#0a0a0c] bg-red-100/50 p-5 rounded-2xl font-bold">
                    <AlertCircle size={24} className="text-red-500" />
                    <span>Failed to route. Try sending an email directly.</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-6 flex items-center justify-between w-full md:w-auto self-end bg-[#0a0a0c] text-white rounded-full transition-all duration-300 hover:bg-black hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  style={{ padding: '20px 32px 20px 42px' }}
                >
                  <span className="text-sm md:text-base font-extrabold tracking-[0.2em] uppercase mr-6">
                    {status === 'loading' ? 'Transmitting...' : 'Send Inquiry'}
                  </span>
                  {status === 'loading' ? (
                    <Loader2 className="animate-spin text-white" size={24} />
                  ) : (
                    <div className="bg-white/20 p-3 rounded-full flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </div>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
