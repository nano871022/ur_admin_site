import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let angularFireAuthMock: any;

  beforeEach(async () => {
    angularFireAuthMock = {
      onAuthStateChanged: jasmine.createSpy('onAuthStateChanged').and.returnValue(Promise.resolve(null))
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthMock }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the title 'Administración ur_admin_site'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Administración ur_admin_site');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, ur_admin_site');
  });
});
