import { loadTemplate, replaceBody } from "../../actions.js";
import { loadRoutineBody } from "../routine/load.js";

export async function loadRoutinesBody(user) {
	let routines = await loadTemplate('/Body/routines/routines.html');
	replaceBody(routines);

	let userRoutinesContainer = document.getElementById("routines-container");
	loadRoutines(userRoutinesContainer, user);
	document.getElementById('create-routine-button').addEventListener('click', async function () {
		await loadRoutineBody(user);
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