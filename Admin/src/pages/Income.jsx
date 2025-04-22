import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { publicRequest } from '../requestMethods';

const Income = () => {
  const [data, setData] = useState([]);

  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    { field: 'category', headerName: 'Category', width: 140 },
    { field: 'Amount', headerName: 'Amount', width: 130 },
    { field: 'transactionDate', headerName: 'Transaction Date', width: 150 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 120,
      renderCell: (params) => (
        <Link to={`/adminincome/${params.row._id}`}>
          <button className="flex items-center gap-2 text-primary hover:text-primary-accent transition">
            <FaEdit />
            Edit
          </button>
        </Link>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 130,
      renderCell: (params) => (
        <button
          onClick={() => handleDelete(params.row._id)}
          className="flex items-center gap-2 text-error hover:text-red-800 transition"
        >
          <FaTrash />
          Delete
        </button>
      ),
    },
  ];

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await publicRequest.get('/adminincome');
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getIncome();
  }, []);

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/adminincome/${id}`);
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-8 p-6 bg-background rounded-2xl shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading text-text-main">Income Details</h1>
        <Link to="/addincome">
          <button className="bg-primary hover:bg-primary-accent text-white font-semibold px-4 py-2 rounded-xl shadow-md transition">
            + Add Income
          </button>
        </Link>
      </div>
      <div className="bg-card-bg rounded-xl shadow-card p-4">
        <div className="w-full overflow-x-auto">
          <DataGrid
            rows={data}
            getRowId={(row) => row._id}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              fontFamily: 'Inter',
              backgroundColor: '#FFFFFF',
              borderRadius: '1rem',
              boxShadow: '0 4px 10px rgba(28, 5, 5, 0.05)',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#EFE6DD',
                color: '#3E2C1C',
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-cell': {
                color: '#3E2C1C',
              },
              '& .MuiCheckbox-root': {
                color: '#A67B5B',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Income;
