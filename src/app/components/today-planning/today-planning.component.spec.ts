import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayPlanningComponent } from './today-planning.component';

describe('TodayPlanningComponent', () => {
  let component: TodayPlanningComponent;
  let fixture: ComponentFixture<TodayPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayPlanningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodayPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
