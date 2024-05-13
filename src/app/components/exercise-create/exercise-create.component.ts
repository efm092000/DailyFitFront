import { Component, OnInit } from '@angular/core';
import { ExerciseService } from "../../services/exercise.service";
import { IntegerFilter } from "../../interfaces/integer-filter";
import { BooleanFilter } from "../../interfaces/boolean-filter";
import { Exercise } from "../../interfaces/exercise";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ExerciseDetailsComponent} from "../exercise-search/exercise-details/exercise-details.component";
import {ExerciseEditComponent} from "./exercise-edit/exercise-edit.component";
import {ExerciseDeleteComponent} from "./exercise-delete/exercise-delete.component";

@Component({
  selector: 'app-exercise-create',
  templateUrl: './exercise-create.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink,
    ExerciseDetailsComponent,
    ExerciseEditComponent,
    ExerciseDeleteComponent,
    NgIf
  ],
  styleUrls: ['./exercise-create.component.css']
})
export class ExerciseCreateComponent implements OnInit {

  newExercise: Exercise = {
    name: '',
    material: false,
    muscleGroup: '',
    difficulty:0,
    type: '',
    gif: '',
    description: ''
  };

  materialFilters: BooleanFilter[] = [];
  difficultyFilters: IntegerFilter[] = [];
  typeFilters: string[] = [];
  muscleGroupFilters: string[] = [];

  edit : boolean = false;
  delete: boolean = false
  selectedFile: File | null = null;

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
    if (!this.newExercise.name || !this.newExercise.difficulty || !this.newExercise.muscleGroup || !this.newExercise.type || !this.newExercise.gif ||!this.newExercise.description ) {
      console.error('Please complete all fields.');
      return;
    }

    this.exerciseService.createExercise(this.newExercise.muscleGroup, this.newExercise.type, this.newExercise.name, this.newExercise.difficulty, this.newExercise.material, this.newExercise.gif, this.newExercise.description).subscribe(response => {}, error => {
      console.error('Error creating the exercise:', error);
    });
  }

  editpopup(){
    this.edit = !this.edit;
  }

  deletepopup(){
    this.delete = !this.delete;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
