import React from 'react'
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa";
import { FaHdd } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div className='h-[90vh] shadow-xl ml-[10px]'>
     
     <ul className='flex flex-col item-center justify-center  mt-[110px] ml-[70px]'>
     <Link to="/">
     <li className='flex items-center text-gray-600 text-[20px] hover:text-indigo-300 cursor-pointer mt-[20px]'>
      <FaHome className='mr-[15px]' />Home
      </li>
     </Link>
     <Link>
     <li className='flex items-center text-gray-600 text-[20px] hover:text-indigo-300 cursor-pointer mt-[20px]'>
      <FaUser  className='mr-[15px]'/>Profile
      </li>
     </Link>
      
      
      <hr className='h-[20px]'/>
      <Link to='/income'>
      <li className='flex items-center text-gray-600 text-[20px] hover:text-indigo-300 cursor-pointer mt-[20px]' Link to='/income'>
      <FaCalculator className='mr-[15px]'/>Income
      </li>
      </Link>
      <Link to='/expenses'>
      <li className='flex items-center text-gray-600 text-[20px] hover:text-indigo-300 cursor-pointer mt-[20px]' Link to='/expenses'>
      <FaUsers className='mr-[15px]'/>Expense
      </li>
      </Link>
      
      
      <hr className='h-[20px]'/>
      <Link to='/login'>
      <li className='flex items-center text-gray-600 text-[20px] hover:text-indigo-300 cursor-pointer mt-[20px]'>
      <FaHdd className='mr-[15px]'/>Logout
      </li>
      </Link>
      
      
      
     </ul>
    </div>
  )
}

export default Menu