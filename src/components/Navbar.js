import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    window.location.href = "/login";
  };

  return (
    <nav>
      <h2>📝 Modern Notes App</h2>
      <div>
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/create">Create Note</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;