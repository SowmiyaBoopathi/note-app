import React from "react";
import "../index";

const NoteCard = ({ note, onDelete }) => (
  <div className="note-card">
    <h3>{note.title}</h3>
    <p>{note.content}</p>
    <div>
      <button className="edit" onClick={() => window.location.href=`/edit/${note.notes_id}`}>Edit</button>
      <button className="delete" onClick={onDelete}>Delete</button>
    </div>
  </div>
);

export default NoteCard;