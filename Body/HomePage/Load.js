import { loadLeftSidebar } from "../LeftSidebar/Load.js";
import { loadTemplate, replaceBody } from "../../Actions.js";

export async function loadHomePage() {
    let homePage = await loadTemplate('/Body/HomePage/HomePage.html');
    await loadLeftSidebar();
    //await loadRightSideBar(homePage);
    replaceBody(homePage);
}