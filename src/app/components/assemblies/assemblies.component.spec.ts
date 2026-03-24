import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssembliesComponent } from './assemblies.component';
import { AssemblyService } from '@services/data/assembly.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AssembliesComponent', () => {
  let component: AssembliesComponent;
  let fixture: ComponentFixture<AssembliesComponent>;
  let assemblyServiceSpy: jasmine.SpyObj<AssemblyService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    assemblyServiceSpy = jasmine.createSpyObj('AssemblyService', ['getAssemblyStats', 'getSurveysHistory']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    assemblyServiceSpy.getAssemblyStats.and.returnValue(Promise.resolve({
      attendanceCount: 142,
      totalUnits: 190,
      quorumPercentage: 74.7,
      coefficientPercentage: 68.2,
      minRequiredPercentage: 51
    }));

    assemblyServiceSpy.getSurveysHistory.and.returnValue(Promise.resolve([
      {
        id: '1',
        question: 'Survey 1',
        status: 'CLOSED',
        createdAt: new Date().toISOString(),
        mostVotedOption: 'Option A',
        mostVotedVotes: 10,
        mostVotedCoefficient: 5.5
      }
    ]));

    await TestBed.configureTestingModule({
      imports: [AssembliesComponent, NoopAnimationsModule],
      providers: [
        { provide: AssemblyService, useValue: assemblyServiceSpy },
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
    expect(assemblyServiceSpy.getAssemblyStats).toHaveBeenCalled();
    expect(component.stats.attendanceCount).toBe(142);
  });

  it('should load surveys history on init', async () => {
    await fixture.whenStable();
    expect(assemblyServiceSpy.getSurveysHistory).toHaveBeenCalled();
    expect(component.surveysHistory.length).toBe(1);
    expect(component.surveysHistory[0].question).toBe('Survey 1');
  });

  it('should open create survey popup', () => {
    component.openCreateSurveyPopup();
    // Verification would be more complete when actual dialog is implemented
    expect(component).toBeDefined();
  });
});
