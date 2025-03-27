import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../requestMethods';
import axios from 'axios';



const UpdateIncome = () => {
  const [incomes, setIncome] = useState({});
  const location = useLocation();
  const incomeId = location.pathname.split("/")[2];
  const [inputs, setInputs] = useState({
    category: "",  // Initialize to avoid "undefined" errors
  });

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await axios.get("http://localhost:5000/v1/income"); // Adjust API if needed
        console.log("Fetched Data:", res.data);

        // Ensure correct format (if API returns an array, take first item)
        const incomeData = Array.isArray(res.data) ? res.data[0] : res.data;
        const formattedDate = incomeData.transactionDate
        ? new Date(incomeData.transactionDate).toISOString().split("T")[0]
        : "";
        console.log(incomeData.transactionDate);
        

        setIncome(incomeData);
        setInputs((prev) => ({
          ...prev,
          category: incomeData?.category || "",
          transactionDate: formattedDate 
        }));
      } catch (error) {
        console.error("Error fetching income:", error);
      }
    };

    getIncome();
  }, []);
  
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleUpdate = async () => {
    try {
      await publicRequest.put(`/income/${incomeId}`, inputs)

    } catch (error) {
      console.log(error);


    }
  }
  return (
    <div className='m-[20px] bg-[#fff] p-[20px] items-center'>
      <h2 className='font-semibold ml-[40px] mt-[25px]'>Update Income</h2>
      <div className='flex'>
        <div className='m-[18px]'>
          <div className="flex flex-col my-[20px]">
            <label htmlFor="category" className="mb-1 font-medium">Income Source</label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Enter income source"
              value={inputs.category}  // Controlled input
              onChange={handleChange}
              className="border-2 border-[#555] p-[10px] w-[200px] text-gray-600 rounded-md"
            />
          </div>

          <div className='flex flex-col my-[20px]'>
            <label htmlFor="">Amount</label>
            <input type="text" placeholder={incomes.Amount}
              name="amount" onChange={handleChange}
              className='border-2 border-[#555] border-solid p-[10px] w-[130px]' />
          </div>

          <div className='flex flex-col my-[20px]'>
            <label htmlFor="">Date</label>
            <input
  type="date"
  id="transactionDate"
  name="transactionDate"
  value={inputs.transactionDate || ""}  // ✅ Use `inputs.transactionDate`
  onChange={handleChange}
  className="border-2 border-[#555] p-[10px] w-[200px] text-gray-600 rounded-md"
/>
          </div>

          <button className='bg-[#1e1e1e] cursor-pointer text-white p-[10px] w-[120px] rounded' onClick={handleUpdate}>Update</button>

        </div>

      </div>

    </div>
  )
}

export default UpdateIncome