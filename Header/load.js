//import {loadTemplate} from './Body/UserPage/load.js';
//import {loadTemplate} from './Body/SearchPage/load.js';
//import {loadTemplate} from '../Body/HomePage/load.js';
import {loadTemplate} from '../actions.js';
import {loadLoginBody} from "../Body/Login/load.js";
import {loadExerciseSearchPage} from "../Body/ExerciseSearch/load.js";

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
    document.getElementById('Search').addEventListener('click', async function() {
        await loadExerciseSearchPage();
    });
}
