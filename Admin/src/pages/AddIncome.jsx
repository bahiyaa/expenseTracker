import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { publicRequest } from '../requestMethods';

const AddIncome = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        category: inputs.category,
        transactionDate: inputs.transactionDate,
        Amount: Number(inputs.amount),
        userId: "admin-user", // replace with real userId later
      };

      await publicRequest.post("/adminincome", payload);
      setInputs({});
      toast.success("Income successfully added!");
    } catch (error) {
      console.error("❌ Error creating income:", error.response?.data || error.message);
      toast.error("Failed to add Income. Please try again.");
    }
  };

  return (
    <div className="mx-4 sm:mx-6 md:mx-10 my-6 bg-card-bg p-6 sm:p-8 rounded-2xl shadow-card">
      <h2 className="text-lg sm:text-xl font-semibold text-primary mb-6">Add Income</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-text-muted mb-1">Income Source</label>
            <input
              type="text"
              placeholder="Freelancing"
              name="category"
              onChange={handleChange}
              value={inputs.category || ''}
              className="w-full border border-text-muted bg-background text-sm p-3 rounded-lg outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm text-text-muted mb-1">Amount</label>
            <input
              type="number"
              placeholder="₹600"
              name="amount"
              onChange={handleChange}
              value={inputs.amount || ''}
              className="w-full border border-text-muted bg-background text-sm p-3 rounded-lg outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm text-text-muted mb-1">Transaction Date</label>
            <input
              type="date"
              name="transactionDate"
              onChange={handleChange}
              value={inputs.transactionDate || ''}
              className="w-full border border-text-muted bg-background text-sm p-3 rounded-lg outline-none focus:border-primary"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto mt-4 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition"
          >
            Add Income
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddIncome;
