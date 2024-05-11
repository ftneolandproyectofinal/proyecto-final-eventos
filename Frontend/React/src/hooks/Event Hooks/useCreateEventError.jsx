import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useCreateEventError = (res, setCreateOk, setRes, navigate) => {
  //? si la respuesta es ok ---- > directamente esta el status en la primera clave es decir: res.status
  //? si la respuesta no esta ok--> res.response.status
  //! ------------------ 200 : todo ok
  if (res?.status == 200) {
    setCreateOk(() => true);
    Swal.fire({
      icon: "success",
      title: "Evento creado con éxito",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/homeorg");
    setRes({});
  }

  //! ------------------- 409: evento ya registrado

  if (res?.response?.status === 409) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El evento ya existe",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  //! ------------------- cuando el nombre del evento ya existe
  if (
    res?.response?.data?.includes(
      "duplicate key error collection: eventProyect.events index: name_1 dup key: { name",
    )
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "¡Lo sentimos! Escoge otro nombre ❎",
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
      text: "¡Error interno!❎ Por favor, prueba de nuevo.",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }
};
