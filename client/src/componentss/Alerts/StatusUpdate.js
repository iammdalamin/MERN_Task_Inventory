import Swal from "sweetalert2";
import { TaskStatusUpdate } from "../../Helpers/TaskService";

export const StatusUpdate = (id, status) => {
    Swal.fire({
        title: 'Select your status',
        input: 'select',
        inputOptions: {
            New: `New`,
            Progress: "Progress",
            Complete:"Complete"
        },
        inputPlaceholder: `${status}`,
        showCancelButton: true,
    }).then((res) => {
        if (res.isConfirmed) {
            if (!res.value.trim()) {
                Swal.fire("Warning!", "Please select your status.", "Failed");
                return false

            }
            const data = {
                "status":`${res.value.trim()}`
            }
            console.log(id,data);
            TaskStatusUpdate(id, data)
            Swal.fire("Updated!", "Your file status has been Updated.", "success");
            window.location.reload(false);
          }
    }).catch((err) => {
          console.log("err======>",err);
      })

}