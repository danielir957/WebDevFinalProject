const express = require("express");
const router = express.Router();

let tasks = []; // Temporary storage (use a database in production)

router.get("/", (req, res) => {
    res.json(tasks);
});

router.post("/", (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: "Task content is required" });
    }
    tasks.push(task);
    res.json({ message: "Task added", tasks });
});

module.exports = router;
