require('dotenv').config(); // Load environment variables from .env

const express = require("express");
const router = express.Router();
const redis = require("redis");
const { v4: uuidv4 } = require("uuid");

// Create Redis client using only environment variables (no fallback defaults)
const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD
});

client.on("error", err => console.error("Redis Client Error", err));

(async () => {
  try {
    await client.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Redis connection error:", err);
  }
})();

// Helper function: Get tasks from Redis and parse each as JSON
async function getTasks() {
  try {
    const tasksData = await client.lRange("tasks", 0, -1);
    console.log("Tasks data from Redis:", tasksData);
    const tasks = tasksData.map(item => {
      try {
        return JSON.parse(item);
      } catch (err) {
        console.error("Failed to parse task item:", item, err);
        throw err;
      }
    });
    return tasks;
  } catch (err) {
    console.error("Error in getTasks:", err);
    throw err;
  }
}

// Helper function: Save tasks (array of objects) back to Redis
async function saveTasks(tasks) {
  await client.del("tasks");
  for (const task of tasks) {
    await client.rPush("tasks", JSON.stringify(task));
  }
}

// GET /api/tasks - Retrieve all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (err) {
    console.error("GET /api/tasks error:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST /api/tasks - Add a new task (accepts an optional description)
router.post("/", async (req, res) => {
  try {
    const { task, description } = req.body;
    if (!task) {
      return res.status(400).json({ error: "Task content is required" });
    }
    const newTask = {
      id: uuidv4(),
      content: task,
      description: description ? description : "",
      completedTime: null
    };
    await client.rPush("tasks", JSON.stringify(newTask));
    const tasks = await getTasks();
    res.json({ message: "Task added", tasks });
  } catch (err) {
    console.error("POST /api/tasks error:", err);
    res.status(500).json({ error: "Failed to add task" });
  }
});

// PUT /api/tasks/move - Move a task up or down
router.put("/move", async (req, res) => {
  try {
    const { id, direction } = req.body;
    let tasks = await getTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Task not found" });
    }
    let newIndex = index;
    if (direction === "up" && index > 0) {
      newIndex = index - 1;
    } else if (direction === "down" && index < tasks.length - 1) {
      newIndex = index + 1;
    }
    const [movedTask] = tasks.splice(index, 1);
    tasks.splice(newIndex, 0, movedTask);
    await saveTasks(tasks);
    res.json({ message: "Task moved", tasks });
  } catch (err) {
    console.error("PUT /api/tasks/move error:", err);
    res.status(500).json({ error: "Failed to move task" });
  }
});

// PUT /api/tasks/complete - Mark a task as complete with its timer value
router.put("/complete", async (req, res) => {
  try {
    const { id, time } = req.body;
    let tasks = await getTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Task not found" });
    }
    tasks[index].completedTime = time;
    await saveTasks(tasks);
    res.json({ message: "Task completed", tasks });
  } catch (err) {
    console.error("PUT /api/tasks/complete error:", err);
    res.status(500).json({ error: "Failed to complete task" });
  }
});

// DELETE /api/tasks/flush - Temporary endpoint to flush tasks (for debugging)
router.delete("/flush", async (req, res) => {
  try {
    await client.del("tasks");
    res.json({ message: "Tasks flushed" });
  } catch (err) {
    console.error("DELETE /api/tasks/flush error:", err);
    res.status(500).json({ error: "Failed to flush tasks" });
  }
});

// DELETE /api/tasks/:id - Delete a specific task by id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let tasks = await getTasks();
    const newTasks = tasks.filter(t => t.id !== id);
    await saveTasks(newTasks);
    res.json({ message: "Task deleted", tasks: newTasks });
  } catch (err) {
    console.error("DELETE /api/tasks/:id error:", err);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
