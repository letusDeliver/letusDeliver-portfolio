import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactFormValue, ContactSubmissionResult } from '../models';

/**
 * API contract (documented for the backend implementer):
 *
 * POST {contactEndpoint}
 * Content-Type: multipart/form-data
 *   name: string (required)
 *   email: string (required, validated server-side)
 *   company: string (optional)
 *   projectType: string (required, one of ProjectType)
 *   projectDescription: string (required)
 *   timeline: string (required, one of ProjectTimeline)
 *   budget: string (optional)
 *   attachment: File (optional, single file)
 *
 * Expected server-side pipeline: validation → sanitization → rate limiting
 * → spam protection (e.g. honeypot/CAPTCHA) → notification → optional
 * persistence. See project README for the full architecture diagram.
 *
 * 200 OK  { success: true, message: string }
 * 4xx/5xx { success: false, message: string }
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
    formData.append('projectType', value.projectType);
    formData.append('projectDescription', value.projectDescription);
    formData.append('timeline', value.timeline);
    formData.append('budget', value.budget);
    if (value.attachment) {
      formData.append('attachment', value.attachment);
    }

    return this.http.post<ContactSubmissionResult>(environment.contactEndpoint, formData).pipe(
      catchError(() =>
        throwError(() => ({
          success: false,
          message: "We couldn't reach the server. Please try again in a moment.",
        })),
      ),
    );
  }

  /**
   * Explicit, clearly-labeled mock used only while `useMockContactApi` is
   * true (no contact backend exists in this repository yet). Never
   * presented to the user as a real production submission — it exists so
   * the Start a Project flow can be demoed end to end locally.
   */
  private submitMock(): Observable<ContactSubmissionResult> {
    if (!environment.production) {
      console.warn('[contact] Using mock contact API — no backend is configured yet.');
    }
    return of({ success: true, message: 'Message delivered.' }).pipe(
      delay(700),
      map((result) => result),
    );
  }
}
