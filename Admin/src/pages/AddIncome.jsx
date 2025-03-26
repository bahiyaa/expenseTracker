import React, { useState } from 'react'
import { ToastContainer,toast} from 'react-toastify'
import { publicRequest } from "../requestMethods";
const AddIncome=()=> {
   const [inputs,setInputs]=useState({})

   const handleChange=(e)=>{
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
   };


   const handleSubmit = async () => {
    try {
      await publicRequest.post("/expense",inputs);

      // Clear the input fields
      setInputs({});

      // Show success toast
      toast.success(
        "Income successfully added and emails has been sent to the User!"
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to add Income. Please try again.");
    }
  };

  return (
    <div className='m-[20px] bg-[#fff] p-[20px] items-center'>
      <h2 className='font-semibold ml-[40px] mt-[25px]'>Add Income</h2>
      <div className='flex'>
        <div className='m-[18px]'>
          <div className='flex flex-col my-[20px]'>
            <label htmlFor="">Income Source</label>
            <input type="text" placeholder='Dinning' 
            name='category' onChange={handleChange}
            value={inputs.category || ""}
            className='border-2 border-[#555] border-solid p-[10px] w-[130px]' />
          </div>

          <div className='flex flex-col my-[20px]'>
            <label htmlFor="">Amount</label>
            <input type="text" placeholder='$600'
            name='Amount' onChange={handleChange} 
             value={inputs.Amount || ""}
            className='border-2 border-[#555] border-solid p-[10px] w-[130px]' />
          </div>

          <div className='flex flex-col my-[20px]'>
            <label htmlFor="">Date</label>
            <input type="date" 
            name='transactionDate' onChange={handleChange}
            value={inputs.transactionDate || ""}
            className='border-2 border-[#555] border-solid p-[10px] w-[130px]' />
          </div>
          
          <button className='bg-[#1e1e1e] cursor-pointer text-white p-[10px] w-[120px] rounded'
          onClick={handleSubmit}
          >Add Income</button>
          <ToastContainer></ToastContainer>

        </div>

      </div>

    </div>
  )
}

export default AddIncome