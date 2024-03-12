//import {loadTemplate} from './Body/UserPage/Load.js';
//import {loadTemplate} from './Body/SearchPage/Load.js';
//import {loadTemplate} from '../Body/HomePage/Load.js';
import {loadTemplate} from '../Actions.js';

export async function loadHeader() {
    let Header = await loadTemplate('/DailyFitFront/Header/Header.html');
    document.getElementById('Header').appendChild(Header);
   // ButtonsActions();
}
/**
function ButtonsActions(){
    document.getElementById('Logo').addEventListener('click', async function(){
        await loadHomePage();
    })

    document.getElementById('Icon').addEventListener('click', async function(){
        await loadUserPage();
    })
}**/