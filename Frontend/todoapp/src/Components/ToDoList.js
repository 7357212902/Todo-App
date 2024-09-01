import React from "react";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

const ToDoList = (props) => {
  return (
    <div className="todo_style" style={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title="Edit">
        <EditIcon
          onClick={() => props.onEdit(props.id, props.text)}
          style={{
            cursor: 'pointer',
            margin: '0 15px 0 35px',
            color: '#8566aa',
            boxShadow: '5px 5px 15px -5px black'
          }}
        />
      </Tooltip>
      <Tooltip title="Delete">
        <DeleteForeverTwoToneIcon
          onClick={() => props.onSelect(props.id)}
          style={{
            cursor: 'pointer',
            margin: '0 15px',
            color: '#8566aa',
            boxShadow: '5px 5px 15px -5px black'
          }}
        />
      </Tooltip>
      <li>{props.text}</li>
    </div>
  );
};

export default ToDoList;
