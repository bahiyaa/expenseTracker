// controllers/userExpenseController.js
const Expense = require("../models/Expense");

const createUserExpense = async (req, res) => {
  try {
    const newExpense = new Expense({
      ...req.body,
      userId: req.user.id,
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(500).json({ message: "Failed to add expense", error: err });
  }
};

const getUserExpense = async (req, res) => {
  try {
    const expenseList = await Expense.find({ userId: req.user.id });
    res.status(200).json(expenseList);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch expense", error: err });
  }
};

module.exports = {
  createUserExpense,
  getUserExpense,
};
