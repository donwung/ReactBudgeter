const express = require('express');

const {
    handleCreateTask,
    getAllTasks,
    getTaskById,
    deleteTaskById,
    updateTaskById,
} = require('../controllers/task.controller');

const router = express.Router();

router.post('/', handleCreateTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.delete('/:id', deleteTaskById);
router.put('/:id', updateTaskById);

module.exports = {
    taskRouter: router
} 