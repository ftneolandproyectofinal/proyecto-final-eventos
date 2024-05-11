import { Heading, Center, Stack, useColorModeValue } from "@chakra-ui/react";

export const WelcomeOrg = () => {
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  return (
    <>
      <Center bg={bg} color={color} h="92.8vh">
        <div className="fullContainer">
          <Stack gap="2em">
            <Heading w="15em" id="textoCabecera" letterSpacing="1px">
              Da vida a tus ideas, crea eventos únicos
            </Heading>
            <Heading id="subtextoCabecera">Eventland</Heading>
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
    </>
  );
};
