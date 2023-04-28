import { useState } from "react";
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

  return (
    <>
      <Button onClick={onOpen}>Connect Metamask</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="rgba(0, 0, 0, 0.5)">
          <ModalHeader>Connect Metamask Wallet</ModalHeader>
          <ModalBody>
            {!web3 ? (
              <>
                <p>To use this feature, you need to connect to your Metamask wallet.</p>
                <Button onClick={connectMetamask}>Connect Metamask</Button>
              </>
            ) : (
              <p>Connected to Metamask wallet.</p>
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
