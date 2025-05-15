const { format } = require('date-fns');

export const renderTasks = (project) => {
    let content = document.querySelector('.content');
    if (isActiveProject(content, project)) {
        return;
    }
    content.replaceChildren();
    content.appendChild(createProjectContainer(project));
};

function createProjectContainer(project) {
    let projectContainer = document.createElement('div');
    projectContainer.classList.add('project-content');
    projectContainer.appendChild(addProjectTitle(project.name));
    projectContainer.appendChild(createTaskContainer(project));
    projectContainer.appendChild(createNewTaskButton());

    return projectContainer;
}

function addProjectTitle(title) {
    let titleElement = document.createElement('h1');
    titleElement.textContent = title;

    return titleElement;
}

function createTaskContainer(project) {
    let taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');
    project.tasks.forEach(task => {taskContainer.appendChild(createTaskContent(task))});

    return taskContainer;
}

function createTaskContent(task) {
    let taskContent = document.createElement('div');
    taskContent.classList.add('task');

    let taskTitle = document.createElement('h3');
    taskTitle.textContent = task.title;
    let dueDate = document.createElement('p');
    dueDate.textContent = format(task.dueDate, 'MM/dd/yyyy');

    taskContent.appendChild(taskTitle);
    taskContent.appendChild(dueDate);

    return taskContent;
}

function createNewTaskButton() {
    let button = document.createElement('button');
    button.textContent = 'New Task';
    button.classList.add('primary-button');

    return button;
}

function isActiveProject(content, project) {
    let activeProject = content.querySelector('h1');

    return activeProject !== null && activeProject.textContent === project.name;
}