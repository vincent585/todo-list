class Task {
    get notes() {
        return this._notes;
    }

    set notes(value) {
        this._notes = value;
    }
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this._notes = "";
        this.checklist = [];
        this.done = false;
    }

    addChecklistItem(item) {
        this.checklist.push(item);
    }

    markComplete() {
        this.done = true;
    }
}