import "./styles.css";

import { renderSidebar } from "./sidebar";
import { renderTasks } from "./task-view";
import projectContainer from "./project-container-instance";

renderSidebar();
renderTasks(projectContainer.projects.at(0));
