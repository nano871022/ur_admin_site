import { Injectable } from '@angular/core';
import { HttpClientService } from '@services/interceptor/http-client-service.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private readonly CACHE_KEY = 'active_users_stats';
  private readonly CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 week

  constructor(private http: HttpClientService) {}

  async getActiveUsers(): Promise<number> {
    const cachedData = localStorage.getItem(this.CACHE_KEY);
    const now = Date.now();

    if (cachedData) {
      try {
        const { value, timestamp } = JSON.parse(cachedData);
        if (now - timestamp < this.CACHE_DURATION) {
          return value;
        }
      } catch (e) {
        localStorage.removeItem(this.CACHE_KEY);
      }
    }

    return this.http.fetchAuth('/api/stats/active-users')
      .then(response => response.json())
      .then(data => {
        const value = data.activeUsers;
        localStorage.setItem(this.CACHE_KEY, JSON.stringify({ value, timestamp: now }));
        return value;
      })
      .catch(error => {
        console.error('Error fetching active users:', error);
        if (cachedData) {
          return JSON.parse(cachedData).value;
        }
        throw error;
      });
  }
}
