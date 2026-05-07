import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'TalentElla';
const SITE_URL = 'https://talentella.in';
const DEFAULT_IMAGE = `${SITE_URL}/logo.jpg`;
const TITLE_SUFFIX = '360° Marketing Agency India';

const SEO = ({
  title,
  pageTitle = '',
  description = 'TalentElla is India\'s leading 360° marketing agency offering brand development, social media marketing, influencer marketing, lead generation & integrated marketing solutions.',
  keywords = '360 degree marketing agency, full service digital marketing agency, brand development agency, social media marketing agency India, influencer marketing agency, lead generation agency, integrated marketing solutions, content marketing agency',
  url = SITE_URL,
  image = DEFAULT_IMAGE,
  type = 'website',
  schema = null,
  breadcrumbs = null,
  faqSchema = null,
  serviceSchema = null,
  noindex = false,
}) => {
  // Format: "TalentElla | [Page Topic] — 360° Marketing Agency"
  const formattedTitle = title || (pageTitle ? `${SITE_NAME} | ${pageTitle} — ${TITLE_SUFFIX}` : `${SITE_NAME} — ${TITLE_SUFFIX}`);
  const canonicalUrl = url.endsWith('/') ? url : `${url}/`;

  // BreadcrumbList schema
  const breadcrumbSchema = breadcrumbs ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url,
    })),
  } : null;

  useEffect(() => {
    const linkEn = document.createElement('link');
    linkEn.rel = 'alternate';
    linkEn.hreflang = 'en-IN';
    linkEn.href = canonicalUrl;
    
    const linkX = document.createElement('link');
    linkX.rel = 'alternate';
    linkX.hreflang = 'x-default';
    linkX.href = canonicalUrl;
    
    document.head.appendChild(linkEn);
    document.head.appendChild(linkX);
    
    return () => {
      if (document.head.contains(linkEn)) document.head.removeChild(linkEn);
      if (document.head.contains(linkX)) document.head.removeChild(linkX);
    };
  }, [canonicalUrl]);

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="TalentElla" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Resource Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Critical Asset Preloads */}
      <link rel="preload" href="/fg.png" as="image" fetchpriority="high" />
      <link rel="preload" href="/bg5.png" as="image" fetchpriority="high" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Geo-targeting */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />

      {/* BreadcrumbList Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* FAQPage Schema */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {/* Service Schema */}
      {serviceSchema && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}

      {/* Additional Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

/**
 * Generates FAQPage schema markup
 * @param {Array<{question: string, answer: string}>} faqs
 * @returns {Object} FAQPage JSON-LD
 */
export const generateFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': faqs.map(faq => ({
    '@type': 'Question',
    'name': faq.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': faq.answer,
    },
  })),
});

/**
 * Generates Service schema markup
 * @param {Object} service
 * @returns {Object} Service JSON-LD
 */
export const generateServiceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': service.name,
  'description': service.description,
  'provider': {
    '@type': 'Organization',
    'name': 'TalentElla',
    'url': 'https://talentella.in',
  },
  'areaServed': {
    '@type': 'Country',
    'name': 'India',
  },
  'offers': service.offers ? {
    '@type': 'AggregateOffer',
    'priceCurrency': 'INR',
    'lowPrice': service.offers.lowPrice,
    'highPrice': service.offers.highPrice,
    'offerCount': service.offers.count,
  } : undefined,
});

export default SEO;
