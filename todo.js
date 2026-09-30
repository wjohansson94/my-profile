const todoForm = document.querySelector("#todo-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const status = document.querySelector("#status");
const savedTasks = localStorage.getItem("profileTasks");
let tasks = savedTasks ? JSON.parse(savedTasks) : [];

tasks = tasks.map(function (task) {
  if (typeof task === "string") {
    return {
      text: task,
      completed: false
    };
  }

  return task;
});

function saveTasks() {
  localStorage.setItem("profileTasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (taskData, taskIndex) {
    const task = document.createElement("li");
    const taskContent = document.createElement("div");
    const checkbox = document.createElement("input");
    const taskLabel = document.createElement("span");
    const deleteButton = document.createElement("button");

    checkbox.type = "checkbox";
    checkbox.checked = taskData.completed;
    taskLabel.textContent = taskData.text;

    if (taskData.completed) {
      taskLabel.classList.add("completed");
    }

    checkbox.addEventListener("change", function () {
      taskData.completed = checkbox.checked;
      taskLabel.classList.toggle("completed", checkbox.checked);
      saveTasks();
      status.textContent = checkbox.checked
        ? "Task completed."
        : "Task marked incomplete.";
    });

    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      tasks.splice(taskIndex, 1);
      saveTasks();
      renderTasks();
      status.textContent = "Task deleted.";
    });

    taskContent.append(checkbox, taskLabel);
    task.append(taskContent, deleteButton);
    taskList.append(task);
  });
}

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText === "") {
    return;
  }

  tasks.push({
    text: taskText,
    completed: false
  });
  saveTasks();
  renderTasks();
  taskInput.value = "";
  status.textContent = "Task added.";
  taskInput.focus();
});

renderTasks();