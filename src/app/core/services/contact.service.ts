import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ContactFormValue,
  ContactSubmissionResult,
  PROJECT_TIMELINE_API_VALUES,
  PROJECT_TYPE_API_VALUES,
} from '../models';

/**
 * API contract — Django backend (see the project's Postman collection):
 *
 * POST {contactEndpoint}
 * Content-Type: multipart/form-data
 *   name: string (required, max 150)
 *   email: string (required, validated server-side, max 254)
 *   company: string (optional, max 150)
 *   project_type: string (required, one of PROJECT_TYPE_API_VALUES' values)
 *   project_description: string (required, min 20 chars)
 *   timeline: string (required, one of PROJECT_TIMELINE_API_VALUES' values)
 *   budget: string (optional, max 100)
 *   attachment: File (optional, single file)
 *
 * 201 Created  the created submission (id, name, email, ..., created_at) —
 *              the frontend treats any 2xx response as success and does not
 *              depend on its exact shape.
 * 400          { [field]: string[] } — DRF field-keyed validation errors.
 * 429          Too Many Requests — throttled per IP.
 *
 * This frontend never holds API keys or secrets — only the public
 * `contactEndpoint` URL, which is safe to ship to the client.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  submit(value: ContactFormValue): Observable<ContactSubmissionResult> {
    if (environment.useMockContactApi) {
      return this.submitMock();
    }

    const formData = new FormData();
    formData.append('name', value.name);
    formData.append('email', value.email);
    formData.append('company', value.company);
    formData.append('project_type', PROJECT_TYPE_API_VALUES[value.projectType]);
    formData.append('project_description', value.projectDescription);
    formData.append('timeline', PROJECT_TIMELINE_API_VALUES[value.timeline]);
    formData.append('budget', value.budget);
    if (value.attachment) {
      formData.append('attachment', value.attachment);
    }

    return this.http.post(environment.contactEndpoint, formData).pipe(
      map((): ContactSubmissionResult => ({ success: true, message: 'Message delivered.' })),
      catchError((error: HttpErrorResponse) => throwError(() => this.toSubmissionError(error))),
    );
  }

  private toSubmissionError(error: HttpErrorResponse): ContactSubmissionResult {
    if (error.status === 400 && error.error && typeof error.error === 'object') {
      return {
        success: false,
        message: 'Please fix the highlighted fields and try again.',
        fieldErrors: error.error as Record<string, string[]>,
      };
    }
    if (error.status === 429) {
      return {
        success: false,
        message: "You've sent a few requests already — please try again in a little while.",
      };
    }
    return {
      success: false,
      message: "We couldn't reach the server. Please try again in a moment.",
    };
  }

  /**
   * Explicit, clearly-labeled mock used only while `useMockContactApi` is
   * true. Never presented to the user as a real production submission — it
   * exists so the Start a Project flow can be demoed end to end without a
   * backend available.
   */
  private submitMock(): Observable<ContactSubmissionResult> {
    if (!environment.production) {
      console.warn('[contact] Using mock contact API — no backend is configured yet.');
    }
    return of<ContactSubmissionResult>({ success: true, message: 'Message delivered.' }).pipe(delay(700));
  }
}
