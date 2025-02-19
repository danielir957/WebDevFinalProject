const API_URL = "https://your-backend-url.onrender.com/api/tasks"; // Change this to your deployed backend URL

async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        taskList.appendChild(li);
    });
}

async function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();
    if (!task) return alert("Task cannot be empty!");

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
    });

    if (response.ok) {
        alert("Task added!");
        taskInput.value = "";
    } else {
        alert("Error adding task");
    }
}

document.addEventListener("DOMContentLoaded", fetchTasks);
