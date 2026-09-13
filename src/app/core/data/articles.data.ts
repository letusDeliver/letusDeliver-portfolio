import { Article } from '../models';

/**
 * No articles have been published yet. These are explicitly marked
 * `placeholder: true` and the UI must visibly label them as "Coming soon" —
 * never present placeholder copy as a real published article.
 */
export const ARTICLES: Article[] = [
  {
    slug: 'coming-soon-1',
    title: 'Notes on Angular architecture at scale',
    excerpt: 'We are writing up how we approach standalone architecture, signal-based state, and maintainability. Coming soon.',
    category: 'Engineering',
    date: '',
    author: 'letusdeliver',
    content: 'This article has not been published yet.',
    placeholder: true,
  },
  {
    slug: 'coming-soon-2',
    title: 'AI-assisted development, applied honestly',
    excerpt: 'How we use agentic workflows in real delivery work — and where we deliberately keep AI out of the loop. Coming soon.',
    category: 'AI Engineering',
    date: '',
    author: 'letusdeliver',
    content: 'This article has not been published yet.',
    placeholder: true,
  },
  {
    slug: 'coming-soon-3',
    title: 'Cloud data pipelines: lessons from production',
    excerpt: 'Practical notes on building reliable ETL workflows on GCP. Coming soon.',
    category: 'Cloud & Data',
    date: '',
    author: 'letusdeliver',
    content: 'This article has not been published yet.',
    placeholder: true,
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
