import axios from "axios";
import cogoToast from "cogo-toast";
import { resetTasks } from "../redux/state-slice/taskSlice";
import { removeOTP, setEmail, setOTP, setToken, setUserDetails } from "./SessionHelper";
import {store} from "../redux/store/store"


const BaseURL = "https://task-inventory-server.onrender.com/api/v1";
// const BaseURL = "http://localhost:5000/api/v1";


export const Register = async (userData) => {

    const URL = `${BaseURL}/registration`
    const res = await axios.post(URL, userData)
    if (res.data) {
        setUserDetails(res.data)
        setToken(res.data.token)

    }

   return res.data
  
}

export const Login = async (userData) => {

    const URL = `${BaseURL}/login`
    const res = await axios.post(URL, userData)
    if (res.data) {
        if(res.data.status===400){
            cogoToast.error(`${res.data.error}`)
            return 

        }
        setUserDetails(res.data)
        setToken(res.data.token)
        cogoToast.success(`${res.data.message}`)
    }

   return res.data
  
}

export const Logout = async () => {
    localStorage.clear()
    store.dispatch(resetTasks())
  
}



export const RecoveryVerifyEmail = async (email) => {
    const URL = `${BaseURL}/forget-password/${email}`
    const res = await axios.post(URL)
    console.log(res);
    if (res.data) {
        if(res.status===400){
            cogoToast.error(`${res.data}`)
            return 

        }

        setEmail(email)
        cogoToast.success("A 6 Digit verification code has been sent to your email address. ");
        return true;    }

   return res.data
  
}


export const RecoveryVerifyOTP = async (email, otp) => {
    const URL = `${BaseURL}/otp-verify/${email}/${otp}`
    try {
        const res = await axios.get(URL)
        console.log(res);
        if (res) {
            if(res.status===400){
                cogoToast.error(`${res.data.message}`)
                return 
            }
            setOTP(otp)
            cogoToast.success("Code Verification Success")
            return true;
    
        }
    
       return res.data
    } catch (err) {
        cogoToast.error("Invalid OTP")

    }
  
  
}




export const RecoveryResetPassword = async (email, otp, password) => {
    const URL = `${BaseURL}/reset-password`;
  
    let body = {
        email: email,
        otp: otp,
        password:password
    }
    const res = await axios.post(URL, body)
    console.log(res);
    if (res) {
        if(res.status===400){
            cogoToast.error(`${res.data.message}`)
            return 

        }
        removeOTP()
        cogoToast.success(`${res.data.message}`)
    }

   return res.data
  
}

