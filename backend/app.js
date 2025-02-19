const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const tasksRouter = require("./routes/tasks");
app.use("/api/tasks", tasksRouter);

app.get("/", (req, res) => {
    res.send("Express Server Running!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
