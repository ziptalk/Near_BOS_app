import { useEffect, useState } from "react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import Web3 from "web3";

const ConnectMetamaskModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [web3, setWeb3] = useState(null);

  const connectMetamask = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new Web3(window.ethereum);
        setWeb3(provider);
      } else {
        alert("Please install Metamask extension to connect to Ethereum network.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setWeb3(new Web3(window.ethereum));
  }, []);

  return (
    <>
      {!web3 ? <Button onClick={onOpen}>Connect Metamask</Button> : <Button onClick={onOpen}>Connected</Button>}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="rgba(0, 0, 0, 0.9)">
          <ModalHeader color="white">Connect Metamask Wallet</ModalHeader>
          <ModalBody color="white">
            {!web3 ? (
              <>
                <p color="white">To use this feature, you need to connect to your Metamask wallet.</p>
                <Button onClick={connectMetamask}>Connect Metamask</Button>
              </>
            ) : (
              <p color="white">Connected wallet.</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConnectMetamaskModal;
