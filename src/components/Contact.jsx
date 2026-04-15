import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

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

  const recaptchaRef = useRef(null);
  const [formData, setFormData] = useState({ fullName: '', email: '', confirmEmail: '', phone: '', message: '' });
  const [honeypot, setHoneypot] = useState(''); // bot trap
  const [recaptchaToken, setRecaptchaToken] = useState(null);
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
    if (formData.email.toLowerCase() !== formData.confirmEmail.toLowerCase()) {
      return setValidationError('Email addresses do not match. Please check and try again.');
    }
    if (!validatePhone(formData.phone)) {
      return setValidationError('Please enter a valid phone number.');
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      return setValidationError('Message must be at least 10 characters.');
    }

    // 3. reCAPTCHA check
    if (!recaptchaToken) {
      return setValidationError('Please complete the reCAPTCHA verification.');
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
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
        setTimeout(() => setStatus('idle'), 5000);
      }, (error) => {
        console.error('EmailJS error:', error?.text ?? error);
        setStatus('error');
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
        setTimeout(() => setStatus('idle'), 5000);
      });
  };


  return (
    <div id="contact" ref={outerRef} className="sticky-outer" style={{ zIndex: 35 }}>
      <motion.section
        className="sticky-section"
        style={{ backgroundColor: '#f8f9fc', borderTop: '1px solid rgba(0,0,0,0.05)', borderTopLeftRadius: borderRad, borderTopRightRadius: borderRad, color: '#0a0a0c' }}
      >
        <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '10vh 5%' }}>
          <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', position: 'relative' }}>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-32 items-center">
            
            {/* Left Side: Massive Heading */}
            <div className="flex flex-col gap-6 text-left">
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
                className="flex flex-col gap-6 w-full"
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
                    className="w-full bg-transparent border-b-[2px] border-black/10 py-3 text-lg md:text-xl text-[#0a0a0c] font-medium placeholder-black/30 outline-none transition-all duration-300 focus:border-[#0a0a0c] disabled:opacity-50"
                    style={{ padding: '12px 0' }}
                  />
                </div>

                {/* Row 1: Email + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {/* Email */}
                  <div className="relative w-full group">
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={150}
                      placeholder="Email Address *"
                      disabled={status === 'loading'}
                      className="w-full bg-transparent border-b-[2px] border-black/10 py-3 text-lg md:text-xl text-[#0a0a0c] font-medium placeholder-black/30 outline-none transition-all duration-300 focus:border-[#0a0a0c] disabled:opacity-50"
                      style={{ padding: '12px 0' }}
                    />
                  </div>
                  {/* Phone */}
                  <div className="relative w-full group">
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={20}
                      placeholder="Phone Number"
                      disabled={status === 'loading'}
                      className="w-full bg-transparent border-b-[2px] border-black/10 py-3 text-lg md:text-xl text-[#0a0a0c] font-medium placeholder-black/30 outline-none transition-all duration-300 focus:border-[#0a0a0c] disabled:opacity-50"
                      style={{ padding: '12px 0' }}
                    />
                  </div>
                </div>

                {/* Row 2: Confirm Email (half width) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="relative w-full group">
                    <input 
                      type="email" 
                      name="confirmEmail"
                      value={formData.confirmEmail}
                      onChange={handleChange}
                      required
                      maxLength={150}
                      placeholder="Confirm Email *"
                      disabled={status === 'loading'}
                      autoComplete="off"
                      onPaste={e => e.preventDefault()}
                      className={`w-full bg-transparent border-b-[2px] py-3 text-lg md:text-xl text-[#0a0a0c] font-medium placeholder-black/30 outline-none transition-all duration-300 disabled:opacity-50 ${
                        formData.confirmEmail && formData.email.toLowerCase() !== formData.confirmEmail.toLowerCase()
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-black/10 focus:border-[#0a0a0c]'
                      }`}
                      style={{ padding: '12px 0' }}
                    />
                    {formData.confirmEmail && formData.email.toLowerCase() !== formData.confirmEmail.toLowerCase() && (
                      <span style={{ fontSize: '0.75rem', color: '#ef4444', position: 'absolute', bottom: '-18px', left: 0 }}>
                        Emails don't match
                      </span>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="relative w-full group">
                  <textarea 
                    rows="2" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={500}
                    placeholder="Tell us about your project *"
                    disabled={status === 'loading'}
                    className="w-full bg-transparent border-b-[2px] border-black/10 py-3 text-lg md:text-xl text-[#0a0a0c] font-medium placeholder-black/30 outline-none resize-none transition-all duration-300 focus:border-[#0a0a0c] disabled:opacity-50"
                    style={{ padding: '12px 0' }}
                  />
                </div>

                {/* Status Messages */}
                {validationError && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-[#0a0a0c] bg-orange-100/60 p-5 rounded-2xl font-semibold text-sm">
                    <AlertCircle size={20} className="text-orange-500 flex-shrink-0" />
                    <span>{validationError}</span>
                  </motion.div>
                )}
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

                {/* reCAPTCHA */}
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={(token) => { setRecaptchaToken(token); setValidationError(''); }}
                    onExpired={() => setRecaptchaToken(null)}
                    theme="light"
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={status === 'loading' || !recaptchaToken}
                  className="mt-6 flex items-center justify-between w-full bg-[#0a0a0c] text-white rounded-full transition-all duration-300 hover:bg-black hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 contact-submit-btn"
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
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
