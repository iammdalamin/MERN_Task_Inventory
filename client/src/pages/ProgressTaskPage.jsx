import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Task from "../componentss/Task";
import { TaskListByStatus } from "../Helpers/TaskService";

const ProgressTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const getList = async () => {
    const res = await TaskListByStatus("Progress");
    const { data } = res;
    setTasks(data);
    // console.log("res", data);
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="container w-full h-screen pt-36  mx-auto">
      <div>
        <h1 className="font-bold text-2xl">
          Your{" "}
          <span className="p-2 rounded-lg bg-indigo-700 text-white">
            progress
          </span>{" "}
          tasks in below:
        </h1>
      </div>
      <div className=" pb-20  p-5 w-full mx-auto flex md:flex-row flex-col flex-wrap justify-center items-center gap-6  text-left">
        {tasks.length > 0 ? (
          <>{""}</>
        ) : (
          <h1>
            Your progress task is empty. You can create you task{" "}
            <Link className="text-red-400" to="/task-create">
              here
            </Link>
          </h1>
        )}
        {tasks?.map((task, id) => {
          return <Task key={id} task={task} />;
        })}
      </div>
    </div>
  );
};

export default ProgressTaskPage;
