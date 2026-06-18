import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedFoldersComponent } from './shared-folders.component';
import { DataService } from '@services/data/data.service';

describe('SharedFoldersComponent', () => {
  let component: SharedFoldersComponent;
  let fixture: ComponentFixture<SharedFoldersComponent>;
  let dataServiceMock: any;

  beforeEach(async () => {
    dataServiceMock = {
      getData: jasmine.createSpy('getData').and.returnValue(Promise.resolve({ value: 'test' }))
    };

    await TestBed.configureTestingModule({
      imports: [SharedFoldersComponent],
      providers: [
        { provide: DataService, useValue: dataServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
