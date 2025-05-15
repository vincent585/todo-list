import Project from "./project";
import Task from "./task";

export default class ProjectContainer {
    constructor() {
        this.projects = [new Project("Miscellaneous")];
        this.projects.at(0).addTask(new Task(
            "Task 1",
            "Task 1 description",
            new Date(2026, 0, 1),
            "High"
        ));
    }

    addProject(project) {
        this.projects.push(project);
    }
}