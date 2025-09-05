import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";


const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");



const handleOnChange = event => {
  const fieldName = event.target.name
  const fieldValue = event.target.value

  setForm({
    ...form,
    [fieldName]: fieldValue
  })
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/register", form);
      setMessage(res.data.message); // show success
      setTimeout(() => navigate("/user/login"), 1500); // redirect after 1.5s
    } catch (err) {
      setMessage(err.response.data.message || "Something went wrong");
    }
  };

    

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white-900 to-blue-500 ">
      <div className="bg-white p-8 rounded-2xl shadow-xl shadow-blue-300 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create your account
        </h2>
        {message && (
          <div className="mb-4 text-center text-sm text-red-500">{message}</div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleOnChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            required
          />
          <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleOnChange}
           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            required
          />
          <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleOnChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400" required
          />
          <button type="submit" className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300">Register</button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
            Already have an account?
            <span onClick={() => navigate('/login')} className="text-blue-500 hover:underline cursor-pointer">Login</span>

        </p>
      </div>
    </div>
  );
};

export default Register;
