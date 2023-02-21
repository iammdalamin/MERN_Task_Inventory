import axios from "axios";
import cogoToast from "cogo-toast";
import { getToken } from "./SessionHelper";

const token = getToken()
const AxiosHeader = {
    headers: {
        'Content-Type': 'application/json',
        'token': token,}
}

// const BaseURL = "https://task-inventory-server.onrender.com/api/v1";
const BaseURL = "http://localhost:5000/api/v1";


export const AllTasks = async () => {

    const URL = `${BaseURL}/tasks`
    const res = await axios.get(URL, AxiosHeader)


   return res.data.data
  
}

export const CreateTask = async (taskData) => {
    const URL = `${BaseURL}/task-create`;
    try {
        const res = await axios.post(URL, taskData, AxiosHeader)

        const data = res.data
       
        if (data.status === 200) {
            cogoToast.success(`${data.message}`)
        } else {
            cogoToast.error(`${data.message}`)
        }

       return data 
    } catch (error) {
        console.log(error);
    }
 
  
}

export const TaskUpdate = async (id, taskData) => {
    const URL = `${BaseURL}/task-update/${id}`;
    try {
        const res = await axios.post(URL, taskData, AxiosHeader)

        const data = res.data
       console.log(data);
        if (data.status ===200) {
            cogoToast.success(`${data.message}`)
        } else {
            cogoToast.error(`${data.message}`)
        }

       return data 
    } catch (error) {
        console.log(error);
    }
 
  
}




export const TaskDelete = async (id) => {
    const URL = `${BaseURL}/task-delete/${id}`;

    try {
    const res = await axios.delete(URL, AxiosHeader)
        const { data } = res;
        console.log("result", data);
    return data
     } catch(error) {
        console.error(error);

    }

}

export const TaskListByStatus = async (status) => {
    const URL = `${BaseURL}/task-status/${status}`;

    try {
    const res = await axios.get(URL, AxiosHeader)
        const { data } = res;
        
        return data
     } catch(error) {
        console.error(error);

    }

}

export const TaskStatusUpdate = async (id, reqBody) => {
    console.log(id, reqBody);
    let body = "Completed"
    const URL = `${BaseURL}/task-status-update/${id}`;

    try {
    const res = await axios.post(URL,reqBody ,AxiosHeader)
        const { data } = res;
        console.log("Updated", data);
    return data
     } catch(error) {
        console.error("error===>", error);

    }

}
