import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() surveyStatusChanged = new EventEmitter<void>();

  activeSurvey: Survey | null = null;
  receivedVotes: number = 0;
  missingVotes: number = 0;
  votingPercentage: number = 0;
  elapsedTime: string = '00:00';

  private timerInterval: any;
  private refreshInterval: any;
  private startTime: number = 0;

  constructor(private assemblyService: AssemblyService) {}

  ngOnInit(): void {
    this.loadData(true);
    this.startAutoRefresh();
  }

  async loadData(refresh: boolean = false): Promise<void> {
    await this.loadActiveSurvey(refresh);
    await this.loadStats(refresh);
  }

  ngOnDestroy(): void {
    this.stopTimer();
    this.stopAutoRefresh();
  }

  async loadActiveSurvey(refresh: boolean = false): Promise<void> {
    try {
      const surveys = await this.assemblyService.getAllSurveis(refresh);
      // In this version we only take the first one as "active" or "recently closed"
      this.activeSurvey = surveys.length > 0 ? surveys[0] : null;

      if (this.activeSurvey) {
        const createDateStr = this.activeSurvey.createdAt || this.activeSurvey.createDate;
        if (createDateStr) {
          this.startTime = new Date(createDateStr).getTime();
          if (this.activeSurvey.status === 'OPEN') {
            this.startTimer();
          } else {
            this.stopTimer();
            if (this.activeSurvey.timeUsed) {
              this.elapsedTime = this.activeSurvey.timeUsed.substring(0, 5); // Assuming HH:mm:ss format
            }
          }
        }
      }
    } catch (error) {
      console.error('Error loading active survey:', error);
    }
  }

  async loadStats(refresh: boolean = false): Promise<void> {
    if (!this.activeSurvey || !this.activeSurvey.id) return;

    try {
      const votesData = await this.assemblyService.getVotes(this.activeSurvey.id, refresh);
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

  startAutoRefresh(): void {
    this.stopAutoRefresh();
    this.refreshInterval = setInterval(() => {
      if (this.activeSurvey && this.activeSurvey.status === 'OPEN') {
        this.loadStats(true);
      }
    }, 60000);
  }

  stopAutoRefresh(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  async manualRefresh(): Promise<void> {
    await this.loadData(true);
  }

  async closeVoting(): Promise<void> {
    if (this.activeSurvey && this.activeSurvey.id && window.confirm('¿Está seguro de que desea cerrar la votación?')) {
      try {
        await this.assemblyService.closeVotes(this.activeSurvey.id);
        await this.loadData(true);
        this.surveyStatusChanged.emit();
      } catch (error) {
        console.error('Error closing voting:', error);
      }
    }
  }

  async restartSurvey(): Promise<void> {
    if (this.activeSurvey && this.activeSurvey.id && window.confirm('¿Está seguro de que desea reiniciar la encuesta? Esta acción no se puede deshacer.')) {
      try {
        await this.assemblyService.restartSurvey(this.activeSurvey.id);
        await this.loadData(true);
        this.surveyStatusChanged.emit();
      } catch (error) {
        console.error('Error restarting survey:', error);
      }
    }
  }

  getOptionPercentage(votes: number | undefined): number {
    if (!votes || this.receivedVotes === 0) return 0;
    return Math.round((votes / this.receivedVotes) * 100);
  }
}
