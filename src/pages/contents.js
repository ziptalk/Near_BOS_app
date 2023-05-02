import { Flex } from "@chakra-ui/react";
import Lido from "./lido/lido";
import Main from "./introduction/main";
import About from "./introduction/about";
import Contact from "./introduction/contact";

const Contents = (component) => {
  console.log(component);

  const element = (component) => {
    if (component.component == "main") {
      return <Main />;
    } else if (component.component == "about") {
      return <About />;
    } else if (component.component == "lido") {
      return <Lido />;
    } else if (component.component == "contact") {
      return <Contact />;
    }
  };

  return (
    <Flex width="50%" marginLeft="25%" marginRight="25%" paddingTop="100px" height="100%" display="flex" justifyContent="center">
      {element(component)}
    </Flex>
  );
};

export default Contents;
