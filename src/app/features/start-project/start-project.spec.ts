import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { StartProject } from './start-project';

describe('StartProject', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StartProject],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it('marks the form invalid and does not submit when required fields are empty', () => {
    const fixture = TestBed.createComponent(StartProject);
    const component = fixture.componentInstance;

    component.submit();

    expect(component.form.invalid).toBe(true);
    expect(component.submitted()).toBe(false);
  });

  it('submits successfully via the mock contact API once the form is valid', async () => {
    const fixture = TestBed.createComponent(StartProject);
    const component = fixture.componentInstance;

    component.form.setValue({
      name: 'Jane Doe',
      email: 'jane@example.com',
      company: 'Acme',
      projectType: 'Web application',
      projectDescription: 'A new customer portal with self-serve onboarding.',
      timeline: '1–3 months',
      budget: 'Flexible',
    });

    component.submit();

    // The mock contact API resolves after a short simulated delay.
    await new Promise((resolve) => setTimeout(resolve, 750));

    expect(component.submitted()).toBe(true);
  });
});
