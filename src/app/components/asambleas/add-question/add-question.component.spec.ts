import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddQuestionComponent } from './add-question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AssemblyService } from '@services/data/assembly.service';

describe('AddQuestionComponent', () => {
  let component: AddQuestionComponent;
  let fixture: ComponentFixture<AddQuestionComponent>;
  let assemblyServiceSpy: jasmine.SpyObj<AssemblyService>;

  beforeEach(async () => {
    assemblyServiceSpy = jasmine.createSpyObj('AssemblyService', ['createSurvey']);

    await TestBed.configureTestingModule({
      imports: [AddQuestionComponent, ReactiveFormsModule],
      providers: [
        { provide: AssemblyService, useValue: assemblyServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty question and no responses', () => {
    expect(component.questionForm.get('question')?.value).toBe('');
    expect(component.responses.length).toBe(0);
  });

  it('should add a response field when addResponse is called', () => {
    component.addResponse();
    expect(component.responses.length).toBe(1);
    expect(component.responses.at(0).value).toBe('');
  });

  it('should remove a response field when removeResponse is called', () => {
    component.addResponse();
    component.addResponse();
    expect(component.responses.length).toBe(2);

    component.removeResponse(0);
    expect(component.responses.length).toBe(1);
  });

  it('should mark the form as invalid if question is empty', () => {
    component.addResponse(); // Add one response to satisfy responses minLength
    component.questionForm.get('question')?.setValue('');
    expect(component.questionForm.valid).toBeFalsy();
  });

  it('should mark the form as invalid if no responses are added', () => {
    component.questionForm.get('question')?.setValue('What is your favorite color?');
    expect(component.responses.length).toBe(0);
    expect(component.questionForm.valid).toBeFalsy();
  });

  it('should emit closed when cancel is called', () => {
    spyOn(component.closed, 'emit');
    component.cancel();
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should clear the form when clear is called', () => {
    component.questionForm.get('question')?.setValue('Test Question');
    component.addResponse();
    component.responses.at(0).setValue('Test Response');

    component.clear();

    expect(component.questionForm.get('question')?.value).toBeNull();
    expect(component.responses.length).toBe(0);
  });

  it('should emit closed when save is called with valid form and API success', async () => {
    spyOn(component.closed, 'emit');
    assemblyServiceSpy.createSurvey.and.returnValue(Promise.resolve({}));

    component.questionForm.get('question')?.setValue('Is this a test?');
    component.addResponse();
    component.responses.at(0).setValue('Yes');

    component.save();

    await fixture.whenStable();

    expect(assemblyServiceSpy.createSurvey).toHaveBeenCalledWith('Is this a test?', [{ value: 'Yes', votes: 0 }]);
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should log error when save is called and API fails', async () => {
    spyOn(console, 'error');
    assemblyServiceSpy.createSurvey.and.returnValue(Promise.reject('API Error'));

    component.questionForm.get('question')?.setValue('Is this a test?');
    component.addResponse();
    component.responses.at(0).setValue('Yes');

    component.save();

    await fixture.whenStable();

    expect(console.error).toHaveBeenCalledWith('Error saving question:', 'API Error');
  });

  it('should not emit closed when save is called with invalid form', () => {
    spyOn(component.closed, 'emit');
    component.save();
    expect(component.closed.emit).not.toHaveBeenCalled();
  });
});
