//import {loadTemplate} from './Body/UserPage/load.js';
//import {loadTemplate} from './Body/SearchPage/load.js';
//import {loadTemplate} from '../Body/homepage/load.js';
import {loadTemplate} from '../actions.js';
import {loadLoginBody} from "../Body/login/load.js";
import {loadExerciseSearchPage} from "../Body/ExerciseSearch/load.js";

export async function loadHeader() {
    let Header = await loadTemplate('/header/header.html');
    document.getElementById('header').innerHTML = '';
    document.getElementById('header').appendChild(Header);
    document.getElementById('header').style.display = '';
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
    document.getElementById('search').addEventListener('click', async function() {
        await loadExerciseSearchPage();
    });
}
