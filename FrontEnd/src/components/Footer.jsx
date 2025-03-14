import React from 'react'

function Footer() {
  return (
    <div className='h-[300px] bg-[#e9eb77] flex items-center justify-between p-[30px]'>
      <div className='flex flex-col '>
      <img src="/src/assets/logo.webp" alt="error" height="150px" width="150px" />
      <span className='w-[50%]'>Stay on top of your finances with a seamless, 
        intuitive experience"</span>
        <span>+91 9845672345</span>
        <span>info@finflow.com</span>
      </div>
      <div className='flex flex-col'>
        <span>Design by Bahiya</span>
        <span>&copy; copyright 2025</span>

      </div>

    </div>
  )
}

export default Footer