import {loadTemplate, replaceBody} from '../../Actions.js';
import {Routine} from "../../utils/routine.js";

export async function loadRoutineBody(user) {
    let routine = await loadTemplate('/Body/Routine/Routine.html');
    replaceBody(routine);
    createRoutineButton(user);
}

function createRoutineButton(user) {
    document.querySelector('#create-routine-button').addEventListener(
        'click', function () {
            createRoutine(user);
        }
    )
}

export async function createRoutine(user) {
    let name = document.querySelector('#routine-name').value;
    let email = user.email;
    let createRoutineURL = `http://localhost:8080/api/routine/${name}?email=${email}`;

    fetch(createRoutineURL, {
        method: 'POST',
    }).then(
        async routine => {
            addRoutine(routine);
        }
    );
}

function addRoutine(routine) {
    let createdRoutine = new Routine(routine.name, routine.email);
    // TODO: Update the routines list with the new routine.
}