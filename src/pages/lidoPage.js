const { default: Lido } = require("./lido/lido");
import { Flex } from "@chakra-ui/react";
import Navbar from "@/components/NavBar";
import Sidebar from "@/components/SideBar";
import styled from "styled-components";
import Header from "@/components/Header";
import Contents from "./contents";

export default function LidoPage() {
  return (
    <Flex direction="column" height="150vh" backgroundColor="#F0FFFF">
      <Navbar />
      <Sidebar />
      <Contents component="lido"></Contents>
    </Flex>
  );
}
