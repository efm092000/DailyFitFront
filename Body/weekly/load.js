import { loadTemplate, replaceBody } from "../../actions.js";
import { User } from "../../utils/user.js";

export async function loadWeekly() {
	let weekly = await loadTemplate('/Body/weekly/weekly.html');

	let user = new User('a', 'a');
	loadDaysOfWeek(weekly, user);
	replaceBody(weekly);
}

function loadDaysOfWeek(weekly, user) {
	loadDayOfWeek(weekly, user, 'monday');
	loadDayOfWeek(weekly, user, 'tuesday');
	loadDayOfWeek(weekly, user, 'wednesday');
	loadDayOfWeek(weekly, user, 'thursday');
	loadDayOfWeek(weekly, user, 'friday');
	loadDayOfWeek(weekly, user, 'saturday');
	loadDayOfWeek(weekly, user, 'sunday');
}

async function loadDayOfWeek(weekly, user, dayOfWeek) {
	let dayContainer = weekly.querySelector(`#weekly-${dayOfWeek}`);
	let dayTemplate = await loadTemplate('/Body/weekly/day-container/day-container.html');
	dayTemplate.querySelector('.day-title').innerText = dayOfWeek;

	let dayContentContainer = dayTemplate.querySelector('.day-content');
	dayContainer.appendChild(dayTemplate);

	loadRoutines(dayContentContainer, user);
}

function loadRoutines(dayContentContainer, user) {
	fetch(`http://localhost:8080/api/user/${user.email}/routines`)
		.then(response => response.json())
		.then(routines => {
			routines.forEach(routine => {
				addRoutineToDay(dayContentContainer, routine);
			});
		});

/*
	let exercises = user.getExercises();
	let exerciseContainer = dayContainer.querySelector('.exercise-container');
	exercises.forEach(exercise => {
		let exerciseElement = createExerciseElement(exercise);
		exerciseContainer.appendChild(exerciseElement);
	});
*/
}

function addRoutineToDay(dayContentContainer, routine) {
	let routineElement = document.createElement('p');
	routineElement.innerText = routine.name;
	dayContentContainer.appendChild(routineElement);
}
