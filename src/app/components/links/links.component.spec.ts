import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinksComponent } from './links.component';
import { RouterModule } from '@angular/router';
import { provideRouter } from '@angular/router';
import { DataService } from '@services/data/data.service';

describe('LinksComponent', () => {
  let component: LinksComponent;
  let fixture: ComponentFixture<LinksComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getData']);
    dataServiceSpy.getData.and.returnValue(Promise.resolve({ value: '' }));

    await TestBed.configureTestingModule({
      imports: [LinksComponent],
      providers: [
        provideRouter([]),
        { provide: DataService, useValue: dataServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show assemblies card', () => {
    expect(component.showAssembliesCard).toBeTrue();
    const compiled = fixture.nativeElement as HTMLElement;
    const cardTitles = Array.from(compiled.querySelectorAll('mat-card-title span'));
    const assembliesTitle = cardTitles.find(el => el.textContent?.includes('Asambleas'));
    expect(assembliesTitle).toBeTruthy();
  });
});
