import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  useColorMode,
  Button,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth } from "../../context/authContext";
import { useOrgAuth } from "../../context/authOrgContext";
import { MobileMenuItem } from "./MobileMenuItem";
import useWidth from "../../hooks/useWidth";
import { AiOutlineLogout } from "react-icons/ai";

export const MobileMenu = ({
  switchMode,
  login,
  register,
  profile,
  myEvents,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout, user } = useAuth();
  const { logoutOrg, organization } = useOrgAuth();
  const { width } = useWidth();
  return (
    <nav>
      {width > 630 ? (
        <>
          <Button background="transparent" transition="0.3s">
            {!user && !organization ? login : profile}
          </Button>

          <Button background="transparent" transition="0.3s">
            {!user && !organization ? register : myEvents}
          </Button>
        </>
      ) : null}
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
          m="5"
          border="none"
          background="transparent"
          color="gray"
        />
        <MenuList m="2" border="1px solid gray" rounded="3">
          {width < 630 ? (
            <>
              <MobileMenuItem>
                {!user && !organization ? login : profile}
              </MobileMenuItem>

              <MobileMenuItem>
                {!user && !organization ? register : myEvents}
              </MobileMenuItem>
            </>
          ) : null}
          <div>{switchMode}</div>
          <MobileMenuItem onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </MobileMenuItem>
          {(user || organization) && (
            <MobileMenuItem color="red" onClick={user ? logout : logoutOrg}>
              <Icon as={AiOutlineLogout} />
            </MobileMenuItem>
          )}
        </MenuList>
      </Menu>
    </nav>
  );
};
