/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
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
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { Uploadfile } from "../UploadFile/UploadFile";
import { FigureOrg } from "../FigureOrg/FigureOrg";
import { updateOrg } from "../../services/org.service";
import { useOrgDelete, useOrgUpdateError } from "../../hooks";
import { DeleteIcon } from "@chakra-ui/icons";
import { useOrgAuth } from "../../context/authOrgContext";
import { useNavigate } from "react-router-dom";
export const OrgFormProfile = () => {
  const { organization, setOrganization, logoutUpdateOrg } = useOrgAuth(); // destructuring de lo que necesitamos del context
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const defauldData = {
    name: organization?.organization,
    description: organization?.description,
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
            image: inputFile[0],
          };
          setIsLoading(true);
          setRes(await updateOrg(customFormData));
          setIsLoading(false);
        } else {
          const customFormData = {
            ...formData,
          };

          setIsLoading(true);
          setRes(await updateOrg(customFormData));
          setIsLoading(false);
        }
      }
    });
  };
  console.log(defauldData);
  useEffect(() => {
    useOrgUpdateError(res, setRes, setOrganization, logoutUpdateOrg);
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
          <FigureOrg
            organization={{
              image: organization.image,
              email: organization.email,
            }}
          />
        </Box>
        <Box w="100%">
          <Stack>
            <Text as="b">Cambia los datos de tu organizador</Text>
            <Text>Por favor, introduce tus nuevos datos</Text>
          </Stack>
          <form onSubmit={handleSubmit(formSubmit)}>
            <FormControl>
              <Divider borderColor="#173F4B" />
              <FormLabel>Nombre de la organización</FormLabel>
              <Input
                border={"1px solid #173F4B"}
                type="text"
                autoComplete="false"
                name="name"
                defaultValue={defauldData?.name}
                {...register("name")}
              />
            </FormControl>
            <FormControl>
              <Divider borderColor="#173F4B" />
              <FormLabel>Descripción</FormLabel>
              <Input
                border={"1px solid #173F4B"}
                type="text"
                autoComplete="false"
                name="description"
                defaultValue={defauldData?.description}
                {...register("description")}
              />
            </FormControl>
            <FormControl>
              <Divider borderColor="#173F4B" p="5" />
              <FormLabel>Imagen</FormLabel>
              <Uploadfile />
            </FormControl>
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
            useOrgDelete(setOrganization, navigate);
          }}
        >
          <Button border={"1px solid #173F4B"}>Borrar organización</Button>
          <IconButton
            border={"1px solid #173F4B"}
            aria-label="Borrar organización"
            icon={<DeleteIcon color="red" />}
          />
        </ButtonGroup>
      </Stack>
    </>
  );
};
