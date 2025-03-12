import React from 'react'
import Footer from '../components/Footer'

function Login() {
  return (
   <div>
    <div className='h-[80vh] flex items-center justify-evenly p-[50px] text-gray-400 '>
      <div>
        <h2 className='text-{#d9d9d9] font-semibold text-[35px]'>FinFlow</h2>
        <img src="/Expense-image.webp" alt="" width='300px'/>
      </div>
      <div className='h-[450px] w-[450px] bg-[#e9eb77] rounded-md'>
        <input type="text" placeholder='Enter your Email' 
        className='flex items-center justify-center bg-[#fff] p-[20px] w-[350px] m-[10%] outline-none'
        />
        <input type="password" placeholder='Enter your Password' 
        className='flex items-center justify-center bg-[#fff] p-[20px] w-[350px] m-[10%] outline-none'
        />
         <button className=' flex items-center justify-center bg-[#1e1e1e] cursor-pointer text-white p-[15px] w-[350px] rounded m-[10%] text-[18px]'>Login</button>

      </div>

    </div>

    <Footer></Footer>
   </div>
  )
}

export default Login