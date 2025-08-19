import { 
  AlertDialog, 
  AlertDialogBody, 
  AlertDialogContent, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogOverlay, 
  Button 
} from "@chakra-ui/react"
import { useRef } from "react"

interface IProps {
  isOpen: boolean,
  onClose: () => void,
  title: string,
  description: string,
  cancelTxt?: string,
  okTxt?: string,
  onOkHandler: (dID: string) => void,
  deleteId: string,
}

export default function CustomAlertDialog({
  isOpen,
  onClose,
  title,
  description,
  cancelTxt = "Cancel",
  okTxt = "Ok",
  onOkHandler,
  deleteId
}: IProps) {
  const cancelRef = useRef(null)

  return (
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
            <Button 
              colorScheme='red' 
              ml={3}
              onClick={() => onOkHandler(deleteId)}
            >
              {okTxt}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
