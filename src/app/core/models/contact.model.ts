export type ProjectType =
  | 'New product'
  | 'Web application'
  | 'SaaS'
  | 'Backend / API'
  | 'Cloud'
  | 'AI'
  | 'Modernization'
  | 'Other';

export type ProjectTimeline = 'ASAP' | '1–3 months' | '3–6 months' | 'Flexible';

export interface ContactFormValue {
  name: string;
  email: string;
  company: string;
  projectType: ProjectType;
  projectDescription: string;
  timeline: ProjectTimeline;
  budget: string;
  attachment: File | null;
}

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
}
