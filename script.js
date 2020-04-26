var enterBtn = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var delBtn = document.querySelectorAll(".delete");
var clearBtn = document.getElementById("clearall");



function inputLength() {
	return input.value.length;
}

function createListElement() {
	var li = document.createElement("li");
	var delBtn = document.createElement("button");
	li.appendChild(document.createTextNode(input.value));
	delBtn.classList.add("delete");
	delBtn.appendChild(document.createTextNode('Delete'));
	ul.appendChild(li);
	li.appendChild(delBtn);
	input.value = "";
}

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}


function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

function completeTask(event) {
	var target = event.target;
	if (target.tagName === "LI") {
		target.classList.toggle("done");
	}
}

function deleteListItem(event) {
	var target = event.target;
	if (target.className === "delete") {
		target.parentNode.remove();
	}
}

function clearList() {
	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}
}
enterBtn.addEventListener("click", addListAfterClick);

clearBtn.addEventListener("click", clearList);

input.addEventListener("keypress", addListAfterKeypress);

ul.addEventListener("click", completeTask);
ul.addEventListener("click", deleteListItem);
