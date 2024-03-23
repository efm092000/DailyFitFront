import { loadTemplate } from '../actions.js';
import { loadLoginBody } from "../body/login/load.js";
import { loadExerciseSearchPage } from "../body/exercise-search/load.js";
import { loadHomePage } from "../body/homepage/load.js";

export async function loadHeader() {
	let header = await loadTemplate('/header/header.html');
	document.getElementById('header').innerHTML = '';
	document.getElementById('header').appendChild(header);
	document.getElementById('header').style.display = '';
	addButtonsAction();
}


function addButtonsAction() {
	document.getElementById('logo').addEventListener('click', async function () {
		await loadHomePage();
	})

	/*
		document.getElementById('Icon').addEventListener('click', async function(){
			await loadUserPage();
		})
	*/

	document.getElementById('profile-image-button').addEventListener('click', async function () {
		await loadLoginBody();
	});

	document.getElementById('search').addEventListener('click', async function () {
		await loadExerciseSearchPage();
	});
}
