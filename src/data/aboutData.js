import { Award, TrendingUp, Users, Shield, BarChart3, Zap } from 'lucide-react';

export const aboutStats = [
  { number: '50+', label: 'Brands Served', icon: Users },
  { number: '200+', label: 'Projects Delivered', icon: TrendingUp },
  { number: '95%', label: 'Client Retention', icon: Award },
  { number: '3x', label: 'Average ROI Boost', icon: BarChart3 },
];

export const eeatSignals = [
  { 
    id: 'experience',
    icon: Award, 
    title: 'Experience', 
    color: '#aa3bff', 
    shortDescription: 'Founded in 2026, TalentElla brings hands-on experience across 50+ brands in India.',
    fullDescription: 'Founded in 2026, TalentElla brings hands-on experience across 50+ brands in India — from early-stage startups to established enterprises in retail, tech, healthcare, and education.'
  },
  { 
    id: 'expertise',
    icon: Zap, 
    title: 'Expertise', 
    color: '#00d2ff', 
    shortDescription: 'Certified digital marketers, brand strategists, and UI/UX designers for the Indian market.',
    fullDescription: 'Our team combines certified digital marketers, brand strategists, UI/UX designers, and full-stack developers. We specialize in integrated marketing solutions and omnichannel marketing strategies for the Indian market.'
  },
  { 
    id: 'authority',
    icon: Shield, 
    title: 'Authority', 
    color: '#ff3b3b', 
    shortDescription: 'Leading 360° agency in India delivering measurable results with transparent analytics.',
    fullDescription: 'Recognized as a leading 360° marketing agency in India, TalentElla delivers measurable results with transparent analytics and reporting. Our client portfolio spans diverse industries across India.'
  },
  { 
    id: 'trust',
    icon: TrendingUp, 
    title: 'Trust', 
    color: '#3bffaa', 
    shortDescription: '95% client retention built on transparent pricing and detailed performance reports.',
    fullDescription: 'We build trust through transparent pricing in INR, detailed performance reports, dedicated account managers, and a 95% client retention rate. Every project is backed by clear deliverables and timelines.'
  },
];
