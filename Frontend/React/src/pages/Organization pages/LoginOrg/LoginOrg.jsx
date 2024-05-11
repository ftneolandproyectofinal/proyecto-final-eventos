import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import {
  Button,
  Box,
  Input,
  useColorModeValue,
  Text,
  Center,
} from "@chakra-ui/react";
import { loginOrgService } from "../../../services/org.service";
import { useOrgLoginError } from "../../../hooks";
import { useOrgAuth } from "../../../context/authOrgContext";

export const LoginOrg = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedOrg, setLoggedOrg] = useState({});
  const [loginOk, setLoginOk] = useState(false);

  const { organizationLogin, setOrganization } = useOrgAuth();

  const { handleSubmit, register } = useForm();

  const color = useColorModeValue("#173F4B", "#173F4B");
  const formSubmit = async (formData) => {
    setIsLoading(true);
    setLoggedOrg(await loginOrgService(formData));
    //llama al servicio de login con los datos del formulario para logarlo y darle token
    setIsLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useOrgLoginError(loggedOrg, setLoggedOrg, organizationLogin, setLoginOk);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedOrg]);

  useEffect(() => {
    setOrganization(() => null);
    localStorage.removeItem("organization");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //!GESTIONAR EL REDIRECT SI SE LOGEA O NO

  if (loginOk) {
    if (loggedOrg?.data?.organization.check == false) {
      return <Navigate to="/checkorg" />;
    } else {
      return <Navigate to="/homeorg" />;
    }
  }

  return (
    <div className="form-container">
      <Box color={color} className="card">
        <div className="form-wrap">
          <Text fontSize="3xl" as="b">
            Inicia sesión
          </Text>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="email_container form-group">
              <p>email</p>
              <label
                htmlFor="custom-input"
                className="custom-placeholder"
              ></label>
              <Input
                border="none"
                rounded="0"
                borderBottom={"1px solid #003b43"}
                bg="transparent"
                _hover={{ background: "#173F4B33" }}
                _focus={{ borderColor: "#173F4B" }}
                _placeholder={{ color: "#003b43" }}
                className="input_user"
                type="email"
                id="email"
                name="email"
                autoComplete="false"
                {...register("email", {})}
              />
            </div>
            <div className="password_container form-group">
              <p>contraseña</p>
              <label
                htmlFor="custom-input"
                className="custom-placeholder"
              ></label>

              <Input
                border="none"
                rounded="0"
                borderBottom={"1px solid #003b43"}
                bg="transparent"
                _hover={{ background: "#173F4B33" }}
                _focus={{ borderColor: "#173F4B" }}
                _placeholder={{ color: "#003b43" }}
                className="input_user"
                type="password"
                id="password"
                name="password"
                autoComplete="false"
                {...register("password", {})}
              />
            </div>
            <Center pt="5">
              <Button
                className="btn"
                type="submit"
                isLoading={isLoading}
                colorScheme="teal"
              >
                Iniciar sesión
              </Button>
            </Center>
          </form>
          <Link to="/forgotpassword/forgotpasswordorg">
            ¿Has olvidado tu contraseña?
          </Link>
        </div>
      </Box>
    </div>
  );
};
