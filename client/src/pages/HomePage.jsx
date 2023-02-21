import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../componentss/Spinner";
import Task from "../componentss/Task";
import { getAllTask } from "../redux/state-slice/taskSlice";
const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTask());
  }, []);
  const { tasks, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tasks
  );

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="container w-full h-screen pt-36  mx-auto">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-2xl">
            Your{" "}
            <span className="p-2 rounded-lg bg-indigo-700 text-white">All</span>{" "}
            tasks in below:
          </h1>
        </div>
        <div className="bg-indigo-700 p-2 text-white font-bold  rounded-full ">
          <Link to="/task-create">
            <AiOutlinePlus size={25} />
          </Link>
        </div>
      </div>
      <div className=" pb-20  p-5 w-full mx-auto flex md:flex-row flex-col flex-wrap justify-center items-center gap-6  text-left">
        {tasks.length > 0 ? (
          <>{""}</>
        ) : (
          <h1>
            You have no task. You can create you task{" "}
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

export default HomePage;
