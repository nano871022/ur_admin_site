import { TestBed } from '@angular/core/testing';
import { AssemblyService } from './assembly.service';
import { HttpClientService } from '@services/interceptor/http-client-service.service';
import { Answer } from '@app/model/survey.model';

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

  it('should call getAllSurveis endpoint', async () => {
    const mockResponse = {
      json: () => Promise.resolve([])
    };
    httpClientSpy.fetchAuth.and.returnValue(Promise.resolve(mockResponse as Response));

    await service.getAllSurveis();

    expect(httpClientSpy.fetchAuth).toHaveBeenCalledWith('/api/assembly/all', undefined, false);
  });

  it('should call getVotes endpoint with id', async () => {
    const mockResponse = {
      json: () => Promise.resolve({})
    };
    httpClientSpy.fetchAuth.and.returnValue(Promise.resolve(mockResponse as Response));
    const id = '123';

    await service.getVotes(id);

    expect(httpClientSpy.fetchAuth).toHaveBeenCalledWith(`/api/assembly/votes?id=${id}`, undefined, false);
  });

  it('should call getAttendees endpoint', async () => {
    const mockResponse = {
      json: () => Promise.resolve({})
    };
    httpClientSpy.fetchAuth.and.returnValue(Promise.resolve(mockResponse as Response));

    await service.getAttendees();

    expect(httpClientSpy.fetchAuth).toHaveBeenCalledWith('/api/assembly/attendees', undefined, false);
  });

  it('should call getCoefficient endpoint', async () => {
    const mockResponse = {
      json: () => Promise.resolve({})
    };
    httpClientSpy.fetchAuth.and.returnValue(Promise.resolve(mockResponse as Response));

    await service.getCoefficient();

    expect(httpClientSpy.fetchAuth).toHaveBeenCalledWith('/api/assembly/coefficient', undefined, false);
  });

  it('should call restartSurvey endpoint with id', async () => {
    const mockResponse = {
      json: () => Promise.resolve({})
    };
    httpClientSpy.fetchAuth.and.returnValue(Promise.resolve(mockResponse as Response));
    const id = '123';

    await service.restartSurvey(id);

    expect(httpClientSpy.fetchAuth).toHaveBeenCalledWith('/api/assembly/restart', jasmine.objectContaining({
      method: 'POST',
      body: JSON.stringify({ id })
    }));
  });

  it('should call createSurvey endpoint with question and options', async () => {
    const mockResponse = {
      json: () => Promise.resolve({})
    };
    httpClientSpy.fetchAuth.and.returnValue(Promise.resolve(mockResponse as Response));
    const question = 'How are you?';
    const options: Answer[] = [{ text: 'Good', votesCount: 0 }, { text: 'Bad', votesCount: 0 }];

    await service.createSurvey(question, options);

    expect(httpClientSpy.fetchAuth).toHaveBeenCalledWith('/api/assembly/create', jasmine.objectContaining({
      method: 'PUT',
      body: JSON.stringify({ question, options })
    }));
  });

  it('should call closeVotes endpoint with id and timeUsed', async () => {
    const mockResponse = {
      json: () => Promise.resolve({})
    };
    httpClientSpy.fetchAuth.and.returnValue(Promise.resolve(mockResponse as Response));
    const id = '123';
    const timeUsed = '05:30';

    await service.closeVotes(id, timeUsed);

    expect(httpClientSpy.fetchAuth).toHaveBeenCalledWith('/api/assembly/close', jasmine.objectContaining({
      method: 'POST',
      body: JSON.stringify({ id, timeUsed })
    }));
  });

  it('should call deleteSurvey endpoint with id', async () => {
    const mockResponse = {
      json: () => Promise.resolve({})
    };
    httpClientSpy.fetchAuth.and.returnValue(Promise.resolve(mockResponse as Response));
    const id = '123';

    await service.deleteSurvey(id);

    expect(httpClientSpy.fetchAuth).toHaveBeenCalledWith(`/api/assembly/delete?id=${id}`, jasmine.objectContaining({
      method: 'DELETE'
    }));
  });

  it('should call createAssembly endpoint with year and date', async () => {
    const mockResponse = {
      json: () => Promise.resolve({})
    };
    httpClientSpy.fetchAuth.and.returnValue(Promise.resolve(mockResponse as Response));
    const year = 2024;
    const date = '2024-05-20';

    await service.createAssembly(year, date);

    expect(httpClientSpy.fetchAuth).toHaveBeenCalledWith('/api/assembly/init', jasmine.objectContaining({
      method: 'PUT',
      body: JSON.stringify({ year, date })
    }));
  });
});
