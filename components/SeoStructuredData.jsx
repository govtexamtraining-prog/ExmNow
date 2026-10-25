import React from 'react';
import Head from 'next/head';

export default function SeoStructuredData({
  type = 'HOME',
  title = 'ExmNow: All-India Exam Results & Live Scorecards Portal 2026',
  description = 'Real-time live examination results and scorecard portal for 29 States & UTs. Fast-track access to board results, percentile calculators, and school tabulation registers.',
  url = 'http://localhost:3000',
  faqs = [],
  event = null,
  breadcrumbs = []
}) {
  // 1. Website Schema with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ExmNow',
    url: url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/results?query={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  // 2. Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ExmNow Educational Portal',
    url: url,
    logo: `${url}/favicon.ico`,
    description: 'All-India Educational Examination Results Dispatch & Scorecard Verification Engine'
  };

  // 3. FAQPage Schema for Google SERP Accordions
  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

  // 4. Educational Event Schema for Exam Dates and Result Declarations
  const eventSchema = event ? {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    startDate: event.startDate || new Date().toISOString(),
    endDate: event.endDate || event.startDate || new Date().toISOString(),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url: event.url || url
    },
    description: event.description || 'Public examination and result declaration',
    organizer: {
      '@type': 'Organization',
      name: event.organizer || 'State Examination Board / National Testing Agency'
    }
  } : null;

  // 5. BreadcrumbList Schema
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: b.name,
      item: b.url
    }))
  } : null;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {eventSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
    </Head>
  );
}
