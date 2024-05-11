import { Link } from "react-router-dom";

import { OrgNextEvents, OrgPastEvents } from "../../../components";
import {
  Button,
  Box,
  Heading,
  useColorModeValue,
  Center,
  Stack,
} from "@chakra-ui/react";
import { useIsEmptyOrg } from "../../../hooks/Organization Hooks/useIsEmptyOrg";

export const HomeOrg = () => {
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  const isEmpty = useIsEmptyOrg();

  return isEmpty ? (
    <Center bg={bg} color={color} h="92.8vh">
      <div className="fullContainer">
        <Stack gap="2em">
          <Heading w="15em" id="textoCabecera" letterSpacing="1px">
            Empieza creando tu primer evento
          </Heading>
          <Heading id="subtextoCabecera">Eventland</Heading>
          <Link to="/createeventorg">
            <Button w="15em" colorScheme="teal">
              Crear evento
            </Button>
          </Link>
        </Stack>
        <div className="grid">
          <img
            className="image1"
            src="https://res.cloudinary.com/dhr13yihn/image/upload/v1695223761/proyectoEventland/assets/OIG_ovz6jg.jpg"
          />
          <img
            className="image2"
            src="https://res.cloudinary.com/dhr13yihn/image/upload/v1695223741/proyectoEventland/assets/OIG_vtzvto.jpg"
          />
          <img
            className="image3"
            src="https://res.cloudinary.com/dhr13yihn/image/upload/v1695223064/proyectoEventland/assets/OIG_vv006f.jpg"
          />
          <img
            className="image4"
            src="https://res.cloudinary.com/dhr13yihn/image/upload/v1695223056/proyectoEventland/assets/OIG_exlai3.jpg"
          />
          <img
            className="image5"
            src="https://res.cloudinary.com/dhr13yihn/image/upload/v1695223045/proyectoEventland/assets/OIG_jjtect.jpg"
          />
          <img
            className="image6"
            src="https://res.cloudinary.com/dhr13yihn/image/upload/v1695226016/proyectoEventland/assets/OIG_lfkcw1.jpg"
          />
        </div>
      </div>
    </Center>
  ) : (
    <Box bg={bg} color={color} minH="92.9vh">
      <Heading p="10">
        Todos los eventos que has organizado, en un solo lugar
      </Heading>
      <Center>
        <Link to="/createeventorg">
          <Button w="15em" colorScheme="teal">
            Crear evento
          </Button>
        </Link>
      </Center>
      <OrgNextEvents />
      <OrgPastEvents />
    </Box>
  );
};
