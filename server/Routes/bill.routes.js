const express = require('express');

const {
    handleCreateBill,
    getAllBills,
    getBillById,
    deleteBillById,
    updateBillById,
} = require('../controllers/bill.controller');

const router = express.Router();

router.post('/', handleCreateBill);
router.get('/', getAllBills);
router.get('/:id', getBillById);
router.delete('/:id', deleteBillById);
router.put('/:id', updateBillById);

module.exports = {
    billRouter: router
} 