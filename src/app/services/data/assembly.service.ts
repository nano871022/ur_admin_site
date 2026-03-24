import { Injectable } from '@angular/core';
import { HttpClientService } from '@services/interceptor/http-client-service.service';
import { Survey, Answer } from '@app/model/survey.model';

@Injectable({
  providedIn: 'root'
})
export class AssemblyService {

  constructor(private http: HttpClientService) { }

  getAllSurveis(): Promise<Survey[]> {
    return this.http.fetchAuth('/api/assembly/all')
      .then(response => response.json());
  }

  getVotes(id: string): Promise<any> {
    return this.http.fetchAuth(`/api/assembly/votes?id=${id}`)
      .then(response => response.json());
  }

  getAttendees(): Promise<any> {
    return this.http.fetchAuth('/api/assembly/attendees')
      .then(response => response.json());
  }

  getCoefficient(): Promise<any> {
    return this.http.fetchAuth('/api/assembly/coefficient')
      .then(response => response.json());
  }

  restartSurvey(id: string): Promise<any> {
    return this.http.fetchAuth('/api/assembly/restart', {
      method: 'POST',
      body: JSON.stringify({ id })
    }).then(response => response.json());
  }

  createSurvey(question: string, options: Answer[]): Promise<any> {
    return this.http.fetchAuth('/api/assembly/create', {
      method: 'PUT',
      body: JSON.stringify({ question, options })
    }).then(response => response.json());
  }

  closeVotes(id: string): Promise<any> {
    return this.http.fetchAuth('/api/assembly/close', {
      method: 'POST',
      body: JSON.stringify({ id })
    }).then(response => response.json());
  }
}
