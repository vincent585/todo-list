import projectContainer  from './project-container-instance';
import Project from "./models/project";
import { addNewProject } from "./sidebar";

export const projectModal = () => {
    let main = document.querySelector('.main');
    let modal = document.querySelector('.project-modal');

    if (!modal) {
        modal = createModal();
        main.appendChild(modal);
    }

    modal.showModal();
};

function createModal() {
    const modal = document.createElement('dialog');
    modal.classList.add('project-modal');
    modal.appendChild(createForm(modal));

    return modal;
}

function createForm(modal) {
    const form = document.createElement('form');
    form.appendChild(createInputs());
    form.appendChild(createButtons(modal, form));

    return form;
}

function createInputs() {
    const input = document.createElement('div');
    const inputLabel = document.createElement('label');
    const inputText = document.createElement('input');

    inputLabel.htmlFor = 'name';
    inputLabel.textContent = 'Name: ';
    inputText.type = 'text';
    inputText.placeholder = 'Project name';
    inputText.id = 'name';
    inputText.name = 'name';

    input.classList.add('input-wrapper');

    input.appendChild(inputLabel);
    input.appendChild(inputText);

    return input;
}

function createButtons(modal, form) {
    const buttons = document.createElement('div');
    buttons.classList.add('form-buttons');

    buttons.appendChild(createBtn(modal, form));
    buttons.appendChild(cancelBtn(modal, form));

    return buttons;
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
        let project = new Project(formData.get('name'));
        projectContainer.addProject(project);
        console.log(projectContainer);
        addNewProject(project);
        modal.close();
    });

    return createBtn;
}