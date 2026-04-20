import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../services/api";
import "../index.css";

const Signup = () => {
  const [formData, setFormData] = useState({ username:"", email:"", password:"", contact:"" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.email.includes("@")) return setError("Enter a valid email!");
    try {
      await signupUser(formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div>
      <div className="top-bar">
        <h1>📝 Modern Notes App</h1>
        <div className="buttons">
          <button onClick={()=>navigate("/")}>Home</button>
          <button onClick={()=>navigate("/login")}>Login</button>
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={handleSignup}>
          <h2>Signup</h2>
          <input name="username" placeholder="Username" onChange={handleChange} required/>
          <input name="email" placeholder="Email" onChange={handleChange} required/>
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required/>
          <input name="contact" placeholder="Contact" onChange={handleChange} required/>
          <button type="submit">Signup</button>
          {error && <p className="message">{error}</p>}
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;