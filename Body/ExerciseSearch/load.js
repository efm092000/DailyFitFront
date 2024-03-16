import {loadTemplate, replaceBody} from "../../actions.js";
import {loadLoginBody} from "../Login/load.js";

export async function loadExerciseSearchPage() {
    let exerciseSearchPage = await loadTemplate('/Body/ExerciseSearch/ExerciseSearch.html');
    replaceBody(exerciseSearchPage);
    await prepareForm();
}



async function prepareForm(){
    document.getElementById("exerciseForm").addEventListener("submit", function(event) {
        event.preventDefault();
        var form = event.target;
        var url = form.action + "?" + new URLSearchParams(new FormData(form)).toString();
        // Elimina el parámetro "name" si está vacío
        url = checkEmptyValues(form, url);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                viewSearch(data)
            })
            .catch(error => console.error('Error:', error));
    });

    styleComboboxes();
}

function styleComboboxes() {
    var comboboxes = document.querySelectorAll('select');
    let styles = 'bg-blue-600 border border-blue-300 text-white text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5'.split(' ')
    comboboxes.forEach(function (combobox) {
        styles.forEach(function (style) {
            combobox.classList.add(style);
        });
    });
}
function checkEmptyValues(form, url) {
    if (!form.querySelector("#search-name").value.trim()) url = url.replace("name=", "");
    if (!form.querySelector("#search-muscleGroup").value.trim()) url = url.replace("muscleGroup=", "");
    if (!form.querySelector("#search-type").value.trim()) url = url.replace("type=", "");
    if (!form.querySelector("#search-difficulty").value.trim()) url = url.replace("difficulty=", "");
    if (!form.querySelector("#search-material").value.trim()) url = url.replace("material=", "");
    return url;
}




async function viewSearch(data) {
    try {
        let entries = data;
        if (entries && entries.length > 0) {
            for (const e of entries) {
                await createEntry(e);
            }
            await viewDetails();
        } else {
            document.querySelector("#search-results").innerHTML = 'There are no entries';
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
        document.querySelector("#search-results").innerHTML = 'Error';
    }
}


async function createEntry(e) {
    let entryHtml = await fetch('/Body/ExerciseSearch/ExerciseSearchResult.html');
    let contentHTML = await entryHtml.text();
    const newEntry = document.createRange().createContextualFragment(contentHTML);
    newEntry.querySelector('.exercise-search-result-name').innerHTML = e.name;
    newEntry.querySelector('.exercise-search-result-muscle').innerHTML = e.muscleGroup;

    newEntry.addEventListener('click', async function () {
        await loadExerciseSearchPage(e);
    });
    document.querySelector("#search-results div").appendChild(newEntry);
}
