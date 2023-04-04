const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            required: [true, `{PATH} is required`],
            minlength: [2, `{PATH} must be at least {MINLENGTH} characters`],
        },
        description: {
            type: String,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

//register schema with mongoose
const Task = mongoose.model('Task', TaskSchema)

module.exports = { Task };