import {loadTemplate, replaceBody} from '../Actions.js';

export async function loadRoutineBody() {
    let routine = await loadTemplate('/DailyFitFront/Routine/Routine.html');
    replaceBody(routine);
}
