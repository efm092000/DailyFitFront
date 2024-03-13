import { hideHeader, hideLeftSidebar, loadTemplate, replaceBody } from "/Actions.js";
import { loadHomePage } from "../HomePage/Load.js";

export async function loadLoginBody() {
    let page = await loadTemplate('/Body/Login/Login.html');

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
            login();
        }
    )
}

function login() {
    let email = document.querySelector('#input-email-login').value;
    let password = document.querySelector('#input-password-login').value;
    fetch('http://localhost:8080/api/user/' + email).then(
        response => response.json())
        .then(
            user => {
                if (user.password === password) {
                    loadHomePage();
                    // TODO: load user data
                } else {
                    alert('Incorrect password');
                }
            }
        ).catch(
        error => alert('User not found')
    )
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

function signUp() {
    let email = document.querySelector('#input-email-sign-up').value;
    let password = document.querySelector('#input-password-sign-up').value;
    let name = document.querySelector('#input-name-sign-up').value;
    fetch('http://localhost:8080/api/user/' + email + '?name=' + name + '&password=' + password, {
        method: 'POST',
    }).then(
        response => response.json())
        .then(
            user => {
                if (user.password === password) {
                    loadHomePage();
                    // TODO: load user data
                }
            }
        ).catch(
        error => alert('User already exists')
    )
}

function loadRegisterButton(form) {
    form.querySelector('#button-sign-up').addEventListener(
        'click', function () {
            console.log('Register');
            signUp();
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
