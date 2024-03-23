import { loadTemplate, replaceBody } from "../../actions.js";

export async function loadHomePage() {
    let homePage = await loadTemplate('/body/homepage/homepage.html');
    document.querySelector('#left-sidebar').style.display = '';
    //await loadRightSideBar(homePage);
    replaceBody(homePage);
}