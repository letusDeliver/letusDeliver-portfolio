import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    });
  });

  it('toggles the mobile menu open and closed', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    expect(component.mobileMenuOpen()).toBe(false);

    component.toggleMenu();
    expect(component.mobileMenuOpen()).toBe(true);

    component.toggleMenu();
    expect(component.mobileMenuOpen()).toBe(false);
  });

  it('closes the mobile menu on Escape', () => {
    const fixture = TestBed.createComponent(Header);
    const component = fixture.componentInstance;

    component.toggleMenu();
    expect(component.mobileMenuOpen()).toBe(true);

    component.onEscape();
    expect(component.mobileMenuOpen()).toBe(false);
  });
});
