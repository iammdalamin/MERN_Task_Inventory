import React from "react";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { logout, reset } from "../redux/state-slice/authSlice";
import { resetTasks } from "../redux/state-slice/taskSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
    dispatch(reset());
    dispatch(resetTasks());
    navigate("/login");
  };
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="  bg-slate-900 text-slate-50 h-24">
      <div className="container mx-auto flex justify-between items-center h-full">
        <div>
          <Link to="/" className="font-extrabold">
            TaskInventory
          </Link>
        </div>
        <div>
          <ul className="flex flex-row gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/task-create">Create Task</Link>
            </li>
            <li>
              <Link to="/all-task">All Task</Link>
            </li>
            {user ? (
              <li>
                <p className="cursor-pointer" onClick={(e) => handleLogout(e)}>
                  <BiLogOut size="23" />
                </p>
              </li>
            ) : (
              <li>
                <Link className="bg-gray-50 text-slate-700" to="/login">
                  LogIn
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
