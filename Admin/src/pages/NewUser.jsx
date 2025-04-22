import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NewUser = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const generatePassword = (length) => {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const special = "!@#$%^&*";
    const all = lower + upper + nums + special;

    let pass = lower[Math.floor(Math.random() * lower.length)] +
                upper[Math.floor(Math.random() * upper.length)] +
                nums[Math.floor(Math.random() * nums.length)] +
                special[Math.floor(Math.random() * special.length)];

    for (let i = pass.length; i < length; i++) {
      pass += all[Math.floor(Math.random() * all.length)];
    }

    return pass.split("").sort(() => 0.5 - Math.random()).join("");
  };

  const handleSubmit = async () => {
    try {
      const password = generatePassword(12);
      await publicRequest.post("/auth/register", { ...inputs, password });
      setInputs({});
      toast.success("✅ User successfully registered!");
    } catch (error) {
      console.error(error);
      toast.error("❌ Registration failed. Please try again.");
    }
  };

  return (
    <div className="m-8 p-6 bg-card-bg shadow-card rounded-2xl max-w-xl mx-auto">
      <h2 className="text-2xl font-heading text-text-main mb-6 text-center sm:text-left">Register New User</h2>

      <div className="flex flex-col mb-4">
        <label className="mb-2 text-text-muted font-medium">Full Name</label>
        <input
          type="text"
          placeholder="James Doe"
          name="fullname"
          value={inputs.fullname || ''}
          onChange={handleChange}
          className="p-3 rounded-xl border border-secondary-accent bg-background text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col mb-6">
        <label className="mb-2 text-text-muted font-medium">Email</label>
        <input
          type="email"
          placeholder="jamesdoe@gmail.com"
          name="email"
          value={inputs.email || ''}
          onChange={handleChange}
          className="p-3 rounded-xl border border-secondary-accent bg-background text-text-main placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          autoComplete="off"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-primary hover:bg-primary-accent text-white px-6 py-3 rounded-xl font-medium transition duration-200 w-full sm:w-auto"
      >
        Create
      </button>

      <ToastContainer />
    </div>
  );
};

export default NewUser;
