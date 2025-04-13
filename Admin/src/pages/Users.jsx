import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { adminRequest } from '../requestMethods';

const Users = () => {
  const [users, setUsers] = useState([]);

  const columns = [
    { field: 'fullname', headerName: 'Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 240 },
    { field: 'role', headerName: 'Role', width: 140 },
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
    const getUsers = async () => {
      try {
        const res = await adminRequest.get('/users');
        setUsers(res.data);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await adminRequest.delete(`/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };

  return (
    <div className="m-8 p-6 bg-background rounded-2xl shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading text-text-main">User List</h1>
        <Link to="/newuser">
          <button className="bg-primary hover:bg-primary-accent text-white font-semibold px-4 py-2 rounded-xl shadow-md transition">
            + New User
          </button>
        </Link>
      </div>
      <div className="bg-card-bg rounded-xl shadow-card p-4">
        <DataGrid
          rows={users}
          getRowId={(row) => row._id}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            fontFamily: 'Inter',
            backgroundColor: '#FFFFFF !important',
            borderRadius: '1rem',
            boxShadow: '0 4px 10px rgba(28, 5, 5, 0.05)',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#EFE6DD !important',
              color: '#3E2C1C !important',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell': {
              color: '#3E2C1C !important',
            },
            '& .MuiCheckbox-root': {
              color: '#A67B5B !important',
            },
          }}
        />
      </div>
    </div>
  );
};

export default Users;
