import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        {/* Left Side */}
        <div className="flex-1 text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
            Your Personal <span className="text-blue-600">Book Store</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md">
            Keep track of your collection, explore new reads, and manage your
            library with a simple and elegant interface.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/user/register")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 cursor-pointer"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/books")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg transition duration-300 cursor-pointer"
            >
              Browse Books
            </button>
          </div>
        </div>

       
        <div className="flex-1 mt-10 md:mt-0 md:ml-10 flex justify-center">
          <img
            src="/images/hero.jpg"
            alt="Hero bookstore"
            className="w-full max-w object-contain border rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
