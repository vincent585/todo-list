import { projectModal } from "./project-modal";
import projectContainer from "./project-container-instance";
import { renderTasks } from "./task-view";

export const sidebar = document.querySelector('.sidebar');

export const renderSidebar = () => {
    let projectContainerElement = createProjectContainerElement();


    for (let project of projectContainer.projects) {
        projectContainerElement.appendChild(createProjectElement(project))
    }

    sidebar.appendChild(projectContainerElement);
    sidebar.appendChild(addProjectButton());

    return sidebar;
}

export function addNewProject(project) {
    let container = document.querySelector('.project-container');

    container.appendChild(createProjectElement(project));
}

function createProjectContainerElement() {
    let container = document.createElement("div");
    container.classList.add('project-container');

    return container;
}

function createProjectElement(project) {
    let projectElement = document.createElement("div");
    projectElement.classList.add("project");
    projectElement.textContent = project.name;
    projectElement.setAttribute("data-name", project.name);

    projectElement.addEventListener("click", () => {
       renderTasks(project);
    });

    return projectElement;
}

function addProjectButton() {
    let button = document.createElement("button");
    button.classList.add("add-button");

    let buttonContent = document.createElement('p');
    let icon = document.createElement('i');

    icon.classList.add('bi', 'bi-plus-lg');
    buttonContent.textContent = 'Add Project';

    button.appendChild(icon);
    button.appendChild(buttonContent);

    button.addEventListener("click", () => {
        projectModal();
    });

    return button;
}