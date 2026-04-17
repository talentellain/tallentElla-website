import techstart from '../assets/techstart.png';
import vibeshop from '../assets/vibeshop.png';
import globalInsights from '../assets/global_insights.png';
import socialVideo from '../assets/social.mp4';
import socialVideo2 from '../assets/social2.mp4';
import socialVideo3 from '../assets/social3.mp4';
import socialVideo4 from '../assets/social4.mp4';
import socialVideo5 from '../assets/social5.mp4';
import socialVideo6 from '../assets/social6.mp4';
import socialVideo7 from '../assets/social7.mp4';
import socialVideo8 from '../assets/social8.mp4';
import socialVideo9 from '../assets/social9.mp4';

export const servicesData = [
  {
    id: 'website-development',
    title: 'Website Development',
    icon: 'Code',
    description: 'Custom, high-performance websites built with the latest technologies to scale your business.',
    // ── SEO Meta ──
    seo: {
      pageTitle: 'Website Development Services India',
      metaDescription: 'Get custom, high-performance websites from TalentElla — India\'s full-service 360° marketing agency. SEO-friendly architecture, e-commerce & CMS. Starting ₹5,000.',
      keywords: 'website development India, custom web applications, e-commerce solutions, responsive web design, SEO friendly website, full service digital marketing agency, performance optimization',
      primaryKeyword: 'full service digital marketing agency',
    },
    // ── GEO: Answer-first block ──
    answerBlock: {
      question: 'What is Website Development?',
      answer: 'Website development is the process of designing, building, and maintaining websites and web applications. At TalentElla, we create custom, high-performance websites using modern technologies like React, Next.js, and Node.js — optimized for speed, SEO, and conversions. Our full-service digital marketing agency in India delivers responsive designs that work seamlessly across all devices, starting from ₹5,000.',
    },
    // ── FAQs with FAQPage schema ──
    faqs: [
      {
        question: 'How much does website development cost in India?',
        answer: 'At TalentElla, website development starts from ₹5,000 for a basic 5-page responsive website. Professional packages with CMS integration and advanced SEO start at ₹20,000, while enterprise solutions with custom integrations begin at ₹40,000.',
      },
      {
        question: 'How long does it take to build a website?',
        answer: 'A basic website typically takes 1-2 weeks, while professional websites with CMS and e-commerce features take 3-4 weeks. Enterprise-level custom web applications may take 6-8 weeks depending on complexity.',
      },
      {
        question: 'Do you offer SEO-friendly website development?',
        answer: 'Yes, every website we build includes SEO-friendly architecture, optimized page speed (Core Web Vitals), clean URL structure, schema markup, and mobile-first responsive design to ensure high search engine rankings.',
      },
      {
        question: 'What technologies do you use for web development?',
        answer: 'We use cutting-edge technologies including React, Next.js, Vite, Node.js, and modern CSS frameworks. Our websites are optimized for Core Web Vitals with fast LCP under 2.5 seconds.',
      },
      {
        question: 'Do you provide website maintenance and support?',
        answer: 'Yes, all our development packages include post-launch support ranging from 1 to 6 months. We offer security monitoring, regular backups, performance audits, bug fixing, and priority support.',
      },
    ],
    // ── Internal linking: related services ──
    relatedServices: ['social-media-management', 'visual-identity-design'],
    subItems: [
      'Custom Web Applications',
      'E-commerce Solutions',
      'Responsive Design',
      'Performance Optimization',
      'SEO Friendly Architecture',
      'Custom API Development'
    ],
    maintenance: {
      title: "Long-term Maintenance & Support",
      description: "Building the site is just the beginning. We ensure your digital assets remain fast, secure, and ahead of the curve.",
      features: [
        { title: 'Security Monitoring', desc: 'Proactive protection against threats.', icon: 'Shield' },
        { title: 'Regular Backups', desc: 'Daily data preservation for peace of mind.', icon: 'Database' },
        { title: 'Performance Audits', desc: 'Optimization to maintain high speeds.', icon: 'Zap' },
        { title: 'Bug fixing', desc: 'Priority support for all technical issues.', icon: 'LifeBuoy' },
        { title: 'Priority support', desc: 'Direct access to our development team.', icon: 'Rocket' }
      ]
    },
    portfolio: [
      { 
        title: 'TechStart SaaS', 
        description: 'Built a full-scale dashboard for a fintech startup with real-time analytics, user management, and seamless API integrations.', 
        link: 'https://example.com',
        image: techstart,
        alt: "TechStart SaaS dashboard — fintech startup web application developed by TalentElla, India's full-service digital marketing agency"
      },
      { 
        title: 'VibeShop E-com', 
        description: 'High-converting online store with seamless checkout, inventory management, and mobile-first responsive design.', 
        link: 'https://example.com',
        image: vibeshop,
        alt: 'VibeShop e-commerce platform — high-converting online store built by TalentElla web development team in India'
      },
      { 
        title: 'Global Insights Dashboard', 
        description: 'Next-gen analytics platform for a global logistics firm with real-time data visualization and reporting.', 
        link: 'https://example.com',
        image: globalInsights,
        alt: 'Global Insights analytics dashboard — enterprise data visualization platform developed by TalentElla agency'
      }
    ],
    plans: [
      { 
        name: 'Basic', 
        subtitle: 'For small businesses',
        price: '₹5,000', 
        billing: 'one-time',
        features: ['5 Page Responsive Website', 'Mobile Optimization', 'Contact Form', 'Basic SEO Setup', '1 Month Support'],
        priceNum: 5000
      },
      { 
        name: 'Professional', 
        subtitle: 'For growing businesses',
        price: '₹20,000', 
        billing: 'one-time',
        features: ['10 Page Custom Website', 'CMS Integration', 'Payment Gateway', 'Advanced SEO + Analytics', '3 Months Support'],
        priceNum: 20000
      },
      { 
        name: 'Enterprise', 
        subtitle: 'For large organizations',
        price: '₹40,000', 
        billing: 'one-time',
        features: ['Responsive+ 3D', 'E-commerce Platform', 'Custom Integrations', 'Priority Support', '6 Months Support'],
        priceNum: 40000
      }
    ]
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    icon: 'Share2',
    description: 'Strategic content creation and community management to build a powerful brand presence across all platforms.',
    // ── SEO Meta ──
    seo: {
      pageTitle: 'Social Media Marketing Agency India',
      metaDescription: 'TalentElla — India\'s top social media marketing agency. Content creation, community management, influencer marketing & ad campaigns. Plans from ₹10,000/month.',
      keywords: 'social media marketing agency India, social media management, content creation agency, influencer marketing agency, affordable influencer marketing agency India, social media management and content creation agency, community management',
      primaryKeyword: 'social media marketing agency India',
    },
    // ── GEO: Answer-first block ──
    answerBlock: {
      question: 'What is Social Media Management?',
      answer: 'Social media management is the process of creating, scheduling, and publishing content across social platforms like Instagram, Facebook, LinkedIn, and X (Twitter) to build brand awareness, engage audiences, and drive business growth. TalentElla is India\'s leading social media marketing agency offering strategic content creation, community management, influencer coordination, and ad campaign management — with packages starting from ₹10,000/month.',
    },
    // ── FAQs ──
    faqs: [
      {
        question: 'How much does social media management cost in India?',
        answer: 'TalentElla offers social media management packages starting from ₹10,000/month for 2 platforms with 12 posts and 6 reels. Growth plans at ₹20,000/month cover 4 platforms with 24 posts, and premium plans at ₹35,000/month include all platforms, video production, and paid ads management.',
      },
      {
        question: 'Which social media platforms do you manage?',
        answer: 'We manage all major social media platforms including Instagram, Facebook, LinkedIn, X (Twitter), YouTube, and Pinterest. Our strategy is tailored to each platform\'s unique audience and content format.',
      },
      {
        question: 'Do you offer influencer marketing services?',
        answer: 'Yes, TalentElla is an affordable influencer marketing agency in India. We coordinate with relevant influencers for your brand, manage collaborations, and track campaign ROI across all platforms.',
      },
      {
        question: 'How do you measure social media success?',
        answer: 'We provide detailed analytics and reporting — monthly for Starter plans and weekly for Growth and Premium plans. We track engagement rate, follower growth, reach, impressions, website traffic, and conversions.',
      },
      {
        question: 'Can you create video content and reels?',
        answer: 'Absolutely. Our Growth and Premium plans include premium graphics and reels creation. Our Premium plan includes full video production, ensuring your brand stays ahead with trending video content formats.',
      },
    ],
    relatedServices: ['website-development', 'visual-identity-design'],
    subItems: [
      'Content Strategy',
      'Daily Posting',
      'Engagement Growth',
      'Influencer Coordination',
      'Ad Campaign Management'
    ],
    portfolio: [
      { 
        id: 'sm1',
        title: 'Neon Pulse Campaign', 
        description: 'High-energy visuals and dynamic content strategy for a tech brand launch campaign.', 
        type: 'video',
        content: socialVideo,
        alt: 'Neon Pulse social media campaign — high-energy tech brand content created by TalentElla social media marketing agency India'
      },
      { 
        id: 'sm2',
        title: 'Urban Style Reel', 
        description: 'Streetwear fashion showcase with trend-focused reels and engagement optimization.', 
        type: 'video',
        content: socialVideo2,
        alt: 'Urban Style fashion reel — streetwear social media content by TalentElla content creation agency'
      },
      { 
        id: 'sm3',
        title: 'Aura Glow Branding', 
        description: 'Minimalist brand aesthetic reveal with cohesive visual identity across platforms.', 
        type: 'video',
        content: socialVideo3,
        alt: 'Aura Glow brand aesthetic — minimalist social media branding by TalentElla influencer marketing agency'
      },
      { 
        id: 'sm4',
        title: 'Lifestyle Aesthetics', 
        description: 'Curated lifestyle feed management with consistent brand voice and engagement growth.', 
        type: 'video',
        content: socialVideo4,
        alt: 'Lifestyle aesthetics social media feed — curated content management by TalentElla agency India'
      },
      { 
        id: 'sm5',
        title: 'Motion Design Reel', 
        description: 'Abstract motion graphics for a creative agency portfolio showcase.', 
        type: 'video',
        content: socialVideo5,
        alt: 'Motion design creative reel — dynamic social media content by TalentElla marketing agency'
      },
      { 
        id: 'sm6',
        title: 'Fashion Trend Set', 
        description: 'Seasonal trend coordination with influencer partnerships and community engagement.', 
        type: 'video',
        content: socialVideo6,
        alt: 'Fashion trend coordination — seasonal social media strategy by TalentElla India'
      },
      { 
        id: 'sm7',
        title: 'Tech Influence', 
        description: 'B2B influencer strategy driving thought leadership and lead generation.', 
        type: 'video',
        content: socialVideo7,
        alt: 'B2B tech influencer strategy — lead generation social media campaign by TalentElla agency'
      },
      { 
        id: 'sm8',
        title: 'Brand Story Reel', 
        description: 'Narrative-driven content for maximum brand impact and emotional connection.', 
        type: 'video',
        content: socialVideo8,
        alt: 'Brand storytelling reel — narrative content creation by TalentElla social media marketing agency India'
      },
      { 
        id: 'sm9',
        title: 'Minimalist Content', 
        description: 'Clean, sophisticated visuals for high-end clients with premium content aesthetics.', 
        type: 'video',
        content: socialVideo9,
        alt: 'Minimalist premium content — high-end social media design by TalentElla creative agency India'
      }
    ],
    plans: [
      { 
        name: 'Starter', 
        subtitle: 'Perfect for startups',
        price: '₹10,000', 
        billing: '/month',
        features: ['2 Platforms (IG + FB)', '12 Posts/Month', '7 Reels/Month', 'Basic Graphic Design', 'Monthly Report'],
        priceNum: 10000
      },
      { 
        name: 'Growth', 
        subtitle: 'For scaling brands',
        price: '₹20,000', 
        billing: '/month',
        features: ['4 Platforms (All Major)', '24 Posts/Month','12 Reels/Month', 'Premium Graphics + Reels', 'Community Management', 'Weekly Analytics'],
        priceNum: 20000
      },
      { 
        name: 'Premium', 
        subtitle: 'Full-service solution',
        price: '₹35,000', 
        billing: '/month',
        features: ['All Platforms', '24 Posts + Videos', 'Video Production','20 Reels/Month', 'Paid Ads Management', 'Dedicated Manager'],
        priceNum: 35000
      }
    ]
  },
  {
    id: 'visual-identity-design',
    title: 'Visual Identity Design',
    icon: 'Palette',
    description: 'Defining your brand voice through stunning visual elements, comprehensive design systems, and strategic brand positioning.',
    // ── SEO Meta ──
    seo: {
      pageTitle: 'Brand Development & Visual Identity Agency India',
      metaDescription: 'TalentElla — India\'s brand development agency. Logo design, visual identity systems, brand guidelines & complete rebranding. Packages from ₹3,000. Book a consultation.',
      keywords: 'brand development agency, visual identity design, brand strategy and visual identity agency, logo design India, brand guidelines, brand identity system, rebranding agency India, brand strategy',
      primaryKeyword: 'brand development agency',
    },
    // ── GEO: Answer-first block ──
    answerBlock: {
      question: 'What is Visual Identity Design?',
      answer: 'Visual identity design encompasses creating all the visual elements that represent a brand — including logos, color palettes, typography, iconography, and comprehensive brand guidelines. TalentElla is India\'s trusted brand strategy and visual identity agency, helping businesses define their unique voice through cohesive design systems. Our brand development packages start from ₹3,000 for logo design.',
    },
    // ── FAQs ──
    faqs: [
      {
        question: 'How much does brand identity design cost in India?',
        answer: 'TalentElla offers logo packages starting at ₹3,000. Complete brand identity packages with guidelines, typography, and stationery design start at ₹10,000. Full rebranding with social media kits and presentation templates is available from ₹30,000.',
      },
      {
        question: 'What\'s included in a complete brand identity package?',
        answer: 'Our Brand Identity package includes 4 logo concepts, a brand guidelines book, complete color and typography system, stationery design, social media templates, and 4 revision rounds — everything you need to launch a cohesive brand.',
      },
      {
        question: 'How long does the brand design process take?',
        answer: 'Logo packages typically take 5-7 business days, brand identity packages take 2-3 weeks, and complete rebrand projects take 4-6 weeks. We follow a discovery, strategy, design, and refinement process.',
      },
      {
        question: 'Do you offer brand strategy along with visual design?',
        answer: 'Yes, we are a brand strategy and visual identity agency. We start with brand positioning, target audience analysis, and competitive research before creating visual elements that authentically represent your brand.',
      },
      {
        question: 'Can you redesign an existing brand identity?',
        answer: 'Absolutely. Our Complete Rebrand package at ₹30,000 includes full brand transformation — 6 logo concepts, complete brand guidelines, business cards, letterhead, a 10-post social media kit, and a presentation template, plus 1 month of free support.',
      },
    ],
    relatedServices: ['website-development', 'social-media-management'],
    subItems: [
      'Logo & Visual System',
      'Brand Guidelines',
      'Marketing Assets',
      'Typography & Color Palette',
      'Iconography Systems'
    ],
    portfolio: [
      { 
        title: 'EcoPulse Branding', 
        description: 'Complete brand identity for a green energy startup — logo, guidelines, and marketing collateral.', 
        link: 'https://example.com',
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&q=80&w=800',
        alt: 'EcoPulse green energy brand identity — comprehensive branding by TalentElla brand development agency India'
      },
      { 
        title: 'UrbanWear Style', 
        description: 'Edgy visual system for a premium streetwear brand with bold typography and striking color palettes.', 
        link: 'https://example.com',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
        alt: 'UrbanWear streetwear brand visual identity — premium brand design by TalentElla visual identity agency'
      },
      { 
        title: 'Luxe Jewelry Identity', 
        description: 'Minimalist and elegant visual system for a premium jewelry firm with luxurious brand elements.', 
        link: 'https://example.com',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
        alt: 'Luxe Jewelry premium brand identity — elegant visual design system by TalentElla branding agency India'
      }
    ],
    plans: [
      { 
        name: 'Logo Package', 
        subtitle: 'Quick brand start',
        price: '₹3,000', 
        billing: 'one-time',
        features: ['2 Logo Concepts', '2 Revision Rounds', 'All File Formats', 'Color Variations', 'Business Card Design'],
        priceNum: 3000
      },
      { 
        name: 'Brand Identity', 
        subtitle: 'Complete brand system',
        price: '₹10,000', 
        billing: 'one-time',
        features: ['4 Logo Concepts', 'Brand Guidelines Book', 'Color + Typography System', 'Stationery Design', 'Social Media Templates', '4 Revisions'],
        priceNum: 10000
      },
      { 
        name: 'Complete Rebrand', 
        subtitle: 'Total transformation',
        price: '₹30,000', 
        billing: 'one-time',
        features: ['6 Logo Concepts', 'Complete Brand Guidelines', 'Business Card & Letterhead', 'Social Media Kit (10 Posts)', 'Presentation Template', '1 Month Free Support'],
        priceNum: 30000
      }
    ]
  }
];

/**
 * Homepage FAQs — targeting voice search, AI answer boxes, and long-tail keywords
 */
export const homepageFAQs = [
  {
    question: 'What is a 360 degree marketing agency?',
    answer: 'A 360 degree marketing agency provides comprehensive marketing solutions covering every touchpoint — from brand development and website design to social media management, influencer marketing, content marketing, lead generation, and offline marketing. TalentElla is India\'s leading 360° marketing agency offering integrated marketing solutions that combine online and offline strategies for maximum brand impact.',
  },
  {
    question: 'Why choose TalentElla as your marketing agency in India?',
    answer: 'TalentElla combines cutting-edge technology with creative storytelling to deliver measurable results. As a full-service digital marketing agency, we offer brand development, social media marketing, influencer marketing, website development, and lead generation — all under one roof. Our data-driven approach, transparent reporting, and affordable INR pricing (starting ₹3,000) make us the ideal partner for businesses of all sizes across India.',
  },
  {
    question: 'What services does TalentElla offer?',
    answer: 'TalentElla offers comprehensive 360° marketing services including: website development (from ₹5,000), social media management (from ₹10,000/month), visual identity and brand development (from ₹3,000), influencer marketing, content creation, lead generation, SEO optimization, and integrated marketing solutions for both online and offline channels.',
  },
  {
    question: 'How much do TalentElla\'s marketing services cost?',
    answer: 'TalentElla offers competitive pricing in INR designed for Indian businesses. Website development starts at ₹5,000, social media management from ₹10,000/month, and brand identity design from ₹3,000. We provide customized packages for small businesses, startups, and enterprise clients. Contact us for a free strategy call to get a tailored quote.',
  },
  {
    question: 'Does TalentElla work with small businesses and startups?',
    answer: 'Absolutely! TalentElla is an affordable 360 marketing agency for small businesses and startups in India. We offer scalable packages starting from ₹3,000, ensuring businesses of every size can access professional marketing services. Our Starter and Basic plans are specifically designed for early-stage brands looking to establish their digital presence.',
  },
  {
    question: 'What makes TalentElla different from other marketing agencies in India?',
    answer: 'TalentElla stands out as a talent management marketing agency that combines creative excellence with data-driven strategy. We offer omnichannel marketing solutions for brands, with expertise spanning digital and offline channels. Our team brings hands-on experience in brand development, influencer marketing, and lead generation — backed by transparent analytics and reporting at every step.',
  },
];
