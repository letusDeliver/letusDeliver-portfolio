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
  /** Present on a 400 response: DRF field-keyed validation errors, e.g. `{ email: ['Enter a valid email address.'] }`. */
  fieldErrors?: Record<string, string[]>;
}

/**
 * Maps the human-readable labels shown in the UI to the backend's choice
 * slugs. Verified against the live Django backend's OPTIONS response for
 * `/api/contact/submissions/` — do not hand-guess new values, re-check
 * OPTIONS if the backend's choices ever change.
 */
export const PROJECT_TYPE_API_VALUES: Record<ProjectType, string> = {
  'New product': 'new_product',
  'Web application': 'web_application',
  SaaS: 'saas',
  'Backend / API': 'backend_api',
  Cloud: 'cloud',
  AI: 'ai',
  Modernization: 'modernization',
  Other: 'other',
};

export const PROJECT_TIMELINE_API_VALUES: Record<ProjectTimeline, string> = {
  ASAP: 'asap',
  '1–3 months': '1_3_months',
  '3–6 months': '3_6_months',
  Flexible: 'flexible',
};
