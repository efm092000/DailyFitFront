import { Component, Input, OnInit } from '@angular/core';
import { ProgressService } from "../../../services/progress.service";
import { Goal } from "../../../enums/goal.enum";
import { ProgressRecommendation } from "../../../interfaces/progress-recommendation.interface";

@Component({
  selector: 'app-recommendation',
  standalone: true,
  imports: [],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.css'
})
export class RecommendationComponent implements OnInit {
  @Input() sets?: number;
  @Input() reps?: number;
  @Input() weight?: number;
  @Input() goal?: Goal;
  recommendation?: ProgressRecommendation;

  constructor(private progressService: ProgressService) { }

  ngOnInit(): void {
    console.log("Created recommendation component")
    if (this.sets && this.reps && this.weight && this.goal) {
      this.progressService.getRecommendationMock(this.sets, this.reps, this.weight, this.goal).then(
        (recommendation: ProgressRecommendation) => {
          this.recommendation = recommendation;
        }
      );
    }
  }
}
