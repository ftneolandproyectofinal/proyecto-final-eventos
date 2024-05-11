/* eslint-disable no-unused-vars */
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  LightMode,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { registerOrg } from "../../../services/org.service";
import { Uploadfile } from "../../../components/UploadFile/UploadFile";
import { useOrgAuth } from "../../../context/authOrgContext";
import { useOrgRegisterError } from "../../../hooks";
export const RegisterOrg = () => {
  const { allOrganization, setAllOrganization, bridgeDataOrg } = useOrgAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [res, setRes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [okRegister, setOkRegister] = useState(false);
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#173F4B");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useOrgRegisterError(res, setOkRegister, setRes, setAllOrganization);
    if (res?.status === 200) bridgeDataOrg("ALLORGANIZATION");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files;
    if (inputFile.length !== 0) {
      const customFormData = {
        ...formData,
        image: inputFile[0],
      };
      setIsLoading(true);
      setRes(await registerOrg(customFormData));
      setIsLoading(false);
    } else {
      const customFormData = {
        ...formData,
      };
      setIsLoading(true);
      setRes(await registerOrg(customFormData));
      setIsLoading(false);
    }
  };

  if (okRegister) {
    return <Navigate to="/checkorg" />;
  }
  return (
    <>
      <div className="form-container">
        <LightMode>
          <Box className="card" color={color}>
            <Text fontSize="3xl" as="b">
              Registra tu organización
            </Text>
            <form onSubmit={handleSubmit(formSubmit)}>
              <FormControl isInvalid={errors.name} isRequired>
                <FormLabel htmlFor="name">Nombre</FormLabel>
                <Input
                  borderBottom={"1px solid #003b43"}
                  bg="transparent"
                  _hover={{ background: "#173F4B33" }}
                  _focus={{ borderColor: "#173F4B" }}
                  id="name"
                  variant="filled"
                  {...register("name", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <Input
                  borderBottom={"1px solid #003b43"}
                  bg="transparent"
                  _hover={{ background: "#173F4B33" }}
                  _focus={{ borderColor: "#173F4B" }}
                  id="password"
                  type="password"
                  variant="filled"
                  autoComplete="false"
                  {...register("password", {
                    required: "This is required",
                  })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  borderBottom={"1px solid #003b43"}
                  bg="transparent"
                  _hover={{ background: "#173F4B33" }}
                  _focus={{ borderColor: "#173F4B" }}
                  id="email"
                  variant="filled"
                  {...register("email", {
                    required: "This is required",
                  })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="description">Descripción</FormLabel>
                <Input
                  borderBottom={"1px solid #003b43"}
                  bg="transparent"
                  _hover={{ background: "#173F4B33" }}
                  _focus={{ borderColor: "#173F4B" }}
                  _placeholder={{ color: "#003b43" }}
                  id="description"
                  variant="filled"
                  placeholder="describe tu organización"
                  {...register("description")}
                />
              </FormControl>
              <Uploadfile />
              {/* <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="name">City</FormLabel>
                <Input
                  id="city"
                  variant="filled"
                  placeholder="city"
                  {...register("city", {})}
                />
              </FormControl> */}
              <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="year">Año de creación</FormLabel>
                <Input
                  borderBottom={"1px solid #003b43"}
                  bg="transparent"
                  _hover={{ background: "#173F4B33" }}
                  _focus={{ borderColor: "#173F4B" }}
                  _placeholder={{ color: "#003b43" }}
                  type="year"
                  id="year"
                  variant="filled"
                  {...register("year")}
                />
              </FormControl>
              <Center pt="5">
                <Button colorScheme="teal" type="submit" isLoading={isLoading}>
                  Registrar
                </Button>
              </Center>
            </form>
          </Box>
        </LightMode>
      </div>
    </>
  );
};
