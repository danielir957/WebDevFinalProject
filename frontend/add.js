console.log("add.js loaded");
const API_URL = "http://localhost:3000/api/tasks";

document.getElementById("addTaskButton").addEventListener("click", async () => {
  const taskInput = document.getElementById("newTaskInput");
  const descInput = document.getElementById("newTaskDescription");
  const taskContent = taskInput.value.trim();
  const description = descInput.value.trim();
  console.log("Add Task Button clicked, taskContent:", taskContent, "description:", description);
  if (!taskContent) {
    alert("Task cannot be empty!");
    return;
  }
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: taskContent, description })
    });
    if (response.ok) {
      console.log("Task added successfully");
      if (window.opener && !window.opener.closed) {
          window.opener.location.reload();
      }
      window.close();
    } else {
      console.error("Error adding task, response not OK:", response);
      alert("Error adding task");
    }
  } catch (error) {
    console.error("Error adding task:", error);
  }
});
