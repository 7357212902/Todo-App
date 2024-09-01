import React, { useState, useEffect } from "react";
import ToDoList from "./Components/ToDoList";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import "../src/Components/index.css";

export default function App() {
  const [inputList, setInput] = useState("");
  const [Items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch tasks from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Add or Update a task
  const listItem = () => {
    if (inputList.trim() !== "") {
      if (isEditing) {
        axios
          .put(`http://localhost:5000/tasks/${editId}`, { text: inputList })
          .then((response) => {
            setItems((items) =>
              items.map((item) => (item._id === editId ? response.data : item))
            );
            setInput("");
            setIsEditing(false);
            setEditId(null);
          })
          .catch((error) => console.error("Error updating task:", error));
      } else {
        axios
          .post("http://localhost:5000/tasks", { text: inputList })
          .then((response) => {
            setItems((oldItems) => [...oldItems, response.data]);
            setInput("");
          })
          .catch((error) => console.error("Error adding task:", error));
      }
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default action (like form submission)
      listItem();
    }
  };

  // Delete a task
  const deleteItems = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setItems((oldItems) => oldItems.filter((item) => item._id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  // Edit a task
  const editItem = (id, text) => {
    setIsEditing(true);
    setInput(text);
    setEditId(id);
  };

  return (
    <div className="main_div">
      <div className="center_div">
        <h1>To-Do List</h1>
        <br />
        <input
          type="text"
          placeholder="Add or Edit an Item"
          value={inputList}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // Add this line
        />
        <Tooltip title={isEditing ? "Update" : "Add"}>
          <button onClick={listItem} disabled={!inputList.trim()}>
            <AddIcon />
          </button>
        </Tooltip>
        <ol>
          {Items.length > 0 ? (
            Items.map((item) => (
              <ToDoList
                key={item._id} // Use item._id instead of index
                id={item._id}
                text={item.text}
                onSelect={deleteItems}
                onEdit={editItem}
              />
            ))
          ) : (
            <li>No tasks available</li>
          )}
        </ol>
      </div>
    </div>
  );
}
