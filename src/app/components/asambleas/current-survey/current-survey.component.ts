import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AssemblyService } from '@app/services/data/assembly.service';
import { Survey } from '@app/model/survey.model';

@Component({
  selector: 'app-current-survey',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './current-survey.component.html',
  styleUrls: ['./current-survey.component.css']
})
export class CurrentSurveyComponent implements OnInit, OnDestroy {
  @Input() totalRegisteredUsers: number = 0;

  activeSurvey: Survey | null = null;
  receivedVotes: number = 0;
  missingVotes: number = 0;
  votingPercentage: number = 0;
  elapsedTime: string = '00:00';

  private timerInterval: any;
  private startTime: number = 0;

  constructor(private assemblyService: AssemblyService) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    await this.loadActiveSurvey();
    await this.loadStats();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  async loadActiveSurvey(): Promise<void> {
    try {
      const surveys = await this.assemblyService.getAllSurveis();
      this.activeSurvey = surveys.length > 0 ? surveys[0] : null;

      if (this.activeSurvey && this.activeSurvey.createDate) {
        this.startTime = new Date(this.activeSurvey.createDate).getTime();
        this.startTimer();
      }
    } catch (error) {
      console.error('Error loading active survey:', error);
    }
  }

  async loadStats(): Promise<void> {
    if (!this.activeSurvey) return;

    try {
      const votesData = await this.assemblyService.getVotes('active');
      this.receivedVotes = votesData.totalVotes || 0;

      this.calculateMissingAndPercentage();
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }

  private calculateMissingAndPercentage(): void {
    if (this.totalRegisteredUsers > 0) {
      this.missingVotes = Math.max(0, this.totalRegisteredUsers - this.receivedVotes);
      this.votingPercentage = Math.round((this.receivedVotes / this.totalRegisteredUsers) * 100);
    } else {
      this.missingVotes = 0;
      this.votingPercentage = 0;
    }
  }

  startTimer(): void {
    this.stopTimer();
    this.updateElapsedTime();
    this.timerInterval = setInterval(() => {
      this.updateElapsedTime();
    }, 1000);
  }

  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateElapsedTime(): void {
    if (this.startTime === 0) return;

    const now = Date.now();
    const diff = Math.floor((now - this.startTime) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;

    this.elapsedTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  async closeVoting(): Promise<void> {
    if (window.confirm('¿Está seguro de que desea cerrar la votación?')) {
      try {
        await this.assemblyService.closeVotes('active');
      } catch (error) {
        console.error('Error closing voting:', error);
      }
    }
  }

  async restartSurvey(): Promise<void> {
    if (window.confirm('¿Está seguro de que desea reiniciar la encuesta? Esta acción no se puede deshacer.')) {
      try {
        await this.assemblyService.restartSurvey('active');
        await this.loadData();
      } catch (error) {
        console.error('Error restarting survey:', error);
      }
    }
  }
}
