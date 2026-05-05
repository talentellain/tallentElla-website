import React from 'react';
import SEO, { generateFAQSchema } from '../components/SEO';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Process from '../components/Process';
import WhyTalentElla from '../components/WhyTalentElla';
import HomeFAQ from '../components/HomeFAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import VideoSection from '../components/VideoSection';
import { homepageFAQs } from '../data/servicesData';

const Home = () => {
  const faqSchema = generateFAQSchema(homepageFAQs);

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
      <Projects />
      <VideoSection />
      <Process />
      <WhyTalentElla />
      <HomeFAQ faqs={homepageFAQs} />
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;
