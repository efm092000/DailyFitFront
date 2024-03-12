//import { loadTemplate } from "../loadingFunctions.js";
import {loadTemplate} from "../Actions.js";

export async function loadFooter(){
    let footer = await loadTemplate('DailyFitFront/Footer/Footer.html');
    loadSocialMediaIcons(footer);
    loadContactInfo(footer);
    document.getElementById('footer').appendChild(footer);
}

function loadSocialMediaIcons(footer) {
    let socialMediaIcons = footer.querySelector('#social-media-container');
    loadFacebookIcon(socialMediaIcons);
    loadInstagramIcon(socialMediaIcons);
    loadTwitterIcon(socialMediaIcons);
}

function loadFacebookIcon(socialMediaIcons) {
    let icon = document.createElement('img');
    icon.src = '/images/facebook.png';
    icon.className = 'social-media-icon';
    socialMediaIcons.appendChild(icon);
}

function loadInstagramIcon(socialMediaIcons) {
    let icon = document.createElement('img');
    icon.src = '/images/instagram.png';
    icon.className = 'social-media-icon';
    socialMediaIcons.appendChild(icon);
}

function loadTwitterIcon(socialMediaIcons) {
    let icon = document.createElement('img');
    icon.src = '/images/twitter.png';
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
    icon.src = '/images/phone.png';

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
    icon.src = '/images/mail.png';

    let text = document.createElement('p');
    text.textContent = 'mail@example.com';
    text.className = 'contact-info-text';

    container.appendChild(icon);
    container.appendChild(text);
    contactInfo.appendChild(container);
}