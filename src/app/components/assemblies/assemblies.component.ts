import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
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
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadSurveysHistory();
  }

  async loadStats(): Promise<void> {
    // In a real scenario, this would call a service.
    // Mocking the data here as requested.
    this.stats = {
      attendanceCount: 142,
      totalUnits: 190,
      quorumPercentage: 74.7,
      coefficientPercentage: 68.2,
      minRequiredPercentage: 51
    };
  }

  async loadSurveysHistory(): Promise<void> {
    // In a real scenario, this would call a service.
    // Mocking the history list here.
    this.surveysHistory = [
      {
        id: '1',
        question: '¿Aprueba el presupuesto para el año 2024?',
        status: 'CLOSED',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        mostVotedOption: 'Sí',
        mostVotedVotes: 120,
        mostVotedCoefficient: 58.5
      },
      {
        id: '2',
        question: '¿Desea cambiar la empresa de seguridad?',
        status: 'CLOSED',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        mostVotedOption: 'No',
        mostVotedVotes: 85,
        mostVotedCoefficient: 42.3
      },
      {
        id: '3',
        question: '¿Está de acuerdo con la remodelación del lobby?',
        status: 'CLOSED',
        createdAt: new Date(Date.now() - 10800000).toISOString(),
        mostVotedOption: 'Sí',
        mostVotedVotes: 98,
        mostVotedCoefficient: 51.2
      }
    ];
  }

  openCreateSurveyPopup(): void {
    // Popup creation logic will be implemented in future steps/agents
    console.log('Opening create survey popup...');
    // Example: this.dialog.open(CreateSurveyComponent);
  }
}
