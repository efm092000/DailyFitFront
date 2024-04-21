import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Exercise} from "../../interfaces/exercise";
import {ExerciseService} from "../../services/exercise.service";
import {FormsModule} from "@angular/forms";
import {ExerciseDetailsComponent} from "./exercise-details/exercise-details.component";
import {NgxPaginationModule} from "ngx-pagination";


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
export class ExerciseSearchComponent{
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

  constructor(protected exerciseService: ExerciseService) {}

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
}
