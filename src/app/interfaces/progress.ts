export interface Progress {
  exercise: string;
  data: {
    day: string,
    weight: number,
    sets: number,
    reps: number
  }[];
}
