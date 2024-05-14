import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDeleteComponent } from './exercise-delete.component';

describe('ExerciseDeleteComponent', () => {
  let component: ExerciseDeleteComponent;
  let fixture: ComponentFixture<ExerciseDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciseDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
