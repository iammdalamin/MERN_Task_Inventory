import React from "react";
import { StatusAlert } from "./Alerts/StatusAlert";
import { taskDeleteAlert } from "./Alerts/taskDeleteAlert";
import { updateAlert } from "./Alerts/updateAlert";

const Task = ({ id, task }) => {
  const { _id, title, desc, status } = task;
  const DeleteItem = (id) => {
    taskDeleteAlert(id).then((result) => {
      if (result === true) {
        TaskListByStatus("New");
      }
    });
  };
  const updateItem = (id, title, desc) => {
    updateAlert(id, title, desc);
  };

  return (
    <div id={id} className="w-1/3 h-auto p-4 bg-gray-600">
      <h2 className="text-2xl text-slate-100">Title: {title}</h2>
      <p className="text-slate-200">Description: {desc}</p>
      <p className="text-black">Status: {status}</p>
      <button
        className="p-2 bg-red-700 text-slate-100"
        onClick={() => DeleteItem(_id)}
      >
        Delete
      </button>
      <button
        className="p-2 bg-green-700 text-slate-100 ml-1"
        onClick={() => updateItem(_id, title, desc)}
      >
        Update
      </button>
      <button onClick={() => StatusAlert(_id, status)}>Look Up</button>
    </div>
  );
};

export default Task;
