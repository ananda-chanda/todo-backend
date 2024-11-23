const express = require('express');
const Task = require('../models/task');
const router = express.Router();

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { task, isDone } = req.body;
    const newTask = new Task({ task, isDone });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update task by ID
router.put('/:id', async (req, res) => {
  try {
    const { task, isDone } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { task, isDone },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Mark all tasks as done
router.put('/mark-all-done', async (req, res) => {
  try {
    await Task.updateMany({}, { isDone: true });
    const updatedTasks = await Task.find();
    res.status(200).json(updatedTasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
