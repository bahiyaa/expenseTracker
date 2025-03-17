import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='h-[100px] bg-[#e9eb77] flex items-center justify-between px-10'>
      <img src="/src/assets/logo.webp" alt="error" height="80px" width="80px" />
      <Link to='/login'>
        <button className='bg-[#1e1e1e] p-[10px] text-gray-300 cursor-pointer border-none w-[100px]'>Login</button>
      </Link>

    </div>
  )
}

export default Navbar