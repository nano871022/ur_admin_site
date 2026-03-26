import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssembliesComponent } from './assemblies.component';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { EventEmitter, Component } from '@angular/core';
import { AssemblyService } from '@services/data/assembly.service';
import { AddQuestionComponent } from '@components/asambleas/add-question/add-question.component';
import { SurveyHistoryComponent } from '@components/asambleas/survey-history/survey-history.component';
import { CurrentSurveyComponent } from '@components/asambleas/current-survey/current-survey.component';

@Component({ selector: 'app-add-question', standalone: true, template: '' })
class MockAddQuestionComponent {
  closed = new EventEmitter<void>();
}

@Component({ selector: 'app-survey-history', standalone: true, template: '' })
class MockSurveyHistoryComponent {}

@Component({ selector: 'app-current-survey', standalone: true, template: '', inputs: ['totalRegisteredUsers'] })
class MockCurrentSurveyComponent {
  totalRegisteredUsers: number = 0;
}

describe('AssembliesComponent', () => {
  let component: AssembliesComponent;
  let fixture: ComponentFixture<AssembliesComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let assemblyServiceSpy: jasmine.SpyObj<AssemblyService>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    assemblyServiceSpy = jasmine.createSpyObj('AssemblyService', ['getAllSurveis', 'getVotes', 'getAttendees', 'getCoefficient']);

    assemblyServiceSpy.getAllSurveis.and.returnValue(Promise.resolve([]));

    await TestBed.configureTestingModule({
      imports: [AssembliesComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: AssemblyService, useValue: assemblyServiceSpy }
      ]
    })
    .overrideComponent(AssembliesComponent, {
      remove: {
        imports: [AddQuestionComponent, SurveyHistoryComponent, CurrentSurveyComponent]
      },
      add: {
        imports: [MockAddQuestionComponent, MockSurveyHistoryComponent, MockCurrentSurveyComponent],
        providers: [
          { provide: MatDialog, useValue: dialogSpy }
        ]
      }
    })
    .compileComponents();

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

  it('should open dialog when calling openCreateSurveyPopup', () => {
    const closedEmitter = new EventEmitter<void>();
    const dialogRefSpy = {
      close: jasmine.createSpy('close'),
      componentInstance: {
        closed: closedEmitter
      }
    };

    dialogSpy.open.and.returnValue(dialogRefSpy as any);

    component.openCreateSurveyPopup();

    expect(dialogSpy.open).toHaveBeenCalled();

    spyOn(component, 'loadSurveysHistory');
    closedEmitter.emit();

    expect(dialogRefSpy.close).toHaveBeenCalled();
    expect(component.loadSurveysHistory).toHaveBeenCalled();
  });
});
