import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";

function Dashboard() {

  const [notes, setNotes] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const firstLetter = username ? username.charAt(0).toUpperCase() : "U";

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setNotes(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchNotes();

    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    window.location.href = "/login";
  };

  return (
    <div>

      {/* Top Bar */}
      <div className="top-bar">

        <h1>📝 Modern Notes App</h1>

        <div className="buttons">

          <button
            className="create"
            onClick={() => window.location.href = "/create"}
          >
            Create Note
          </button>

          {/* Profile */}
          <div className="profile-container">

            <div
              className="avatar"
              onClick={() => setShowProfile(!showProfile)}
            >
              {firstLetter}
            </div>

            {showProfile && (

              <div className="profile-dropdown">

                <div className="profile-info">

                  <div className="avatar large">
                    {firstLetter}
                  </div>

                  <p className="username">{username}</p>

                </div>

                <button
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

      {/* Notes */}
      <div className="notes-container">

        {notes.map((note) => (

          <div className="note-card" key={note.id}>

            <h3>{note.title}</h3>

            <p>{note.content}</p>

            <div>

              <button
                className="edit"
                onClick={() =>
                  window.location.href = `/edit/${note.id}`
                }
              >
                Edit
              </button>

              <button
                className="delete"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Dashboard;