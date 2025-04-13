import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import MyPage from "./pages/MyPage";
import Addincome from "./pages/Addincome";
import Addexpense from "./pages/Addexpense";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios"; // ✅ Import axios
import Statement from "./pages/Statement";

function App() {
  const reduxUser = useSelector((state) => state.user?.currentUser);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const currentUser = reduxUser || localUser; // ✅ Always fallback to localStorage

  console.log("🔍 Persisted User:", currentUser);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      console.log("✅ Token Found in Storage:", token); // Debugging
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("✅ Axios Header Set:", axios.defaults.headers.common["Authorization"]);
    } else {
      console.log("⚠️ No token found in localStorage");
    }
  }, []);

  const protectedRoute = (Component) =>
    currentUser ? <Component /> : <Navigate to="/login" replace />;

  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/mypage", element: protectedRoute(MyPage) },
    { path: "/income", element: protectedRoute(Income) },
    { path: "/addincome", element: protectedRoute(Addincome) },
    { path: "/expense", element: protectedRoute(Expense) },
    { path: "/addexpense", element: protectedRoute(Addexpense) },
    { path: "/statement", element: protectedRoute(Statement) },
   
  ]);

  return <RouterProvider router={router} />;
}

export default App;
