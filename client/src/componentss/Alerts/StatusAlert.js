import Swal from "sweetalert2";
import { TaskStatusUpdated } from "../../Helpers/APIRequest";

export async function StatusAlert (id,status){
    return Swal.fire({
        title: 'Change Status',
        input: 'select',
        inputOptions: {New: 'New', Completed: 'Completed', Progress: 'Progress', Canceled: 'Canceled'},
        inputValue:status,
    }).then(async(result) => {
        console.log("Value==",result.value);
        console.log("Id==",id);
        return await TaskStatusUpdated(id, result.value).then((res) => {
            console.log("res", res);
            return res;
        })
    })
}

