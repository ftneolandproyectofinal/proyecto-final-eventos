import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useOrgLoginError = (
  res,
  setRes,
  organizationLogin,
  setLoginOk,
) => {
  //! -----------------200

  if (res?.status == 200) {
    const dataCustom = {
      token: res.data.token,
      organization: res.data.organization.name,
      email: res.data.organization.email,
      image: res.data.organization.image,
      check: res.data.organization.check,
      description: res.data.organization.description,
      _id: res.data.organization._id,
    };

    const stringOrganization = JSON.stringify(dataCustom);
    organizationLogin(stringOrganization);
    setLoginOk(() => true);

    Swal.fire({
      icon: "success",
      title: "¡Bienvenidx!",
      text: "Login ok ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //! ----------------- 404: 'organization no register'

  if (res?.response?.data?.includes("Organization no register")) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Usuario sin registrar ❎",
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
      text: "Contraseñas no coinciden ❎",
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
