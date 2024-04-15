import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {WeeklyService} from "../service/weekly.service";
import {Weekly} from "../interface/weekly";
import {Observable} from "rxjs";
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
  //weekly: Observable<Weekly> | undefined;
  //
  editingMode: boolean = false;
  days= ["monday", "tuesday", "wednesday", "thrusday", "friday", "saturday", "sunday"];
  constructor(private weeklyService:WeeklyService){
  }
 ngOnInit() {
// this.weekly = this.weeklyService.getWeekly(
  //  );
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
