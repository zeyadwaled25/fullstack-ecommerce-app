import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { useRef } from "react"

interface IProps {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  title: string,
  description: string,
  cancelTxt?: string,
  okTxt?: string,
}

export default function CustomAlertDialog({isOpen, onClose, title, description, cancelTxt= "Cancel", okTxt= "Ok"}: IProps) {
  const cancelRef = useRef(null)

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>
              {description}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {cancelTxt}
              </Button>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                {okTxt}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}