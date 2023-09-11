import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { Flex } from "@chakra-ui/react";
import { Header, Input, MobileMenu } from "../../components";
import "./Welcome.css";

export const Welcome = () => {
  return (
    <>
      <Header>
        <Flex align="center" gap="1em">
          <div>
            <img
              src="https://res.cloudinary.com/dhr13yihn/image/upload/v1694439036/proyectoEventland/assets/OIG_gsdzjv.jpg"
              alt="Eventland logo"
              className="logo"
            />
          </div>
          <div>
            <CiSearch />
            <Input placeholder="Buscar" h="30px" w="120px" />
          </div>
        </Flex>
        <div>
          <MobileMenu />
        </div>
      </Header>
      <Link to="/register">Register</Link>
      <br />
      <Link to="/registerorg">Register Organization</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/loginorg">Login Organization</Link>
    </>
  );
};
