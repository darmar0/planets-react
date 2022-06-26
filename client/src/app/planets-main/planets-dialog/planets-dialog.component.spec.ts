import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetsDialogComponent } from './planets-dialog.component';

describe('PlanetsDialogComponent', () => {
  let component: PlanetsDialogComponent;
  let fixture: ComponentFixture<PlanetsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
