import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useOrgRegisterError = (
  res,
  setRegisterOk,
  setRes,
  setAllOrganization,
) => {
  //? si la respuesta es ok ---- > directamente esta el status en la primera clave es decir: res.status
  //? si la respuesta no esta ok--> res.response.status
  //! ------------------ 200 : todo ok
  if (res?.status == 200) {
    const dataToString = JSON.stringify(res);
    localStorage.setItem("data", dataToString);
    setRegisterOk(() => true);
    setAllOrganization(() => res.data);

    Swal.fire({
      icon: "success",
      title: "¡Bienvenidx!",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  //! ------------------- 409: user ya registrado

  if (res?.response?.status === 409) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor, este email ya existe ❎",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }
  //! ------------------- La contraseña no esta en el formato correcto
  if (res?.response?.data?.includes("validation failed: password")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Mínimo 8 caracteres,con mayúscula, minúscula y un carácter especial ❎",
      showConfirmButton: false,
      timer: 3000,
    });
    setRes({});
  }

  //! ------------------- cuando el userName ya existe
  if (
    res?.response?.data?.includes(
      "duplicate key error collection: organizationProyect.organizations index: name_1 dup key: { name",
    )
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Escoge otro nombre ❎",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  //! -------------------- 500 : internal server error

  if (res?.response?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal server error!❎ Please try again.",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  //! -------------------- 404: 'error, resend code'
  if (
    res?.response?.status == 404 &&
    res?.response?.data?.confirmationCode.includes("Email not sent ❌")
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Usuario registrado, error al enviar el código ❎",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }
};
