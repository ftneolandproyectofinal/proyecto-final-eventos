import { Avatar, AvatarGroup, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const AvatarFollowers = ({ organization, isFollowing }) => {
  const [followersArray, setFollowersArray] = useState([]);
  useEffect(() => {
    setFollowersArray(organization?.usersFav);
  }, [organization.usersFav, isFollowing]);

  return organization?.usersFav?.length > 0 ? (
    <Box m="10">
      <Text pr="1em" letterSpacing="1px" m="5">
        Seguidores:
      </Text>
      <AvatarGroup size="md" max={3}>
        {followersArray?.map((follower) => (
          <Avatar
            name={follower?.name}
            src={follower?.image}
            key={follower?._id}
          />
        ))}
      </AvatarGroup>
    </Box>
  ) : null;
};
