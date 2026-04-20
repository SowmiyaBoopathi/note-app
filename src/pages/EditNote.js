import React, { useEffect, useState } from "react";
import { getNoteById, updateNote } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

const EditNote = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => { fetchNote(); }, []);

  const fetchNote = async () => {
    const res = await getNoteById(id);
    setTitle(res.data[0].title);
    setContent(res.data[0].content);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateNote(id, { title, content });
    navigate("/dashboard");
  };

 return (
  <div className="page-container">
    <form onSubmit={handleUpdate}>
      <h2>Edit Note</h2>

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

      <button type="submit">Update Note</button>
    </form>
  </div>
);
};

export default EditNote;