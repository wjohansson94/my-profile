const todoForm = document.querySelector("#todo-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const status = document.querySelector("#status");

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText === "") {
    return;
  }

  const task = document.createElement("li");
  const taskLabel = document.createElement("span");
  const deleteButton = document.createElement("button");

  taskLabel.textContent = taskText;
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    task.remove();
    status.textContent = "Task deleted.";
  });

  task.append(taskLabel, deleteButton);
  taskList.append(task);
  taskInput.value = "";
  status.textContent = "Task added.";
  taskInput.focus();
});