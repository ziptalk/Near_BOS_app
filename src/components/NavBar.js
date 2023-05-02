import React from "react";
import { Box, Flex, Link, Button, Text } from "@chakra-ui/react";
import ConnectMetamaskModal from "./ConnectWalletModal";

function Navbar() {
  return (
    <Box bg="white" color="black" boxShadow="md" padding="1.5rem">
      <Flex justifyContent="space-between">
        <Text fontSize="5xl" fontWeight="bold" mr={4}>
          BOS Defi Collector
        </Text>
        <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem 0" borderColor="gray.300">
          <Box display={{ base: "block", md: "none" }} onClick={() => {}}>
            <svg fill="black" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0zm0 6h20v2H0zm0 6h20v2H0z" fill="black" />
            </svg>
          </Box>

          <Box display={{ base: "none", md: "flex" }} width={{ base: "full", md: "auto" }} alignItems="center" flexGrow={1}>
            <Link href="/" mr={4} _hover={{ textDecoration: "none" }}>
              Home
            </Link>
            <Link href="/about" mr={4} _hover={{ textDecoration: "none" }}>
              About
            </Link>
            <Link href="/contact" mr={4} _hover={{ textDecoration: "none" }}>
              Contact
            </Link>
          </Box>

          <Box display={{ base: "none", md: "flex" }} alignItems="center" justifyContent="flex-end" flexGrow={1}>
            <ConnectMetamaskModal />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
