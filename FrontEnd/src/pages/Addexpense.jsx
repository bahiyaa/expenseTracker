import React from 'react'

function Addexpense() {
  return (
    <div className='m-[20px] bg-[#fff] p-[20px] items-center'>
      <h2 className='font-semibold ml-[40px] mt-[25px]'>Add Expense</h2>
      <div className='flex'>
        <div className='m-[18px]'>
          <div className='flex flex-col my-[20px]'>
            <label htmlFor="">Category</label>
            <input type="text" placeholder='Dinning'
              className='border-2 border-[#555] border-solid p-[10px] w-[130px]' />
          </div>

          <div className='flex flex-col my-[20px]'>
            <label htmlFor="">Amount</label>
            <input type="text" placeholder='$600'
              className='border-2 border-[#555] border-solid p-[10px] w-[130px]' />
          </div>

          <div className='flex flex-col my-[20px]'>
            <label htmlFor="">Date</label>
            <input type="date"
              className='border-2 border-[#555] border-solid p-[10px] w-[130px]' />
          </div>

          <button className='bg-[#1e1e1e] cursor-pointer text-white p-[10px] w-[120px] rounded'>Add Expense</button>

        </div>

      </div>

    </div>
  )
}

export default Addexpense