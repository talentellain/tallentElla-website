import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Process from '../components/Process';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <main>
      <SEO
        title="TalentElla | A Creative Digital Agency"
        description="We bridge the gap between imagination and execution, crafting digital experiences that resonate and scale your business to new heights. Based in India."
        keywords="digital agency India, web design, branding, UI/UX design, creative agency, TalentElla, digital marketing"
        url="https://talentella.in"
      />
      <Hero />
      <Services />
      <Projects />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;
