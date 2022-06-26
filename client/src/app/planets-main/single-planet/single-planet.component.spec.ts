import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlanetComponent } from './single-planet.component';

describe('SinglePlanetComponent', () => {
  let component: SinglePlanetComponent;
  let fixture: ComponentFixture<SinglePlanetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePlanetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
