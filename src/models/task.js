export default class Task {
  constructor(title, description, dueDate, priority) {
    this.id = incrementId();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = [];
    this.done = false;
  }

  addChecklistItem(item) {
    this.checklist.push(item);
  }

  toggleComplete() {
    this.done = !this.done;
  }
}

let id = 0;
function incrementId() {
  return id++;
}
