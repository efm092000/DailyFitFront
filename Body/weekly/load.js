import { loadTemplate, replaceBody } from "../../actions.js";
import { loadRoutineBody } from "../Routine/Load.js";

export async function loadWeekly(user) {
	let weeklyPlanContainer = await loadTemplate('/Body/weekly/weekly.html');
	replaceBody(weeklyPlanContainer);

	weeklyPlanContainer = document.querySelector('.weekly-page');
	await loadFirstWeeklyPlan(user, weeklyPlanContainer);
	await loadDaysOfWeekTemplate(weeklyPlanContainer);
}

async function loadFirstWeeklyPlan(user, weeklyPlanContainer) {
	let weeklyPlansJson = await fetch(`http://localhost:8080/api/user/${user.email}/weeklies`).then(response => response.json());
	let weeklyPlansSelector = loadWeeklyPlanSelector(weeklyPlanContainer);
	for (const weeklyPlan of weeklyPlansJson) {
		let option = document.createElement('option');
		option.label = weeklyPlan.name;
		option.value = weeklyPlan.wid;
		option.classList.add('option-weekly-plan');
		weeklyPlansSelector.appendChild(option);
	}
}

function loadWeeklyPlanSelector(weeklyPlanContainer) {
	let weeklyPlansSelector = weeklyPlanContainer.querySelector('.weekly-plans-selector');

	let defaultOption = document.createElement('option');
	defaultOption.label = 'Select a weekly plan';
	defaultOption.disabled = true;
	defaultOption.selected = true;

	weeklyPlansSelector.appendChild(defaultOption);
	weeklyPlansSelector.addEventListener('change', function () {
		loadRoutines(weeklyPlanContainer, this.value);
	});
	return weeklyPlansSelector;
}

async function loadDaysOfWeekTemplate(weekly) {
	let daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
	for (const day of daysOfWeek) {
		let dayTemplate = await loadTemplate('/Body/weekly/day-container/day-container.html');
		dayTemplate.querySelector('.day-title').innerText = day;
		weekly.querySelector(`#weekly-${day}`).appendChild(dayTemplate);
	}
}

async function loadRoutines(weeklyPlanContainer, wid) {
	let json = await fetch(`http://localhost:8080/api/weekly/${wid}/routines`).then(response => response.json());
	clearTable(weeklyPlanContainer);
	transformData(json);
	for (const routine of json) {
		await loadRoutine(weeklyPlanContainer, routine.rid, routine.day);
	}
}

function clearTable(weeklyPlanContainer) {
	weeklyPlanContainer.querySelectorAll('.day-content').forEach(dayContent => {
		dayContent.innerHTML = '';
	});
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
