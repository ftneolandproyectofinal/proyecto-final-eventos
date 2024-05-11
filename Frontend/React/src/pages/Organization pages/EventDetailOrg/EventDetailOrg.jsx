/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById } from "../../../services/event.service";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AvatarCustomGroup, Countdown } from "../../../components";
import { useDeleteEvent } from "../../../hooks";
import { DeleteIcon } from "@chakra-ui/icons";
import useWidth from "../../../hooks/useWidth";

export const EventDetailOrg = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const bgh = useColorModeValue("#b6e9e9dd", "#173F4Baa");

  const colorh = useColorModeValue("black", "#F4FAFF");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  const { width } = useWidth();

  useEffect(() => {
    (async () => {
      setEvent(await getEventById(id));
    })();
  }, [id]);
  const [isFollowers, setIsFollowers] = useState();
  const { image, name, description } = event;

  return (
    <Box bg={bg} color={color} p="10">
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
          <Flex>
            <Text p="1em" mr="8em">
              {description}
            </Text>
            <ButtonGroup
              onClick={() => useDeleteEvent(navigate, id)}
              size="sm"
              isAttached
              variant="outline"
            >
              <Button border={"1px solid #E53E3E"}>Borrar evento</Button>
              <IconButton
                border={"1px solid #E53E3E"}
                aria-label="Borrar usuario"
                icon={<DeleteIcon color="red" />}
              />
            </ButtonGroup>
          </Flex>
          <AvatarCustomGroup
            event={event}
            isFollowers={isFollowers}
            setIsFollowers={setIsFollowers}
          />
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
              <Avatar src={event?.organization?.image} />
              <Heading p="4">{event?.organization?.name}</Heading>
            </Flex>
            <Text p="1em">{event?.organization?.description}</Text>
          </Box>
          <Box m="10">
            <Text pr="1em" letterSpacing="1px" m="5">
              Seguidores:
            </Text>
            <AvatarGroup size="md" max={3}>
              {event?.organization?.usersFav?.map((user, index) => (
                <Avatar name={user?.name} src={user?.image} key={index} />
              ))}
            </AvatarGroup>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
};
