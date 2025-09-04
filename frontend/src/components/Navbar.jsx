import React from 'react'
import useNavigate from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = function () {
        localStorage.removeItem("token");
        navigate("/login");
    };
  return (
    <div>

    </div>
  )
}

export default Navbar