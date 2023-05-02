import { Box, Heading, Text } from "@chakra-ui/react";

const About = () => {
  return (
    <Box textAlign="center">
      <Heading as="h1" mb={4}>
        Description
      </Heading>
      <Text fontSize="xl" mb={4}>
        Near BOS Defi Collector is a project that aims to simplify access to various DeFi platforms by aggregating them on a single webpage. Users can easily
        access different DeFi platforms without having to navigate to multiple websites.
      </Text>
      <Heading as="h1" mb={4}>
        Future Plans
      </Heading>
      <Text fontSize="xl" mb={4}>
        In addition to Lido, the project aims to integrate other popular DeFi platforms such as Uniswap, Compound, and Aave. The team also plans to add
        additional features such as portfolio tracking and yield farming tools to further enhance the user experience.
      </Text>
    </Box>
  );
};

export default About;
