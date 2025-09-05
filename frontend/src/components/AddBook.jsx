import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const AddBook = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    image: "",
  });
  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/books", form);
      setMessage(res.data.message);
      setTimeout(() => navigate("/books"), 1500); // redirect to Books page
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white-900 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add a New Book
        </h2>
        {message && (
          <div className="mb-4 text-center text-sm text-red-500">{message}</div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={form.title}
            onChange={handleOnChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleOnChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleOnChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Cover Image URL"
            value={form.image}
            onChange={handleOnChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleOnChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
