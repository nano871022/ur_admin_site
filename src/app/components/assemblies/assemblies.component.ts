import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AssemblyStats, Survey } from '@app/model/assembly.model';
import { AddQuestionComponent } from '@components/asambleas/add-question/add-question.component';
import { SurveyHistoryComponent } from '@components/asambleas/survey-history/survey-history.component';
import { CurrentSurveyComponent } from '@components/asambleas/current-survey/current-survey.component';
import { AssemblyService } from '@app/services/data/assembly.service';

@Component({
  selector: 'app-assemblies',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    AddQuestionComponent,
    SurveyHistoryComponent,
    CurrentSurveyComponent
  ],
  templateUrl: './assemblies.component.html',
  styleUrls: ['./assemblies.component.css']
})
export class AssembliesComponent implements OnInit {
  @ViewChild(SurveyHistoryComponent) historyComponent!: SurveyHistoryComponent;
  @ViewChild(CurrentSurveyComponent) currentSurveyComponent!: CurrentSurveyComponent;

  stats: AssemblyStats = {
    attendanceCount: 0,
    totalUnits: 0,
    quorumPercentage: 0,
    coefficientPercentage: 0,
    minRequiredPercentage: 51
  };

  isSurveyOpen: boolean = false;

  constructor(
    private dialog: MatDialog,
    private assemblyService: AssemblyService
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.checkActiveSurvey();
  }

  async loadStats(): Promise<void> {
    try {
      const [attendees, coefficient] = await Promise.all([
        this.assemblyService.getAttendees(true),
        this.assemblyService.getCoefficient(true)
      ]);

      this.stats = {
        attendanceCount: attendees.attendanceCount || 0,
        totalUnits: attendees.totalUnits || 0,
        quorumPercentage: attendees.quorumPercentage || 0,
        coefficientPercentage: coefficient.coefficientPercentage || 0,
        minRequiredPercentage: 51
      };
    } catch (error) {
      console.error('Error loading assembly stats:', error);
    }
  }

  async checkActiveSurvey(): Promise<void> {
    try {
      const surveys = await this.assemblyService.getAllSurveis(true);
      this.isSurveyOpen = surveys.some(s => s.status === 'OPEN');
    } catch (error) {
      console.error('Error checking active survey:', error);
    }
  }

  openCreateSurveyPopup(): void {
    if (this.isSurveyOpen) {
      alert('Ya existe una encuesta abierta. Debe cerrarla antes de crear una nueva.');
      return;
    }

    const dialogRef = this.dialog.open(AddQuestionComponent, {
      width: '500px'
    });

    dialogRef.componentInstance.closed.subscribe(() => {
      dialogRef.close();
      this.loadStats();
      this.checkActiveSurvey();
      if (this.historyComponent) {
        this.historyComponent.loadHistory(true);
      }
      if (this.currentSurveyComponent) {
        this.currentSurveyComponent.loadData(true);
      }
    });
  }

  onSurveyAction(): void {
    this.checkActiveSurvey();
    this.loadStats();
  }
}
