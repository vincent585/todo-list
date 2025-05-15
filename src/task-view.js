const { format } = require('date-fns');
import 'bootstrap-icons/font/bootstrap-icons.css';

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

    let icon = document.createElement('i');
    icon.classList.add('bi', 'bi-circle');
    icon.addEventListener('click', () => {
        handleTaskClick(task, taskContent, icon);
    });

    let taskInfo = document.createElement('div');

    let taskTitle = document.createElement('h3');
    taskTitle.textContent = task.title;
    let dueDate = document.createElement('p');
    dueDate.textContent = format(task.dueDate, 'MM/dd/yyyy');

    taskInfo.appendChild(taskTitle);
    taskInfo.appendChild(dueDate);

    taskContent.appendChild(icon);
    taskContent.appendChild(taskInfo);

    return taskContent;
}

function createNewTaskButton() {
    let button = document.createElement('button');
    button.classList.add('add-button');

    let buttonContent = document.createElement('p');
    buttonContent.textContent = 'Add Task';

    let icon = document.createElement('i');
    icon.classList.add('bi', 'bi-plus-lg');

    button.appendChild(icon);
    button.appendChild(buttonContent);

    return button;
}

function isActiveProject(content, project) {
    let activeProject = content.querySelector('h1');

    return activeProject !== null && activeProject.textContent === project.name;
}

function handleTaskClick(task, taskInfo, icon) {
    if (task.done) {
        markTaskIncomplete(task, taskInfo, icon);
    }
    else {
        markTaskComplete(task, taskInfo, icon);
    }
}

function markTaskComplete(task, taskInfo, icon) {
    task.done = true;
    taskInfo.classList.add('done');
    icon.classList.remove('bi-circle');
    icon.classList.add('bi-check-circle');
}

function markTaskIncomplete(task, taskInfo, icon) {
    task.done = false;
    taskInfo.classList.remove('done');
    icon.classList.remove('bi-check-circle');
    icon.classList.add('bi-circle');
}