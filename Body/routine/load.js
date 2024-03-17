import {loadTemplate, replaceBody} from '../../Actions.js';

export async function loadRoutineBody(rid) {
    let routine = await loadTemplate('/Body/Routine/Routine.html');
    replaceBody(routine);
    loadRoutineName(rid);
    loadExercises(rid);
    addExerciseButton();
    saveRoutineButton(rid);
}

async function loadRoutineName(rid) {
    let getRoutineName = `http://localhost:8080/api/routine/${rid}`;
    let name = await fetch(getRoutineName)
        .then(response => response.json())
        .then(routine => routine.name);

    document.querySelector("#routine-name").value = name;
}

async function loadExercises(rid) {
    let getExercisesURL = `http://localhost:8080/api/routine/${rid}/exercises`;
    let json = await fetch(getExercisesURL)
        .then(response => response.json());

    for (const exercise of json) {
        addRow(exercise.exercise, exercise.sets, exercise.reps);
    }

}

function saveName(rid) {
    let name = document.querySelector("#routine-name").value;
    let updateNameURL = `http://localhost:8080/api/routine/${rid}?name=${name}`

    fetch(updateNameURL, {
        method: 'PUT',
    });
}

function saveRoutineButton(rid) {
    document.querySelector('#save-routine-button').addEventListener(
        'click', function () {
            saveRoutine(rid);
            saveName(rid);
            alert("Changes saved.");
        }
    )
}

export async function saveRoutine(rid) {
    let nameArray = document.querySelectorAll('.exercise-field');
    let setsArray = document.querySelectorAll('.sets-field');
    let repsArray = document.querySelectorAll('.reps-field');

    for (let i = 0; i < nameArray.length; i++) {
        let name = nameArray[i].value;
        let sets = setsArray[i].value;
        let reps = repsArray[i].value;
        let getExercisesURL = `http://localhost:8080/api/routine/${rid}/exercise?name=${name}&sets=${sets}&reps=${reps}`;

        fetch(getExercisesURL, {
            method: 'POST',
        });
    }
}

function addExerciseButton() {
    document.querySelector("#add-exercise").addEventListener(
        'click', function () {
            addRow('', '', '');
        }
    );
}

async function addRow(exercise, sets, reps) {
    let table = document.getElementById("table");
    let row = await loadTemplate('/Body/routine/row.html');

    row.querySelector('.exercise-field').value = exercise;
    row.querySelector('.sets-field').value = sets;
    row.querySelector('.reps-field').value = reps;
    table.appendChild(row);
}