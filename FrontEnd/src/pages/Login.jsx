import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div>
      <Navbar></Navbar>

      <div className='h-[80vh] flex items-center justify-evenly p-[50px] text-gray-300'>
        <img src="src\assets\Expense-image.webp" alt="" height="350px" width="350px" />
        <div className='h-[450px] w-[450px] bg-[#e9eb77] rounded-md'>
          <input type="text" name="email" id="em"
            placeholder='Enter your Email '
            className='flex items-center justify-center bg-[#fff] p-[20px] mt-[10%] ml-[10%] w-[350px] outline border-none' />

          <div className='flex items-center'>
            <input type={showPassword ? "text" : "password"} name="password" id="pass"
              placeholder='Enter your Password'
              className='flex items-center justify-center bg-[#fff] p-[20px] m-[10%] w-[350px] outline border-none' />

            <span style={{
              display: "inline",
              cursor: "pointer",
              fontSize: "20px",
            }}
              onClick={handleTogglePassword}
            >
              {showPassword ? "👀" : "🔒"}

            </span>
          </div>
          <button className='bg-[#1e1e1e] w-[350px] p-[15px] text-white font-semibold text-[18px] m-[10%]'>Login</button>
        </div>
      </div>

      <Footer></Footer>
    </div>
  )
}

export default Login