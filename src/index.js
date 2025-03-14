import "./styles.css"

import ProjectContainer from "./models/project-container";
import { sidebar } from "./sidebar";

let projectContainer = new ProjectContainer();

sidebar(projectContainer);

