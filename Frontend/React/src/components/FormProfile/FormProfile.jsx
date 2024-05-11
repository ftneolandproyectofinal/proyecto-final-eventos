/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useAuth } from "../../context/authContext";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Text,
  useRadioGroup,
  useColorModeValue,
  Flex,
  Divider,
  Center,
} from "@chakra-ui/react";
import { RadioCard } from "../RadioCard/RadioCard";
import { Uploadfile } from "../UploadFile/UploadFile";
import { FigureUser } from "../FigureUser/FigureUser";
import { updateUser } from "../../services/user.service";
import { useDeleteUser, useUpdateError } from "../../hooks";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export const FormProfile = () => {
  const { user, setUser, logoutUpdate } = useAuth(); // destructuring de lo que necesitamos del context
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState();
  const options = ["hombre", "mujer", "otros", "prefiero no decirlo"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: user?.user.gender,
  });
  const group = getRootProps();
  const navigate = useNavigate();
  const defauldData = {
    name: user?.user,
  };
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");

  //!----------- cuestionario

  const formSubmit = (formData) => {
    Swal.fire({
      title: "¿Estás seguro de que quieres editar tu perfil?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "SÍ",
      cancelButtonText: "NO",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inputFile = document.getElementById("file-upload").files;

        if (inputFile.length != 0) {
          const customFormData = {
            ...formData,
            gender: gender,
            image: inputFile[0],
          };
          setIsLoading(true);
          setRes(await updateUser(customFormData));
          setIsLoading(false);
        } else {
          const customFormData = {
            ...formData,
            gender: gender,
          };

          setIsLoading(true);
          setRes(await updateUser(customFormData));
          setIsLoading(false);
        }
      }
    });
  };

  useEffect(() => {
    useUpdateError(res, setRes, setUser, logoutUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);
  return (
    <>
      <Stack
        bg={bg}
        color={color}
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap="10px"
        alignItems="center"
      >
        <Box paddingInline="10px">
          <FigureUser user={user} />
        </Box>
        <Box w="100%">
          <Stack>
            <Text as="b">Cambia los datos de tu perfil</Text>
            <Text>Por favor, introduce tus nuevos datos</Text>
          </Stack>
          <form onSubmit={handleSubmit(formSubmit)}>
            <FormControl>
              <Divider borderColor="#173F4B" />

              <FormLabel>Nombre de usuario</FormLabel>
              <Input
                border={"1px solid #173F4B"}
                type="text"
                autoComplete="false"
                name="name"
                defaultValue={defauldData?.name}
                {...register("name")}
              />
            </FormControl>

            <Flex flexDir="column">
              <Divider borderColor="#173F4B" p="5" />
              <FormLabel>Imagen</FormLabel>
              <Uploadfile />
              <Divider borderColor="#173F4B" p="5" />
              <FormLabel>Género</FormLabel>

              <Center>
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
              </Center>
            </Flex>
            <Button type="submit" isLoading={isLoading} colorScheme="teal">
              Editar perfil
            </Button>
          </form>
        </Box>
        <ButtonGroup
          size="sm"
          isAttached
          variant="outline"
          onClick={() => {
            useDeleteUser(setUser, navigate);
          }}
        >
          <Button border={"1px solid #173F4B"}>Borrar usuario</Button>
          <IconButton
            border={"1px solid #173F4B"}
            aria-label="Borrar usuario"
            icon={<DeleteIcon color="red" />}
          />
        </ButtonGroup>
      </Stack>
    </>
  );
};
