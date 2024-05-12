import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useCheckCodeError = (
  res,
  setRes,
  setOkCheck,
  setOkDeleteUser,
  userlogin,
  setUserNotFound,
) => {
  // ---------------------> 500
  if (res?.response?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal Server Error ❎!",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes(() => ({}));
  }

  // ------------------------- 200 test todo correcto

  if (res?.data?.testCheckOk?.toString() == "true") {
    if (localStorage.getItem("user")) {
      const currentUser = localStorage.getItem("user");
      const parseUser = JSON.parse(currentUser);
      const customUser = {
        ...parseUser,
        check: true,
      };

      const stringUser = JSON.stringify(customUser);
      // llamamos a la funcion de login para resetear que el check esta a true
      userlogin(stringUser);
    }
    setOkCheck(() => true);
    setRes(() => ({}));
    Swal.fire({
      icon: "success",
      title: "Código correcto ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  // -------------- 200 test = false

  if (res?.data?.testCheckOk?.toString() == "false") {
    // el codigo si era correcto pero el actualizar en el back el check no se ha producido correctamente
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Internal server error ❎.",
      text: "Usuario no borrado, inténtalo otra vez",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  // -------------- 200: delete: 'ok delete user'
  if (res?.data?.delete?.includes("ok delete user")) {
    // esto le enviamos al register porque le henmos borrrado el usuario
    setOkDeleteUser(() => true);
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Código incorrecto ❎.",
      text: "Tu usurio se ha borrado, regístrate de nuevo",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  // ------------- 200: delete: 'error delete user'
  if (res?.data?.delete?.includes("error delete user")) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Código incorrecto  ❎.",
      text: "Tu usurio se ha borrado, regístrate de nuevo",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  // ------------- userNoFound ---> 404

  if (res?.response?.status == 404) {
    setUserNotFound(() => true);
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Internal server error ❎.",
      text: "No delete user. Try again, please.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};