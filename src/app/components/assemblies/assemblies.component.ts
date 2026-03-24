import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AssemblyService } from '@services/data/assembly.service';
import { AssemblyStats, Survey } from '@app/model/assembly.model';

@Component({
  selector: 'app-assemblies',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './assemblies.component.html',
  styleUrls: ['./assemblies.component.css']
})
export class AssembliesComponent implements OnInit {
  stats: AssemblyStats = {
    attendanceCount: 0,
    totalUnits: 0,
    quorumPercentage: 0,
    coefficientPercentage: 0,
    minRequiredPercentage: 51
  };
  surveysHistory: Survey[] = [];

  constructor(
    private assemblyService: AssemblyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadSurveysHistory();
  }

  async loadStats(): Promise<void> {
    this.stats = await this.assemblyService.getAssemblyStats();
  }

  async loadSurveysHistory(): Promise<void> {
    this.surveysHistory = await this.assemblyService.getSurveysHistory();
  }

  openCreateSurveyPopup(): void {
    // Popup creation logic will be implemented in future steps/agents
    console.log('Opening create survey popup...');
    // Example: this.dialog.open(CreateSurveyComponent);
  }
}
