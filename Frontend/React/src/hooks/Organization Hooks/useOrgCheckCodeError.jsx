import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useOrgCheckCodeError = (
  res,
  setRes,
  setOkCheck,
  setOkDeleteOrganization,
  organizationlogin,
  setOrganizationNotFound,
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
    if (localStorage.getItem("organization")) {
      const currentOrganization = localStorage.getItem("organization");
      const parseOrganization = JSON.parse(currentOrganization);
      const customOrganization = {
        ...parseOrganization,
        check: true,
      };

      const stringOrganization = JSON.stringify(customOrganization);
      // llamamos a la funcion de login para resetear que el check esta a true
      organizationlogin(stringOrganization);
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
      text: "No delete organization. Try again, please.",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  // -------------- 200: delete: 'ok delete organization'
  if (res?.data?.delete?.includes("ok delete organization")) {
    // esto le enviamos al register porque le henmos borrrado el usuario
    setOkDeleteOrganization(() => true);
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Código incorrecto ❎.",
      text: "Your organization is delete. Register again, please.",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  // ------------- 200: delete: 'error delete organization'
  if (res?.data?.delete?.includes("error delete organization")) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Código incorrecto ❎.",
      text: "No delete organization. Try again, please.",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  // ------------- organizationNoFound ---> 404

  if (res?.response?.status == 404) {
    setOrganizationNotFound(() => true);
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Internal server error ❎.",
      text: "No delete organization. Try again, please.",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
