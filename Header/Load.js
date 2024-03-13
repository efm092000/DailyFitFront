//import {loadTemplate} from './Body/UserPage/Load.js';
//import {loadTemplate} from './Body/SearchPage/Load.js';
//import {loadTemplate} from '../Body/HomePage/Load.js';
import {loadTemplate} from '../Actions.js';
import {loadLoginBody} from "../Body/Login/Load.js";

export async function loadHeader() {
    let Header = await loadTemplate('/DailyFitFront/Header/Header.html');
    document.getElementById('Header').innerHTML = '';
    document.getElementById('Header').appendChild(Header);
    document.getElementById('Header').style.display = '';
    ButtonsActions();
}


function ButtonsActions(){
    /*
    document.getElementById('Logo').addEventListener('click', async function(){
        await loadHomePage();
    })

    document.getElementById('Icon').addEventListener('click', async function(){
        await loadUserPage();
    })

     */
    document.getElementById('profile-image-button').addEventListener('click', async function() {
        await loadLoginBody();
    });
}