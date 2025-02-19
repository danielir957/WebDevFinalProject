import express from 'express';

export default (client) => {
  const router = express.Router();

  // Route to add a new task
  router.post('/add', async (req, res) => {
    const { task } = req.body;
    if (task) {
      await client.rPush('tasks', task); // Add task to Redis list
    }
    res.redirect('/');
  });

  // Route to delete a task by index
  router.post('/delete', async (req, res) => {
    const { index } = req.body;
    const tasks = await client.lRange('tasks', 0, -1); // Get all tasks from Redis
    if (tasks[index]) {
      await client.lRem('tasks', 1, tasks[index]); // Remove the task from Redis
    }
    res.redirect('/');
  });

  return router;
};
