import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import "../index.css";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");

    // simple email validation
    if (!email.includes("@")) {
      setError("Enter a valid email!");
      return;
    }

    try {

      const res = await loginUser({ email, password });

      // store login info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("user_id", res.data.user_id);

      // go to dashboard
      navigate("/dashboard");

    } catch (err) {

      setError(
        err.response?.data?.message || "Invalid credentials!"
      );

    }

  };

  return (

    <div>

      {/* Top Bar */}
      <div className="top-bar">

        <h1>📝 Modern Notes App</h1>

        <div className="buttons">

          <button onClick={() => navigate("/")}>
            Home
          </button>

          <button onClick={() => navigate("/signup")}>
            Signup
          </button>

        </div>

      </div>


      {/* Login Form */}
      <div className="form-container">

        <form onSubmit={handleSubmit}>

          <h2>Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

          {error && (
            <p className="message">
              {error}
            </p>
          )}

          <p>
            Don't have an account?{" "}
            <Link to="/signup">Signup</Link>
          </p>

        </form>

      </div>

    </div>

  );
};

export default Login;