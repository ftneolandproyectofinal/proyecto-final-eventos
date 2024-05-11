import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { forgotPasswordUser } from "../../../services/user.service";
import { useForgotPasswordError } from "../../../hooks";
import {
  Button,
  Box,
  useColorModeValue,
  Text,
  Input,
  Center,
} from "@chakra-ui/react";

export const ForgotPassword = () => {
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [forgotOk, setForgotOk] = useState(false);
  const color = useColorModeValue("#173F4B", "#173F4B");
  //! 1)-------------------- LA FUNCIOON QUE SE ENCARGA DE GESTIONAR LOS DATOS DEL FORMULARIO

  const formSubmit = async (formData) => {
    setIsLoading(true);
    setRes(await forgotPasswordUser(formData));
    setIsLoading(false);
  };
  //! 2) ----------------USEEFFECT QUE GESTIONA LA RES CON SUS ERRORES Y SUS 200
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useForgotPasswordError(res, setRes, setForgotOk);
    console.log(res);
  }, [res]);

  //! 3) ---------------- ESTADOS DE NAVEGACION O QUE LA fiuncion ESTA ok

  if (forgotOk) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="form-container">
      <Box color={color} className="card">
        <div className="ForgotPasswordBody">
          <div className="form-wrap">
            <Text fontSize="3xl" as="b">
              Cambiar contraseña{" "}
            </Text>
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
                  id="email"
                  name="email"
                  {...register("email", { required: true })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                  Email
                </label>
              </div>
              <Center pt="5">
                <Button
                  className="btn"
                  type="submit"
                  disabled={isLoading}
                  isLoading={isLoading}
                  colorScheme="teal"
                >
                  Cambiar contrasña
                </Button>
              </Center>
              <p className="bottom-text">
                <small>
                  Introduce tu email para enviarte una nueva contraseña
                </small>
              </p>
            </form>
          </div>
        </div>
      </Box>
    </div>
  );
};
