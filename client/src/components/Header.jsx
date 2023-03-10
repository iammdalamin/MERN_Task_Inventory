import React, { useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { getUserDetails } from "../Helpers/SessionHelper";
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
  const data = getUserDetails();
  // document.body.addEventListener("click", (e) => {
  //   setIsActive(!isActive);
  // });
  const handleClick = (e) => {
    setIsActive(!isActive);
    if (isActive) {
      const nav = document.getElementById("nav");
      nav.classList.add("bg-white");
    } else {
      const nav = document.getElementById("nav");

      nav.classList.remove("bg-white");
    }
  };

  return (
    <nav>
      <div
        id="nav"
        className={
          isActive
            ? `container w-80 mx-auto pt-8 pl-8 pr-10 md:pl-10 flex flex-col items-start  justify-start   bg-slate-900 text-slate-50 h-screen   fixed z-[9999] overflow-hidden `
            : `container left-[-100%]  mx-auto pt-8 pl-8 pr-10 md:pl-10 flex flex-col items-start  justify-start   bg-slate-900 text-slate-50 h-screen   fixed z-[9999]`
        }
      >
        <div className="flex justify-between items-center w-full">
          <Link
            to="/"
            className="font-extrabold text-lg bg-gradient-to-r from-indigo-500 p-2"
          >
            TaskInventory
          </Link>
        </div>
        <div className="pt-8 pb-12 text-sm leading-6 ">
          <p>
            This is your advance task management app with various kind of
            feature
          </p>
        </div>

        <div className=" pb-5  h-screen w-full flex flex-col justify-between">
          <ul className="flex flex-col items-start justify-start gap-4">
            {!user ? (
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive
                      ? `p-2 bg-gradient-to-r from-indigo-500`
                      : `p-2`
                  }
                  to="/"
                  onClick={(e) => handleLogout(e)}
                >
                  <span>
                    Login <BiLogIn className="inline-block" size={25} />
                  </span>
                </NavLink>
              </li>
            ) : (
              <>
                {" "}
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
                    to="/progress-task"
                  >
                    Progress Tasks
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
                <li>
                  <NavLink
                    className="p-2"
                    to="/"
                    onClick={(e) => handleLogout(e)}
                  >
                    <span>
                      Logout <BiLogOut className="inline-block" size={25} />
                    </span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <p className="text-md text-slate-100 pt-5">
              If you have account. Then
              <Link to="/login" className="font-bold">
                {" "}
                Login here.
              </Link>
            </p>
          ) : (
            <div className="w-full flex flex-row gap-4 p-2 rounded-lg items-center bg-indigo-400">
              <img
                className="rounded-full w-16 h-16 object-fit"
                src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
                alt="Avatar"
              />
              <div>
                <h1>{!data ? "" : data.user.name}</h1>
                <p>{!data ? "" : data.user.email}</p>
              </div>
            </div>
          )}
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
            {isActive ? (
              <div
                className="cursor-pointer p-2 bg-indigo-700 text-white"
                onClick={() => handleClick()}
              >
                <AiOutlineDoubleLeft size="23" />
              </div>
            ) : (
              <div
                className="cursor-pointer p-2 bg-indigo-700 text-white"
                onClick={() => handleClick()}
              >
                <AiOutlineDoubleRight size={23} />
              </div>
            )}{" "}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
