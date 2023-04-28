import { Flex } from "@chakra-ui/react";
import Lido from "./lido/lido";
import Navbar from "@/components/NavBar";
import Sidebar from "@/components/SideBar";
import styled from "styled-components";
import Contents from "./contents";
import ConnectMetamaskModal from "@/components/ConnectWalletModal";

export default function Home() {
  return (
    <Flex direction="column" height="150vh" backgroundColor="#F0FFFF">
      <Navbar />
      <Sidebar />
      <Contents />
    </Flex>
  );
}
