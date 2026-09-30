const todoForm = document.querySelector("#todo-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const status = document.querySelector("#status");
const savedTasks = localStorage.getItem("profileTasks");
let tasks = savedTasks ? JSON.parse(savedTasks) : [];

function saveTasks() {
  localStorage.setItem("profileTasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (taskText, taskIndex) {
    const task = document.createElement("li");
    const taskLabel = document.createElement("span");
    const deleteButton = document.createElement("button");

    taskLabel.textContent = taskText;
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      tasks.splice(taskIndex, 1);
      saveTasks();
      renderTasks();
      status.textContent = "Task deleted.";
    });

    task.append(taskLabel, deleteButton);
    taskList.append(task);
  });
}

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText === "") {
    return;
  }

  tasks.push(taskText);
  saveTasks();
  renderTasks();
  taskInput.value = "";
  status.textContent = "Task added.";
  taskInput.focus();
});

renderTasks();