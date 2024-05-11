import { Image, Stack, useColorModeValue } from "@chakra-ui/react";
export const FigureUser = (user) => {
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  return (
    <Stack bg={bg} color={color} gap="5">
      <Image
        rounded="10"
        src={user.user.image}
        alt="user image"
        className="imageUser"
      />
      <h4 className="emailUser">Email: {user.user.email}</h4>
    </Stack>
  );
};
