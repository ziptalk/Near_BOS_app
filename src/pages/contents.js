import { Flex } from "@chakra-ui/react";
import Lido from "./lido/lido";

const Contents = (component) => {
  console.log(component);

  const element = (component) => {
    if (component.component == "lido") {
      return <Lido />;
    }
  };

  return (
    <Flex width="50%" marginLeft="25%" marginRight="25%" paddingTop="100px" height="100%" display="flex" justifyContent="center">
      {element(component)}
    </Flex>
  );
};

export default Contents;
