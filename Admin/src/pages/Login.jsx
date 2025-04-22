import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import banner from '../assets/banners.jpg';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://expense-tracker-bxaaujs7i-bahiyas-projects.vercel.app/v1/admin/login", {
        email,
        password,
      });
      console.log("Response:", res.data);
  
      // Set items in session storage
      sessionStorage.setItem("adminToken", res.data.accessToken);
      sessionStorage.setItem("adminEmail", res.data.email);  // Added the email storage
  
      // Debugging: Check if the items are stored correctly
      console.log("SessionStorage:", sessionStorage.getItem("adminToken"));
      console.log("SessionStorage:", sessionStorage.getItem("adminEmail"));
  
      // Delay navigation to ensure sessionStorage is updated first
      setTimeout(() => {
        console.log("Navigating to home page...");
        navigate("/");  // Redirect to the home page
      }, 500);  // 500ms delay (adjust if necessary)
      
      alert("Login successful!");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 font-sans">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-16 items-center">
        <div className="text-center sm:text-left">
          <h2 className="text-4xl font-heading text-primary mb-6">FinFlow</h2>
          <img
            src={banner}
            alt="FinFlow"
            className="rounded-xl shadow-card sm:w-[300px] w-full"
          />
        </div>

        <div className="w-full sm:w-[400px] bg-card-bg rounded-2xl shadow-card p-8">
          <h3 className="text-2xl font-semibold text-text-main mb-6 text-center">
            Admin Login
          </h3>

          <input
            type="text"
            autoComplete="new-email"
            placeholder="Enter your Email"
            className="w-full p-4 mb-4 border border-secondary-accent rounded-xl outline-none text-text-main placeholder-text-muted"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            autoComplete="new-password"
            placeholder="Enter your Password"
            className="w-full p-4 mb-4 border border-secondary-accent rounded-xl outline-none text-text-main placeholder-text-muted"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-error text-center text-sm mb-4">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-accent transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
