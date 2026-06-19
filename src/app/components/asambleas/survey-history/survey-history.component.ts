import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssemblyService } from '@services/data/assembly.service';

export interface SurveyHistoryItem {
  id?: string;
  question: string;
  mostVotedOption: string;
  mostVotedCoefficient: number;
  timeUsed: string;
  createDate: string | Date;
}

@Component({
  selector: 'app-survey-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey-history.component.html',
  styleUrls: ['./survey-history.component.css']
})
export class SurveyHistoryComponent implements OnInit {
  @Output() surveyDeleted = new EventEmitter<void>();
  history: SurveyHistoryItem[] = [];

  constructor(private assemblyService: AssemblyService) { }

  ngOnInit(): void {
    this.loadHistory(true);
  }

  async loadHistory(refresh: boolean = false): Promise<void> {
    try {
      const surveys = await this.assemblyService.getAllSurveis(refresh);
      // Transform and sort history (newest to oldest)
      this.history = surveys
        .map((s: any) => ({
          id: s.id,
          question: s.question,
          mostVotedOption: s.mostVotedOption || (s.options && s.options.length > 0 ? (s.options[0].text || s.options[0].value) : 'N/A'),
          mostVotedCoefficient: s.mostVotedCoefficient || 0,
          timeUsed: s.timeUsed || '00:00',
          createDate: s.createDate || s.createdAt || new Date()
        }))
        .sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());
    } catch (error) {
      console.error('Error loading survey history:', error);
    }
  }

  editSurvey(id?: string): void {
    console.log('Edit survey:', id);
    // Logic for editing disabled or not according to votes cast is usually handled in template
  }

  async deleteSurvey(id?: string): Promise<void> {
    if (id && window.confirm('¿Está seguro de que desea eliminar esta encuesta?')) {
      try {
        await this.assemblyService.deleteSurvey(id);
        await this.loadHistory(true);
        this.surveyDeleted.emit();
      } catch (error) {
        console.error('Error deleting survey:', error);
      }
    }
  }
}
