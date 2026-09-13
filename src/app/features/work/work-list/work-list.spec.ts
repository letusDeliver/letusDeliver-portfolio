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

  it('never labels professional-experience projects as letusdeliver work', () => {
    const fixture = TestBed.createComponent(WorkList);
    const component = fixture.componentInstance;

    const professionalExperienceProjects = component.projects.filter((p) => p.ownershipType === 'professional-experience');
    expect(professionalExperienceProjects.length).toBeGreaterThan(0);
    for (const project of professionalExperienceProjects) {
      expect(component.ownershipLabel(project.ownershipType)).not.toBe('letusdeliver');
    }
  });
});
