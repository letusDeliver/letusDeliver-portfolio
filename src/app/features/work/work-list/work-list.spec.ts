import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { WorkList } from './work-list';

describe('WorkList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WorkList],
      providers: [provideRouter([])],
    });
  });

  it('shows all projects by default', () => {
    const fixture = TestBed.createComponent(WorkList);
    const component = fixture.componentInstance;

    expect(component.filteredProjects().length).toBe(component.projects.length);
  });

  it('filters projects by category', () => {
    const fixture = TestBed.createComponent(WorkList);
    const component = fixture.componentInstance;

    component.setFilter('Cloud');

    expect(component.filteredProjects().length).toBeGreaterThan(0);
    expect(component.filteredProjects().every((p) => p.category === 'Cloud')).toBe(true);
  });

  it('never labels professional-experience or personal projects as letusdeliver work', () => {
    // Tests the ownershipLabel mapping directly rather than depending on
    // the live PROJECTS data currently containing a professional-experience
    // entry — that's content, not behavior, and content changes over time
    // (there are none in the data right now).
    const fixture = TestBed.createComponent(WorkList);
    const component = fixture.componentInstance;

    expect(component.ownershipLabel('professional-experience')).not.toBe('letusdeliver');
    expect(component.ownershipLabel('personal')).not.toBe('letusdeliver');
  });
});
