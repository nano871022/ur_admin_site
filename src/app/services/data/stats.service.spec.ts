import { TestBed } from '@angular/core/testing';
import { StatsService } from './stats.service';
import { HttpClientService } from '@services/interceptor/http-client-service.service';

describe('StatsService', () => {
  let service: StatsService;
  let httpClientSpy: jasmine.SpyObj<HttpClientService>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClientService', ['fetchAuth']);

    TestBed.configureTestingModule({
      providers: [
        StatsService,
        { provide: HttpClientService, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(StatsService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch active users from API and cache them', async () => {
    const mockResponse = {
      json: () => Promise.resolve({ activeUsers: 150, startDate: '2023-01-01', endDate: '2023-01-07' })
    };
    httpClientSpy.fetchAuth.and.returnValue(Promise.resolve(mockResponse as Response));

    const result = await service.getActiveUsers();

    expect(result).toBe(150);
    expect(httpClientSpy.fetchAuth).toHaveBeenCalledWith('/api/stats/active-users');

    const cached = localStorage.getItem('active_users_stats');
    expect(cached).toBeTruthy();
    expect(JSON.parse(cached!).value).toBe(150);
  });

  it('should return cached value if available and not expired', async () => {
    const now = Date.now();
    localStorage.setItem('active_users_stats', JSON.stringify({ value: 200, timestamp: now }));

    const result = await service.getActiveUsers();

    expect(result).toBe(200);
    expect(httpClientSpy.fetchAuth).not.toHaveBeenCalled();
  });

  it('should fetch from API if cache is expired', async () => {
    const longAgo = Date.now() - (8 * 24 * 60 * 60 * 1000); // 8 days ago
    localStorage.setItem('active_users_stats', JSON.stringify({ value: 200, timestamp: longAgo }));

    const mockResponse = {
      json: () => Promise.resolve({ activeUsers: 300 })
    };
    httpClientSpy.fetchAuth.and.returnValue(Promise.resolve(mockResponse as Response));

    const result = await service.getActiveUsers();

    expect(result).toBe(300);
    expect(httpClientSpy.fetchAuth).toHaveBeenCalled();
  });
});
