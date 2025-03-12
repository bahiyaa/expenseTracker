import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Income=()=> {

  const columns = [
    {field:'id',headerName:'ID',width:90},
    {field:'category',headerName:'Category',width:140},
    {field:'date',headerName:'Transactiion Date',width:130},
    {field:'amount',headerName:'Amount',width:130},
    {field:'edit',headerName:'Edit',width:150,
      rendercell:()=>{
        return(
          <>
          <button className='bg-teal-400 text-white cursor-pointer w-[70opx]'>Edit</button>
          </>
        )
      }
    },
    {field:'delete',headerName:'Delete',width:150,
      rendercell:()=>{
        return(
          <>
          <button className='bg-teal-400 text-white cursor-pointer w-[70opx]'><FaTrash></FaTrash></button>
          </>
        )
      }
    }


  ];
  
  const rows = [
    { id:1,category:'Trade',date:'4/27/2025',amount:1200 },
    { id:2,category:'Trade',date:'4/14/2025',amount:1200 },
    { id:3,category:'Trade',date:'3/19/2025',amount:1200 },
    { id:4,category:'Trade',date:'4/20/2025',amount:1200 },
    { id:5,category:'Trade',date:'4/26/2025',amount:1200 },
  ];
  return (
    <div className='m-[30px] p-[20px] bg-[#d9d9d9]'>
      <div className='flex items-center justify-between'>
        <h1 className='m-[20px] text-[20px]'>Income Details</h1>
        <Link to='/addincome'>
        <button className='bg-[#1e1e1e] text-white p-[10px] cursor-pointer rounded'>Add Income</button>
        </Link>
        
      </div>
      <DataGrid rows={rows} columns={columns} checkboxSelection />


    </div>
  )
}

export default Income