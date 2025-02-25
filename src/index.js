import "./styles.css"

import Project from "./models/project";
import Task from "./models/task";

let project = new Project("First Project");
let task = new Task(
    "My new task",
    "Test task",
    "2025-02-25",
    "URGENT"
);