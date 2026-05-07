import React from 'react';
import { motion } from 'framer-motion';
import SEO, { generateFAQSchema } from '../components/SEO';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Projects from '../components/Projects';
import WhyTalentElla from '../components/WhyTalentElla';
import HomeFAQ from '../components/HomeFAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SocialMediaPortfolio from '../components/SocialMediaPortfolio';
import Features from '../components/Features';
import MobileExperience from '../components/MobileExperience';
import AboutSection from '../components/AboutSection';
import { servicesData, homepageFAQs } from '../data/servicesData';

const Home = () => {
  const faqSchema = generateFAQSchema(homepageFAQs);
  const smmPortfolio = servicesData.find(s => s.id === 'social-media-management')?.portfolio || [];

  const breadcrumbs = [
    { name: 'Home', url: 'https://talentella.in/' },
  ];

  return (
    <main>
      <SEO
        pageTitle="360° Marketing Agency India — The Future of Marketing"
        description="TalentElla is India's leading 360° marketing agency. Full-service brand development, social media marketing, influencer marketing, lead generation & integrated solutions. Get a free strategy call."
        keywords="360 degree marketing agency, full service digital marketing agency, brand development agency, social media marketing agency India, talent management marketing agency, influencer marketing agency, lead generation agency, integrated marketing solutions, content marketing agency, online offline marketing agency"
        url="https://talentella.in"
        faqSchema={faqSchema}
        breadcrumbs={breadcrumbs}
      />
      <Hero />
      <Services />
      
      {/* Features Bento Grid Section */}
      <div id="features" className="sticky-outer" style={{ zIndex: 35 }}>
        <motion.section 
          className="sticky-section"
          style={{
            backgroundColor: '#000', 
            height: '100dvh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Features />
        </motion.section>
      </div>

      {/* Mobile Experience Triple Mockup Section */}
      <div id="mobile-showcase" className="sticky-outer" style={{ zIndex: 40 }}>
        <motion.section 
          className="sticky-section"
          style={{
            backgroundColor: '#000', 
            height: '100dvh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <MobileExperience />
        </motion.section>
      </div>

      {/* About Section - Normal Scroll (No overlapping effect), needs zIndex to render above sticky background */}
      <div style={{ position: 'relative', zIndex: 41 }}>
        <AboutSection />
      </div>

      {/* Production Portfolio (Video Section) */}
      <div id="production-portfolio" className="sticky-outer" style={{ zIndex: 45 }}>
        <motion.section 
          className="sticky-section"
          style={{
            backgroundColor: '#050508', 
            borderTop: '1px solid rgba(255,255,255,0.05)',
            height: '100dvh',
            overflow: 'hidden'
          }}
        >
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2vh 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '0 5%' }}>
              <h2 className="hero-title-shimmer" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1 }}>Production Portfolio</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', fontSize: '0.9rem', maxWidth: '600px', marginInline: 'auto' }}>A deep dive into our creative storytelling and visual craftsmanship.</p>
            </div>
            <SocialMediaPortfolio portfolio={smmPortfolio} />
          </div>
        </motion.section>
      </div>

      <WhyTalentElla />
      <HomeFAQ faqs={homepageFAQs} />
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;
