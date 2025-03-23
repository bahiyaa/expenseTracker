const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const { createExpense, getAllExpense, updateExpense, deleteExpense } = require("../Controllers/expenseController");


// ADD EXPENSE

router.post("/",createExpense )
   

// GET ALL EXPENSES

router.get("/",getAllExpense)

// UPDATE EXPENSE

router.put("/:id",updateExpense) 

// DELETE AN EXPENSE
router.delete("/:id",deleteExpense) 

module.exports = router;