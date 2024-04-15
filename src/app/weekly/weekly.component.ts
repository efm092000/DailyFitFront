import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {WeeklyService} from "../service/weekly.service";
import {Weekly} from "../interface/weekly";
//import {Observable} from "rxjs";
@Component({
  selector: 'app-weekly',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './weekly.component.html',
  styleUrl: './weekly.component.css',
  providers:[WeeklyService]
})
export class WeeklyComponent implements OnInit{
  weekly ?: Weekly;
  editingMode: boolean = false;
  days= ["monday", "tuesday", "wednesday", "thrusday", "friday", "saturday", "sunday"];
  constructor(private weeklyService:WeeklyService){
  }
 ngOnInit() {
    this.weeklyService.getWeekly(14).subscribe(weekly => this.weekly = weekly);
  }

  toggleEditMode(){
    this.editingMode=!this.editingMode;
    //this.loadCreateOption();
  }

  addRoutine(){

  }

  addWeeklyPlan(){

  }


}
