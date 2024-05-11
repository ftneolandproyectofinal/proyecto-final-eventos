/* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import {
  Button,
  Box,
  useColorModeValue,
  Text,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useAuth } from "../../context/authContext";
import { changePasswordUserToken } from "../../services/user.service";
import { useChangePasswordError } from "../../hooks";

export const ChangePassword = () => {
  const { setUser } = useAuth();
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");

  //! -----------------1) LA FUNCIOON QUE GESTIONA EL FORMULARIO

  const formSubmit = (formData) => {
    const { password, newPassword, confirmPassword } = formData;

    if (newPassword == confirmPassword) {
      Swal.fire({
        title: "¿Quieres cambiar la contraseña?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(74, 186, 158)",
        cancelButtonColor: "#c94c4c",
        confirmButtonText: "SÍ",
        cancelButtonText: "NO",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          setRes(await changePasswordUserToken({ password, newPassword }));
          setIsLoading(false);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: " La nueva contraseña no coincide con la anterior❎.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  //! ------------------2) GESTION DE LA RESPUESTA POR EL CUSTOMHOOK Y AYUDADO POR EL USEEFFECT

  useEffect(() => {
    useChangePasswordError(res, setRes, setUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);

  //! no tenemos condicionales de navegacion porque cuando me desloguee el componente protected me llevara al login

  return (
    <Box
      bg={bg}
      color={color}
      align="start"
      display="flex"
      flexDir="column"
      gap="2em"
    >
      <Text as="b">Por favor, introduce tu antigua contraseña</Text>

      <form onSubmit={handleSubmit(formSubmit)}>
        <Stack gap="2em">
          <div className="password_container form-group">
            <Input
              rounded="5"
              border={"1px solid #173F4B "}
              className="input_user"
              type="password"
              id="password"
              name="password"
              autoComplete="false"
              {...register("password", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Antigua contraseña
            </label>
          </div>
          <div className="newPassword_container form-group">
            <Input
              rounded="5"
              border={"1px solid #173F4B "}
              className="input_user"
              type="password"
              id="newPassword"
              name="newPassword"
              autoComplete="false"
              {...register("newPassword", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Nueva contraseña
            </label>
          </div>
          <div className="confirmPassword_container form-group">
            <Input
              rounded="5"
              border={"1px solid #173F4B "}
              className="input_user"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="false"
              {...register("confirmPassword", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Confirma tu nueva contraseña
            </label>
          </div>
          <Button
            justifySelf="center"
            className="btn"
            type="submit"
            isLoading={isLoading}
            colorScheme="teal"
          >
            Cambiar contraseña
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
