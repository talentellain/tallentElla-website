import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'TalentElla | A Creative Digital Agency',
  description = 'TalentElla is a creative digital agency crafting immersive digital experiences, cutting-edge design, and scalable platforms that elevate your brand.',
  keywords = 'digital agency, web design, branding, UI/UX, creative agency India, TalentElla',
  url = 'https://talentella.in',
  image = 'https://talentella.in/og-image.jpg',
  type = 'website',
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TalentElla',
    url: 'https://talentella.in',
    logo: 'https://talentella.in/logo.png',
    description,
    email: 'talentella.in@gmail.com',
    foundingDate: '2026',
    sameAs: [
      'https://www.instagram.com/talentella.in',
      'https://www.linkedin.com/company/talentella',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'talentella.in@gmail.com',
      contactType: 'customer service',
    },
    offers: {
      '@type': 'AggregateOffer',
      description: 'Web Design, Branding, UI/UX, Digital Marketing',
    },
  };

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="TalentElla" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="TalentElla" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
