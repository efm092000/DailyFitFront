import { loadTemplate, replaceBody} from "../../actions.js";

export async function loadRoutinesBody(user) {
    let routines = await loadTemplate('/Body/Routines/Routines.html');
    replaceBody(routines);
}