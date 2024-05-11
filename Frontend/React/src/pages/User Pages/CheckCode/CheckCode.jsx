import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import {
  checkConfirmationUser,
  resendCodeConfirmationUser,
} from "../../../services/user.service";
import {
  useCheckCodeError,
  useAutoLogin,
  useResendCodeError,
} from "../../../hooks";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
export const CheckCode = () => {
  // eslint-disable-next-line no-unused-vars
  const { allUser, userLogin, setUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  // resResend va a ser para gestionar el renvio del codigo de confirmacion
  const [resResend, setResResend] = useState({});
  const [send, setSend] = useState(false);
  const [okCheck, setOkCheck] = useState(false);
  const [okDeleteUser, setOkDeleteUser] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const color = useColorModeValue("#173F4B", "#173F4B");
  //! -------FUNCION QUE GESTIONA LA DATA DEL FORMULARIO-------
  const formSubmit = async (formData) => {
    const userLocal = localStorage.getItem("user");

    if (userLocal == null) {
      const custFormData = {
        confirmationCode: parseInt(formData.confirmationCode),
        email: allUser.data.user.email,
      };
      setSend(true);
      setRes(await checkConfirmationUser(custFormData));
      setSend(false);
    } else {
      const parseUser = JSON.parse(userLocal);
      const custFormData = {
        confirmationCode: parseInt(formData.confirmationCode),
        email: parseUser.email,
      };
      setSend(true);
      setRes(await checkConfirmationUser(custFormData));
      setSend(false);
    }
  };

  const handleReSend = async () => {
    const userLocal = localStorage.getItem("user");
    if (userLocal != null) {
      const parseUser = JSON.parse(userLocal);
      const customFormData = {
        email: parseUser.email,
      };

      setSend(true);
      setResResend(await resendCodeConfirmationUser(customFormData));
      setSend(false);
    } else {
      const customFormData = {
        email: allUser?.data?.user?.email,
      };

      setSend(true);
      setResResend(await resendCodeConfirmationUser(customFormData));
      setSend(false);
    }
  };

  //! --------USE EFFECT QUE NOSC SIRVE CUANDO CAMBIA RES A LANZAR EL COMPROBADOR DE ERRORES
  useEffect(() => {
    console.log(res);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCheckCodeError(
      res,
      setRes,
      setOkCheck,
      setOkDeleteUser,
      userLogin,
      setUserNotFound,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);

  useEffect(() => {
    console.log(resResend);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useResendCodeError(resResend, setResResend, setUserNotFound);
  }, [resResend]);

  //! -------- PONEMOS LOS CONDICIONALES QUE EVALUAN SI ESTAN A TRUE LOS ESTADOS DE NAVEGACION (deleUser, okCheck)

  if (okDeleteUser) {
    // si borramos al useer por meter el codigo mal lo mandamos de nuevo a registrase
    return <Navigate to="/register" />;
  }
  if (okCheck) {
    console.log("el check esta ok 🧡");

    // vamos a evaluar que venga a del login o del register
    if (!localStorage.getItem("user")) {
      // viene del register le tengo que hacer el autologin
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useAutoLogin(allUser, userLogin);
    } else {
      return <Navigate to="/home" />;
    }
  }

  if (userNotFound) {
    /// lo mando al login porque aparece un 404 de user no found porque me ha recargado la pagina y se ha reseteado allUser
    // por lo cual no tengo acceso al email y no puedo reconocerlo en el back
    console.log("entro");
    return <Navigate to="/login" />;
  }

  return (
    <div className="form-container">
      <Box color={color} className="card" maxW="600px">
        <div className="form-wrap">
          <Text fontSize="3xl" as="b">
            Verifica tu código
          </Text>
          <p>Por favor, introduce el código que te hemos enviado el email</p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
              <Input
                border="none"
                rounded="0"
                borderBottom={"1px solid #003b43"}
                bg="transparent"
                _hover={{ background: "#173F4B33" }}
                _focus={{ borderColor: "#173F4B" }}
                _placeholder={{ color: "#003b43" }}
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                {...register("confirmationCode", { required: false })}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                Código de confirmación
              </label>
            </div>
            <ButtonGroup width="500px" display="flex" justifyContent="start">
              <Flex>
                <Button
                  colorScheme="teal"
                  id="btnCheck"
                  className="btn"
                  type="submit"
                  disabled={send}
                  style={{ background: send ? "#49c1a388" : "#49c1a2" }}
                >
                  Verificar código
                </Button>
                <Button
                  colorScheme="teal"
                  id="btnResend"
                  className="btn"
                  disabled={send}
                  style={{ background: send ? "#49c1a388" : "#49c1a2" }}
                  onClick={() => handleReSend()}
                >
                  Reenviar código
                </Button>
              </Flex>
            </ButtonGroup>
            <p className="bottom-text">
              <small>
                Si el código no es correcto, tu usuario se eliminará de nuestra
                base de datos y será necesario que te registres de nuevo
              </small>
            </p>
          </form>
        </div>
      </Box>
    </div>
  );
};
