import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";

// Simple auth check using JWT
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><CreateNote /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditNote /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;