import cogoToast from "cogo-toast";
import React, { useRef } from "react";
import { useNavigate } from "react-router";
import { RecoveryVerifyEmail } from "../../Helpers/AuthService";

const ForgetPassPage = () => {
  let navigate = useNavigate();
  let emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let email = emailRef.value;
    if (!email.trim()) {
      cogoToast.error("Please Enter Your Email");
    } else {
      RecoveryVerifyEmail(email).then((res) => {
        if (res) {
          navigate("/verify-otp");
        }
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/3 h-auto flex flex-col gap-4 justify-center items-center px-8 py-12 rounded-xl bg-slate-800">
        <h1 className="text-slate-50 font-extrabold text-4xl">
          Forget Password
        </h1>
        <div className="flex flex-col gap-4 w-2/3">
          <input
            className="p-2 outline-none rounded-md"
            type="email"
            ref={(input) => (emailRef = input)}
            required
            placeholder="Email"
          />

          <button
            className="px-2 py-2 bg-gray-200"
            onClick={(e) => handleSubmit(e)}
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassPage;
