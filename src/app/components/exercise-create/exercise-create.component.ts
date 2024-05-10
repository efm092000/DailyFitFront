import { Component, OnInit } from '@angular/core';
import { ExerciseService } from "../../services/exercise.service";
import { IntegerFilter } from "../../interfaces/integer-filter";
import { BooleanFilter } from "../../interfaces/boolean-filter";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-exercise-create',
  templateUrl: './exercise-create.component.html',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./exercise-create.component.css']
})

export class ExerciseCreateComponent implements OnInit {
  selectedButton: string = 'none';
  searchFilters = {
    difficulty: "",
    material: "",
    muscleGroup: "",
    name: "",
    type: "",
  };
  materialFilters: BooleanFilter[] = [];
  difficultyFilters: IntegerFilter[] = [];
  typeFilters: string[] = [];
  muscleGroupFilters: string[] = [];

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
        console.error('Error al obtener los filtros:', error);
      }
    );
  }

  getMuscleGroupFilters() {
    this.exerciseService.getMuscleGroupFilters().subscribe(
      (filters: string[]) => {
        this.muscleGroupFilters = filters;
      },
      (error) => {
        console.error('Error al obtener los filtros:', error);
      }
    );
  }

  getTypeFilters() {
    this.exerciseService.getTypeFilters().subscribe(
      (filters: string[]) => {
        this.typeFilters = filters;
      },
      (error) => {
        console.error('Error al obtener los filtros:', error);
      }
    );
  }

  getMaterialFilters() {
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
