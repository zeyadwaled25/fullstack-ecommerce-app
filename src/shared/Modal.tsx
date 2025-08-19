import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface IProps {
  isOpen: boolean,
  onClose: () => void,
  title: string,
  cancelTxt?: string,
  okTxt?: string,
  children: ReactNode
}

const CustomModal = ({isOpen, onClose, children, title, cancelTxt = "Cancel", okTxt = "Done"}: IProps) => {
  return (
    <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            {cancelTxt}
          </Button>
          <Button colorScheme='blue'>{okTxt}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;