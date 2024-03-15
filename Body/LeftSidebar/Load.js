import { loadTemplate } from "../../actions.js";
import {loadRoutinesBody} from "../Routines/load.js";
import { loadWeekly } from "../weekly/load.js";

export async function loadLeftSidebar(user) {

    let leftSidebarContent = await loadTemplate('Body/LeftSidebar/LeftSidebar.html');
    document.querySelector('#Left_Sidebar').innerHTML='';
    document.querySelector('#Left_Sidebar').appendChild(leftSidebarContent);
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
