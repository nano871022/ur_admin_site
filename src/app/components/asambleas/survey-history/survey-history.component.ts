import { Component, OnInit } from '@angular/core';
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
  history: SurveyHistoryItem[] = [];

  constructor(private assemblyService: AssemblyService) { }

  ngOnInit(): void {
    this.loadHistory();
  }

  async loadHistory(): Promise<void> {
    try {
      const surveys = await this.assemblyService.getAllSurveis();
      // Transform and sort history (newest to oldest)
      this.history = surveys
        .map((s: any) => ({
          id: s.id,
          question: s.question,
          mostVotedOption: s.mostVotedOption || (s.options && s.options.length > 0 ? s.options[0].text : 'N/A'),
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

  deleteSurvey(id?: string): void {
    console.log('Delete survey:', id);
  }
}
