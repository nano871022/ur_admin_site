import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssembliesComponent } from './assemblies.component';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AssembliesComponent', () => {
  let component: AssembliesComponent;
  let fixture: ComponentFixture<AssembliesComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [AssembliesComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AssembliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load stats on init', async () => {
    await fixture.whenStable();
    expect(component.stats.attendanceCount).toBe(142);
    expect(component.stats.totalUnits).toBe(190);
  });

  it('should load surveys history on init', async () => {
    await fixture.whenStable();
    expect(component.surveysHistory.length).toBe(3);
    expect(component.surveysHistory[0].question).toBe('¿Aprueba el presupuesto para el año 2024?');
  });

  it('should log when opening create survey popup', () => {
    const consoleSpy = spyOn(console, 'log');
    component.openCreateSurveyPopup();
    expect(consoleSpy).toHaveBeenCalledWith('Opening create survey popup...');
  });
});
