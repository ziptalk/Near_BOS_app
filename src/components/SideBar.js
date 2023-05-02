import { useState, useEffect, useRef } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

function Sidebar() {
  const sidebarBgColor = useColorModeValue("gray.100", "gray.800");
  const sidebarWidth = "300px";
  const [sidebarY, setSidebarY] = useState(0);
  const sidebarRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (sidebarRef.current) {
      const sidebar = sidebarRef.current;
      const top = sidebar.getBoundingClientRect().top;
      setSidebarY(top);
    }
  }, [sidebarRef]);

  const handleScroll = () => {
    if (sidebarRef.current) {
      const sidebar = sidebarRef.current;
      const top = sidebar.getBoundingClientRect().top;
      const opacity = 1 - top / window.innerHeight;
      console.log(opacity);
      setSidebarY(top);
      setIsScrolling(true);
      setSidebarOpacity(opacity);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsScrolling(false);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [isScrolling]);

  const sidebarOpacity = isScrolling ? 0.5 : 1;

  return (
    <Box
      id="sidebar"
      position="fixed"
      top="30%"
      marginTop={`-${sidebarWidth} / 2`}
      left={10}
      width={sidebarWidth}
      backgroundColor={sidebarBgColor}
      boxShadow="lg"
      zIndex={10}
      transition="all 0.3s ease-in-out"
      opacity={sidebarOpacity}
      borderRadius="md"
      padding="4"
      textAlign="center"
    >
      <Box fontSize="lg" fontWeight="bold" marginBottom="4">
        Defi lists
      </Box>
      <Box marginBottom="2">
        <Link href="/lido">
          <div>Lido</div>
        </Link>
      </Box>
      <Box marginBottom="2">
        <a href="#">Defi 2</a>
      </Box>
      <Box marginBottom="2">
        <a href="#">Defi 3</a>
      </Box>
      <Box display="flex" justifyContent="center" marginTop="4" borderTop="1px solid" borderColor={useColorModeValue("gray.200", "gray.600")} paddingTop="4">
        <Box marginRight="4">
          <a href="#">Home</a>
        </Box>
        <Box marginRight="4">
          <a href="#">About</a>
        </Box>
        <Box>
          <a href="#">Contact</a>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
