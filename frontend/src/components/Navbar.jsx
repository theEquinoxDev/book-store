import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");



  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = function () {
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-blue-500 to-white-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          BookShop
        </h1>
        <div className="space-x-6">
          {!token ? (
            <>
              <Link
                to="/user/register"
                className={`${
                  scrolled ? "text-blue-200" : "text-blue-500"
                } hover:text-blue-800 hover:underline transition-colors duration-300`}
              >
                Register
              </Link>
              <Link
                to="/user/login"
                className={`${
                  scrolled ? "text-blue-200" : "text-blue-500"
                } hover:text-blue-800 hover:underline transition-colors duration-300`}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/books" className="hover:text-blue-500 text-blue-300">
                Books
              </Link>
              <button
                className="bg-blue-400 hover:bg-blue-600 cursor-pointer px-3 py-1 rounded-md text-sm font-medium"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
