import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { PieChart } from "@mui/x-charts/PieChart";
import { FaWindowClose } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Income() {
  const [showReport, setShowReport] = useState(false);

  const handleShowReport = () => {
    setShowReport(!showReport);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'category', headerName: 'Category', width: 140 },
    { field: 'date', headerName: 'Transactiion Date', width: 130 },
    { field: 'amount', headerName: 'Amount', width: 130 }


  ];

  const rows = [
    { id: 1, category: 'Trade', date: '4/27/2025', amount: 1200 },
    { id: 2, category: 'Trade', date: '4/14/2025', amount: 1200 },
    { id: 3, category: 'Trade', date: '3/19/2025', amount: 1200 },
    { id: 4, category: 'Trade', date: '4/20/2025', amount: 1200 },
    { id: 5, category: 'Trade', date: '4/26/2025', amount: 1200 },
  ];
  return (
    <div className='m-[30px] p-[20px] bg-[#d9d9d9]'>
      <div className='flex items-center justify-between'>
        <h1 className='m-[20px] text-[20px]'>Income Details</h1>

        <div className='relative'>
          <Link to='/addexpense'>
            <button className='bg-[#1e1e1e] text-white p-[10px] cursor-pointer rounded mr-[15px]'>Add Income</button>
          </Link>
          <button className='bg-[#1e1e1e] text-white p-[10px] cursor-pointer rounded ' onClick={handleShowReport}>Income Chart</button>
        </div>
        {showReport && (
          <div className="absolute z-[999] flex flex-col p-[10px] top-[20px] right-[0px] h-[400px] w-[400px] bg-white shadow-xl">
            <FaWindowClose
              className="flex justify-end items-end text-2xl text-red-500 cursor-pointer"
              onClick={handleShowReport}
            />
            <PieChart
              series={[
                {
                  data: [{ id: 0, value: 10, label: 'series A' },
                  { id: 1, value: 15, label: 'series B' },
                  { id: 2, value: 20, label: 'series C' },],
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -90,
                  endAngle: 180,
                  cx: 150,
                  cy: 150,
                },
              ]}
            />

          </div>

        )}

      </div>
      <DataGrid rows={rows} columns={columns} checkboxSelection />


    </div>
  )
}

export default Income