import cogoToast from "cogo-toast";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../componentss/Spinner";
import { register, reset } from "../redux/state-slice/authSlice";

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      cogoToast.error(message);
    }
    if (isSuccess) {
      cogoToast.success("Signup Success");
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  let nameRef,
    emailRef,
    passRef = useRef();

  const handleSubmit = async () => {
    let name = nameRef.value;
    let email = emailRef.value;
    let password = passRef.value;
    const userData = {
      name,
      email,
      password,
    };
    dispatch(register(userData));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/3 h-auto flex flex-col gap-4 justify-center items-center px-8 py-12 rounded-xl  bg-slate-800">
        <h1 className="text-slate-50 font-extrabold text-4xl">Sign Up</h1>
        <div className="flex flex-col gap-4 w-2/3">
          <input
            ref={(input) => (nameRef = input)}
            className="p-2 outline-none rounded-md"
            type="text"
            required
            placeholder="Name"
          />
          <input
            autoComplete="off"
            ref={(input) => (emailRef = input)}
            className="p-2 outline-none rounded-md"
            type="email"
            required
            placeholder="Email"
          />
          <input
            autoComplete="off"
            ref={(input) => (passRef = input)}
            type="password"
            className="p-2 outline-none rounded-md"
            required
            placeholder="Password"
          />
          <button className="px-2 py-2 bg-gray-200" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
        <p className="text-slate-400">
          If you have account.
          <Link className="text-red-400" to="/login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
