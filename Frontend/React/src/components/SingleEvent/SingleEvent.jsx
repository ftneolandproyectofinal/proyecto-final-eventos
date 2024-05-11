import { useEffect, useState } from "react";
import { getSingleNextEvent } from "../../services/user.service";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Box,
  useColorModeValue,
  DarkMode,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export const SingleEvent = () => {
  const [event, setEvent] = useState({});
  const color = useColorModeValue("#f6f3e0", "#f6f3e0");
  useEffect(() => {
    const getEvent = async () => {
      const data = await getSingleNextEvent();
      setEvent(await data);
    };
    getEvent();
  }, []);

  return event ? (
    <Box>
      <DarkMode>
        <Card
          color={color}
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={event?.image}
            alt={event?.name}
          />
          <Stack>
            <CardBody>
              <Heading size="md">{event?.name}</Heading>
            </CardBody>
            <CardFooter>
              <Link to={`/eventdetail/${event?._id}`}>
                <Button variant="solid" colorScheme="teal">
                  <AddIcon />
                  Info
                </Button>
              </Link>
            </CardFooter>
          </Stack>
        </Card>
      </DarkMode>
    </Box>
  ) : null;
};
