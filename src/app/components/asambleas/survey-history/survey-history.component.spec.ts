import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyHistoryComponent } from './survey-history.component';
import { AssemblyService } from '@services/data/assembly.service';

describe('SurveyHistoryComponent', () => {
  let component: SurveyHistoryComponent;
  let fixture: ComponentFixture<SurveyHistoryComponent>;
  let assemblyServiceMock: any;

  beforeEach(async () => {
    assemblyServiceMock = {
      getAllSurveis: jasmine.createSpy('getAllSurveis').and.returnValue(Promise.resolve([
        {
          id: '1',
          question: 'Question 1',
          mostVotedOption: 'Option A',
          mostVotedCoefficient: 45,
          timeUsed: '10:00',
          createDate: '2023-01-01T10:00:00Z'
        },
        {
          id: '2',
          question: 'Question 2',
          mostVotedOption: 'Option B',
          mostVotedCoefficient: 55,
          timeUsed: '12:00',
          createDate: '2023-01-02T10:00:00Z'
        }
      ]))
    };

    await TestBed.configureTestingModule({
      imports: [SurveyHistoryComponent],
      providers: [
        { provide: AssemblyService, useValue: assemblyServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadHistory on ngOnInit', () => {
    spyOn(component, 'loadHistory');
    component.ngOnInit();
    expect(component.loadHistory).toHaveBeenCalled();
  });

  it('should load and sort history (newest to oldest)', async () => {
    await component.loadHistory();

    expect(assemblyServiceMock.getAllSurveis).toHaveBeenCalled();
    expect(component.history.length).toBe(2);

    // Newest first: Question 2 (2023-01-02) should be at index 0
    expect(component.history[0].id).toBe('2');
    expect(component.history[0].question).toBe('Question 2');
    expect(component.history[1].id).toBe('1');
    expect(component.history[1].question).toBe('Question 1');
  });

  it('should handle API errors gracefully', async () => {
    assemblyServiceMock.getAllSurveis.and.returnValue(Promise.reject('API Error'));
    spyOn(console, 'error');

    await component.loadHistory();

    expect(component.history.length).toBe(0);
    expect(console.error).toHaveBeenCalled();
  });

  it('should transform data correctly if fields are missing', async () => {
    assemblyServiceMock.getAllSurveis.and.returnValue(Promise.resolve([
      {
        question: 'Missing fields question',
        options: [{ text: 'Default Option' }]
        // missing mostVotedOption, mostVotedCoefficient, timeUsed, createDate
      }
    ]));

    await component.loadHistory();

    expect(component.history[0].mostVotedOption).toBe('Default Option');
    expect(component.history[0].mostVotedCoefficient).toBe(0);
    expect(component.history[0].timeUsed).toBe('00:00');
    expect(component.history[0].createDate).toBeDefined();
  });

  it('should log when editSurvey is called', () => {
    spyOn(console, 'log');
    component.editSurvey('test-id');
    expect(console.log).toHaveBeenCalledWith('Edit survey:', 'test-id');
  });

  it('should log when deleteSurvey is called', () => {
    spyOn(console, 'log');
    component.deleteSurvey('test-id');
    expect(console.log).toHaveBeenCalledWith('Delete survey:', 'test-id');
  });
});
