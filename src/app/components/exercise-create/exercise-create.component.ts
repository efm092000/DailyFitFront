import { Component, OnInit } from '@angular/core';
import { ExerciseService } from "../../services/exercise.service";
import { IntegerFilter } from "../../interfaces/integer-filter";
import { BooleanFilter } from "../../interfaces/boolean-filter";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Exercise} from "../../interfaces/exercise";

@Component({
  selector: 'app-exercise-create',
  templateUrl: './exercise-create.component.html',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./exercise-create.component.css']
})

export class ExerciseCreateComponent implements OnInit {
  searchFilters = {
    difficulty: "",
    material: "",
    muscleGroup: "",
    name: "",
    type: "",
  };
  materialFilters: BooleanFilter[] = [];
  difficultyFilters: IntegerFilter[] = [];
  typeFilters: string[] = [];
  muscleGroupFilters: string[] = [];

  newExercise:Exercise ={
    name: '',
    material: false,
    muscleGroup: '',
    difficulty: 0,
    type: '',
    gif: '',
    description: ''
  };

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
        console.error('Error al obtener los filtros:', error);
      }
    );
  }

  getMuscleGroupFilters() {
    this.exerciseService.getMuscleGroupFilters().subscribe(
      (filters: string[]) => {
        this.muscleGroupFilters = filters;
      },
      (error) => {
        console.error('Error al obtener los filtros:', error);
      }
    );
  }

  getTypeFilters() {
    this.exerciseService.getTypeFilters().subscribe(
      (filters: string[]) => {
        this.typeFilters = filters;
      },
      (error) => {
        console.error('Error al obtener los filtros:', error);
      }
    );
  }

  getMaterialFilters() {
    this.exerciseService.getMaterialFilters().subscribe(
      (filters: BooleanFilter[]) => {
        this.materialFilters = filters;
      },
      (error) => {
        console.error('Error al obtener los filtros:', error);
      }
    );
  }
  createExercise(){
    if (!this.newExercise.name || !this.newExercise.difficulty || !this.newExercise.muscleGroup || !this.newExercise.type ) {
      console.error('Please complete all fields.');
      return;
    }const exerciseToCreate: Exercise = {
      name: this.newExercise.name,
      material: this.newExercise.material,
      muscleGroup: this.newExercise.muscleGroup,
      difficulty: this.newExercise.difficulty,
      type: this.newExercise.type,
      gif: this.newExercise.gif,
      description: this.newExercise.description
    };

    this.exerciseService.createExercise(exerciseToCreate).subscribe(response => {}, error => {
      console.error('Error al crear el ejercicio:', error);
    });
  }

}
