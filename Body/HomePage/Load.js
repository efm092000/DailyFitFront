import { loadTemplate, replaceBody } from "../../Actions.js";

export async function loadHomePage() {
    let homePage = await loadTemplate('/Body/HomePage/HomePage.html');
    document.querySelector('#Left_Sidebar').style.display = '';
    //await loadRightSideBar(homePage);
    replaceBody(homePage);
}