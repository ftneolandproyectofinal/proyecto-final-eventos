import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useForgotPasswordError = (res, setRes, setForgotOk) => {
  //! ----------------------------- 404: 'User no register'
  if (
    res?.response?.status == 404 &&
    res?.response?.data?.includes("Organization no register")
  ) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Introduce un email válido ❎",
      showConfirmButton: false,
      timer: 3000,
    });
  }
  //! ----------------------------- 404: 'dont send email and dont update user'

  if (
    res?.response?.status == 404 &&
    res?.response?.data?.includes("email not sent and user not updated")
  ) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Contraseña no actualizada,  ❎ Por favor, inténtalo otra vez",
      showConfirmButton: false,
      timer: 3000,
    });
  }
  //! ----------------------------- 200: {updateUser: true,sendPassword: true}

  if (res?.status == 200) {
    setForgotOk(() => true);
    setRes(() => ({}));
    Swal.fire({
      icon: "success",
      title: "Contraseña cambiada",
      text: "Email enviado con la nueva contraseña ✅",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  //! ----------------------------- 404: {updateUser: false,sendPassword: true}

  if (
    res?.response?.status == 404 &&
    res?.response?.data?.sendPassword == true &&
    res?.response?.data?.updateUser == false
  ) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Error al enviar el email",
      text: "No hemos cambiado tu contraseña, tu email no es válido ❎",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //! ----------------------------- 500: interval server error

  if (res?.response?.status == 500) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal server error ❎, please try again ",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
