export default class Task {
    constructor(title, description, dueDate, priority) {
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