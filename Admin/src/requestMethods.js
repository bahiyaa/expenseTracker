import axios from "axios";

// ✅ Base Axios Instance
const BASE_URL = "https://expensetracker-be-1bfy.onrender.com/v1";

// ✅ Get token from localStorage
const adminToken = sessionStorage.getItem("adminToken");

// ✅ Create an Axios instance with auth header
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const adminRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${adminToken}`,
  },
});
