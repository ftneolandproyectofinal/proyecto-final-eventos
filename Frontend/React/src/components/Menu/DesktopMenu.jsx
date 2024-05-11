import {
  Button,
  ButtonGroup,
  Icon,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../../context/authContext";
import { useOrgAuth } from "../../context/authOrgContext";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { AiOutlineLogout } from "react-icons/ai";

export const DesktopMenu = ({
  switchMode,
  login,
  register,
  profile,
  myEvents,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { logout, user } = useAuth();
  const { logoutOrg, organization } = useOrgAuth();
  const color = useColorModeValue("#173F4B", "#f6f3e0");

  return (
    <>
      <ButtonGroup
        flexWrap="nowrap"
        display="flex"
        justifyContent="space-between"
        w="60vw"
      >
        <Button
          color={color}
          background="transparent"
          transition="0.3s"
          pr="20"
        >
          {!user && !organization ? login : profile}
        </Button>

        <Button color={color} background="transparent" transition="0.3s">
          {!user && !organization ? register : myEvents}
        </Button>

        <div>{switchMode}</div>

        <Button color={color} onClick={toggleColorMode} bg="transparent">
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        {(user || organization) && (
          <Button
            color="red"
            onClick={user ? logout : logoutOrg}
            bg="transparent"
          >
            <Icon as={AiOutlineLogout} />
          </Button>
        )}
      </ButtonGroup>
    </>
  );
};
