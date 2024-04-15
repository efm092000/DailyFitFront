import {Component, ViewChild} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Exercise} from "../../interfaces/exercise";
import {ExerciseService} from "../../services/exercise.service";
import {FormsModule} from "@angular/forms";
import {ExerciseDetailsComponent} from "./exercise-details/exercise-details.component";

@Component({
  selector: 'app-exercise-search',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ExerciseDetailsComponent
  ],
  templateUrl: './exercise-search.component.html',
  styleUrl: './exercise-search.component.css'
})
export class ExerciseSearchComponent{
  exercises: Exercise[] = [];
  searchFilters = {
    difficulty: "",
    material: "",
    muscleGroup: "",
    name: "",
    type: "",
  };

  constructor(private exerciseService: ExerciseService) {}

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
}
