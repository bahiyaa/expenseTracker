const dotenv = require("dotenv");
const sendMail = require("../helpers/sendmail");
const Expense = require("../models/Expense");
dotenv.config();

const expenseEmail = async () => {
    const expenses = await Expense.find();

    const totalExpense = expenses.reduce(
        (acc, expense) => acc + expense.value, 0
        // acc accumulation
    )
    if (totalExpense > 10000) {
        let messageOption = {
            from: process.env.EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: "Warning",
            text: `Your Total expense is${totalExpense}, please rewiew your expense`
        };

        await sendMail(messageOption);
    }
};

module.exports= expenseEmail;
