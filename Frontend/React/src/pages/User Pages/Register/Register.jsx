/* eslint-disable no-unused-vars */
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  LightMode,
  Text,
  useColorModeValue,
  useRadioGroup,
} from "@chakra-ui/react";
import { useRegisterError } from "../../../hooks";
import { registerUser } from "../../../services/user.service";
import { useAuth } from "../../../context/authContext";
import { Uploadfile } from "../../../components/UploadFile/UploadFile";
import "./Register.css";
import useWidth from "../../../hooks/useWidth";
import { RadioCard } from "../../../components";

export const Register = () => {
  const { allUser, setAllUser, bridgeData } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [res, setRes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [okRegister, setOkRegister] = useState(false);
  const [gender, setGender] = useState(false);
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#173F4B");
  const bgb = useColorModeValue("#f6f3e0bb", "#f6f3e0bb");
  const { width } = useWidth();
  const options = ["hombre", "mujer", "otros", "prefiero no decirlo"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "",
  });
  const group = getRootProps();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRegisterError(res, setOkRegister, setRes, setAllUser);
    if (res?.status === 200) bridgeData("ALLUSER");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files;
    if (inputFile.length !== 0) {
      const customFormData = {
        ...formData,
        role: "user",
        gender: gender,
        image: inputFile[0],
      };
      setIsLoading(true);
      setRes(await registerUser(customFormData));
      setIsLoading(false);
    } else {
      const customFormData = {
        ...formData,
        role: "user",
        gender: gender,
      };
      setIsLoading(true);
      setRes(await registerUser(customFormData));
      setIsLoading(false);
    }
  };

  if (okRegister) {
    return <Navigate to="/check" />;
  }
  return (
    <>
      <div className="form-container">
        <LightMode>
          <Box className="card" color={color}>
            <Text fontSize="3xl" as="b">
              Regístrate
            </Text>
            <form onSubmit={handleSubmit(formSubmit)}>
              <FormControl isInvalid={errors.name} isRequired>
                <FormLabel htmlFor="name">Nombre de usuario</FormLabel>
                <Input
                  borderBottom={"1px solid #003b43"}
                  bg="transparent"
                  id="name"
                  variant="filled"
                  _hover={{ background: "#173F4B33" }}
                  _focus={{ borderColor: "#173F4B" }}
                  _placeholder={{ color: "#003b43" }}
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
                  _placeholder={{ color: "#003b43" }}
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
                  _placeholder={{ color: "#003b43" }}
                  id="email"
                  variant="filled"
                  {...register("email", {
                    required: "This is required",
                  })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="gender">Género</FormLabel>
                {/*el onclick setea el estado de gender  */}
                <Flex
                  {...group}
                  onClick={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  {options.map((value) => {
                    const radio = getRadioProps({ value });
                    return (
                      <RadioCard key={value} {...radio}>
                        {value}
                      </RadioCard>
                    );
                  })}
                </Flex>
              </FormControl>
              <Uploadfile />

              <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="dateOfBirth">Fecha de nacimiento</FormLabel>
                <Input
                  rounded="0"
                  type="date"
                  id="dateOfBirth"
                  variant="filled"
                  {...register("dateOfBirth", {})}
                />
              </FormControl>
              <Center>
                <Button
                  colorScheme="teal"
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={!gender}
                >
                  Enviar
                </Button>
              </Center>
            </form>
          </Box>
        </LightMode>
      </div>
    </>
  );
};
