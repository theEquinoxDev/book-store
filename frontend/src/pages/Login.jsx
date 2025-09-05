import { useState } from "react";
 import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/books");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white-900 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Welcome Back!
        </h2>
        {message && (
          <div className="mb-4 text-center text-sm text-red-500">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handleOnChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            onChange={handleOnChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have and account?{" "}
          <span
            onClick={() => navigate("/user/register")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            {" "}
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
