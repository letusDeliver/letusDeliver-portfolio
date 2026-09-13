import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactService } from './contact.service';
import { ContactFormValue } from '../models';

describe('ContactService', () => {
  let service: ContactService;

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
  });

  it('resolves with a success result via the mock API (no backend configured yet)', async () => {
    const result = await new Promise((resolve) => service.submit(sampleValue).subscribe(resolve));
    expect(result).toEqual({ success: true, message: 'Message delivered.' });
  });
});
