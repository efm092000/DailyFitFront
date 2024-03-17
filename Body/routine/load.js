import {loadTemplate, replaceBody} from '../../Actions.js';
import {Routine} from "../../utils/routine.js";

export async function loadRoutineBody(rid, user) {
	let routine = await loadTemplate('/Body/Routine/Routine.html');
	replaceBody(routine);
	loadExercises(10)
	addExerciseButton();
	createRoutineButton(user);
}

async function loadExercises(rid) {
	let getExercisesURL = `http://localhost:8080/api/routine/${rid}/exercises`;
	let json = await fetch(getExercisesURL)
		.then(response => response.json());

	for (const exercise of json) {
		addRow(exercise.exercise, exercise.sets, exercise.reps);
	}

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

function createCell(field, index, row) {
	let c = row.insertCell(index);
	let cell = document.createElement("input");
	cell.type = "text";
	cell.value = field;
	c.appendChild(cell);
}

function addExerciseButton() {
	document.querySelector("#add-exercise").addEventListener(
		'click', function () {
			addRow('', '', '');
		}
	);
}

export async function addRow(exercise, sets, reps) {
	let table = document.getElementById("table");
	let tableRows = table.rows.length
	let newRow = table.insertRow(tableRows);

	createCell(exercise, 0, newRow);
	createCell(sets, 1, newRow);
	createCell(reps, 2, newRow);
}