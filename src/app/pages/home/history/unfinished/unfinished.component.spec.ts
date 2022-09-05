import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfinishedComponent } from './unfinished.component';

describe('UnfinishedComponent', () => {
  let component: UnfinishedComponent;
  let fixture: ComponentFixture<UnfinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnfinishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnfinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
