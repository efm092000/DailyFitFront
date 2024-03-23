import {loadTemplate, replaceBody} from "../../actions.js";

export async function loadExerciseDetailsPage(name) {
    let exerciseDetailsPage = await loadTemplate('/body/exercise-search/exercise-details.html');
    exerciseDetailsPage.getElementById("exercise-name").innerText = name;
    replaceBody(exerciseDetailsPage);
}