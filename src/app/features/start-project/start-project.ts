import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { Button } from '../../shared/ui/button/button';
import { Toast } from '../../shared/ui/toast/toast';
import { SeoService } from '../../core/seo/seo.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { ContactService } from '../../core/services/contact.service';
import { ContactSubmissionResult, ProjectTimeline, ProjectType } from '../../core/models';

/** Rejects a value that has leading/trailing whitespace (e.g. a name starting with a space). */
function noSurroundingWhitespace(control: AbstractControl<string>): ValidationErrors | null {
  const value = control.value;
  return value && value !== value.trim() ? { whitespace: true } : null;
}

/** Maps the backend's snake_case field names back to this form's controls. */
const BACKEND_FIELD_MAP: Record<string, keyof StartProjectForm> = {
  name: 'name',
  email: 'email',
  company: 'company',
  project_type: 'projectType',
  timeline: 'timeline',
  project_description: 'projectDescription',
  budget: 'budget',
};

const DEFAULT_FIELD_ERRORS: Record<keyof StartProjectForm, string> = {
  name: 'Please enter your name.',
  email: 'Please enter a valid email address.',
  company: '',
  projectType: 'Please select a project type.',
  projectDescription: 'Tell us a bit more — at least 20 characters.',
  timeline: 'Please select a timeline.',
  budget: '',
};

interface StartProjectForm {
  name: FormControl<string>;
  email: FormControl<string>;
  company: FormControl<string>;
  projectType: FormControl<ProjectType | ''>;
  projectDescription: FormControl<string>;
  timeline: FormControl<ProjectTimeline | ''>;
  budget: FormControl<string>;
}

@Component({
  selector: 'app-start-project',
  imports: [ReactiveFormsModule, SectionHeading, Button, Toast],
  templateUrl: './start-project.html',
})
export class StartProject {
  private readonly seo = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);
  private readonly contactService = inject(ContactService);

  protected readonly projectTypes: ProjectType[] = [
    'New product',
    'Web application',
    'SaaS',
    'Backend / API',
    'Cloud',
    'AI',
    'Modernization',
    'Other',
  ];

  protected readonly timelines: ProjectTimeline[] = ['ASAP', '1–3 months', '3–6 months', 'Flexible'];

  protected readonly submitting = signal(false);
  readonly submitted = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly toastMessage = signal<string | null>(null);
  protected readonly attachment = signal<File | null>(null);
  protected readonly attachmentError = signal<string | null>(null);
  private readonly attachmentInput = viewChild<ElementRef<HTMLInputElement>>('attachmentInput');
  private hasTrackedStart = false;

  readonly form = new FormGroup<StartProjectForm>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, noSurroundingWhitespace] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    company: new FormControl('', { nonNullable: true, validators: [noSurroundingWhitespace] }),
    projectType: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    projectDescription: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(20), noSurroundingWhitespace],
    }),
    timeline: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    budget: new FormControl('', { nonNullable: true, validators: [noSurroundingWhitespace] }),
  });

  constructor() {
    this.seo.update({
      title: "Let's build something",
      description: "Tell us what you're building, and we'll get back to you with the next steps.",
      path: '/start-a-project',
    });
  }

  onFieldTouched(): void {
    if (!this.hasTrackedStart) {
      this.hasTrackedStart = true;
      this.analytics.track('contact_form_started');
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.attachment.set(input.files?.[0] ?? null);
    this.attachmentError.set(null);
  }

  removeAttachment(): void {
    this.attachment.set(null);
    this.attachmentError.set(null);
    const input = this.attachmentInput()?.nativeElement;
    if (input) {
      input.value = '';
    }
  }

  submit(): void {
    if (this.submitting()) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);
    this.attachmentError.set(null);
    const value = this.form.getRawValue();

    this.contactService
      .submit({
        name: value.name,
        email: value.email,
        company: value.company,
        projectType: value.projectType as ProjectType,
        projectDescription: value.projectDescription,
        timeline: value.timeline as ProjectTimeline,
        budget: value.budget,
        attachment: this.attachment(),
      })
      .subscribe({
        next: () => {
          this.submitting.set(false);
          this.submitted.set(true);
          this.toastMessage.set("Message delivered — we'll be in touch soon.");
          this.analytics.track('contact_form_submitted');
        },
        error: (err: ContactSubmissionResult) => {
          this.submitting.set(false);
          this.errorMessage.set(err?.message ?? 'Something went wrong. Please try again.');
          if (err?.fieldErrors) {
            this.applyFieldErrors(err.fieldErrors);
          }
        },
      });
  }

  field(name: keyof StartProjectForm) {
    return this.form.controls[name];
  }

  isInvalid(name: keyof StartProjectForm): boolean {
    const control = this.field(name);
    return control.invalid && (control.dirty || control.touched);
  }

  fieldError(name: keyof StartProjectForm): string {
    const control = this.field(name);
    const serverMessage = control.errors?.['server'];
    if (typeof serverMessage === 'string') {
      return serverMessage;
    }
    if (control.errors?.['whitespace']) {
      return "Please remove the extra space at the start or end — it can't begin or end with a space.";
    }
    return DEFAULT_FIELD_ERRORS[name];
  }

  private applyFieldErrors(fieldErrors: Record<string, string[]>): void {
    for (const [backendKey, messages] of Object.entries(fieldErrors)) {
      const message = messages?.[0];
      if (!message) {
        continue;
      }
      if (backendKey === 'attachment') {
        this.attachmentError.set(message);
        continue;
      }
      const controlName = BACKEND_FIELD_MAP[backendKey];
      if (!controlName) {
        continue;
      }
      const control = this.field(controlName);
      control.setErrors({ ...control.errors, server: message });
      control.markAsTouched();
    }
  }
}
