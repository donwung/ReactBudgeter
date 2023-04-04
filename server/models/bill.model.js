const mongoose = require('mongoose');


const BillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, `{PATH} is required`],
            minlength: [2, `{PATH} must be at least {MINLENGTH} characters`],
        },
        amount: {
            type: Number,
            required: [true, `{PATH} is required`],
        }
    },
    { timestamps: true }
)

//register schema with mongoose
const Bill = mongoose.model('Bill', BillSchema)

module.exports = { Bill };