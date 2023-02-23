import React from "react";
import { TaskDelete, TaskUpdate } from "../Helpers/TaskService";

const UpdateTask = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    TaskUpdate({
      title,
      desc,
    });
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className=" bg-slate-800 p-8">
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
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
