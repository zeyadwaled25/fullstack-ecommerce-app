import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { type ReactNode, type RefObject } from "react";

interface IProps {
  isOpen: boolean,
  onClose: () => void,
  title: string,
  cancelTxt?: string,
  okTxt?: string,
  children: ReactNode,
  initialRef: RefObject<null>,
  onOkClick: () => void,
  isLoading: boolean,
}

const CustomModal = ({isOpen, onClose, children, title, cancelTxt = "Cancel", okTxt = "Done", initialRef, onOkClick, isLoading}: IProps) => {
  return (
    <Modal
      initialFocusRef={initialRef}
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset='slideInBottom'
    >
      <ModalOverlay
        bg='blackAlpha.500'
        backdropFilter='blur(10px) hue-rotate(22deg)' />
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
          <Button colorScheme='blue' onClick={onOkClick} isLoading={isLoading}>{okTxt}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;