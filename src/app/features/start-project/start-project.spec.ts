import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { StartProject } from './start-project';
import { environment } from '../../../environments/environment';

describe('StartProject', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StartProject],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const validFormValue = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    company: 'Acme',
    projectType: 'Web application' as const,
    projectDescription: 'A new customer portal with self-serve onboarding.',
    timeline: '1–3 months' as const,
    budget: 'Flexible',
  };

  it('marks the form invalid and does not submit when required fields are empty', () => {
    const fixture = TestBed.createComponent(StartProject);
    const component = fixture.componentInstance;

    component.submit();

    expect(component.form.invalid).toBe(true);
    expect(component.submitted()).toBe(false);
    httpMock.expectNone(environment.contactEndpoint);
  });

  it('submits successfully once the backend accepts the submission, showing a toast', async () => {
    const fixture = TestBed.createComponent(StartProject);
    const component = fixture.componentInstance;

    component.form.setValue(validFormValue);
    component.submit();

    const req = httpMock.expectOne(environment.contactEndpoint);
    req.flush({ id: 'abc-123' }, { status: 201, statusText: 'Created' });
    await Promise.resolve();
    fixture.detectChanges();

    expect(component.submitted()).toBe(true);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Message delivered');
  });

  it('shows the backend-provided message under a field when the submission is rejected', async () => {
    const fixture = TestBed.createComponent(StartProject);
    const component = fixture.componentInstance;

    component.form.setValue(validFormValue);
    component.submit();

    const req = httpMock.expectOne(environment.contactEndpoint);
    req.flush({ email: ['Enter a valid email address.'] }, { status: 400, statusText: 'Bad Request' });
    await Promise.resolve();

    expect(component.submitted()).toBe(false);
    expect(component.field('email').invalid).toBe(true);
    expect(component.fieldError('email')).toBe('Enter a valid email address.');
  });

  it('rejects a name with leading or trailing whitespace', () => {
    const fixture = TestBed.createComponent(StartProject);
    const component = fixture.componentInstance;

    component.form.setValue({ ...validFormValue, name: ' Jane Doe' });

    expect(component.field('name').invalid).toBe(true);
    expect(component.fieldError('name')).toContain("can't begin or end with a space");
  });

  it('ignores a second submit() call while a submission is already in flight', () => {
    const fixture = TestBed.createComponent(StartProject);
    const component = fixture.componentInstance;

    component.form.setValue(validFormValue);
    component.submit();
    component.submit();

    httpMock.expectOne(environment.contactEndpoint);
  });

  it('clears the selected attachment via removeAttachment()', () => {
    const fixture = TestBed.createComponent(StartProject);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const file = new File(['content'], 'resume.pdf', { type: 'application/pdf' });
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#attachment');
    Object.defineProperty(input, 'files', { value: [file], configurable: true });
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const nativeEl: HTMLElement = fixture.nativeElement;
    expect(nativeEl.textContent).toContain('resume.pdf');

    component.removeAttachment();
    fixture.detectChanges();

    expect(nativeEl.textContent).not.toContain('resume.pdf');
    expect(input.value).toBe('');
  });
});
