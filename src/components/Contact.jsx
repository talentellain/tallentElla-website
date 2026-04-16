import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';


// ── Security helpers ──────────────────────────────────────────────
const RATE_LIMIT_KEY = 'te_contact_submissions';
const RATE_LIMIT_MAX = 3;           // max submissions
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes in ms

const sanitize = (str) =>
  str.trim().replace(/<[^>]*>/g, '').replace(/[<>"'`]/g, '').slice(0, 500);

const validateEmail = (email) => {
  // Standard format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
  // Domain must have at least 2 chars after the dot (e.g. .co not .c)
  const domain = email.split('@')[1] || '';
  const tld = domain.split('.').pop();
  if (tld.length < 2) return false;
  // Block obvious disposable/temporary patterns
  const blocked = ['mailinator', 'guerrillamail', 'tempmail', 'throwam', 'yopmail', 'sharklasers'];
  if (blocked.some(b => domain.includes(b))) return false;
  return true;
};

const validatePhone = (phone) =>
  phone === '' || /^[+\d\s\-().]{7,20}$/.test(phone);

const checkRateLimit = () => {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    const submissions = raw ? JSON.parse(raw).filter(t => now - t < RATE_LIMIT_WINDOW) : [];
    if (submissions.length >= RATE_LIMIT_MAX) {
      const wait = Math.ceil((RATE_LIMIT_WINDOW - (now - submissions[0])) / 60000);
      return { allowed: false, wait };
    }
    submissions.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(submissions));
    return { allowed: true };
  } catch {
    return { allowed: true }; // fail open if localStorage unavailable
  }
};
// ─────────────────────────────────────────────────────────────────

const Contact = () => {
  const outerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start end', 'start start'] });
  const borderRad = useTransform(scrollYProgress, [0, 1], ['60px', '0px']);


  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '' });
  const [honeypot, setHoneypot] = useState(''); // bot trap

  const [status, setStatus] = useState('idle'); // idle | loading | success | error | rate_limited
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    setValidationError('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Honeypot check — bots fill hidden fields, humans don't
    if (honeypot) return;

    // 2. Input validation
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      return setValidationError('Please enter your full name (at least 2 characters).');
    }
    if (!validateEmail(formData.email)) {
      return setValidationError('Please enter a valid email address.');
    }

    if (!validatePhone(formData.phone)) {
      return setValidationError('Please enter a valid phone number.');
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      return setValidationError('Message must be at least 10 characters.');
    }

    // 3. Rate limiting
    const { allowed, wait } = checkRateLimit();
    if (!allowed) {
      setStatus('rate_limited');
      setTimeout(() => setStatus('idle'), 8000);
      return setValidationError(`Too many submissions. Please wait ${wait} minute${wait > 1 ? 's' : ''} before trying again.`);
    }

    setStatus('loading');
    setValidationError('');

    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // 4. Sanitize all fields before sending
    const templateParams = {
      user_name:  sanitize(formData.fullName),
      user_email: sanitize(formData.email),
      phone:      sanitize(formData.phone),
      message:    sanitize(formData.message),
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setStatus('success');
        setFormData({ fullName: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      }, (error) => {
        console.error('EmailJS error:', error?.text ?? error);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };


  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <div id="contact" ref={outerRef} className="sticky-outer" style={{ zIndex: 70 }}>
      <motion.section
        className="sticky-section"
        style={{ 
          backgroundColor: '#050508', 
          borderTop: '1px solid rgba(255,255,255,0.05)', 
          borderTopLeftRadius: isMobile ? '0px' : borderRad, 
          borderTopRightRadius: isMobile ? '0px' : borderRad, 
          color: '#ffffff',
          justifyContent: 'center',
          height: '100dvh'
        }}
      >
        <div className="hide-scrollbar" style={{ width: '100%', height: '100%', overflowY: 'auto', padding: 'clamp(5rem, 20vh, 10rem) 5%' }}>
          <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', position: 'relative' }}>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-32 items-center">
            
            {/* Left Side: Massive Heading */}
            <div className="flex flex-col gap-6 text-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-[clamp(3rem,10vw,7.5rem)] font-black leading-[0.85] uppercase tracking-tighter text-white m-0">
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
                  className="inline-block mt-8 text-[clamp(1rem,2vw,1.6rem)] text-white/90 font-semibold border-b-[2px] border-white/40 pb-1 hover:text-white hover:border-white transition-colors"
                >
                   talentella.in@gmail.com
                </a>
              </motion.div>
            </div>

            {/* Right Side: Form centered vertically with the heading */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full max-w-[650px] mx-auto xl:mx-0"
            >
              <form 
                onSubmit={handleSubmit} 
                className="flex flex-col gap-8 w-full"
              >
                {/* Honeypot — hidden from real users, bots fill this */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
                />
                
                {/* Full Name */}
                <div className="relative w-full group">
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="Your Name *"
                    disabled={status === 'loading'}
                    className="w-full bg-transparent border-b-[2px] border-white/10 py-4 text-lg md:text-xl text-white font-medium placeholder-white/20 outline-none transition-all duration-300 focus:border-white disabled:opacity-50"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={150}
                    placeholder="Email Address *"
                    disabled={status === 'loading'}
                    className="w-full bg-transparent border-b-[2px] border-white/10 py-4 text-lg md:text-xl text-white font-medium placeholder-white/20 outline-none transition-all duration-300 focus:border-white disabled:opacity-50"
                  />
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={20}
                    placeholder="Phone Number"
                    disabled={status === 'loading'}
                    className="w-full bg-transparent border-b-[2px] border-white/10 py-4 text-lg md:text-xl text-white font-medium placeholder-white/20 outline-none transition-all duration-300 focus:border-white disabled:opacity-50"
                  />
                </div>


                {/* Message */}
                <div className="relative w-full group">
                  <textarea 
                    rows="4" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={500}
                    placeholder="Tell us about your project *"
                    disabled={status === 'loading'}
                    className="w-full bg-transparent border-b-[2px] border-white/10 py-4 text-lg md:text-xl text-white font-medium placeholder-white/20 outline-none resize-none transition-all duration-300 focus:border-white disabled:opacity-50"
                  />
                </div>

                {/* Status Messages */}
                {validationError && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="flex flex-col items-center justify-center gap-3 text-white bg-gradient-to-br from-orange-500/20 via-orange-900/30 to-black/40 border border-orange-500/30 py-6 px-6 rounded-[1.5rem] backdrop-blur-xl text-center"
                  >
                    <div className="bg-orange-500/20 p-3 rounded-full">
                      <AlertCircle size={24} className="text-orange-500" />
                    </div>
                    <span className="text-base font-bold tracking-tight">{validationError}</span>
                  </motion.div>
                )}
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="flex flex-col items-center justify-center gap-3 text-white bg-gradient-to-br from-green-500/20 via-green-900/30 to-black/40 border border-green-500/30 py-8 px-6 rounded-[1.5rem] backdrop-blur-xl text-center"
                  >
                    <div className="bg-green-500/20 p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                      <CheckCircle size={32} className="text-green-500 animate-pulse" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xl font-black tracking-tighter uppercase italic text-green-400">Success!</span>
                      <span className="text-base text-white/90 font-medium">Message received loud and clear.</span>
                    </div>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="flex flex-col items-center justify-center gap-3 text-white bg-gradient-to-br from-red-500/20 via-red-900/30 to-black/40 border border-red-500/30 py-6 px-6 rounded-[1.5rem] backdrop-blur-xl text-center"
                  >
                    <div className="bg-red-500/20 p-3 rounded-full">
                      <AlertCircle size={24} className="text-red-500" />
                    </div>
                    <span className="text-base font-bold tracking-tight">Failed to route. Try sending an email directly.</span>
                  </motion.div>
                )}


                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-2 flex items-center justify-between w-full bg-white text-black rounded-full transition-all duration-300 hover:bg-neutral-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  style={{ padding: '20px 32px 20px 42px' }}
                >
                  <span className="text-sm md:text-base font-black tracking-[0.25em] uppercase">
                    {status === 'loading' ? 'Transmitting...' : 'Send Inquiry'}
                  </span>
                  {status === 'loading' ? (
                    <Loader2 className="animate-spin text-black" size={24} />
                  ) : (
                    <div className="bg-black text-white p-3 rounded-full flex items-center justify-center">
                      <Send size={18} />
                    </div>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
