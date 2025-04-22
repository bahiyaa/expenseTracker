import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminProfile = () => {
  const navigate = useNavigate();
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogout = () => {
    sessionStorage.removeItem("admin");
    navigate("/login");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      return setError("New passwords do not match");
    }

    try {
      const res = await axios.put("http://localhost:5000/v1/admin/change-password", {
        email: admin.email,
        oldPassword,
        newPassword,
      });
      sessionStorage.setItem(
        "admin",
        JSON.stringify({
          token: res.data.accessToken,
          email: res.data.email,
        })
      );
  
      // Optionally navigate to home or refresh profile
      navigate("/profile");
      setMessage(res.data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-card-bg shadow-card rounded-2xl font-sans text-text-main">
      <h2 className="text-2xl sm:text-3xl font-heading mb-4 text-primary">Admin Profile</h2>

      <div className="space-y-2 text-base sm:text-lg mb-6">
        <p>
          <strong>Email:</strong> {admin.email}
        </p>
        <p>
          <strong>Role:</strong> Admin
        </p>
      </div>

      <form onSubmit={handleChangePassword} className="space-y-4">
        <h3 className="text-xl font-semibold text-text-muted">Change Password</h3>

        <input
          type="password"
          placeholder="Old Password"
          className="w-full border border-secondary-accent px-4 py-2 rounded-xl bg-secondary text-text-main"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full border border-secondary-accent px-4 py-2 rounded-xl bg-secondary text-text-main"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full border border-secondary-accent px-4 py-2 rounded-xl bg-secondary text-text-main"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full sm:w-auto bg-primary text-white px-5 py-2 rounded-xl hover:bg-primary-accent transition duration-200"
        >
          Change Password
        </button>

        {message && <p className="text-success text-sm mt-2">{message}</p>}
        {error && <p className="text-error text-sm mt-2">{error}</p>}
      </form>

      <hr className="my-6 border-secondary-accent" />

      <button
        onClick={handleLogout}
        className="w-full sm:w-auto bg-error text-white px-5 py-2 rounded-xl hover:bg-[#bf5f52] transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminProfile;
