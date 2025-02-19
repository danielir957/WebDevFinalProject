const express = require("express");

module.exports = (redisClient) => {
  const router = express.Router();

  // הוספת משימה חדשה
  router.post("/add", async (req, res) => {
    const { task } = req.body;
    if (task) {
      await redisClient.rPush("tasks", task);
    }
    res.redirect("/");
  });

  // מחיקת משימה לפי אינדקס
  router.post("/delete", async (req, res) => {
    const { index } = req.body;
    const tasks = await redisClient.lRange("tasks", 0, -1);
    if (tasks[index]) {
      await redisClient.lRem("tasks", 1, tasks[index]);
    }
    res.redirect("/");
  });

  return router;
};
