console.log("add.js loaded");
const API_URL = "http://localhost:3000/api/tasks";

document.getElementById("addTaskButton").addEventListener("click", async () => {
  const input = document.getElementById("newTaskInput");
  const taskContent = input.value.trim();
  console.log("Add Task Button clicked, taskContent:", taskContent);
  if (!taskContent) {
    alert("Task cannot be empty!");
    return;
  }
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: taskContent })
    });
    if (response.ok) {
      console.log("Task added successfully");
      window.location.href = "tasks.html";
    } else {
      console.error("Error adding task, response not OK:", response);
      alert("Error adding task");
    }
  } catch (error) {
    console.error("Error adding task:", error);
  }
});
