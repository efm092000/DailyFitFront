import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Exercise} from "../../../interfaces/exercise";
import {ExerciseService} from "../../../services/exercise.service";
import {RouterLink} from "@angular/router";
import {IntegerFilter} from "../../../interfaces/integer-filter";
import {BooleanFilter} from "../../../interfaces/boolean-filter";

@Component({
  selector: 'app-exercise-edit',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './exercise-edit.component.html',
  styleUrl: './exercise-edit.component.css'
})
export class ExerciseEditComponent  implements OnInit {
  @Output() confirmClicked: EventEmitter<void> = new EventEmitter<void>();
  exercises: Exercise[] = [];
  searchFilters = {
    difficulty: "",
    material: "",
    muscleGroup: "",
    name: "",
    type: "",
  };

  oldExercise:Exercise = {
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
  selectedFile: File | null = null;
  constructor(protected exerciseService: ExerciseService){}

  ngOnInit(): void {
    this.loadExercises(this.searchFilters);
    this.getFilters();

  }

  loadExercises(filters: any){
    this.exerciseService.getExercises(filters).subscribe(
      (exercises: Exercise[]) => {
        this.exercises = exercises;
      },(error) => {
        console.error('Error al obtener los ejercicios:', error);
      }
    );
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

  updateExercise(){
    this.exerciseService.updateExercise(this.oldExercise.muscleGroup,this.oldExercise.type, this.oldExercise.name,this.oldExercise.difficulty,this.oldExercise.material,this.oldExercise.gif,this.oldExercise.description)
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
