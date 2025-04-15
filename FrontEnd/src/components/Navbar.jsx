import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg';

function Navbar() {
  return (
    <div className='h-[100px] bg-primary flex items-center justify-between px-10'>
      <img src={logo} alt="error" height="80px" width="80px" />
      <Link to='/login'>
        <button className='bg-primary-accent text-text-main font-sans p-[10px] text-cursor-pointer border-none w-[100px] border-border-radius'>LOGIN</button>
      </Link>

    </div>
  )
}

export default Navbar