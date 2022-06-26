import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetsMainComponent } from './planets-main.component';

describe('PlanetsMainComponent', () => {
  let component: PlanetsMainComponent;
  let fixture: ComponentFixture<PlanetsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
