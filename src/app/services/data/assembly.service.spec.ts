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

    expect(httpClientSpy.fetchAuth).toHaveBeenCalledWith('/api/assembly/all');
  });

  it('should call getVotes endpoint with id', async () => {
    const mockResponse = {
      json: () => Promise.resolve({})
    };
    httpClientSpy.fetchAuth.and.returnValue(Promise.resolve(mockResponse as Response));
    const id = '123';

    await service.getVotes(id);

    expect(httpClientSpy.fetchAuth).toHaveBeenCalledWith(`/api/assembly/votes?id=${id}`);
  });

  it('should call getAttendees endpoint', async () => {
    const mockResponse = {
      json: () => Promise.resolve({})
    };
    httpClientSpy.fetchAuth.and.returnValue(Promise.resolve(mockResponse as Response));

    await service.getAttendees();

    expect(httpClientSpy.fetchAuth).toHaveBeenCalledWith('/api/assembly/attendees');
  });

  it('should call getCoefficient endpoint', async () => {
    const mockResponse = {
      json: () => Promise.resolve({})
    };
    httpClientSpy.fetchAuth.and.returnValue(Promise.resolve(mockResponse as Response));

    await service.getCoefficient();

    expect(httpClientSpy.fetchAuth).toHaveBeenCalledWith('/api/assembly/coefficient');
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
    const options: Answer[] = [{ value: 'Good', votes: 0 }, { value: 'Bad', votes: 0 }];

    await service.createSurvey(question, options);

    expect(httpClientSpy.fetchAuth).toHaveBeenCalledWith('/api/assembly/create', jasmine.objectContaining({
      method: 'PUT',
      body: JSON.stringify({ question, options })
    }));
  });

  it('should call closeVotes endpoint with id', async () => {
    const mockResponse = {
      json: () => Promise.resolve({})
    };
    httpClientSpy.fetchAuth.and.returnValue(Promise.resolve(mockResponse as Response));
    const id = '123';

    await service.closeVotes(id);

    expect(httpClientSpy.fetchAuth).toHaveBeenCalledWith('/api/assembly/close', jasmine.objectContaining({
      method: 'POST',
      body: JSON.stringify({ id })
    }));
  });
});
