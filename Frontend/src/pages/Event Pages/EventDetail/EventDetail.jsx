import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../../services/event.service";
import {
  Box,
  Button,
  Heading,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Countdown } from "../../../components";
import useEventAttend from "../../../hooks/User Hooks/useEventAttend";

export const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const { image, name, description } = event;
  const bg = useColorModeValue("#ebeceecc", "#1a202ccc");
  const { isEventAttended, handleToggleAttend, isLoading } = useEventAttend(id);
  const isPastEvent = event && new Date(event.date) < new Date();

  useEffect(() => {
    (async () => {
      setEvent(await getEventById(id));
    })();
  }, [id]);

  return (
    <>
      <Stack align="center">
        <Box maxWidth="900px" position="relative" display="inline-block">
          <Heading
            position="absolute"
            bg={bg}
            rounded="10"
            p="4"
            top="0"
            left="0"
            m="2"
          >
            {name}
          </Heading>
          <Heading
            size="sm"
            position="absolute"
            bg={bg}
            rounded="10"
            p="4"
            top="20"
            left="0"
            m="2"
          >
            {event.establishment?.name}
          </Heading>
          {isPastEvent ? null : (
            <Button
              position="absolute"
              bottom="12"
              bg={bg}
              m="2"
              onClick={handleToggleAttend}
              isLoading={isLoading}
            >
              {isEventAttended ? "-" : "+"}
            </Button>
          )}

          <Heading
            position="absolute"
            bg={bg}
            rounded="10"
            p="4"
            bottom="12"
            right="0"
            m="2"
          >
            {event.city?.name}
          </Heading>
          {event.date && <Countdown date={event?.date} />}
          <Image
            src={image}
            alt={name}
            onError={(e) => {
              e.target.src =
                "https://res.cloudinary.com/dhr13yihn/image/upload/v1693994819/proyectoEventland/eventAssets/Illustration_of_a_group_of_people_all_feeling_different_emotions_dzvspy.jpg";
            }}
            maxWidth="100%"
          />
        </Box>
        <Box maxWidth="900px" p="2">
          {description}
        </Box>
      </Stack>
    </>
  );
};
