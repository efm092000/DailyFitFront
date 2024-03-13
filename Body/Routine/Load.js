import {loadTemplate, replaceBody} from '../../Actions.js';
import {loadLoginBody} from "../Login/Load";
export async function loadRoutineBody() {
    let routine = await loadTemplate('/Body/Routine/Routine.html');
    replaceBody(routine);
}

