import { Component, OnInit } from '@angular/core';
import { ExerciseService } from "../../services/exercise.service";
import { IntegerFilter } from "../../interfaces/integer-filter";
import { BooleanFilter } from "../../interfaces/boolean-filter";
import { Exercise } from "../../interfaces/exercise";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-exercise-create',
  templateUrl: './exercise-create.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./exercise-create.component.css']
})
export class ExerciseCreateComponent implements OnInit {

  newExercise: Exercise = {
    name: '',
    material: false,
    muscleGroup: '',
    difficulty: 0,
    type: '',
    gif: 'a',
    description: 'a'
  };

  materialFilters: BooleanFilter[] = [];
  difficultyFilters: IntegerFilter[] = [];
  typeFilters: string[] = [];
  muscleGroupFilters: string[] = [];

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.getFilters();
  }

  getFilters() {
    this.getDifficultyFilters();
    this.getMuscleGroupFilters();
    this.getTypeFilters();
    this.getMaterialFilters();
  }

  getDifficultyFilters() {
    this.exerciseService.getDifficultyFilters().subscribe(
      (filters: IntegerFilter[]) => {
        this.difficultyFilters = filters;
      },
      (error) => {
        console.error('Error at getting the filters:', error);
      }
    );
  }

  getMuscleGroupFilters() {
    this.exerciseService.getMuscleGroupFilters().subscribe(
      (filters: string[]) => {
        this.muscleGroupFilters = filters;
      },
      (error) => {
        console.error('Error at getting the filters:', error);
      }
    );
  }

  getTypeFilters() {
    this.exerciseService.getTypeFilters().subscribe(
      (filters: string[]) => {
        this.typeFilters = filters;
      },
      (error) => {
        console.error('Error at getting the filters:', error);
      }
    );
  }

  getMaterialFilters() {
    this.exerciseService.getMaterialFilters().subscribe(
      (filters: BooleanFilter[]) => {
        this.materialFilters = filters;
      },
      (error) => {
        console.error('Error at getting the filters:', error);
      }
    );
  }

  createExercise() {
    if (!this.newExercise.name || !this.newExercise.difficulty || !this.newExercise.muscleGroup || !this.newExercise.type ) {
      console.error('Please complete all fields.');
      return;
    }

    this.exerciseService.createExercise(this.newExercise.muscleGroup, this.newExercise.type, this.newExercise.name, this.newExercise.difficulty, this.newExercise.material, this.newExercise.gif, this.newExercise.description).subscribe(response => {}, error => {
      console.error('Error creating the exercise:', error);
    });
  }

}
