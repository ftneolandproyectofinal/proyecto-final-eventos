import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  LightMode,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { getOrgById } from "../../../services/org.service";
import { OrgNextEvents } from "../../../components/OrgNextEvents/OrgNextEvents";
import { useFollowOrg } from "../../../hooks/User Hooks/useFollowOrg";
import { AvatarFollowers } from "../../../components";
import useWidth from "../../../hooks/useWidth";

export const OrganizationDetail = () => {
  const { id } = useParams();
  const [organization, setOrganization] = useState({});
  const { isFollowing, handleFollow, isLoadingFollow } = useFollowOrg(id);
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const bgh = useColorModeValue("#b6e9e9dd", "#173F4Baa");
  const colorh = useColorModeValue("black", "#F4FAFF");
  const bgatt = useColorModeValue("#3be1cd", "#3be1cd");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  const { width } = useWidth();

  useEffect(() => {
    (async () => setOrganization(await getOrgById(id)))();
  }, [id, isFollowing]);

  return (
    <Box bg={bg} color={color} minH="92.9vh" p="10">
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
            {organization.name}
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
            {organization.events?.length
              ? organization.events?.length > 1
                ? "Con " + organization.events?.length + " eventos organizados"
                : "Con un evento organizado"
              : "¡Estate atento para cuando organize su primer evento!"}
          </Heading>

          <Heading
            fontSize={width < 500 ? "8px" : width < 650 ? "12px" : "17px"}
            bg={bgh}
            size="lg"
            rounded="7"
            position="absolute"
            p="10px"
            bottom="0"
            right="0"
            m="2"
          >
            {"Contáctanos en: " + organization.email}
          </Heading>

          <Image
            rounded="10"
            src={organization.image}
            alt={organization.name}
            onError={(e) => {
              e.target.src =
                "https://res.cloudinary.com/dhr13yihn/image/upload/v1693994819/proyectoEventland/eventAssets/Illustration_of_a_group_of_people_all_feeling_different_emotions_dzvspy.jpg";
            }}
            width="500px"
          />
        </Box>
        <Flex maxWidth="900px" p="2" align="center" gap="6em">
          {organization.description}
          <Box align="center" p="5">
            <LightMode>
              <Button
                bg={bgatt}
                onClick={handleFollow}
                isLoading={isLoadingFollow}
              >
                {isFollowing ? "Dejar de seguir" : "Seguir"}
              </Button>
            </LightMode>
            <AvatarFollowers
              organization={organization}
              isFollowing={isFollowing}
            />
          </Box>
        </Flex>
        <Divider border={`1.2px solid ${color}`} />
      </Stack>
      <OrgNextEvents />
    </Box>
  );
};
