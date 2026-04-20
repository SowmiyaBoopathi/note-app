import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" }); // no /api here

// ==========================
// Auth APIs
// ==========================
export const loginUser = (data) => API.post("/api/login", data, {
  headers: { "Content-Type": "application/json" },
});
export const signupUser = (data) => API.post("/api/signup", data, {
  headers: { "Content-Type": "application/json" },
});

// ==========================
// Notes APIs
// ==========================
const token = localStorage.getItem("token"); // get JWT after login

export const createNote = (data) => API.post("/api1/notes", data, {
  headers: { Authorization: `Bearer ${token}` },
});

export const getNotes = (user_id) => API.get(`/api1/notes?user_id=${user_id}`, {
  headers: { Authorization: `Bearer ${token}` },
});

export const getNoteById = (id) => API.get(`/api1/notes/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});

export const updateNote = (id, data) => API.put(`/api1/notes/${id}`, data, {
  headers: { Authorization: `Bearer ${token}` },
});

export const deleteNote = (id) => API.delete(`/api1/notes/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});