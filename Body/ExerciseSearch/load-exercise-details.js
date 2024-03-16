import {loadTemplate, replaceBody} from "../../actions.js";
import {loadLoginBody} from "../Login/load.js";

export async function loadExerciseDetailsPage() {
    let exerciseDetailsPage = await loadTemplate('/Body/ExerciseSearch/exercisedetails.html');
    replaceBody(exerciseDetailsPage);
}