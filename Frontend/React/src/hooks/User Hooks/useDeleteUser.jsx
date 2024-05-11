import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { deleteUserService } from "../../services/user.service";

export const useDeleteUser = (setUser, navigate) => {
  Swal.fire({
    title: "¿Quieres borrar tu perfil?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(73, 193, 162)",
    cancelButtonColor: "#d33",
    confirmButtonText: "SÍ",
    cancelButtonText: "NO",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await deleteUserService();
      switch (res.status) {
        case 200:
          Swal.fire({
            icon: "success",
            title: "Usuario borrado",
            text: "¿Hasta pronto!",
            showConfirmButton: false,
            timer: 1500,
          });
          setUser(() => null);
          localStorage.removeItem("user");
          navigate("/");
          break;

        default:
          Swal.fire({
            icon: "error",
            title: "No se ha borrado el usuario ❎",
            text: "Por favor, inténtalo de nuevo",
            showConfirmButton: false,
            timer: 1500,
          });

          break;
      }
    }
  });
};
