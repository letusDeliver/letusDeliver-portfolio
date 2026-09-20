import { siteConfig } from '../config/site.config';
import { Founder, Service, Article } from '../models';

export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'letusdeliver',
    url: siteConfig.siteUrl,
    slogan: siteConfig.tagline,
    description: 'Founder-led software engineering studio building modern digital products for startups and growing businesses.',
    founder: [
      { '@type': 'Person', name: 'Kunal' },
      { '@type': 'Person', name: 'Mrityunjay' },
    ],
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'letusdeliver',
    url: siteConfig.siteUrl,
  };
}

export function personSchema(founder: Founder): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: founder.name,
    jobTitle: founder.role,
    description: founder.summary,
    worksFor: {
      '@type': 'Organization',
      name: 'letusdeliver',
      url: siteConfig.siteUrl,
    },
    url: `${siteConfig.siteUrl}/about/${founder.slug}`,
    ...(founder.photoUrl ? { image: `${siteConfig.siteUrl}/${founder.photoUrl}` } : {}),
  };
}

export function serviceSchema(service: Service): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'letusdeliver',
      url: siteConfig.siteUrl,
    },
    url: `${siteConfig.siteUrl}/services`,
  };
}

export function articleSchema(article: Article): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    ...(article.date ? { datePublished: article.date } : {}),
  };
}
