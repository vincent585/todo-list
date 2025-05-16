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

    const titleInput = createTextInput('title', 'Task title');
    const descriptionInput = createTextInput('description', 'Task description');

    // TODO: Add priority select dropdown, date picker

    let inputs = [titleInput, descriptionInput];
    let toReturn = [];

    for (let input of inputs) {
        let inputWrapper = document.createElement('div');
        inputWrapper.classList.add('input-wrapper');
        inputWrapper.append(...input);
        toReturn.push(inputWrapper);
    }

    return toReturn;
}

function createTextInput(property, placeholder) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.id = property;
    input.name = property;

    const label = createLabel(property);

    return [label, input];
}

function createLabel(forProp) {
    const inputLabel = document.createElement('label');
    inputLabel.htmlFor = forProp;
    inputLabel.textContent = `${forProp}: `;

    return inputLabel;
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
    let inputs = createInputs();
    form.append(...inputs);
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