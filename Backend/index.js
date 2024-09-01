const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
// mongoose.connect("mongodb://localhost:27017/todoapp", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose
    .connect("mongodb://127.0.0.1:27017/todoapp")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Define a schema and model for tasks
const taskSchema = new mongoose.Schema({
    text: String,
    completed: {
        type: Boolean,
        default: false,
    },
});

const Task = mongoose.model("Task", taskSchema);

// Routes
app.get("/hi", (req, res) => {
    return res.send("hi");
});
app.get("/tasks", async(req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/tasks", async(req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/tasks/:id", async(req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/tasks/:id", async(req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});