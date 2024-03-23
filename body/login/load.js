import { hideHeader, hideLeftSidebar, loadTemplate, replaceBody } from "../../actions.js";
import { loadHomePage } from "../homepage/load.js";
import { User } from "../../utils/user.js";
import { loadHeader } from "../../header/load.js";
import { loadFooter } from "../../footer/load.js";
import { loadLeftSidebar } from "../left-sidebar/load.js";

export async function loadLoginBody() {
	let page = await loadTemplate('/body/login/login.html');

	let formContainer = page.querySelector('#form-container');
	await loadLoginForm(formContainer);
	await loadRegisterForm(formContainer);

	hideLeftSidebar();
	hideHeader();
	replaceBody(page);
}

async function loadLoginForm(formContainer) {
	let template = await loadTemplate('/body/login/form-login.html');
	let form = template.querySelector('.form');
	form.id = 'login-form';

	loadToggleLink(form, formContainer);
	loadLoginButton(form);

	formContainer.appendChild(form);
}

function loadLoginButton(form) {
	form.querySelector('#button-login').addEventListener(
		'click', function () {
			submitLogin();
		}
	)
}

function submitLogin() {
	let email = document.querySelector('#input-email-login').value;
	let password = document.querySelector('#input-password-login').value;
	let loginUrl = `http://localhost:8080/api/user/${email}`;
	fetch(loginUrl).then(
		response => response.json())
	.then(
		async user => {
			if (user.password === password) login(user);
			else {
				alert('Incorrect password');
			}
		}
	).catch(
		error => alert('User not found')
	)
}

function login(user) {
	let loggedUser = new User(user.email, user.name);
	loggedUser.login();
	loadHeader(loggedUser);
	loadLeftSidebar(loggedUser);
	loadHomePage(loggedUser);
	loadFooter();
}

async function loadRegisterForm(formContainer) {
	let template = await loadTemplate('/body/login/form-register.html');
	let form = template.querySelector('.form');
	form.id = 'register-form';
	form.style.display = 'none';

	loadToggleLink(form, formContainer);
	loadRegisterButton(form);

	formContainer.appendChild(form);
}

function submitSignUp() {
	let email = document.querySelector('#input-email-sign-up').value;
	let password = document.querySelector('#input-password-sign-up').value;
	let name = document.querySelector('#input-name-sign-up').value;
	let signUpUrl = `http://localhost:8080/api/user/${email}?name=${name}&password=${password}`;
	fetch(signUpUrl, {
		method: 'POST',
	})
	.then(response => response.json())
	.then(
		user => {
			if (user.password === password) login(user);
		})
	.catch(
		error => alert('User already exists')
	)
}

function loadRegisterButton(form) {
	form.querySelector('#button-sign-up').addEventListener(
		'click', function () {
			console.log('Register');
			submitSignUp();
		}
	)
}

function loadToggleLink(form, formContainer) {
	let link = form.querySelector('.link');
	link.addEventListener('click', async function () {
		toggleForm(formContainer);
	});
}

function toggleForm(formContainer) {
	let login = formContainer.querySelector('#login-form');
	let register = formContainer.querySelector('#register-form');
	if (login.style.display === 'none') {
		login.style.display = '';
		register.style.display = 'none';
	} else {
		login.style.display = 'none';
		register.style.display = '';
	}
}
