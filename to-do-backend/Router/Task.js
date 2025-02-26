// Task Router
const router = require("express").Router();
const Task = require("../models/Task");
const User = require("../models/User");
const { authenticateToken } = require("../Auth/Auth");

// Create Task Route
const mongoose = require("mongoose");

router.post("/createTask", authenticateToken, async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.headers;

    // Validate input
    if (!title || !desc) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Valid user ID is required." });
    }

    // Create and save the task
    const newTask = new Task({ title: title, desc: desc });
    const savedTask = await newTask.save();
    const taskId = savedTask._id;

    // Push the task ID to the user's tasks array
    await User.findByIdAndUpdate(id, { $push: { tasks: taskId } });

    return res.status(200).json({ message: "Task added successfully." });
  } catch (error) {
    console.error("Error:", error.message);

    return res.status(500).json({
      message: "An error occurred while creating the task.",
      error: error.message,
    });
  }
});

router.get("/getAllTasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ message: "task found succesful", data: userData });
  } catch (error) {
    res.status(500).json({ message: "an error in getting tasks" });
  }
});

router.delete("/deleteTaskbyId/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers.id;
    await Task.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
    res.status(200).json({ message: "task deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: "an error in deleting tasks" });
  }
});

router.put("/UpdateTaskbyId/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    await Task.findByIdAndUpdate(id, { title: title, desc: desc });

    res.status(200).json({ message: "task updated succesfully" });
  } catch (error) {
    res.status(500).json({ message: "an error in updating tasks" });
  }
});

router.put(
  "/updateImportantTaskbyId/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Find the task by ID
      const taskData = await Task.findById(id);
      if (!taskData) {
        return res.status(404).json({ message: "Task not found" }); // Handle case where task does not exist
      }

      // Toggle the important status
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { important: !taskData.important },
        { new: true } // Return the updated document
      );

      res.status(200).json({
        message: "Important task updated successfully",
        task: updatedTask,
      });
    } catch (error) {
      console.error("Error updating important status:", error); // Log the error for debugging
      res
        .status(500)
        .json({ message: "An error occurred while updating the task" });
    }
  }
);
router.put(
  "/UpdateCompleteTaskbyId/:id",
  authenticateToken,
  async (req, res) => {
    const id = req.params.id; // Get the ID from the request parameters
    try {
      const taskData = await Task.findById(id);
      if (!taskData) {
        return res.status(404).json({ message: "Task not found" }); // Handle case where task does not exist
      }

      const completeTask = taskData.complete;
      await Task.findByIdAndUpdate(id, { complete: !completeTask });
      res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
      console.error("Error updating task:", error); // Log the error for debugging
      res
        .status(500)
        .json({ message: "An error occurred while updating the task" });
    }
  }
);

router.get("/getimpTasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });
    const impTaskData = Data.tasks;
    res.status(200).json({ message: "important task data", data: impTaskData });
  } catch (error) {
    res.status(500).json({ message: "an error in imp tasks data" });
  }
});

router.get("/getcompTasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: true },
      options: { sort: { createdAt: -1 } },
    });
    const completeTaskData = Data.tasks;
    res
      .status(200)
      .json({ message: "important task data", data: completeTaskData });
  } catch (error) {
    res.status(500).json({ message: "an error in complete tasks data" });
  }
});

router.get("/getIncompTasks", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await User.findById(id).populate({
      path: "tasks",
      match: { complete: false },
      options: { sort: { createdAt: -1 } },
    });
    const incompleteTaskData = Data.tasks;
    res
      .status(200)
      .json({ message: "important task data", data: incompleteTaskData });
  } catch (error) {
    res.status(500).json({ message: "an error in complete tasks data" });
  }
});
module.exports = router;
