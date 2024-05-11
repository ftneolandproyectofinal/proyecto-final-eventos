import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { deleteEventService } from "../../services/event.service";

export const useDeleteEvent = (navigate, id) => {
  Swal.fire({
    title: "¿Quieres borrar el evento?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(73, 193, 162)",
    cancelButtonColor: "#d33",
    confirmButtonText: "SÍ",
    cancelButtonText: "NO",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await deleteEventService(id);
      switch (res.status) {
        case 200:
          Swal.fire({
            icon: "success",
            title: "Evento borrado",
            text: "¡Hasta pronto!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/homeorg");
          break;

        default:
          Swal.fire({
            icon: "error",
            title: "No se ha borrado el evento ❎",
            text: "Por favor, inténtalo otra vez",
            showConfirmButton: false,
            timer: 1500,
          });

          break;
      }
    }
  });
};
