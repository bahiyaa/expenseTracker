import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../requestMethods';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateExpense = () => {
  const [inputs, setInputs] = useState({
    category: '',
    Amount: '',
    transactionDate: '',
    userId: '',
  });

  const location = useLocation();
  const expenseId = location.pathname.split('/')[2];

  useEffect(() => {
    const getExpense = async () => {
      try {
        const res = await publicRequest.get(`/adminexpense/${expenseId}`);
        const data = res.data;

        setInputs({
          category: data.category || '',
          Amount: data.Amount || '',
          transactionDate: data.transactionDate?.split('T')[0] || '',
          userId: data.userId || '',
        });
      } catch (error) {
        console.error('❌ Error fetching expense:', error);
        toast.error('Failed to load expense data');
      }
    };

    getExpense();
  }, [expenseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        category: inputs.category,
        Amount: Number(inputs.Amount),
        transactionDate: inputs.transactionDate,
        userId: inputs.userId,
      };

      await publicRequest.put(`/adminexpense/${expenseId}`, updatedData);
      toast.success('✅ Expense successfully updated!');
    } catch (error) {
      console.error('❌ Error updating expense:', error);
      toast.error('Failed to update expense');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-card-bg p-8 rounded-2xl shadow-card">
      <h2 className="text-2xl font-heading text-text-main mb-6">Update Expense</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="mb-1 text-text-muted font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={inputs.category}
            onChange={handleChange}
            className="p-3 rounded-xl border border-secondary-accent bg-background text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-text-muted font-medium">Amount</label>
          <input
            type="number"
            name="Amount"
            value={inputs.Amount}
            onChange={handleChange}
            className="p-3 rounded-xl border border-secondary-accent bg-background text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-text-muted font-medium">Date</label>
          <input
            type="date"
            name="transactionDate"
            value={inputs.transactionDate}
            onChange={handleChange}
            className="p-3 rounded-xl border border-secondary-accent bg-background text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <button
        onClick={handleUpdate}
        className="mt-8 bg-primary hover:bg-primary-accent text-white px-6 py-3 rounded-xl font-medium transition duration-200"
      >
        Update
      </button>

      <ToastContainer />
    </div>
  );
};

export default UpdateExpense;
