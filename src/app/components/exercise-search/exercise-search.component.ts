import {Component, Input, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Exercise} from "../../interfaces/exercise";
import {ExerciseService} from "../../services/exercise.service";
import {FormsModule} from "@angular/forms";
import {ExerciseDetailsComponent} from "./exercise-details/exercise-details.component";
import {NgxPaginationModule} from "ngx-pagination";
import {IntegerFilter} from "../../interfaces/integer-filter";
import {BooleanFilter} from "../../interfaces/boolean-filter";


@Component({
  selector: 'app-exercise-search',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ExerciseDetailsComponent,
    NgxPaginationModule
  ],
  templateUrl: './exercise-search.component.html',
  styleUrl: './exercise-search.component.css'
})
export class ExerciseSearchComponent implements OnInit{
  @Input() rid!: number;
  exercises: Exercise[] = [];
  searchFilters = {
    difficulty: "",
    material: "",
    muscleGroup: "",
    name: "",
    type: "",
  };
  public page: number | undefined;
  materialFilters: BooleanFilter[] = [];
  difficultyFilters: IntegerFilter[] = [];
  typeFilters: string[] = [];
  muscleGroupFilters: string[] = [];

  constructor(protected exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.search(this.searchFilters);
    this.getFilters();
  }

  onSubmit(event:Event){
    event.preventDefault();
    this.search(this.searchFilters);
  }
  search(filters:any): void {
    this.exerciseService.getExercises(filters).subscribe(
      (exercises: Exercise[]) => {
        this.exercises = exercises;
      },
      (error) => {
        console.error('Error al obtener los ejercicios:', error);
      }
    );
  }
  getImage(gif:String): String {
    let image:String= "";
    this.exerciseService.getImage(gif).subscribe(
      response => {
        const reader = new FileReader();
        reader.onloadend = () => {
          image = reader.result as string;
        };
        reader.readAsDataURL(response);
      });
    return image;
  }

  openDialog(entry: Exercise) {
    const dialogId = '#' + entry.name.split(' ').join('_');
    const dialogElement = document.querySelector(dialogId);
    if (dialogElement instanceof HTMLDialogElement) {
      dialogElement.showModal();
    }
  }

  closeDialog(entry: Exercise) {
    const dialogId = '#' + entry.name.split(' ').join('_');
    const dialogElement = document.querySelector(dialogId);
    if (dialogElement instanceof HTMLDialogElement) {
      dialogElement.close();
    }
  }

  getFilters(){
    this.getDifficultyFilters();
    this.getMuscleGroupFilters();
    this.getTypeFilters();
    this.getMaterialFilters();
  }
  getDifficultyFilters(){
    this.exerciseService.getDifficultyFilters().subscribe(
      (filters: IntegerFilter[]) => {
        this.difficultyFilters = filters;
      },
      (error) => {
        console.error('Error al obtener los filtros:', error);
      }
    );
  }
  getMuscleGroupFilters(){
    this.exerciseService.getMuscleGroupFilters().subscribe(
      (filters: string[]) => {
        this.muscleGroupFilters = filters;
      },
      (error) => {
        console.error('Error al obtener los filtros:', error);
      }
    );
  }
  getTypeFilters(){
    this.exerciseService.getTypeFilters().subscribe(
      (filters: string[]) => {
        this.typeFilters = filters;
      },
      (error) => {
        console.error('Error al obtener los filtros:', error);
      }
    );
  }
  getMaterialFilters(){
    this.exerciseService.getMaterialFilters().subscribe(
      (filters: BooleanFilter[]) => {
        this.materialFilters = filters;
      },
      (error) => {
        console.error('Error al obtener los filtros:', error);
      }
    );
  }
}
