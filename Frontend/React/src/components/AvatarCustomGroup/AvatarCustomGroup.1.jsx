import { Avatar, AvatarGroup, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const AvatarCustomGroup = ({ event, isEventAttended }) => {
  const [usersArray, setUsersArray] = useState([]);
  useEffect(() => {
    setUsersArray(event.usersAttend);
  }, [event.usersAttend, isEventAttended]);

  return event?.usersAttend?.length > 0 ? (
    <Box m="10">
      <Text pr="1em" letterSpacing="1px" m="5">
        Asistentes:
      </Text>
      <AvatarGroup size="md" max={3}>
        {usersArray?.map((user) => (
          <Avatar name={user?.name} src={user?.image} key={user?._id} />
        ))}
      </AvatarGroup>
    </Box>
  ) : null;
};
