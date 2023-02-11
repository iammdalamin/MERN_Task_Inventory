import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { logout, reset } from "../redux/state-slice/authSlice";
import { resetTasks } from "../redux/state-slice/taskSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
    dispatch(reset());
    dispatch(resetTasks());
    navigate("/login");
  };
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const handleClick = (e) => {
    setIsActive(!isActive);
  };
  return (
    <nav>
      <div className="container w-80 mx-auto pt-8 pl-10 pr-10 md:pl-16 flex flex-col items-start  justify-start   bg-slate-900 text-slate-50 h-screen   fixed z-[9999]">
        <div className="flex justify-between items-center w-full">
          <Link
            to="/"
            className="font-extrabold text-lg bg-gradient-to-r from-indigo-500 p-2"
          >
            TaskInventory
          </Link>

          {user ? (
            <p className="cursor-pointer" onClick={(e) => handleLogout(e)}>
              <BiLogOut size="23" />
            </p>
          ) : (
            <Link className="bg-gray-50 text-slate-700" to="/login">
              LogIn
            </Link>
          )}
        </div>
        <div className="pt-8 pb-12 text-sm leading-6 ">
          <p>
            This is your advance task management app with various kind of
            feature
          </p>
          {!user ? (
            <p className="text-md text-slate-100 pt-5">
              If you have account. Then
              <Link to="/login" className="font-bold">
                {" "}
                Login here.
              </Link>
            </p>
          ) : (
            <div className="mt-6 p-2 bg-gradient-to-r from-indigo-500 text-slate-100">
              <h2>
                Hi, <span className="text-lg">{user.user.name}</span>
              </h2>
            </div>
          )}
        </div>

        <div>
          <ul className="flex flex-col items-start justify-start gap-4">
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive
                    ? `p-2 bg-gradient-to-r from-indigo-500`
                    : `p-2`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive
                    ? `p-2 bg-gradient-to-r from-indigo-500`
                    : `p-2`
                }
                to="/task-create"
              >
                Create Task
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive
                    ? `p-2 bg-gradient-to-r from-indigo-500`
                    : `p-2`
                }
                to="/new-task"
              >
                New Tasks
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive
                    ? `p-2 bg-gradient-to-r from-indigo-500`
                    : `p-2`
                }
                to="/processing-task"
              >
                Processing Tasks
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive
                    ? `p-2 bg-gradient-to-r from-indigo-500`
                    : `p-2`
                }
                to="/complete-task"
              >
                Complete Tasks
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full h-24 bg-indigo-400 fixed shadow-xl flex">
        <div className="container mx-auto flex justify-between items-center ">
          <div>
            {" "}
            <Link to="/" className="font-extrabold text-lg  p-2">
              TaskInventory
            </Link>
          </div>
          <div className="group relative">
            <Link to="/profile">
              {" "}
              <img
                className="w-10 h-10 rounded-3xl object-fit border-2"
                src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
