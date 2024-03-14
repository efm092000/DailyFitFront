import {loadTemplate, replaceBody} from '../../Actions.js';
import {loadLoginBody} from "../Login/load.js";
export async function loadRoutineBody() {
    let routine = await loadTemplate('/Body/Routine/Routine.html');
    replaceBody(routine);
}

