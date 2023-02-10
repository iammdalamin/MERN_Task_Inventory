import axios from "axios";
import cogoToast from "cogo-toast";
import { getToken, setToken, setUserDetails } from "./SessionHelper";
const token = getToken()
const AxiosHeader = {
    headers: {
        'Content-Type': 'application/json',
        'token':token,}}

const BaseURL = "http://localhost:5000/api/v1";



export const LoginRequest = async(reqBody) => {
    const URL = `${BaseURL}/login`
   await axios.post(URL, reqBody).then((res) => {
       const { data } = res;
       if (data.status === 400) {
           cogoToast.error(`${data.error}`)
       } else if(data.status===200){
            setUserDetails(data)
            setToken(data.token)
           cogoToast.success(`${data.message}`)
           return true;
       }
       return true;

    }).catch((err) => {
        console.log(err);
    })
}

export const SignupRequest = async (reqBody) => {
    const URL = `${BaseURL}/registration`
    try {
        const res = await axios.post(URL, reqBody)
        const { data } = res;
        console.log();
        return data;

    } catch {
        cogoToast.error(`${data.error}`)

    }
  
}

export const SelectProfile = async () => {
    const URL = `${BaseURL}/selectProfile`
    const res = await axios.get(URL, AxiosHeader)
    const { data } = res;

    return data;
}


export const TaskCreateRequest = async (reqBody) => {
    const URL = `${BaseURL}/task-create`
    try {
        await axios.post(URL, reqBody, AxiosHeader).then((res) => {
            const { data } = res;
            console.log(data);

            if (data.status === 200) {
                cogoToast.success(`${data.message}`)
            } else {
                cogoToast.error(`${data.message}`)

            }
        })
    } catch(error) {
        cogoToast.error(error)
    }
}

export const AllTaskRequest = async () => {
    const URL = `${BaseURL}/tasks`
    try {
        const res = await axios.get(URL, AxiosHeader);
        const { data } = res;
        const tasks = data.data;
        return tasks;

    } catch(error) {
        console.log(error);
    }
}



export const TaskStatusUpdated = async (id, reqBody) => {
    console.log("reqBody", reqBody);
    const URL = `${BaseURL}/task-status-update/${id}`

    try {
        const res = await axios.post(URL,reqBody, AxiosHeader);
        const { data } = res;
        console.log(data);
        const tasks = data.data;
        return tasks;

    } catch(error) {
        console.log(error);
    }
}


