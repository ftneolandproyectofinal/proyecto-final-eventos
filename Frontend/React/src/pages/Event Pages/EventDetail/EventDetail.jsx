import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { getEventById } from "../../../services/event.service";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  LightMode,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AvatarCustomGroup, Countdown } from "../../../components";
import { useEventLiked, useEventAttend } from "../../../hooks";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useAuth } from "../../../context/authContext";
import useWidth from "../../../hooks/useWidth";

export const EventDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const { image, name, description } = event;
  const { isEventAttended, handleToggleAttend, isLoading } = useEventAttend(id);
  const { isEventLiked, handleToggleLiked, isLoadingLiked } = useEventLiked(id);
  const isPastEvent = event && new Date(event.date) < new Date();
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const bgh = useColorModeValue("#b6e9e9dd", "#173F4Baa");

  const colorh = useColorModeValue("black", "#F4FAFF");
  const bgatt = useColorModeValue("#3be1cd", "#3be1cd");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  const { width } = useWidth();

  useEffect(() => {
    (async () => {
      setEvent(await getEventById(id));
    })();
  }, [id, isEventAttended]);

  return (
    <Box bg={bg} color={color} p="10" minH="92.9vh">
      <Stack align="center" p="1em">
        <Box maxWidth="900px" position="relative" display="inline-block">
          <Heading
            fontSize={width < 500 ? "12px" : width < 650 ? "20px" : "30px"}
            color={colorh}
            position="absolute"
            bg={bgh}
            rounded="10"
            p="4"
            top="0"
            left="0"
            m="2"
          >
            {name}
          </Heading>
          <Heading
            fontSize={width < 500 ? "8px" : width < 650 ? "14px" : "20px"}
            color={colorh}
            size="sm"
            position="absolute"
            bg={bgh}
            rounded="10"
            p="4"
            top={width < 500 ? "14" : "20"}
            left="0"
            m="2"
          >
            {event.establishment?.name}
          </Heading>

          <Button
            bg={bgh}
            rounded="50"
            h="fit-content"
            w="20px"
            position="absolute"
            bottom="1"
            m="2"
            onClick={() => (user ? handleToggleLiked() : navigate("/register"))}
            isLoading={isLoadingLiked}
            _hover={{ background: bgatt }}
          >
            {isEventLiked ? <Icon as={BsHeartFill} /> : <Icon as={BsHeart} />}
          </Button>

          <Heading
            fontSize={width < 500 ? "12px" : width < 650 ? "20px" : "30px"}
            color={colorh}
            position="absolute"
            bg={bgh}
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
            minW={width < 400 ? "300px" : "600px"}
            rounded="10"
            src={image}
            alt={name}
            onError={(e) => {
              e.target.src =
                "https://res.cloudinary.com/dhr13yihn/image/upload/v1693994819/proyectoEventland/eventAssets/Illustration_of_a_group_of_people_all_feeling_different_emotions_dzvspy.jpg";
            }}
            maxWidth="100%"
          />
        </Box>
        <Box
          maxWidth="900px"
          display="flex"
          alignItems="center"
          gap="2em"
          m="10"
          flexDir={width < 600 ? "column" : "row"}
        >
          <Text p="1em">{description}</Text>
          <Box align="center">
            {isPastEvent ? null : (
              <LightMode>
                <Button
                  minW="180px"
                  w="80%"
                  bg={bgatt}
                  onClick={() =>
                    user ? handleToggleAttend() : navigate("/register")
                  }
                  isLoading={isLoading}
                >
                  {isEventAttended ? "No asistiré" : "Asistiré"}
                </Button>
              </LightMode>
            )}
            <AvatarCustomGroup
              event={event}
              isEventAttended={isEventAttended}
            />
          </Box>
        </Box>
        <Divider border={`1.2px solid ${color}`} />
        <Flex
          maxWidth="900px"
          alignItems="center"
          gap={width < 600 ? "2em" : "10em"}
          m="10"
          align="center"
          justify="center"
          flexDir={width < 600 ? "column" : "row"}
        >
          <Box>
            <Flex align="center">
              <Heading p="4">{event?.organization?.name}</Heading>
              <IconButton
                bg="transparent"
                aria-label="organization page"
                icon={<InfoOutlineIcon />}
                onClick={() =>
                  navigate(`/or_ganizationdetail/${event?.organization?._id}`)
                }
              />
            </Flex>
            <Text p="1em">{event?.organization?.description}</Text>
          </Box>
          <Box>
            <Image w="1000px" src={event?.organization?.image} rounded="10" />
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
};
