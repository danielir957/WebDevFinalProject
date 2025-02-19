const express = require("express");
const path = require("path");
const tasksRouter = require("./routes/tasks");
const redis = require("redis");

const app = express();
const port = 3000;

// יצירת חיבור ל-Redis
const redisClient = redis.createClient({ url: "redis://localhost:6379" });

redisClient.connect().catch(console.error);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// שימוש בראוטר לניהול המשימות
app.use("/tasks", tasksRouter(redisClient));

app.get("/", async (req, res) => {
  const tasks = await redisClient.lRange("tasks", 0, -1);
  res.render("index", { tasks });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
