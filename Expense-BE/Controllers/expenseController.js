const Expense = require('../models/Expense');

// Create an expense
const createExpense = async (req, res) => {
    try {
        const newExpense = Expense(req.body);
        const expense = await newExpense.save();
        res.status(201).json(expense)

    } catch (error) {
        res.status(500).json(error)

    }
}

// Get all Expense

const getAllExpense = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);


    } catch (error) {
        res.status(500).json(error)

    }

}
// update the expense
const updateExpense = async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(500).json({ message: "Failed to update income", error: err });
  }
};

// Get one Expense
const getOneExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        res.status(200).json(expense)

    } catch (error) {
        res.status(500).json(error)
    }
}

// Delete expense
const deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);

        res.status(201).json({ message: "Expense has been deleted!" });
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { deleteExpense, getOneExpense, updateExpense, getAllExpense, createExpense }


