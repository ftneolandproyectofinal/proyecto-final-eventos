/* import { Link } from "react-router-dom";
 */
import { Flex, Heading } from "@chakra-ui/react";
import { FutureEvents, PastEvents, SingleEvent } from "../../../components";

export const Home = () => {
  return (
    <>
      <Flex>
        <Heading>Tenemos miles de eventos ¡encuentra el tuyo!</Heading>
        <SingleEvent />
      </Flex>
      <FutureEvents />
      <PastEvents />
    </>
  );
};
