import { Flex, Image } from "@chakra-ui/react";

export const Navbar = () => {
  return (
    <Flex p={3} bg="#ec1d24" w="100%">
      <Image src="logo.png" w="100px" />
    </Flex>
  );
};
