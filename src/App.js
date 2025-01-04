import React, { useState, useEffect, useReducer, useMemo } from "react";
import Quill from "react-quill";
import io from "socket.io-client";
import "react-quill/dist/quill.snow.css";
import "./App.css";

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:3000");

const userPresenceReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USERS":
      return action.payload;
    default:
      return state;
  }
};

function App() {
  const [editorContent, setEditorContent] = useState("");
  const [users, dispatch] = useReducer(userPresenceReducer, []);
  const [versionHistory, setVersionHistory] = useState([]);

  const quillModules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
    }),
    []
  );

  useEffect(() => {
    const currentUser = { id: "user-4", name: "User Four" };
    socket.emit("joinDocument", { user: currentUser });

    socket.on("loadDocument", (data) => {
      setEditorContent(data.content);
      setVersionHistory(data.history || []);
    });

    socket.on("updateUsers", (userList) => {
      dispatch({ type: "UPDATE_USERS", payload: userList });
    });

    socket.on("documentUpdate", (updatedContent) => {
      setEditorContent(updatedContent);
    });

    return () => {
      socket.emit("leaveDocument", { documentId: "example-doc" });
      socket.off();
    };
  }, []);

  const handleContentChange = (content) => {
    setEditorContent(content);
    socket.emit("updateDocument", { documentId: "example-doc", content });
  };

  const revertToVersion = (version) => {
    setEditorContent(version.content);
    socket.emit("revertVersion", { documentId: "example-doc", version });
  };

  return (
    <div className="App">
      <div className="editor-container">
        <Quill
          value={editorContent}
          onChange={handleContentChange}
          modules={quillModules}
          theme="snow"
        />
      </div>
      <div className="sidebar">
        <h3>Users Online</h3>
        <ul className="user-list">
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id}>
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {user.name}
              </li>
            ))
          ) : (
            <li>No users online</li>
          )}
        </ul>
        <h3>Version History</h3>
        <ul className="version-list">
          {versionHistory.length > 0 ? (
            versionHistory.map((version, index) => (
              <li key={index}>
                <button
                  className="version-button"
                  onClick={() => revertToVersion(version)}
                >
                  {new Date(version.timestamp).toLocaleString()}
                </button>
              </li>
            ))
          ) : (
            <li>No version history available</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
