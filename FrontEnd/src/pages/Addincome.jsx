import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { userRequest } from "../requestMethod";
import { publicRequest } from "../requestMethod";
import { Link } from 'react-router-dom';
const AddIncome = () => {
  const [inputs, setInputs] = useState({})

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };


  const handleSubmit = async () => {
    try {
      const tokenUser = JSON.parse(localStorage.getItem("user"));
  
      if (!tokenUser?.accessToken) {
        toast.error("Please login again.");
        return;
      }
  
      const payload = {
        ...inputs,
      };
  
      await userRequest.post("/userincome", payload, {
        headers: { Authorization: `Bearer ${tokenUser.accessToken}` },
      });
  
      setInputs({});
      toast.success("Income successfully added!");
    } catch (error) {
      console.error("Failed to add income:", error.response?.data || error);
      toast.error("Failed to add income. Please try again.");
    }
  };
  
  


  return (
    <div className="m-8 bg-card-bg p-8 rounded-2xl shadow-card font-sans">
      <h2 className="font-heading text-2xl font-semibold text-text-main mb-6 ml-4">
        Add Income
      </h2>

      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="ml-4">
          <div className="flex flex-col my-4">
            <label className="text-text-main font-medium mb-2">Income Source</label>
            <input
              type="text"
              placeholder="Dining"
              name="category"
              onChange={handleChange}
              value={inputs.category || ""}
              className="border border-text-muted rounded-xl p-3 w-60 focus:outline-none focus:ring-2 focus:ring-primary-accent"
            />
          </div>

          <div className="flex flex-col my-4">
            <label className="text-text-main font-medium mb-2">Amount</label>
            <input
              type="text"
              placeholder="₹600"
              name="Amount"
              onChange={handleChange}
              value={inputs.Amount || ""}
              className="border border-text-muted rounded-xl p-3 w-60 focus:outline-none focus:ring-2 focus:ring-primary-accent"
            />
          </div>

          <div className="flex flex-col my-4">
            <label className="text-text-main font-medium mb-2">Date</label>
            <input
              type="date"
              name="transactionDate"
              onChange={handleChange}
              value={inputs.transactionDate || ""}
              className="border border-text-muted rounded-xl p-3 w-60 focus:outline-none focus:ring-2 focus:ring-primary-accent"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-accent transition-all duration-200"
              onClick={handleSubmit}
            >
              Add Income
            </button>

            <Link to="/income">
              <button className="bg-secondary-accent text-text-main px-4 py-2 rounded-xl hover:bg-secondary transition-all duration-200">
                Go Back
              </button>
            </Link>
          </div>

          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default AddIncome