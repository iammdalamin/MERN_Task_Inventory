import React, { useEffect } from "react";
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
    <div className="w-full h-screen ml-36  mx-auto">
      <div>
        <h1>Your all tesk in below:</h1>
      </div>
      <div className="mt-36 w-full mx-auto flex flex-row flex-wrap justify-center gap-6  text-left">
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
