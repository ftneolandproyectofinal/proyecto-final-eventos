import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Box,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { ChangePassword, FormProfile } from "../../../components";
import { EditIcon, LockIcon } from "@chakra-ui/icons";
import useWidth from "../../../hooks/useWidth";

export const Profile = () => {
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  const { width } = useWidth();
  //? -------- Cambio de contraseña con token

  //?--------- Cambio de datos del usuario

  //?--------- Borrado del usuario

  return (
    <Box bg={bg} color={color} align="center" minH="92.9vh">
      <Tabs isFitted variant="unstyled" w="80vw">
        <TabList p="5">
          <Tab
            flexDir={width < 500 ? "row" : "column"}
            color="teal"
            _selected={{ color: "white", bg: "#13c1acff" }}
            rounded="10"
          >
            <EditIcon />
            <Text
              fontSize={width < 400 ? "xs" : width < 500 ? "sm" : "md"}
              as="b"
            >
              Edita tu perfil
            </Text>
          </Tab>
          <Tab
            flexDir={width < 500 ? "row" : "column"}
            color="teal"
            _selected={{ color: "white", bg: "#13c1acff" }}
            rounded="10"
          >
            <LockIcon />
            <Text fontSize={width < 500 ? "sm" : "md"} as="b">
              Cambia tu contraseña
            </Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Center w="100%">
              <FormProfile />
            </Center>
          </TabPanel>
          <TabPanel>
            <Center>
              <ChangePassword />
            </Center>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
