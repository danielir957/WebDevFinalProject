const API_URL = "http://localhost:3000/api/tasks";
const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get("id");

let timerInterval;
let secondsElapsed = 0;
const timerButton = document.getElementById("timerButton");
const timerDisplay = document.getElementById("timerDisplay");
const taskContentElem = document.getElementById("taskContent");

async function fetchTask() {
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      taskContentElem.textContent = task.content;
    } else {
      taskContentElem.textContent = "Task not found";
    }
  } catch (error) {
    console.error("Error fetching task:", error);
  }
}

fetchTask();

function startTimer() {
  timerButton.textContent = "Done!";
  // Switch button from yellow to green (done state)
  timerButton.classList.remove("timer-start-btn");
  timerButton.classList.add("done-btn");
  timerInterval = setInterval(() => {
    secondsElapsed++;
    timerDisplay.textContent = `${secondsElapsed} seconds`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
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
