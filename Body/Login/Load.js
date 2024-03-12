import { hideHeader, hideLeftSidebar, loadTemplate, replaceBody } from "/Actions.js";

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
    let template = await loadTemplate('/body/login/form.html');
    let form = template.querySelector('.form');
    form.id = 'login-form';

    loadTitle(form, 'Login');
    await loadUsernameInput(form);
    await loadPasswordInput(form, 'Password');
    loadLoginQuestion(form, formContainer);
    loadButton(form, 'Login');
    formContainer.appendChild(form);
}

async function loadRegisterForm(formContainer) {
    let template = await loadTemplate('/body/login/form.html');
    let form = template.querySelector('.form');
    form.id = 'register-form';
    form.style.display = 'none';

    loadTitle(form, 'Register');
    await loadUsernameInput(form);
    await loadPasswordInput(form, 'Password');
    await loadPasswordInput(form, 'Confirm password');
    loadRegisterQuestion(form, formContainer);
    loadButton(form, 'Register');

    formContainer.appendChild(form);
}

function loadLoginQuestion(form, formContainer) {
    let question = form.querySelector('.question-text');
    question.textContent = 'Don\'t have an account?';
    question.addEventListener('click', async function() {
        toggleForm(formContainer);
    });
}

function loadRegisterQuestion(form, formContainer) {
    let question = form.querySelector('.question-text');
    question.textContent = 'Already have an account?';

    question.addEventListener('click', async function() {
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

function loadTitle(loginForm, text) {
    let title = loginForm.querySelector('.form-title');
    title.textContent = text;
}

async function loadUsernameInput(loginForm) {
    let input = await loadTemplate('/body/login/input/input.html');
    input.querySelector('.text-field').placeholder = 'Username';
    input.querySelector('.text-field-icon').src = '/images/username.png';
    loginForm.querySelector('.input-container').appendChild(input);
}

async function loadPasswordInput(loginForm, text) {
    let input = await loadTemplate('/body/login/input/input.html');
    input.querySelector('.text-field').placeholder = text;
    input.querySelector('.text-field').type = 'password';
    input.querySelector('.text-field-icon').src = '/images/password.png';

    let inputField = input.querySelector('.input');
    let eyeImage = document.createElement('img');
    eyeImage.src = '/images/eye.png';
    eyeImage.id = 'eye-icon';
    inputField.appendChild(eyeImage);

    loginForm.querySelector('.input-container').appendChild(input);
}

function loadButton(loginForm, text) {
    let button = document.createElement('button');
    button.className = 'form-button';
    button.textContent = text;
    loginForm.querySelector('.button-container').appendChild(button);
}
