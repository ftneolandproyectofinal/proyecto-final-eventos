import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useLoginError = (res, setRes, userLogin, setLoginOk) => {
  //! -----------------200

  if (res?.status == 200) {
    const dataCustom = {
      token: res.data.token,
      user: res.data.user.name,
      email: res.data.user.email,
      image: res.data.user.image,
      check: res.data.user.check,
      _id: res.data.user._id,
    };

    const stringUser = JSON.stringify(dataCustom);
    userLogin(stringUser);
    setLoginOk(() => true);

    Swal.fire({
      icon: "success",
      title: "¡Bienvenidx!",
      text: "Sesión iniciada ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //! ----------------- 404: 'User no register'

  if (res?.response?.data?.includes("User no register")) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Usuario no registrado ❎",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //!------------------ 404: 'password dont match'

  if (res?.response?.data?.includes("password dont match")) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No coinciden las contraseñas ❎",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //! ----------------- 500
  if (res?.response?.status == 500) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal Server Error ❎!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
