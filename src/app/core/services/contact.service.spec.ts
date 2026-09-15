import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactService } from './contact.service';
import { ContactFormValue } from '../models';
import { environment } from '../../../environments/environment';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  const sampleValue: ContactFormValue = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    company: 'Acme',
    projectType: 'Web application',
    projectDescription: 'A new customer portal with self-serve onboarding.',
    timeline: '1–3 months',
    budget: 'Flexible',
    attachment: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('posts the form as snake_case fields the Django backend expects', async () => {
    const resultPromise = new Promise((resolve) => service.submit(sampleValue).subscribe(resolve));

    const req = httpMock.expectOne(environment.contactEndpoint);
    expect(req.request.method).toBe('POST');
    const body = req.request.body as FormData;
    expect(body.get('name')).toBe('Jane Doe');
    expect(body.get('project_type')).toBe('web_application');
    expect(body.get('timeline')).toBe('1_3_months');
    expect(body.get('project_description')).toBe(sampleValue.projectDescription);

    req.flush(
      { id: 'abc-123', name: 'Jane Doe', email: 'jane@example.com' },
      { status: 201, statusText: 'Created' },
    );

    await expect(resultPromise).resolves.toEqual({ success: true, message: 'Message delivered.' });
  });

  it('surfaces DRF field errors from a 400 response', async () => {
    const resultPromise = new Promise((_resolve, reject) =>
      service.submit(sampleValue).subscribe({ error: reject }),
    );

    const req = httpMock.expectOne(environment.contactEndpoint);
    req.flush({ email: ['Enter a valid email address.'] }, { status: 400, statusText: 'Bad Request' });

    await expect(resultPromise).rejects.toMatchObject({
      success: false,
      fieldErrors: { email: ['Enter a valid email address.'] },
    });
  });

  it('surfaces a friendly message on a 429 throttled response', async () => {
    const resultPromise = new Promise((_resolve, reject) =>
      service.submit(sampleValue).subscribe({ error: reject }),
    );

    const req = httpMock.expectOne(environment.contactEndpoint);
    req.flush({ detail: 'Request was throttled.' }, { status: 429, statusText: 'Too Many Requests' });

    await expect(resultPromise).rejects.toMatchObject({
      success: false,
      message: expect.stringContaining('try again'),
    });
  });
});
