import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {WeeklyService} from "../service/weekly.service";

@Component({
  selector: 'app-weekly',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './weekly.component.html',
  styleUrl: './weekly.component.css',
  providers:[WeeklyService]
})
export class WeeklyComponent implements OnInit{
  editingMode: boolean = false;
  weekly:any[]
  constructor(private weeklyService:WeeklyService){
    this.ngOnInit(){
      this.weekly =this.weeklyService.loadWeekly();
    }
  }

  toggleEditMode(){
    this.editingMode=!this.editingMode;
    //this.loadCreateOption();
  }



}
