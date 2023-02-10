import Swal from "sweetalert2";
import { TaskUpdate } from "../../Helpers/TaskService";

export const updateAlert = async (id, title, desc) => {
 const { value: formValues } = await Swal.fire({
    title: 'Multiple inputs',
    html:
    `<input id="swal-input1" class="swal2-input" placeholder="Title" value="${title}">` +
     `<input id="swal-input2" class="swal2-input" placeholder="Description" value="${desc}">`,

  focusConfirm: false,
     preConfirm: () => {
         const title = document.getElementById('swal-input1').value;
         const desc = document.getElementById('swal-input2').value;
         const updateData = {
             title, desc
         }
      
      return updateData
    }
  })
  
  if (formValues) {
      console.log(id,formValues);
    TaskUpdate(id, formValues);
    window.location.reload(false);

    return
    
  }
  
}
