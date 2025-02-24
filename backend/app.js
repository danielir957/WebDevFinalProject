const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve frontend static files (if you want to serve them via Express)
app.use(express.static(path.join(__dirname, "../frontend")));

// You can choose to have a default route that sends the home page:
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/home.html"));
});

// Import and use the tasks router
const tasksRouter = require("./routes/tasks");
app.use("/api/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
