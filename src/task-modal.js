import { getActiveProject } from "./task-view";
import { createTaskContent } from "./task-view";
import Task from "./models/task";

export const taskModal = () => {
    let main = document.querySelector('.main');
    let modal = document.querySelector('.task-modal');

    if (!modal) {
        modal = createModal();
        main.appendChild(modal);
    }

    modal.showModal();
};

function createModal() {
    const modal = document.createElement('dialog');
    modal.classList.add('task-modal');
    modal.appendChild(createForm(modal));

    return modal;
}

function createInputs() {
    // TODO: Create input elements for form
    return undefined;
}

function createButtons(modal, form) {
    const buttons = document.createElement('div');
    buttons.classList.add('form-buttons');

    buttons.appendChild(createBtn(modal, form));
    buttons.appendChild(cancelBtn(modal, form));

    return buttons;
}

function createForm(modal) {
    const form = document.createElement('form');
    // TODO form.appendChild(createInputs());
    form.appendChild(createButtons(modal, form));

    return form;
}

function cancelBtn(modal, form) {
    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('secondary-button');
    cancelBtn.textContent = 'Cancel';

    cancelBtn.addEventListener('click', (event) => {
        event.preventDefault();
        form.reset();
        modal.close();
    });

    return cancelBtn;
}

function createBtn(modal, form) {
    const createBtn = document.createElement('button');
    createBtn.classList.add('primary-button');
    createBtn.textContent = 'Create';

    createBtn.addEventListener('click', (event) => {
        event.preventDefault();

        let formData = new FormData(form);
        // TODO: get data from form, populate task
        let task = new Task(
            "Some new task",
            "Some description",
            new Date(2026, 0, 1),
            "Low");

        let activeProject = getActiveProject(document.querySelector('.content'));
        activeProject.addTask(task);

        let taskContainer = document.querySelector('.task-container');
        taskContainer.appendChild(createTaskContent(task));
        modal.close();
    });

    return createBtn;
}