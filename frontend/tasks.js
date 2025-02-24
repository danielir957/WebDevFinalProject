console.log("tasks.js loaded");
const API_URL = "http://localhost:3000/api/tasks";

document.addEventListener("DOMContentLoaded", () => {
  fetchTasks();
  document.getElementById("goToAdd").addEventListener("click", () => {
    window.location.href = "add.html";
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
      list.innerHTML = "<li>No tasks available.</li>";
    }
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.classList.add("task-item");

      // Display task content with "- Done! ✓ (time sec)" if completed
      const contentSpan = document.createElement("span");
      if (task.completedTime !== null) {
        contentSpan.textContent = `${task.content} - Done! ✓ (${task.completedTime} sec)`;
      } else {
        contentSpan.textContent = task.content;
      }
      li.appendChild(contentSpan);

      // Container for action buttons
      const btnContainer = document.createElement("div");
      btnContainer.classList.add("btn-container");

      // Start/Do It Again button:
      // If incomplete, yellow "Start!"; if completed, green "Do It Again!"
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

      // Arrow buttons container (grouped closely)
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
