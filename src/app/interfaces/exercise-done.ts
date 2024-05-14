import {Routine} from "./routine.interface";

export interface ExerciseDone extends Routine{
  exercise:string;
  day:Date;
  email:string;
  rid:number;
  weight:number;
  sets:number;
  reps:number;
}
