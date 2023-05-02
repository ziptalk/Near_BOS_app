import { Box, Heading, Text } from "@chakra-ui/react";

const Main = () => {
  return (
    <Box textAlign="center">
      <Heading as="h1" mb={4}>
        Near BOS Defi Collector
      </Heading>
      <Text fontSize="xl" mb={4}>
        A project that aims to simplify access to various DeFi platforms by aggregating them on a single webpage. Users can easily access different DeFi
        platforms without having to navigate to multiple websites.
      </Text>
    </Box>
  );
};

export default Main;
