import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { StatsService } from '@services/data/stats.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let statsServiceSpy: jasmine.SpyObj<StatsService>;

  beforeEach(async () => {
    statsServiceSpy = jasmine.createSpyObj('StatsService', ['getActiveUsers']);
    statsServiceSpy.getActiveUsers.and.returnValue(Promise.resolve(100));

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: StatsService, useValue: statsServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
