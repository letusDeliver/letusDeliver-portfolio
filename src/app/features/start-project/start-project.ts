import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { Button } from '../../shared/ui/button/button';
import { SeoService } from '../../core/seo/seo.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { ContactService } from '../../core/services/contact.service';
import { ProjectTimeline, ProjectType } from '../../core/models';

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
  imports: [ReactiveFormsModule, SectionHeading, Button],
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
  protected readonly attachment = signal<File | null>(null);
  private hasTrackedStart = false;

  readonly form = new FormGroup<StartProjectForm>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    company: new FormControl('', { nonNullable: true }),
    projectType: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    projectDescription: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(20)],
    }),
    timeline: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    budget: new FormControl('', { nonNullable: true }),
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
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);
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
          this.analytics.track('contact_form_submitted');
        },
        error: (err: { message?: string }) => {
          this.submitting.set(false);
          this.errorMessage.set(err?.message ?? 'Something went wrong. Please try again.');
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
}
