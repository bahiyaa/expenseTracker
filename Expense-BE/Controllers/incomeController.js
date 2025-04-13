const Income = require("../models/Income");

const createIncome = async (req, res) => {
  try {
    const newIncome = new Income({
      category: req.body.category,
      transactionDate: req.body.transactionDate,
      Amount: req.body.Amount,
      userId: req.body.userId,
    });

    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome);
  } catch (error) {
    console.error("❌ Error creating income:", error);
    res.status(500).json({ message: error.message });
  }
};


// GET ALL INCOME
const getAllIncome = async (req, res) => {
  try {
    const incomeList = await Income.find();
    res.status(200).json(incomeList);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch income", error: err });
  }
};

// GET INCOME BY ID
const getIncomeById = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) return res.status(404).json({ message: "Income not found" });
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving income", error: err });
  }
};

// UPDATE INCOME
const updateIncome = async (req, res) => {
  try {
    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedIncome);
  } catch (err) {
    res.status(500).json({ message: "Failed to update income", error: err });
  }
};

// DELETE INCOME
const deleteIncome = async (req, res) => {
  try {
    // Find the income by ID (no need to check for userId since admin can delete any record)
    const income = await Income.findById(req.params.id);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    // Delete the income record
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting income", error: err });
  }
};

module.exports = {
  createIncome,
  getAllIncome,
  getIncomeById,
  updateIncome,
  deleteIncome,
};
