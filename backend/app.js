const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const tasksRouter = require("./routes/tasks");
app.use("/api/tasks", tasksRouter);

// Remove any previous GET "/" route.
// This route redirects to /api/tasks so that the JSON data is displayed.
app.get("/", (req, res) => {
  res.redirect("/api/tasks");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
