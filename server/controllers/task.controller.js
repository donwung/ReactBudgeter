const { Task } = require('../models/task.model');


//then/catch will run code and get a response later
const handleCreateTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        return res.json(newTask);
    } catch (err) {
        return res.status(400).json(err);
    }
}

//async/await will pause code and continue when a return is received
const getAllTasks = async (req, res) => {
    //attempt to run this code
    try {
        //await pauses operation until a return occurs
        const tasks = await Task.find(); //the first line of code in .then/.catch functions 
        return res.json(tasks); //the rest of .then
        //catch err if any
    } catch (err) {
        return res.status(400).json(err);
    }

}

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        return res.json(task);
    } catch (err) {
        return res.status(400).json(err);
    }

}

const deleteTaskById = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        return res.json(deletedTask);
    } catch (err) {
        return res.status(400).json(err);
    }

}

const updateTaskById = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
        });
        return res.json(updatedTask);
    } catch (err) {
        return res.status(400).json(err);
    }
}

module.exports = {
    handleCreateTask,
    getAllTasks,
    getTaskById,
    deleteTaskById,
    updateTaskById,
}