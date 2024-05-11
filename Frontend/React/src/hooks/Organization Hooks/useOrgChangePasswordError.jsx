import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useOrgChangePasswordError = (
  res,
  setRes,
  setOrganization,
  navigate,
) => {
  console.log("entro al custom hook 💚");
  //!----------------- 200: updateOrganization: true,
  if (res?.data?.updateOrganization?.toString() == "true") {
    setOrganization(() => null);
    localStorage.removeItem("organization");
    setRes(() => ({}));
    navigate("/loginorg");
    return Swal.fire({
      icon: "success",
      title: "Contraseña cambiada ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  //!------------------200: updateOrganization: false,
  if (res?.data?.updateOrganization?.toString() == "false") {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Internal server error ❎.",
      text: "Please, try again",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  //! -----------------404: 'password dont match'
  if (res?.response?.data?.includes("password dont match")) {
    console.log("password ❌");
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No coinciden las contraseñas,  ❎ Por favor, inténtalo otra vez",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  //! -----------------404: general
  if (res?.response?.status == 404) {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Internal server error ❎.",
      text: "Please, try again",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  //! -----------------500: interval server error
  if (res?.response?.status == 500) {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal Server Error ❎!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
