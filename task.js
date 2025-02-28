const API_URL = "https://webdevfinalproject-production.up.railway.app/api/tasks";
const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get("id");

let timerInterval;
let secondsElapsed = 0;
const timerButton = document.getElementById("timerButton");
const timerDisplay = document.getElementById("timerDisplay");
const taskContentElem = document.getElementById("taskContent");
const taskDescriptionElem = document.getElementById("taskDescription");

async function fetchTask() {
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      taskContentElem.textContent = task.content;
      taskDescriptionElem.textContent = task.description || "";
    } else {
      taskContentElem.textContent = "Task not found";
      taskDescriptionElem.textContent = "";
    }
  } catch (error) {
    console.error("Error fetching task:", error);
  }
}

fetchTask();

function startTimer() {
  timerButton.textContent = "Done!";
  timerButton.classList.remove("timer-start-btn");
  timerButton.classList.add("done-btn");
  // Show the buffer element only when timer starts
  document.getElementById("buffer").style.display = "block";
  timerInterval = setInterval(() => {
    secondsElapsed++;
    timerDisplay.textContent = secondsElapsed.toString().padStart(2, '0') + " seconds";
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  // Hide the buffer element when timer stops
  document.getElementById("buffer").style.display = "none";
  completeTask();
}

async function completeTask() {
  try {
    const response = await fetch(`${API_URL}/complete`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: taskId, time: secondsElapsed })
    });
    if (response.ok) {
      alert(`Task completed in ${secondsElapsed} seconds`);
      if (window.opener && !window.opener.closed) {
        window.opener.location.reload();
      }
      setTimeout(() => {
        window.close();
      }, 500);
    } else {
      alert("Error completing task");
    }
  } catch (error) {
    console.error("Error completing task:", error);
  }
}

timerButton.addEventListener("click", () => {
  if (timerButton.textContent === "Start!") {
    startTimer();
  } else if (timerButton.textContent === "Done!") {
    stopTimer();
    timerButton.disabled = true;
  }
});
