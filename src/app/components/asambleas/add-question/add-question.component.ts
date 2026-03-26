import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AssemblyService } from '@services/data/assembly.service';
import { Answer } from '@app/model/survey.model';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  questionForm: FormGroup;
  @Output() closed = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private assemblyService: AssemblyService) {
    this.questionForm = this.fb.group({
      question: ['', [Validators.required, Validators.minLength(5)]],
      responses: this.fb.array([], [Validators.required, Validators.minLength(1)])
    });
  }

  get responses(): FormArray {
    return this.questionForm.get('responses') as FormArray;
  }

  addResponse(): void {
    this.responses.push(this.fb.control('', [Validators.required]));
  }

  removeResponse(index: number): void {
    this.responses.removeAt(index);
  }

  save(): void {
    if (this.questionForm.valid) {
      const formData = this.questionForm.value;
      const mappedOptions: Answer[] = formData.responses.map((resp: string) => ({
        value: resp,
        votes: 0
      }));

      this.assemblyService.createSurvey(formData.question, mappedOptions)
        .then(() => {
          this.closed.emit();
        })
        .catch((error) => {
          console.error('Error saving question:', error);
        });
    }
  }

  cancel(): void {
    this.closed.emit();
  }

  clear(): void {
    this.questionForm.reset();
    while (this.responses.length) {
      this.responses.removeAt(0);
    }
  }
}
