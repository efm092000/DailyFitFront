import {Component, Input} from '@angular/core';
import {Exercise} from "../../../interfaces/exercise";
import {ExerciseService} from "../../../services/exercise.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {
  @Input() entry: Exercise | undefined;
  image: String | undefined;
  constructor(private exerciseService:ExerciseService) {
  }
  ngOnInit(){
    this.getImage();
  }
  getImage(): void {
    if (this.entry){
      this.exerciseService.getImage(this.entry.gif).subscribe(
        response => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.image = reader.result as string;
          };
          reader.readAsDataURL(response);
        });
    }

  }
}
