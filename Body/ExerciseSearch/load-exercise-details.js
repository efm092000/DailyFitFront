import {loadTemplate, replaceBody} from "../../actions.js";
import {loadLoginBody} from "../login/load.js";

export async function loadExerciseDetailsPage(name) {
    let exerciseDetailsPage = await loadTemplate('/Body/ExerciseSearch/exercisedetails.html');
    exerciseDetailsPage.getElementById("exercise-name").innerText = name;
    replaceBody(exerciseDetailsPage);
}