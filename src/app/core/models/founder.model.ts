export interface FounderExperience {
  role: string;
  organization: string;
  period: string;
  highlights: string[];
}

export interface FounderCertification {
  name: string;
  issuer: string;
  date: string;
}

export interface FounderEducation {
  degree: string;
  institution: string;
  year: string;
}

export interface TechCategory {
  category: string;
  items: string[];
}

export interface Founder {
  slug: string;
  name: string;
  role: string;
  yearsExperience: string;
  summary: string;
  philosophy: string;
  expertise: string[];
  technologies: TechCategory[];
  experience: FounderExperience[];
  /** Slugs referencing Project entries with matching ownershipType. */
  projectSlugs: string[];
  certifications: FounderCertification[];
  education: FounderEducation;
}
