import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { deleteOrgService } from "../../services/org.service";

export const useOrgDelete = (setOrganization, navigate) => {
  Swal.fire({
    title: "¿Seguro que quieres borrar el perfil?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(73, 193, 162)",
    cancelButtonColor: "#d33",
    confirmButtonText: "SÍ",
    cancelButtonText: "NO",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await deleteOrgService();
      switch (res.status) {
        case 200:
          Swal.fire({
            icon: "success",
            title: "Organización borrada",
            text: "See you soon",
            showConfirmButton: false,
            timer: 1500,
          });
          setOrganization(() => null);
          localStorage.removeItem("organization");
          navigate("/");
          break;

        default:
          Swal.fire({
            icon: "error",
            title: "La organización no se ha borrado ❎",
            text: "Please, try again",
            showConfirmButton: false,
            timer: 1500,
          });

          break;
      }
    }
  });
};
