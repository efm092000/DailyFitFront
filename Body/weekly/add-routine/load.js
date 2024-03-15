import { loadTemplate } from "../../../actions.js";
import { reloadContent } from "../load.js";

export async function loadPopup(weeklyPlanContainer, user) {
	let popup = weeklyPlanContainer.querySelector('.popup-container');
	let popupContent = await loadTemplate('/Body/weekly/add-routine/add-routine.html');
	popup.innerHTML = '';
	popup.appendChild(popupContent);
	popup.style.display = 'none';

	await loadData(popup, user);
	await loadButtonAction(popup, weeklyPlanContainer);
}

async function loadData(popup, user) {
	loadDataDaySelector(popup);
	await loadDataRoutineSelector(popup, user);
}

function loadDataDaySelector(popup) {
	let daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
	let daySelector = popup.querySelector('#day-selector');
	for (const day of daysOfWeek) {
		let option = document.createElement('option');
		option.label = day;
		option.value = day;
		daySelector.appendChild(option);
	}
}

async function loadDataRoutineSelector(popup, user) {
	let routines = await fetch(`http://localhost:8080/api/user/${user.email}/routines`).then(response => response.json());
	let routineSelector = popup.querySelector('#routine-selector');
	for (const routine of routines) {
		let option = document.createElement('option');
		option.label = routine.name;
		option.value = routine.rid;
		routineSelector.appendChild(option);
	}
}

function loadButtonAction(popup, weeklyPlanContainer) {
	let closeButton = popup.querySelector('#weekly-popup-btn-add');
	closeButton.addEventListener('click', function () {
		addRoutineToWeeklyPlan(popup, weeklyPlanContainer);
		popup.style.display = 'none';
	});
}

async function addRoutineToWeeklyPlan(popup, weeklyPlanContainer) {
	const dayMap = {
		"monday": 1,
		"tuesday": 2,
		"wednesday": 3,
		"thursday": 4,
		"friday": 5,
		"saturday": 6,
		"sunday": 7
	}
	let weeklyPlanSelector = weeklyPlanContainer.querySelector('.weekly-plans-selector');
	let weeklyPlanId = weeklyPlanSelector.value;
	let daySelector = popup.querySelector('#day-selector');
	let routineSelector = popup.querySelector('#routine-selector');

	let day = dayMap[daySelector.value];
	let routineId = routineSelector.value;
	await fetch(`http://localhost:8080/api/weekly/${weeklyPlanId}/routine?rid=${routineId}&day=${day}`, {
		method: 'POST'
	})
	reloadContent(weeklyPlanContainer, weeklyPlanId);
}
