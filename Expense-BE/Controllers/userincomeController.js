// controllers/userincomeController.js
const Income = require("../models/Income");

// CREATE income for a specific user
const createUserIncome = async (req, res) => {
  try {
    const newIncome = new Income({
      ...req.body,
      userId: req.user.id, // taken from token payload
    });

    const savedIncome = await newIncome.save();
    res.status(201).json(savedIncome);
  } catch (err) {
    res.status(500).json({ message: "Failed to add income", error: err });
  }
};

// GET all income for a specific user
const getUserIncome = async (req, res) => {
  try {
    const incomeList = await Income.find({ userId: req.user.id });
    res.status(200).json(incomeList);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch income", error: err });
  }
};
const updateUserIncome = async (req, res) => {
    try {
      const updatedIncome = await Income.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id }, // Match income by ID and current user
        req.body,
        { new: true }
      );
  
      if (!updatedIncome) {
        return res.status(403).json({ message: "Unauthorized to update this income." });
      }
  
      res.status(200).json(updatedIncome);
    } catch (err) {
      res.status(500).json({ message: "Failed to update income", error: err });
    }
  };
  const deleteUserIncome = async (req, res) => {
    try {
      // Find the income by ID and check if it belongs to the user
      const income = await Income.findOne({ _id: req.params.id, userId: req.user.id });
      if (!income) {
        return res.status(404).json({ message: "Income not found or unauthorized" });
      }
  
      // Delete the income record
      await Income.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Income deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting income", error: err });
    }
  };
  

module.exports = {
  createUserIncome,
  getUserIncome,updateUserIncome,deleteUserIncome
};
