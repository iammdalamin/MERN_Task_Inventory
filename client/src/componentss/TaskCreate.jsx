import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateTask } from "../Helpers/TaskService";

const TaskCreate = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks);
  console.log(tasks);
  const { isLoading } = tasks;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await CreateTask({
      title,
      desc,
    });

    if (res.status === 200) {
      navigate("/");
    } else {
      return false;
    }
  };
  return (
    <div className=" h-[520px] flex justify-center items-center">
      <div className="mt-24 bg-indigo-900 p-8">
        <h1 className="text-4xl text-teal-50 mb-4">Create your task</h1>
        <div className=" flex flex-col gap-4 items-center">
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2"
            type="text"
            placeholder="Title"
          />
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            className=" w-full p-2"
            type="text"
            placeholder="Description"
          />
          <button
            className="w-2/3 py-2 rounded-lg bg-slate-900 text-slate-100"
            onClick={(e) => handleSubmit(e)}
          >
            {isLoading ? "..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCreate;
