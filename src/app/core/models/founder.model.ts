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

export interface FounderExpertiseArea {
  title: string;
  description: string;
}

/** A short "how this founder's focus flows" strip, e.g. Product → Frontend → ... */
export interface FounderFocus {
  stages: string[];
  description: string;
}

export interface Founder {
  slug: string;
  name: string;
  role: string;
  yearsExperience: string;
  /** Path under /public to a real headshot. Omit to fall back to an initials avatar. */
  photoUrl?: string;
  /** Short (1–2 sentence) hero introduction — not the full resume summary. */
  summary: string;
  philosophy: string;
  expertise: FounderExpertiseArea[];
  /** What this founder actually owns/contributes as a co-founder — distinct from prior-employer history in `experience`. */
  roleAtLetusdeliver: string;
  /** The "Building letusdeliver" closing perspective — this founder's slice of the company's engineering pipeline. */
  buildingLetusdeliver: FounderFocus;
  technologies: TechCategory[];
  experience: FounderExperience[];
  /** Slugs referencing Project entries with matching ownershipType. */
  projectSlugs: string[];
  certifications: FounderCertification[];
  education: FounderEducation;
}
