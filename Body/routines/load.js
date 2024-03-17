import { loadTemplate, replaceBody } from "../../actions.js";
import { loadRoutineBody } from "../routine/load.js";

export async function loadRoutinesBody(user) {
	let routines = await loadTemplate('/Body/routines/routines.html');
	replaceBody(routines);

	let userRoutinesContainer = document.getElementById("routines-container");
	loadRoutines(userRoutinesContainer, user);
	addCreateRoutineButton(user);
}

function addCreateRoutineButton(user) {
	document.getElementById('create-routine-button').addEventListener('click', async function () {
		let rid = await fetch(`http://localhost:8080/api/routine/NewRoutine?email=${user.email}`, {
			method: 'POST'
		}).then(response => response.json()).then(routine => routine.rid);
		await loadRoutineBody(rid);
	})
}

function loadRoutines(userRoutinesContainer, user) {
	fetch(`http://localhost:8080/api/user/${user.email}/routines`)
	.then(response => response.json())
	.then(routines => {
		routines.forEach(routine => {
			addButtonToContainer(userRoutinesContainer, routine);
		});
	});
}

function addButtonToContainer(container, routine) {
	let routineButton = document.createElement("button");
	routineButton.textContent = routine.name;
	routineButton.className = "routine-button";
	routineButton.addEventListener('click', function(){
		alert(routine.rid)
	});
	container.appendChild(routineButton);
}