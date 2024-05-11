import { Stack, Divider, Image, useColorModeValue } from "@chakra-ui/react";
export const FigureOrg = ({ organization }) => {
  const bg = useColorModeValue("#f6f3e0", "#173F4B");
  const color = useColorModeValue("#173F4B", "#f6f3e0");
  return (
    <Stack bg={bg} color={color} gap="5">
      <Image
        src={organization?.image}
        rounded="10"
        alt="organization image"
        className="imageUser"
        maxW="400px"
      />
      <h4>Email: {organization?.email}</h4>
      <Divider borderColor={"#173F4B"} />
    </Stack>
  );
};
