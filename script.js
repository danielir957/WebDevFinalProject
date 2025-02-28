const API_URL = "https://webdevfinalproject-production.up.railway.app/api/tasks";

// Fetch tasks from the backend and update the list in the DOM
async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task;
      
      // Create a Delete button for each task
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.style.marginLeft = "10px";
      deleteButton.onclick = () => deleteTask(task);
      
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
}

// Add a new task by sending a POST request to the backend
async function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (!task) {
    return alert("Task cannot be empty!");
  }
  
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task })
    });
    
    if (response.ok) {
      alert("Task added!");
      taskInput.value = "";
      fetchTasks(); // Refresh the list
    } else {
      alert("Error adding task");
    }
  } catch (err) {
    console.error("Error adding task:", err);
  }
}

// Delete a task by sending a DELETE request to the backend
async function deleteTask(task) {
  try {
    const response = await fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task })
    });
    
    if (response.ok) {
      alert("Task deleted!");
      fetchTasks(); // Refresh the list
    } else {
      alert("Error deleting task");
    }
  } catch (err) {
    console.error("Error deleting task:", err);
  }
}

document.addEventListener("DOMContentLoaded", fetchTasks);
