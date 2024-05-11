import {
  Button,
  Center,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { InputHeader } from "../Inputs/Input";
import { MobileMenu } from "../Menu/MobileMenu";
import useWidth from "../../hooks/useWidth";
import { DesktopMenu } from "../Menu/DesktopMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useOrgAuth } from "../../context/authOrgContext";
import { useAuth } from "../../context/authContext";
import "./Header.css";
import { HeaderStyled } from "./Header.element";
import { useState } from "react";
import { RxDashboard } from "react-icons/rx";

export const Header = () => {
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  const [isOrg, setIsOrg] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();
  const { organization, logoutOrg } = useOrgAuth();
  const { user, logout } = useAuth();
  const { width } = useWidth();
  const { pathname } = useLocation();
  const Menu = width < 1000 ? MobileMenu : DesktopMenu;
  const bg = useColorModeValue("#77e3df", "#0f1521");

  return (
    <Center bg={bg} borderBottom={`1.5px solid ${color}`}>
      <HeaderStyled>
        <Flex align="center" gap="2em" w="40vw" p="5">
          <Button
            w="10"
            onClick={() => (organization ? navigate("/org") : navigate("/"))}
          >
            <img
              src="https://res.cloudinary.com/dhr13yihn/image/upload/v1694439036/proyectoEventland/assets/OIG_gsdzjv.jpg"
              alt="Eventland logo"
              className="logo"
            />
          </Button>
          <div>
            <InputHeader />
          </div>
        </Flex>
        <Menu
          switchMode={
            pathname.includes("org") ? (
              <Button
                color={color}
                background="transparent"
                transition="0.3s"
                onClick={() => {
                  setIsUser(() => true);
                  organization ? logoutOrg(isUser, setIsUser) : navigate("/");
                }}
              >
                Eventland para usuarios
              </Button>
            ) : (
              <Button
                color={color}
                background="transparent"
                transition="0.3s"
                onClick={() => {
                  setIsOrg(() => true);
                  user ? logout(isOrg, setIsOrg) : navigate("/org");
                }}
              >
                Crea tus propios eventos
              </Button>
            )
          }
          login={
            pathname.includes("org") ? (
              <Link to="/loginorg">Inicia sesión</Link>
            ) : (
              <Link to="/login">Inicia sesión</Link>
            )
          }
          register={
            pathname.includes("org") ? (
              <Link to="/registerorg">Regístrate</Link>
            ) : (
              <Link to="/register">Regístrate</Link>
            )
          }
          profile={
            pathname.includes("org") ? (
              <Flex align="center">
                <Icon as={CgProfile} />
                <Link to="/organizationprofile">
                  {organization?.organization}
                </Link>
              </Flex>
            ) : (
              <Flex align="center">
                <Icon as={CgProfile} />
                <Link to="/profile">{user?.user}</Link>
              </Flex>
            )
          }
          myEvents={
            pathname.includes("org") ? (
              <>
                <Icon as={RxDashboard} />
                <Link to="/homeorg">Mis eventos</Link>
              </>
            ) : (
              <Link to="/home">Mis eventos</Link>
            )
          }
        />
      </HeaderStyled>
    </Center>
  );
};
