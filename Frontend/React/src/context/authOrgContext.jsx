import { createContext, useContext, useMemo, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useNavigate } from "react-router-dom";
//?--------------------------------------------------------------------------------------
//! 1 ) ---------------------creamos el contexto----------------------------------------
//?--------------------------------------------------------------------------------------
const AuthOrgContext = createContext();

//?--------------------------------------------------------------------------------------
//! 2) -------------------creamos la funcion que provee del contexto---------------------
//?--------------------------------------------------------------------------------------
export const AuthOrgContextProvider = ({ children }) => {
  const navigate = useNavigate();
  //! --------------------------- estado con el user authenticado -estado global

  const [organization, setOrganization] = useState(() => {
    const dataOrg = localStorage.getItem("organization");

    if (dataOrg) {
      const parseOrganization = JSON.parse(dataOrg);

      return parseOrganization;
    } else {
      return null;
    }
  });

  //! estado para el org del register ------ la respuesta completa

  const [allOrganization, setAllOrganization] = useState({
    data: {
      confirmationCode: "",
      organization: {
        password: "",
        email: "",
        description: "",
      },
    },
  });

  //! ---------------------->login+++++++++++++++++++++++++++++++++++++

  const organizationLogin = (data) => {
    // la data la recibimos como un string
    localStorage.setItem("organization", data);
    // meterlo al contexto
    const parseOrganization = JSON.parse(data);
    setOrganization(() => parseOrganization);
  };

  //! -------------------> logout++++++++++++++++++++++++++++++++++++
  const logoutOrg = (isUser = false, setIsUser) => {
    Swal.fire({
      title: "¿Quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOrganization(() => null);
        localStorage.removeItem("organization");
        if (isUser) {
          navigate("/org");
          setIsUser(() => false);
        } else {
          navigate("/");
        }

        return Swal.fire({
          icon: "success",
          title: "Sesión cerrada",
          text: "¡Hasta pronto!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  //! -------------- logout for update

  const logoutUpdateOrg = () => {
    setOrganization(() => null);
    localStorage.removeItem("organization");
    navigate("/");
  };

  //! -----------------------------------------------------------------------
  //? -------- PUENTE PARA CUANDO TENGAMOS PROBLEMAS DE ASYNCRONIA ----------
  //! -----------------------------------------------------------------------

  const bridgeDataOrg = (state) => {
    const data = localStorage.getItem("data");
    const dataJson = JSON.parse(data);
    console.log(dataJson);
    switch (state) {
      case "ALLORGANIZATION":
        setAllOrganization(dataJson);
        localStorage.removeItem("data");

        break;

      default:
        break;
    }
  };

  const valueOrg = useMemo(
    () => ({
      organization,
      setOrganization,
      allOrganization,
      setAllOrganization,
      organizationLogin,
      logoutOrg,
      bridgeDataOrg,
      logoutUpdateOrg,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [organization, allOrganization],
  );

  return (
    <AuthOrgContext.Provider value={valueOrg}>
      {children}
    </AuthOrgContext.Provider>
  );
};

//?--------------------------------------------------------------------------------------
//! 3)--------- CustomHook que se encarga de utilizar el contexto------------------------
//?--------------------------------------------------------------------------------------

// eslint-disable-next-line react-refresh/only-export-components
export const useOrgAuth = () => {
  return useContext(AuthOrgContext);
};
