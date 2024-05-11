import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputLeftElement,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useOrgAuth } from "../../context/authOrgContext";

export const InputHeader = () => {
  const navigate = useNavigate();
  const { organization } = useOrgAuth();
  const color = useColorModeValue("#173f4b39", "#f6f3e0");
  const hover = useColorModeValue("#0c1e24a4", "#64635b");
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      const name = e.target.value;
      name ? navigate(`/eventlist/${name}`) : navigate("/eventlist/");
    }
  };

  return organization ? null : (
    <>
      <InputGroup>
        <InputLeftElement pointerEvents="none" p="5">
          <SearchIcon color="gray" />
        </InputLeftElement>
        <Input
          minW="13em"
          w="100%"
          h="2.5em"
          type="text"
          placeholder="Busca eventos"
          pl="3em"
          pt="1"
          rounded="40"
          border={`2px solid ${color}`}
          fontSize="15"
          fontFamily="sans-serif"
          letterSpacing="2px"
          fontWeight={"100"}
          transition="0.3s"
          _hover={{ border: `solid 2px ${hover}` }}
          onKeyDown={handleEnter}
        />
      </InputGroup>
    </>
  );
};
