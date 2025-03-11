import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="h-[100px] bg-pink-600 text-gray-700 flex items-center justify-between px-10">
      <Link>
      <img src="logo.webp" alt="" height="90px" width="90px"/>
      </Link>
      
      
      <button className='text-[18px] font-semibold cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar