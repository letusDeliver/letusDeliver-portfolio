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
  /** Short, honest status badge — e.g. "Work in progress", "Hackathon MVP", "Actively used". Omit for a project with nothing notable to flag. */
  statusLabel?: string;
  demoUrl?: string;
  githubUrl?: string;
  /** Path under /public to a real screenshot of the actual running project — never a stock photo or mockup. Omit rather than fabricate. */
  imageUrl?: string;
  /** Required alongside imageUrl: describes exactly what the screenshot shows. */
  imageAlt?: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  features?: string[];
  architectureNotes?: string;
  engineeringDecisions?: string[];
}
