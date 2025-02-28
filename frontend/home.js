console.log("home.js loaded");
const API_URL = "http://localhost:3000/api/tasks";

document.addEventListener("DOMContentLoaded", () => {
  fetchTasks();
  document.getElementById("goToAdd").addEventListener("click", () => {
    window.open("add.html", "_blank");
  });
});

async function fetchTasks() {
  console.log("Fetching tasks from", API_URL);
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    console.log("Fetched tasks:", tasks);
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    if (tasks.length === 0) {
      list.innerHTML = "<li style='color: white;'>No Tasks Available.</li>";
    }
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.classList.add("task-item");

      // Container for task text (title and description)
      const textContainer = document.createElement("div");
      textContainer.classList.add("text-container");
      const titleDiv = document.createElement("div");
      titleDiv.innerHTML = task.content;
      if (task.completedTime !== null) {
        const doneSpan = document.createElement("span");
        doneSpan.textContent = ` - Done! ✓ (${task.completedTime} sec)`;
        titleDiv.appendChild(doneSpan);
      }
      textContainer.appendChild(titleDiv);
      if (task.description && task.description !== "") {
        const descDiv = document.createElement("div");
        descDiv.classList.add("task-description");
        descDiv.innerHTML = task.description;
        textContainer.appendChild(descDiv);
      }
      li.appendChild(textContainer);

      // Container for action buttons (aligned right)
      const btnContainer = document.createElement("div");
      btnContainer.classList.add("btn-container");

      // Start/Do It Again button
      const startBtn = document.createElement("button");
      if (task.completedTime === null) {
        startBtn.textContent = "Start!";
        startBtn.classList.add("home-start-btn");
      } else {
        startBtn.textContent = "Do It Again!";
        startBtn.classList.add("done-btn");
      }
      startBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.open(`task.html?id=${task.id}`, "_blank");
      });
      btnContainer.appendChild(startBtn);

      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteTask(task.id);
      });
      btnContainer.appendChild(deleteBtn);

      // Arrow buttons container
      const arrowContainer = document.createElement("div");
      arrowContainer.classList.add("arrow-container");

      const upButton = document.createElement("button");
      upButton.textContent = "↑";
      upButton.classList.add("move-btn");
      upButton.addEventListener("click", (e) => {
        e.stopPropagation();
        moveTask(task.id, "up");
      });
      arrowContainer.appendChild(upButton);

      const downButton = document.createElement("button");
      downButton.textContent = "↓";
      downButton.classList.add("move-btn");
      downButton.addEventListener("click", (e) => {
        e.stopPropagation();
        moveTask(task.id, "down");
      });
      arrowContainer.appendChild(downButton);

      btnContainer.appendChild(arrowContainer);
      li.appendChild(btnContainer);

      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

async function moveTask(id, direction) {
  try {
    const response = await fetch(`${API_URL}/move`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, direction })
    });
    if (response.ok) {
      fetchTasks();
    } else {
      alert("Error moving task");
    }
  } catch (error) {
    console.error("Error moving task:", error);
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    if (response.ok) {
      fetchTasks();
    } else {
      alert("Error deleting task");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}
