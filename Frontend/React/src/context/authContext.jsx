import { createContext, useContext, useMemo, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

import { useNavigate } from "react-router-dom";
//?--------------------------------------------------------------------------------------
//! 1 ) ---------------------creamos el contexto----------------------------------------
//?--------------------------------------------------------------------------------------
const AuthContext = createContext();

//?--------------------------------------------------------------------------------------
//! 2) -------------------creamos la funcion que provee del contexto---------------------
//?--------------------------------------------------------------------------------------
export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  //! --------------------------- estado con el user authenticado -estado global

  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("user");

    if (data) {
      const parseUser = JSON.parse(data);

      return parseUser;
    } else {
      return null;
    }
  });

  //! estado para el user del register ------ la respuesta completa

  const [allUser, setAllUser] = useState({
    data: {
      confirmationCode: "",
      user: {
        password: "",
        email: "",
      },
    },
  });

  //! ---------------------->login+++++++++++++++++++++++++++++++++++++

  const userLogin = (data) => {
    // la data la recibimos como un string
    localStorage.setItem("user", data);
    // meterlo al contexto
    const parseUser = JSON.parse(data);
    setUser(() => parseUser);
  };

  //! -------------------> logout++++++++++++++++++++++++++++++++++++
  const logout = (isOrg = false, setIsOrg) => {
    console.log("isOrg", isOrg);
    Swal.fire({
      title: "¿Quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setUser(() => null);
        localStorage.removeItem("user");
        if (isOrg) {
          navigate("/");
          setIsOrg(false);
        } else {
          navigate("/org");
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

  const logoutUpdate = () => {
    setUser(() => null);
    localStorage.removeItem("user");
    navigate("/");
  };

  //! -----------------------------------------------------------------------
  //? -------- PUENTE PARA CUANDO TENGAMOS PROBLEMAS DE ASYNCRONIA ----------
  //! -----------------------------------------------------------------------

  const bridgeData = (state) => {
    const data = localStorage.getItem("data");
    const dataJson = JSON.parse(data);
    console.log(dataJson);
    switch (state) {
      case "ALLUSER":
        setAllUser(dataJson);
        localStorage.removeItem("data");

        break;

      default:
        break;
    }
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      allUser,
      setAllUser,
      userLogin,
      logout,
      bridgeData,
      logoutUpdate,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, allUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

//?--------------------------------------------------------------------------------------
//! 3)--------- CustomHook que se encarga de utilizar el contexto------------------------
//?--------------------------------------------------------------------------------------

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
