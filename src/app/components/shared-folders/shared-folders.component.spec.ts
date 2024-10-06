import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFoldersComponent } from './shared-folders.component';

describe('SharedFoldersComponent', () => {
  let component: SharedFoldersComponent;
  let fixture: ComponentFixture<SharedFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedFoldersComponent]
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
