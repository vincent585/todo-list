export const sidebar = (projectContainer) => {
    let sidebarElement = document.querySelector('.sidebar');

    for (let project of projectContainer.projects) {
        sidebarElement.appendChild(createProjectElement(project))
    }

    return sidebarElement;
}

function createProjectElement(project) {
        let projectElement = document.createElement("div");
        projectElement.classList.add("project");
        projectElement.textContent = project.name;

        return projectElement;
}