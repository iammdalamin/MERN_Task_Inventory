import axios from "axios";
import cogoToast from "cogo-toast";
import { getToken, setToken, setUserDetails } from "./SessionHelper";

const token = getToken()
const AxiosHeader = {
    headers: {
        'Content-Type': 'application/json',
        'token':token,}}

const BaseURL = "http://localhost:5000/api/v1";


export const Register = async (userdata) => {

    const URL = `${BaseURL}/registration`
    const res = await axios.post(URL, userdata)
    if (res.data) {
        setUserDetails(res.data)
        setToken(res.data.token)

    }

   return res.data
  
}

export const Login = async (userdata) => {

    const URL = `${BaseURL}/login`
    const res = await axios.post(URL, userdata)
    if (res.data) {
        if(res.data.status===400){
            cogoToast.success(`${res.data.error}`)
            return 

        }
        setUserDetails(res.data)
        setToken(res.data.token)
        cogoToast.success(`${res.data.message}`)
        console.log(res.data);
    }

   return res.data
  
}

export const Logout = async () => {
    localStorage.clear()
  
}