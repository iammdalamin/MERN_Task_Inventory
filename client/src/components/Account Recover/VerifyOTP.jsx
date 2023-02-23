import React, { useRef } from "react";
import { useNavigate } from "react-router";
import { RecoveryVerifyOTP } from "../../Helpers/AuthService";
import { getEmail } from "../../Helpers/SessionHelper";

const VerifyOTP = () => {
  let navigate = useNavigate();
  let email = getEmail();
  let otpRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let otp = otpRef.value;

    await RecoveryVerifyOTP(email, otp).then((res) => {
      if (res) {
        navigate("/reset-password");
      }
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/3 h-auto flex flex-col gap-4 justify-center items-center px-8 py-12 rounded-xl bg-slate-800">
        <h1 className="text-slate-50 font-extrabold text-4xl">
          Verify Your OTP
        </h1>
        <div className="flex flex-col gap-4 w-2/3">
          <input
            className="p-2 outline-none rounded-md"
            type="text"
            ref={(input) => (otpRef = input)}
            required
            placeholder="OTP"
          />

          <button
            className="px-2 py-2 bg-gray-200"
            onClick={(e) => handleSubmit(e)}
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
