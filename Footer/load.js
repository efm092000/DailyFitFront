
import {loadTemplate} from "../actions.js";

export async function loadFooter(){
    let footer = await loadTemplate('/DailyFitFront/Footer/Footer.html');
    loadSocialMediaIcons(footer);
    loadContactInfo(footer);
    document.getElementById('Footer').innerHTML = '';
    document.getElementById('Footer').appendChild(footer);
    document.getElementById('Footer').style.display = '';
}

function loadSocialMediaIcons(footer) {
    let socialMediaIcons = footer.querySelector('#social-media-container');
    loadFacebookIcon(socialMediaIcons);
    loadInstagramIcon(socialMediaIcons);
    loadTwitterIcon(socialMediaIcons);
}

function loadFacebookIcon(socialMediaIcons) {
    let icon = document.createElement('img');
    icon.src = '/DailyFitFront/Images/facebook.png';
    icon.className = 'social-media-icon';
    socialMediaIcons.appendChild(icon);
}

function loadInstagramIcon(socialMediaIcons) {
    let icon = document.createElement('img');
    icon.src = '/DailyFitFront/Images/instagram.png';
    icon.className = 'social-media-icon';
    socialMediaIcons.appendChild(icon);
}

function loadTwitterIcon(socialMediaIcons) {
    let icon = document.createElement('img');
    icon.src = '/DailyFitFront/Images/twitter.png';
    icon.className = 'social-media-icon';
    socialMediaIcons.appendChild(icon);
}

function loadContactInfo(footer) {
    let contactInfo = footer.querySelector('#contact-container');
    loadPhone(contactInfo);
    loadEmail(contactInfo);
}

function loadPhone(contactInfo) {
    let container = document.createElement('div');
    container.className = 'contact-info-item';

    let icon = document.createElement('img');
    icon.className = 'social-media-icon';
    icon.src = '/DailyFitFront/Images/phone.png';

    let text = document.createElement('p');
    text.textContent = '123456789';
    text.className = 'contact-info-text';

    container.appendChild(icon);
    container.appendChild(text);
    contactInfo.appendChild(container);
}

function loadEmail(contactInfo) {
    let container = document.createElement('div');
    container.className = 'contact-info-item';

    let icon = document.createElement('img');
    icon.className = 'social-media-icon';
    icon.src = '/DailyFitFront/Images/mail.png';

    let text = document.createElement('p');
    text.textContent = 'mail@example.com';
    text.className = 'contact-info-text';

    container.appendChild(icon);
    container.appendChild(text);
    contactInfo.appendChild(container);
}
