import Project from "./project";

export default class ProjectContainer {
    constructor() {
        this.projects = [new Project("Miscellaneous")];
    }

    addProject(project) {
        this.projects.push(project);
    }
}