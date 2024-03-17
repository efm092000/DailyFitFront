import { loadTemplate, replaceBody } from "../../Actions.js";

export async function loadHomePage() {
    let homePage = await loadTemplate('/Body/homepage/homepage.html');
    document.querySelector('#left-sidebar').style.display = '';
    //await loadRightSideBar(homePage);
    replaceBody(homePage);
}