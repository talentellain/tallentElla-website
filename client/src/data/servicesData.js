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
        description: 'Built a full-scale dashboard for a fintech startup.', 
        link: 'https://example.com',
        image: techstart
      },
      { 
        title: 'VibeShop E-com', 
        description: 'High-converting online store with seamless checkout.', 
        link: 'https://example.com',
        image: vibeshop
      },
      { 
        title: 'Global Insights Dashboard', 
        description: 'Next-gen analytics platform for a global logistics firm.', 
        link: 'https://example.com',
        image: globalInsights
      }
    ],
    plans: [
      { 
        name: 'Basic', 
        subtitle: 'For small businesses',
        price: 'Rs 5,000', 
        billing: 'one-time',
        features: ['5 Page Responsive Website', 'Mobile Optimization', 'Contact Form', 'Basic SEO Setup', '1 Month Support'] 
      },
      { 
        name: 'Professional', 
        subtitle: 'For growing businesses',
        price: 'Rs 20,000', 
        billing: 'one-time',
        features: ['10 Page Custom Website', 'CMS Integration', 'Payment Gateway', 'Advanced SEO + Analytics', '3 Months Support'] 
      },
      { 
        name: 'Enterprise', 
        subtitle: 'For large organizations',
        price: 'Rs 40,000', 
        billing: 'one-time',
        features: ['Responsive+ 3D', 'E-commerce Platform', 'Custom Integrations', 'Priority Support', '6 Months Support'] 
      }
    ]
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    icon: 'Share2',
    description: 'Strategic content creation and community management to build a powerful brand presence.',
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
        description: 'High-energy visuals for a tech brand.', 
        type: 'video',
        content: socialVideo
      },
      { 
        id: 'sm2',
        title: 'Urban Style Reel', 
        description: 'Streetwear fashion showcase.', 
        type: 'video',
        content: socialVideo2
      },
      { 
        id: 'sm3',
        title: 'Aura Glow Branding', 
        description: 'Minimalist brand aesthetic reveal.', 
        type: 'video',
        content: socialVideo3
      },
      { 
        id: 'sm4',
        title: 'Lifestyle Aesthetics', 
        description: 'Curated lifestyle feed management.', 
        type: 'video',
        content: socialVideo4
      },
      { 
        id: 'sm5',
        title: 'Motion Design Reel', 
        description: 'Abstract motion for a creative agency.', 
        type: 'video',
        content: socialVideo5
      },
      { 
        id: 'sm6',
        title: 'Fashion Trend Set', 
        description: 'Seasonal trend coordination.', 
        type: 'video',
        content: socialVideo6
      },
      { 
        id: 'sm7',
        title: 'Tech Influence', 
        description: 'B2B influencer strategy.', 
        type: 'video',
        content: socialVideo7
      },
      { 
        id: 'sm8',
        title: 'Brand Story Reel', 
        description: 'Narrative-driven content for impact.', 
        type: 'video',
        content: socialVideo8
      },
      { 
        id: 'sm9',
        title: 'Minimalist Content', 
        description: 'Clean visuals for high-end clients.', 
        type: 'video',
        content: socialVideo9
      }
    ],
    plans: [
      { 
        name: 'Starter', 
        subtitle: 'Perfect for startups',
        price: 'Rs 10,000', 
        billing: '/month',
        features: ['2 Platforms (IG + FB)', '12 Posts/Month', 'Basic Graphic Design', 'Caption Writing', 'Monthly Report'] 
      },
      { 
        name: 'Growth', 
        subtitle: 'For scaling brands',
        price: 'Rs 20,000', 
        billing: '/month',
        features: ['4 Platforms (All Major)', '24 Posts/Month', 'Premium Graphics + Reels', 'Community Management', 'Weekly Analytics'] 
      },
      { 
        name: 'Premium', 
        subtitle: 'Full-service solution',
        price: 'Rs 35,000', 
        billing: '/month',
        features: ['All Platforms', '24 Posts + Videos', 'Video Production', 'Paid Ads Management', 'Dedicated Manager'] 
      }
    ]
  },
  {
    id: 'visual-identity-design',
    title: 'Visual Identity Design',
    icon: 'Palette',
    description: 'Defining your brand voice through stunning visual elements and comprehensive design systems.',
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
        description: 'Complete identity for a green energy startup.', 
        link: 'https://example.com',
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&q=80&w=800'
      },
      { 
        title: 'UrbanWear Style', 
        description: 'Edgy visual system for a premium streetwear brand.', 
        link: 'https://example.com',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800'
      },
      { 
        title: 'Luxe Jewelry Identity', 
        description: 'Minimalist and elegant visual system for a premium jewelry firm.', 
        link: 'https://example.com',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800'
      }
    ],
    plans: [
      { 
        name: 'Logo Package', 
        subtitle: 'Quick brand start',
        price: 'Rs 3,000', 
        billing: 'one-time',
        features: ['2 Logo Concepts', '2 Revision Rounds', 'All File Formats', 'Color Variations', 'Business Card Design'] 
      },
      { 
        name: 'Brand Identity', 
        subtitle: 'Complete brand system',
        price: 'Rs 10,000', 
        billing: 'one-time',
        features: ['4 Logo Concepts', 'Brand Guidelines Book', 'Color + Typography System', 'Stationery Design', 'Social Media Templates', '4 Revisions'] 
      },
      { 
        name: 'Complete Rebrand', 
        subtitle: 'Total transformation',
        price: 'Rs 30,000', 
        billing: 'one-time',
        features: ['6 Logo Concepts', 'Complete Brand Guidelines', 'Business Card & Letterhead', 'Social Media Kit (10 Posts)', 'Presentation Template', '1 Month Free Support'] 
      }
    ]
  }
];
