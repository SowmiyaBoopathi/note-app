import React, { useState } from "react";
import { createNote } from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNote({ user_id, title, content });
    navigate("/dashboard");
  };

 return (
  <div className="page-container">
    <form onSubmit={handleSubmit}>
      <h2>Create Note</h2>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Content"
      />

      <button type="submit">Create Note</button>
    </form>
  </div>
);
};

export default CreateNote;