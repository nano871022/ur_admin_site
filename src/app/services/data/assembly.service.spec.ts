import { TestBed } from '@angular/core/testing';
import { AssemblyService } from './assembly.service';
import { HttpClientService } from '@services/interceptor/http-client-service.service';

describe('AssemblyService', () => {
  let service: AssemblyService;
  let httpClientSpy: jasmine.SpyObj<HttpClientService>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClientService', ['fetchAuth']);
    TestBed.configureTestingModule({
      providers: [
        AssemblyService,
        { provide: HttpClientService, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(AssemblyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return assembly stats', async () => {
    const stats = await service.getAssemblyStats();
    expect(stats).toBeDefined();
    expect(stats.attendanceCount).toBe(142);
    expect(stats.totalUnits).toBe(190);
  });

  it('should return surveys history', async () => {
    const surveys = await service.getSurveysHistory();
    expect(surveys).toBeDefined();
    expect(surveys.length).toBeGreaterThan(0);
    expect(surveys[0].question).toBe('¿Aprueba el presupuesto para el año 2024?');
  });
});
