/** Ownership classification — never blur these lines. */
export type OwnershipType = 'letusdeliver' | 'personal' | 'professional-experience';

export type ProjectCategory = 'Product' | 'Full Stack' | 'Architecture' | 'Cloud' | 'AI';

export interface ProjectSection {
  heading: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  technologies: string[];
  featured: boolean;
  ownershipType: OwnershipType;
  /** Human-readable context for professional-experience projects, e.g. employer name. Never implies a LetUsDeliver client relationship. */
  contextLabel?: string;
  demoUrl?: string;
  githubUrl?: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  features?: string[];
  architectureNotes?: string;
  engineeringDecisions?: string[];
}
