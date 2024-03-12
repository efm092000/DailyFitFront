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
    document.querySelector('#app').innerHTML = '';
    document.querySelector('#app').appendChild(body);
}