import { loadTemplate, replaceBody } from "../../actions.js";
import { loadRoutineBody } from "../Routine/Load.js";

export async function loadWeekly(wid) {
	let scheduleContainer = await loadTemplate('/Body/weekly/weekly.html');

	await loadDaysOfWeekTemplate(scheduleContainer);
	await loadRoutines(scheduleContainer, wid);
	replaceBody(scheduleContainer);
}

async function loadDaysOfWeekTemplate(weekly) {
	let daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
	for (const day of daysOfWeek) {
		let dayTemplate = await loadTemplate('/Body/weekly/day-container/day-container.html');
		dayTemplate.querySelector('.day-title').innerText = day;
		weekly.querySelector(`#weekly-${day}`).appendChild(dayTemplate);
	}
}

async function loadRoutines(scheduleContainer, wid) {
	let json = await fetch(`http://localhost:8080/api/weekly/${wid}/routines`)
		.then(response => response.json());
	transformData(json);
	for (const routine of json) {
		await loadRoutine(scheduleContainer, routine.rid, routine.day);
	}
}

function transformData(json) {
	const dayMap = {
		1: 'monday',
		2: 'tuesday',
		3: 'wednesday',
		4: 'thursday',
		5: 'friday',
		6: 'saturday',
		7: 'sunday'
	}
	json.forEach(routine => {
		routine.day = dayMap[routine.day];
	})
}

async function loadRoutine(scheduleContainer, rid, day) {
	let name = await fetch(`http://localhost:8080/api/routine/${rid}`)
		.then(response => response.json())
		.then(json => json.name);
	let dayContainer = scheduleContainer.querySelector(`#weekly-${day}`);
	let dayContentContainer = dayContainer.querySelector('.day-content');
	dayContentContainer.appendChild(loadCard(rid, name));
}

function loadCard(rid, name) {
	let card = document.createElement('button');
	card.innerText = name;
	card.classList.add('btn-routine-card');
	card.addEventListener('click', async function () {
		await loadRoutineBody(rid);
	});
	return card;
}
