import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { FaWallet } from "react-icons/fa";
import { IoCardOutline } from "react-icons/io5";
import { PiHandCoins } from "react-icons/pi";

function MyPage() {
  const [open,setOpen]=useState(false)
  const handleOpen=()=>{
    setOpen(!open)

  }
  return (
    <div>
      <div className=' relative flex items-end justify-end mr-[20%] mt-[6%] text-white font-semibold cursor-pointer'>
        <div className='flex items-center' onClick={handleOpen}>
        <FaUser className='mr-[10px]'></FaUser>
         James Kiran
        </div>
        { open && <div className='absolute top-[20px] right-0 h-[150px] w-[200px] bg-[#d9d9d9] z-[999] shadow-xl'>
          <ul className='flex flex-col items-center justify-center'>
          <li className='hover:text-[#fff] text-black my-[5px] cursor-pointer'>Income</li>
          <li className='hover:text-[#fff] text-black my-[5px] cursor-pointer'>Expense</li>
            <li className='hover:text-[#fff] text-black my-[5px] cursor-pointer'>statement</li>
            <li className='hover:text-[#fff] text-black my-[5px] cursor-pointer'>Logout</li>

          </ul>

        </div>}
      </div>

      <div className='flex items-center mt-[9%] ml-[10%] mr-[10%]'>
        <h2 className='flex items-center justify-center text-gray-500 text-[40px] m-[20px]'>WELCOME BACK, JAMES! TRACK, SAVE, AND STAY IN CONTROL OF YOUR FINANCES. 💰🚀</h2>
      </div>

      <div className='flex items-center mt-[3%] m-[20%]'>
        <div className='flex flex-column text-gray-500 h-[150px] w-[350px] shadow-lg m-[20px]'>
          <div className='flex flex-col items-center justify-center mt-[10%]'>
            <div className='flex items-center ml-[30px]'>
              <div className='bg-[#d9d9d9] w-16 h-16 rounded-full flex items-center justify-center'>
                <IoCardOutline className='text-xl' />
              </div>
              <h1 className='text-[20px] font-semibold items-center ml-[25px] mt-[-30px]'>Total Balance</h1>
            </div>
            <div>
              <h4 className='text-[20px] items-center ml-[60px] mt-[-30px]'>$22500</h4>
            </div>
          </div>
        </div>

        <div className='flex flex-column text-gray-500 h-[150px] w-[350px] shadow-lg m-[20px]'>
          <div className='flex flex-col items-center justify-center mt-[10%]'>
            <div className='flex items-center ml-[30px]'>
              <div className='bg-[#d9d9d9] w-16 h-16 rounded-full flex items-center justify-center'>
                <FaWallet className='text-lg' />
              </div>
              <h1 className='text-[20px] font-semibold items-center ml-[25px] mt-[-30px]'>Total Income</h1>
            </div>
            <div>
              <h4 className='text-[20px] items-center ml-[70px] mt-[-30px]'>$25000</h4>
            </div>
          </div>
        </div>

        <div className='flex flex-column text-gray-500 h-[150px] w-[350px] shadow-lg m-[20px]'>
          <div className='flex flex-col items-center justify-center mt-[10%]'>
            <div className='flex items-center ml-[30px]'>
              <div className='bg-[#d9d9d9] w-16 h-16 rounded-full flex items-center justify-center'>
                <PiHandCoins className='text-xl' />
              </div>
              <h1 className='text-[20px] font-semibold items-center ml-[25px] mt-[-30px]'>Total Expense</h1>
            </div>
            <div>
              <h4 className='text-[20px] items-center ml-[50px] mt-[-30px]'>$2500</h4>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default MyPage

