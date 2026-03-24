import { ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { CurrentSurveyComponent } from './current-survey.component';
import { AssemblyService } from '@app/services/data/assembly.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Survey } from '@app/model/survey.model';

describe('CurrentSurveyComponent', () => {
  let component: CurrentSurveyComponent;
  let fixture: ComponentFixture<CurrentSurveyComponent>;
  let assemblyServiceSpy: jasmine.SpyObj<AssemblyService>;

  const fixedDate = new Date('2024-01-01T12:00:00Z');
  const mockSurveys: Survey[] = [
    {
      question: '¿Aprueba el presupuesto?',
      options: [
        { value: 'SÍ', votes: 10 },
        { value: 'NO', votes: 5 }
      ],
      timeUsed: '00:00:00',
      createDate: fixedDate,
      status: 'OPEN'
    }
  ];

  const mockVotes = {
    totalVotes: 15
  };

  beforeEach(async () => {
    assemblyServiceSpy = jasmine.createSpyObj('AssemblyService', ['getAllSurveis', 'getVotes', 'closeVotes', 'restartSurvey']);
    assemblyServiceSpy.getAllSurveis.and.returnValue(Promise.resolve(JSON.parse(JSON.stringify(mockSurveys))));
    assemblyServiceSpy.getVotes.and.returnValue(Promise.resolve(JSON.parse(JSON.stringify(mockVotes))));
    assemblyServiceSpy.closeVotes.and.returnValue(Promise.resolve({}));
    assemblyServiceSpy.restartSurvey.and.returnValue(Promise.resolve({}));

    await TestBed.configureTestingModule({
      imports: [
        CurrentSurveyComponent,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AssemblyService, useValue: assemblyServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentSurveyComponent);
    component = fixture.componentInstance;
    component.totalRegisteredUsers = 20;
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load active survey and calculate stats on init', fakeAsync(() => {
    fixture.detectChanges();
    tick(); // Resolve getAllSurveis
    tick(); // Resolve getVotes
    fixture.detectChanges();

    expect(assemblyServiceSpy.getAllSurveis).toHaveBeenCalled();
    expect(component.activeSurvey?.question).toBe(mockSurveys[0].question);
    expect(component.receivedVotes).toBe(15);
    expect(component.missingVotes).toBe(5); // 20 - 15
    expect(component.votingPercentage).toBe(75); // 15/20 * 100

    discardPeriodicTasks();
  }));

  it('should update elapsed time when OPEN', fakeAsync(() => {
    const now = fixedDate.getTime() + 65000; // 65 seconds after fixedDate
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(now));

    fixture.detectChanges();
    tick(); // Resolve getAllSurveis

    expect(component.elapsedTime).toBe('01:05');

    jasmine.clock().tick(1000);
    component.updateElapsedTime();
    expect(component.elapsedTime).toBe('01:06');

    jasmine.clock().uninstall();
    discardPeriodicTasks();
  }));

  it('should show results when status is CLOSED', fakeAsync(() => {
    mockSurveys[0].status = 'CLOSED';
    mockSurveys[0].timeUsed = '05:24:00';
    assemblyServiceSpy.getAllSurveis.and.returnValue(Promise.resolve(JSON.parse(JSON.stringify(mockSurveys))));

    fixture.detectChanges();
    tick(); // Resolve getAllSurveis
    tick(); // Resolve getVotes
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.closed-badge')).toBeTruthy();
    expect(compiled.querySelector('.live-badge')).toBeFalsy();
    expect(compiled.querySelector('.results-visuals')).toBeTruthy();
    expect(compiled.querySelector('.options-grid')).toBeFalsy();
    expect(compiled.querySelector('.actions-section')).toBeFalsy();
    expect(component.elapsedTime).toBe('05:24');

    discardPeriodicTasks();
  }));

  it('should calculate option percentage correctly', () => {
    component.receivedVotes = 100;
    expect(component.getOptionPercentage(78)).toBe(78);
    expect(component.getOptionPercentage(14)).toBe(14);
    expect(component.getOptionPercentage(0)).toBe(0);

    component.receivedVotes = 0;
    expect(component.getOptionPercentage(10)).toBe(0);
  });

  it('should call closeVotes and reload data when closeVoting is confirmed', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    tick();
    spyOn(window, 'confirm').and.returnValue(true);
    component.closeVoting();
    tick(); // closeVotes
    tick(); // reload loadActiveSurvey
    tick(); // reload loadStats
    expect(assemblyServiceSpy.closeVotes).toHaveBeenCalledWith('active');
    expect(assemblyServiceSpy.getAllSurveis).toHaveBeenCalledTimes(2);
    discardPeriodicTasks();
  }));

  it('should not call closeVotes when closeVoting is cancelled', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    tick();
    spyOn(window, 'confirm').and.returnValue(false);
    component.closeVoting();
    tick();
    expect(assemblyServiceSpy.closeVotes).not.toHaveBeenCalled();
    discardPeriodicTasks();
  }));

  it('should call restartSurvey when restartSurvey is confirmed', fakeAsync(() => {
    fixture.detectChanges();
    tick(); // Init calls
    tick();

    spyOn(window, 'confirm').and.returnValue(true);
    component.restartSurvey();
    tick(); // restartSurvey call
    tick(); // loadActiveSurvey call
    tick(); // loadStats call

    expect(assemblyServiceSpy.restartSurvey).toHaveBeenCalledWith('active');
    expect(assemblyServiceSpy.getAllSurveis).toHaveBeenCalledTimes(2); // Once on init, once on restart
    discardPeriodicTasks();
  }));
});
