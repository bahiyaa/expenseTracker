import axios from "axios";

const BASE_URL = "https://expense-tracker-bxaaujs7i-bahiyas-projects.vercel.app/v1"; // ✅ Your backend API URL

// ✅ Public requests (No authentication required)
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// ✅ Authenticated requests (Requires user token)
export const userRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Ensures cookies & credentials are included
});

// ✅ Automatically attach token to every request
userRequest.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user")); 
    if (user?.accessToken) {
      config.headers["Authorization"] = `Bearer ${user.accessToken}`;
    }
    console.log("🚀 Axios Headers Sent:", config.headers); // Debugging
    return config;
  },
  (error) => Promise.reject(error)
);