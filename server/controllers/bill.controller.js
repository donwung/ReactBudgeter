const { Bill } = require('../models/bill.model');


//then/catch will run code and get a response later
const handleCreateBill = async (req, res) => {
    try {
        const newBill = await Bill.create(req.body);
        return res.json(newBill);
    } catch (err) {
        return res.status(400).json(err);
    }
}

//async/await will pause code and continue when a return is received
const getAllBills = async (req, res) => {
    //attempt to run this code
    try {
        //await pauses operation until a return occurs
        const bills = await Bill.find(); //the first line of code in .then/.catch functions 
        return res.json(bills); //the rest of .then
        //catch err if any
    } catch (err) {
        return res.status(400).json(err);
    }

}

const getBillById = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);
        return res.json(bill);
    } catch (err) {
        return res.status(400).json(err);
    }

}

const deleteBillById = async (req, res) => {
    try {
        const deletedBill = await Bill.findByIdAndDelete(req.params.id);
        return res.json(deletedBill);
    } catch (err) {
        return res.status(400).json(err);
    }

}

const updateBillById = async (req, res) => {
    try {
        const updatedBill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
        });
        return res.json(updatedBill);
    } catch (err) {
        return res.status(400).json(err);
    }
}

module.exports = {
    handleCreateBill,
    getAllBills,
    getBillById,
    deleteBillById,
    updateBillById,
}