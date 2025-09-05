import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const Books = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        setBooks(res.data.books);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading)
    return <p className="text-center mt-6 text-gray-600">Loading books...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Your Books</h2>
        <button
          onClick={() => navigate("/books/add")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
        >
          + Add New Book
        </button>
      </div>

      {books.length === 0 ? (
        <p className="text-gray-600">No books uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-lg rounded-xl p-4 flex flex-col hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={
                  book.image
                    ? book.image
                    : "http://localhost:5000/images/default.jpg"
                }
                alt={book.title}
                className="w-full h-56 object-cover rounded-md mb-4"
              />

              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>
              <p className="text-blue-600 font-bold mt-2">${book.price}</p>
              {book.description && (
                <p className="text-gray-500 mt-2 line-clamp-3">
                  {book.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
