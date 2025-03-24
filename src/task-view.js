export const renderTasks = (project) => {
    let content = document.querySelector('.content');
    if (isActiveProject(content, project)) {
        return;
    }
    content.replaceChildren();
    content.append(addTitle(project.name));
};

function addTitle(title) {
    let titleElement = document.createElement('h1');
    titleElement.textContent = title;

    return titleElement;
}

function isActiveProject(content, project) {
    let activeProject = content.querySelector('h1');

    return activeProject !== null && activeProject.textContent === project.name;
}