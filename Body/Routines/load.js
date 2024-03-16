import { loadTemplate, replaceBody} from "../../actions.js";
//import {loadCreateRoutine} from "../Routine/load.js"
export async function loadRoutinesBody(user) {
    let routines = await loadTemplate('/Body/Routines/Routines.html');
    replaceBody(routines);

    let userRoutinesContainer = document.getElementById("routines-container");
    loadRoutines(userRoutinesContainer,user);
    /*
    document.getElementById('create-routine-button').addEventListener('click', async function(){
        await loadCreateRoutine(user);
    })

     */

}

function loadRoutines(userRoutinesContainer, user){
    fetch(`http://localhost:8080/api/user/${user.email}/routines`)
        .then(response =>response.json())
        .then(routines => {
            routines.forEach(routine => {
                addButtonToContainer(userRoutinesContainer,routine);
            });
        });
}

function addButtonToContainer(container, routine){
    let routineButton = document.createElement("button");
    routineButton.textContent = routine.name;
    routineButton.id = "routine-button";
    /*
    routineButton.addEventListener('click', function(){
        window.location.href = 'Body/CreateRoutine/create-routine.html'
    });
     */
    container.appendChild(routineButton);
}