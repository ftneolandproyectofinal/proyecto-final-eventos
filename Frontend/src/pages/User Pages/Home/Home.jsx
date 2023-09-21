/* import { Link } from "react-router-dom";
 */
import {
  Flex,
  Heading,
  Box,
  useColorModeValue,
  Center,
  Stack,
} from "@chakra-ui/react";
import {
  FutureEvents,
  InputHeader,
  InterestedEvents,
  OrganizationsFav,
  PastEvents,
  SingleEvent,
} from "../../../components";
import { useIsEmpty } from "../../../hooks";

export const Home = () => {
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  const isEmpty = useIsEmpty();
  console.log("isEmpty", isEmpty);

  return isEmpty ? (
    <Center bg={bg} color={color} h="92.8vh">
      <div className="fullContainer">
        <Stack gap="2em">
          <Heading w="15em" id="textoCabecera" letterSpacing="1px">
            Empieza buscando tu primer evento
          </Heading>
          <Heading id="subtextoCabecera">Eventland</Heading>
          <InputHeader />
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
      <Flex p="5">
        <Heading p="10">Tenemos miles de eventos ¡encuentra el tuyo!</Heading>
        <SingleEvent />
      </Flex>
      <FutureEvents />
      <PastEvents />
      <InterestedEvents />
      <OrganizationsFav />
    </Box>
  );
};
