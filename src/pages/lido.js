import { Flex } from "@chakra-ui/react";
import Navbar from "@/components/NavBar";
import Sidebar from "@/components/SideBar";
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
