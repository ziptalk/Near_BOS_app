import { Box, Heading, Text } from "@chakra-ui/react";

const Contact = () => {
  return (
    <Box textAlign="center">
      <Heading as="h1" mb={4}>
        Contact
      </Heading>
      <Text fontSize="xl" mb={4}>
        Email: contact@blockwavelabs.io <br />
        Website:
        <a href="https://www.blockwavelabs.io/contact" target="_blank">
          BlockwaveLabs
        </a>
      </Text>
    </Box>
  );
};

export default Contact;
