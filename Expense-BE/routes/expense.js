const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const { createExpense, getAllExpense, updateExpense, deleteExpense } = require("../Controllers/expenseController");
const { verifyToken, verifyTokenAuthorization } = require("../Middlewares/verifyToken");



// ADD EXPENSE

router.post("/",verifyToken,createExpense )
   

// GET ALL EXPENSES

router.get("/",verifyTokenAuthorization,getAllExpense)

// UPDATE EXPENSE

router.put("/:id",updateExpense) 

// DELETE AN EXPENSE
router.delete("/:id",deleteExpense) 

module.exports = router;