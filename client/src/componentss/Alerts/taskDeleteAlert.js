import Swal from "sweetalert2";
import { TaskDelete } from "../../Helpers/TaskService";

export const taskDeleteAlert = (id) => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await TaskDelete(id);
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      window.location.reload(false);

    }
  });
};
