const Income = require('../models/Income');

// Create an income
const createIncome = async (req, res) => {
    try {
        const newIncome = Income(req.body);
        const income = await newIncome.save();
        res.status(201).json(income);

    } catch (error) {
        res.status(500).json(error)

    }
}

// Get all Income

const getAllIncome = async (req, res) => {
    try {
        const incomes = await Income.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);


    } catch (error) {
        res.status(500).json(error)

    }

}
// update the Income
const updateIncome = async (req, res) => {
    try {
        const income = await Income.findById(req.params.id);
        res.status(201).json(income)

    } catch (error) {
        res.status(500).json(error)
    }
}

// Get one Income
const getOneIncome = async (req, res) => {
    try {
        const income = await Income.findById(req.params.id);
        res.status(200).json(income)

    } catch (error) {
        res.status(500).json(error)
    }
}

// Delete Income
const deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);

        res.status(201).json({ message: "Income has been deleted!" });
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { deleteIncome, getOneIncome, updateIncome, getAllIncome,createIncome}


