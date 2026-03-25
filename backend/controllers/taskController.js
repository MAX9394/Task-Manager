const mongoose = require('mongoose');
const Task = require('../models/Task');

function errorStatus(err) {
  if (err.name === 'CastError' || err.name === 'ValidationError') return 400;
  return 500;
}

// GET /api/tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/tasks/:id
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(errorStatus(err)).json({ error: err.name === 'CastError' ? 'Invalid task ID' : 'Server error' });
  }
};

// POST /api/tasks
const createTask = async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || false
    });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(errorStatus(err)).json({ error: err.name === 'ValidationError' ? err.message : 'Server error' });
  }
};

// PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, description: req.body.description, status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(errorStatus(err)).json({ error: err.name === 'CastError' ? 'Invalid task ID' : err.name === 'ValidationError' ? err.message : 'Server error' });
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(errorStatus(err)).json({ error: err.name === 'CastError' ? 'Invalid task ID' : 'Server error' });
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
