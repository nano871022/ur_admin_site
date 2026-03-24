import { Injectable } from '@angular/core';
import { HttpClientService } from '@services/interceptor/http-client-service.service';
import { AssemblyStats, Survey } from '@app/model/assembly.model';

@Injectable({
  providedIn: 'root'
})
export class AssemblyService {

  constructor(private http: HttpClientService) { }

  async getAssemblyStats(): Promise<AssemblyStats> {
    // Mocking API call for stats
    // In a real scenario, it would be:
    // return this.http.fetchAuth('/api/assembly/stats').then(res => res.json());

    return Promise.resolve({
      attendanceCount: 142,
      totalUnits: 190,
      quorumPercentage: 74.7,
      coefficientPercentage: 68.2,
      minRequiredPercentage: 51
    });
  }

  async getSurveysHistory(): Promise<Survey[]> {
    // Mocking API call for survey history
    // In a real scenario:
    // return this.http.fetchAuth('/api/assembly/surveys').then(res => res.json());

    return Promise.resolve([
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
    ]);
  }
}
