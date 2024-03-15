export async function loadTemplate(url) {
    let response = await fetch(url);
    let text = await response.text();

    let template = document.createElement('template');
    template.innerHTML = text;
    return document.importNode(template.content, true);
}

export async function fetchJson(url) {
    let response = await fetch(url);
    return response.json();
}

export function replaceBody(body) {
    document.querySelector('.Information').innerHTML = '';
    document.querySelector('.Information').appendChild(body);
}

export function hideHeader() {
    document.querySelector('#Header').style.display = 'none';
}

export function hideLeftSidebar() {
    document.querySelector('#Left_Sidebar').style.display = 'none';
}
