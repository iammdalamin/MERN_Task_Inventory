import React from "react";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
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
    <div id={id} className="w-1/3 h-auto p-6 bg-slate-900 ">
      <h2 className="text-2xl text-slate-100">Title: {title}</h2>
      <p className="text-slate-200">Description: {desc}</p>
      <p className="text-indigo-400 py-4">
        <p className="inline-block w-3 h-3 bg-slate-50 rounded-lg mr-2"></p>
        {status}
      </p>
      <button
        className="p-2 bg-red-700 text-slate-100"
        onClick={() => DeleteItem(_id)}
      >
        <BsTrash size={25} />
      </button>
      <button
        className="p-2 bg-green-700 text-slate-100 ml-1"
        onClick={() => updateItem(_id, title, desc)}
      >
        <BiEdit size={25} />
      </button>
    </div>
  );
};

export default Task;
