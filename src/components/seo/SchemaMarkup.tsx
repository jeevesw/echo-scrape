import { Helmet } from "react-helmet-async";

interface OrganizationSchemaProps {
  name: string;
  description: string;
  url: string;
  logo: string;
  foundingDate: string;
  founders: string[];
  address: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  contactEmail?: string;
  sameAs?: string[];
}

export function OrganizationSchema({
  name,
  description,
  url,
  logo,
  foundingDate,
  founders,
  address,
  contactEmail,
  sameAs = [],
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    url,
    logo,
    foundingDate,
    founders: founders.map((founder) => ({
      "@type": "Person",
      name: founder,
    })),
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    ...(contactEmail && { email: contactEmail }),
    sameAs,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  provider: string;
  serviceType: string;
  areaServed: string[];
  url: string;
}

export function ServiceSchema({
  name,
  description,
  provider,
  serviceType,
  areaServed,
  url,
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
    },
    serviceType,
    areaServed: areaServed.map((area) => ({
      "@type": "Country",
      name: area,
    })),
    url,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
  publisher: string;
  publisherLogo: string;
}

export function ArticleSchema({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url,
  publisher,
  publisherLogo,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished,
    ...(dateModified && { dateModified }),
    ...(image && { image }),
    url,
    publisher: {
      "@type": "Organization",
      name: publisher,
      logo: {
        "@type": "ImageObject",
        url: publisherLogo,
      },
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

interface LocalBusinessSchemaProps {
  type?: string;
  name: string;
  url: string;
  telephone?: string;
  email?: string;
  description?: string;
  address: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  sameAs?: string[];
}

export function LocalBusinessSchema({
  type = "LocalBusiness",
  name,
  url,
  telephone,
  email,
  description,
  address,
  sameAs = [],
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    url,
    ...(telephone && { telephone }),
    ...(email && { email }),
    ...(description && { description }),
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    sameAs,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}