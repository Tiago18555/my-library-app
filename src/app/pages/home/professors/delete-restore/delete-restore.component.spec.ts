import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRestoreComponent } from './delete-restore.component';

describe('DeleteRestoreComponent', () => {
  let component: DeleteRestoreComponent;
  let fixture: ComponentFixture<DeleteRestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRestoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
