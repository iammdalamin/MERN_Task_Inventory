import React, { useRef } from "react";
import { useNavigate } from "react-router";
import { ForgetPass } from "../Helpers/AuthService";

const ResetPassPage = () => {
  let navigate = useNavigate();
  let passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let password = passwordRef.value;

    ForgetPass(email).then((res) => {
      if (res) {
        navigate("/login");
      }
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/3 h-auto flex flex-col gap-4 justify-center items-center px-8 py-12 rounded-xl bg-slate-800">
        <h1 className="text-slate-50 font-extrabold text-4xl">
          Reset Password
        </h1>
        <div className="flex flex-col gap-4 w-2/3">
          <input
            className="p-2 outline-none rounded-md"
            type="password"
            ref={(input) => (passwordRef = input)}
            required
            placeholder="Password"
          />

          <button
            className="px-2 py-2 bg-gray-200"
            onClick={(e) => handleSubmit(e)}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassPage;
