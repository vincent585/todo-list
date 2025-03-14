import { projectModal } from "./project-modal";
import projectContainer from "./project-container-instance";

export const sidebar = () => {
    let sidebarElement = document.querySelector('.sidebar');

    for (let project of projectContainer.projects) {
        sidebarElement.appendChild(createProjectElement(project))
    }

    sidebarElement.appendChild(addProjectButton());

    return sidebarElement;
}

function createProjectElement(project) {
        let projectElement = document.createElement("div");
        projectElement.classList.add("project");
        projectElement.textContent = project.name;

        return projectElement;
}

function addProjectButton() {
    let button = document.createElement("button");
    button.textContent = "Add Project";
    button.classList.add("button");

    button.addEventListener("click", () => {
        projectModal();
    });

    return button;
}