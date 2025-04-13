import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { adminRequest } from '../requestMethods';

const Expense = () => {
  const [data, setData] = useState([]);

  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    { field: 'category', headerName: 'Category', width: 140 },
    { field: 'transactionDate', headerName: 'Date', width: 130 },
    { field: 'Amount', headerName: 'Amount (₹)', width: 130 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 120,
      renderCell: (params) => (
        <Link to={`/adminexpense/${params.row._id}`}>
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
    const getExpense = async () => {
      try {
        const res = await adminRequest.get('/adminexpense');
        setData(res.data);
      } catch (error) {
        console.error('❌ Error fetching expenses:', error);
      }
    };
    getExpense();
  }, []);

  const handleDelete = async (id) => {
    try {
      await adminRequest.delete(`/adminexpense/${id}`);
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error('❌ Error deleting expense:', error);
    }
  };

  return (
    <div className="m-8 p-6 bg-background rounded-2xl shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading text-text-main">Expense Details</h1>
        <Link to="/addexpense">
          <button className="bg-primary hover:bg-primary-accent text-white font-semibold px-4 py-2 rounded-xl shadow-md transition">
            + Add Expense
          </button>
        </Link>
      </div>
      <div className="bg-card-bg rounded-xl shadow-card p-4">
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
  );
};

export default Expense;
