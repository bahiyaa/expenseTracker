// const express = require("express");
// const router = express.Router();
// const { createExpense, getAllExpense, updateExpense, deleteExpense } = require("../Controllers/expenseController");
// const { verifyToken, verifyTokenAuthorization } = require("../Middlewares/verifyToken");



// // ADD EXPENSE

// router.post("/",verifyToken,createExpense)
   

// // GET ALL EXPENSES

// router.get("/",verifyToken,getAllExpense)

// // UPDATE EXPENSE

// router.put("/:id",updateExpense) 

// // DELETE AN EXPENSE
// router.delete("/:id",deleteExpense) 

// module.exports = router;

const router = require("express").Router();
const {
    deleteExpense, getOneExpense, updateExpense, getAllExpense, createExpense
} = require("../Controllers/expenseController");

router.post("/", createExpense);
router.get("/", getAllExpense);
router.get("/:id", getOneExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
