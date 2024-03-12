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
    let template = await loadTemplate('/body/login/form-login.html');
    let form = template.querySelector('.form');
    form.id = 'login-form';

    loadToggleLink(form, formContainer);
    formContainer.appendChild(form);
}

function loadRegisterButton(form) {
    form.querySelector('#button-sign-up').addEventListener(
        'click', function() {
            console.log('Register');
        }
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

function loadToggleLink(form, formContainer) {
    let link = form.querySelector('.link');
    link.addEventListener('click', async function() {
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
