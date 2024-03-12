import { loadTemplate } from "../../Actions.js";

export async function loadLeftSidebar() {

    let leftSidebarContent = await loadTemplate('Body/LeftSidebar/LeftSidebar.html');
    document.querySelector('#Left_Sidebar').appendChild(leftSidebarContent);
}