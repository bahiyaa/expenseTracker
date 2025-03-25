import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { publicRequest } from '../requestMethods';


const Income = () => {

  const [data, setData] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'category', headerName: 'Category', width: 140 },
    { field: 'date', headerName: 'Transactiion Date', width: 130 },
    { field: 'amount', headerName: 'Amount', width: 130 },
    {
      field: 'edit', headerName: 'Edit', width: 150,
      renderCell: () => {
        return (
          <>
            <button className='bg-teal-400 text-white cursor-pointer w-[400px]'>Edit</button>
          </>
        )
      }
    },
    {
      field: 'delete', headerName: 'Delete', width: 150,
      renderCell: () => {
        return (
          <>
            <button className='cursor-pointer text-red-600 m-2'><FaTrash></FaTrash></button>
          </>
        )
      }
    }


  ];

  useEffect(() => {
    const getIncome = async () => {

      try {
        const res = await publicRequest.get("/expenses");
        setData(res.data);
      } catch (error) {
        console.log(error);

      }

    }
    getIncome();
  }, [])
  return (
    <div className='m-[30px] p-[20px] bg-[#d9d9d9]'>
      <div className='flex items-center justify-between'>
        <h1 className='m-[20px] text-[20px]'>Income Details</h1>
        <Link to='/addincome'>
          <button className='bg-[#1e1e1e] text-white p-[10px] cursor-pointer rounded'>Add Income</button>
        </Link>

      </div>
      <DataGrid rows={data}
      getRowId={(row)=>row._id}
      columns={columns} checkboxSelection />


    </div>
  )
}

export default Income