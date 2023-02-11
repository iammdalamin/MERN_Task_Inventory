import cogoToast from "cogo-toast";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../componentss/Spinner";
import { login, reset } from "../redux/state-slice/authSlice";
const LoginPage = () => {
  let emailRef,
    passRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      cogoToast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let email = emailRef.value;
    let password = passRef.value;
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="w-[80%] float-right h-screen flex justify-center items-center">
      <div className="w-1/3 h-auto flex flex-col gap-4 justify-center items-center px-8 py-12 rounded-xl bg-slate-800">
        <h1 className="text-slate-50 font-extrabold text-4xl">Login</h1>
        <div className="flex flex-col gap-4 w-2/3">
          <input
            className="p-2 outline-none rounded-md"
            type="email"
            ref={(input) => (emailRef = input)}
            required
            placeholder="Email"
          />
          <input
            type="password"
            className="p-2 outline-none rounded-md"
            required
            placeholder="Password"
            ref={(input) => (passRef = input)}
          />
          <button
            className="px-2 py-2 bg-gray-200"
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </button>
        </div>
        <p className="text-slate-400">
          If you have no account.
          <Link className="text-red-400" to="/signup">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
