const { format } = require("date-fns");
import "bootstrap-icons/font/bootstrap-icons.css";
import projectContainer from "./project-container-instance";
import { taskModal } from "./task-modal";
import { priority } from "./enums/priority";

export const renderTasks = (project) => {
  let content = document.querySelector(".content");
  if (isActiveProject(content, project)) {
    return;
  }
  content.replaceChildren();
  content.appendChild(createProjectContainer(project));
};

function createProjectContainer(project) {
  let projectContainer = document.createElement("div");
  projectContainer.classList.add("project-content");
  projectContainer.appendChild(addProjectTitle(project.name));
  projectContainer.appendChild(createTaskContainer(project));
  projectContainer.appendChild(createNewTaskButton());

  return projectContainer;
}

function addProjectTitle(title) {
  let titleElement = document.createElement("h1");
  titleElement.textContent = title;

  return titleElement;
}

function createTaskContainer(project) {
  let taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  project.tasks.forEach((task) =>
    taskContainer.append(...createTaskContent(task)),
  );

  return taskContainer;
}

export function createTaskContent(task, index) {
  let taskContent = document.createElement("div");
  taskContent.setAttribute("data-index", task.id.toString());
  taskContent.classList.add("task");

  let taskStart = document.createElement("div");
  let taskEnd = document.createElement("div");
  taskEnd.classList.add("task-actions");

  let circleIcon = document.createElement("i");
  circleIcon.classList.add("bi", "bi-circle");
  circleIcon.addEventListener("click", () => {
    handleTaskClick(task, taskContent, circleIcon);
  });

  let trashIcon = document.createElement("i");
  trashIcon.classList.add("bi", "bi-trash");
  trashIcon.addEventListener("click", () => {
    let taskToDelete = document.querySelector(`.task[data-index="${task.id}"]`);
    let taskDetailsToDelete = document.querySelector(
      `.task[data-index="${task.id}"] + .task-details`,
    );
    taskToDelete.remove();
    taskDetailsToDelete.remove();

    getActiveProject(document.querySelector(".content")).tasks.splice(index, 1);
  });

  let chevronIcon = document.createElement("i");
  chevronIcon.classList.add("bi", "bi-chevron-down");
  chevronIcon.addEventListener("click", () => {
    taskContent.classList.toggle("active");
    let content = document.querySelector(
      `.task[data-index="${task.id}"] + .task-details`,
    );
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });

  let taskPreview = document.createElement("div");
  taskPreview.classList.add("task-preview");

  let taskTitle = document.createElement("h3");
  taskTitle.textContent = task.title;
  let dueDate = document.createElement("p");
  dueDate.textContent = format(task.dueDate, "MM/dd/yyyy");

  taskStart.appendChild(taskTitle);
  taskStart.appendChild(dueDate);

  taskEnd.appendChild(chevronIcon);
  taskEnd.appendChild(trashIcon);

  taskPreview.appendChild(circleIcon);
  taskPreview.appendChild(taskStart);

  taskContent.appendChild(taskPreview);
  taskContent.appendChild(taskEnd);

  return [taskContent, taskDetails(task)];
}

function taskDetails(task) {
  let taskDetails = document.createElement("div");
  taskDetails.classList.add("task-details");

  let description = document.createElement("p");
  description.textContent = `Description: ${task.description}`;
  taskDetails.appendChild(description);

  let priorityElement = document.createElement("p");
  priorityElement.textContent = `Priority: ${priority[task.priority]}`;
  taskDetails.appendChild(priorityElement);

  return taskDetails;
}

function createNewTaskButton() {
  let button = document.createElement("button");
  button.classList.add("add-button");

  let buttonContent = document.createElement("p");
  buttonContent.textContent = "Add Task";

  let icon = document.createElement("i");
  icon.classList.add("bi", "bi-plus-lg");

  button.addEventListener("click", () => {
    addTask();
  });

  button.appendChild(icon);
  button.appendChild(buttonContent);

  return button;
}

export function getActiveProject(content) {
  return projectContainer.projects.find((project) =>
    isActiveProject(content, project),
  );
}

function isActiveProject(content, project) {
  let activeProject = content.querySelector("h1");

  return activeProject !== null && activeProject.textContent === project.name;
}

function handleTaskClick(task, taskInfo, icon) {
  if (task.done) {
    markTaskIncomplete(task, taskInfo, icon);
  } else {
    markTaskComplete(task, taskInfo, icon);
  }
}

function markTaskComplete(task, taskInfo, icon) {
  task.toggleComplete();
  taskInfo.classList.add("done");
  icon.classList.remove("bi-circle");
  icon.classList.add("bi-check-circle");
}

function markTaskIncomplete(task, taskInfo, icon) {
  task.toggleComplete();
  taskInfo.classList.remove("done");
  icon.classList.remove("bi-check-circle");
  icon.classList.add("bi-circle");
}

function addTask() {
  taskModal();
}
