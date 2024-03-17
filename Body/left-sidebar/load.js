import { loadTemplate } from "../../actions.js";
import {loadRoutinesBody} from "../routines/load.js";
import { loadWeekly } from "../weekly/load.js";

export async function loadLeftSidebar(user) {

    let leftSidebarContent = await loadTemplate('Body/left-sidebar/left-sidebar.html');
    document.querySelector('#left-sidebar').innerHTML='';
    document.querySelector('#left-sidebar').appendChild(leftSidebarContent);
    ButtonsActions(user);

}

function ButtonsActions(user) {
    if(!user.logged){
        document.getElementById('routines-button').addEventListener('click', function(){alert('User not logged')})
        document.getElementById('weekly-button').addEventListener('click', function(){ alert('User not logged') })
        return;
    }

    document.getElementById('routines-button').addEventListener('click', async function(){await loadRoutinesBody(user)})

    loadWeeklyAction(user);

}
function loadWeeklyAction(user) {
    document.getElementById('weekly-button').addEventListener('click', function(){
        loadWeekly(user);
    })
}
