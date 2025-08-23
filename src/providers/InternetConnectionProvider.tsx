import { useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BsWifiOff } from "react-icons/bs";

interface IProps {
  children: ReactNode;
}

const InternetConnectionProvider = ({children}: IProps) => {
  const [isOnline, setIsOnline] = useState(true);
  const toast = useToast();
  const toastRef = useRef();
  const

  function addToast() {
    toastRef.current = toast({
      title: "You're offline.",
      description: "Please check your internet connection.",
      status: "warning",
      duration: null,
      isClosable: true,
      icon: <BsWifiOff />,
    });
  }

  function closeAll() {
    toast.closeAll(toastRef.current);
  }

  useEffect(() => {
    window.addEventListener("online", () => {
      setIsOnline(true);
      closeAll();
    });
    window.addEventListener("offline", () => {
      setIsOnline(false);
      addToast();
    });
  }, []);


  if (!isOnline) {
    return <>{children}</>;
  }

  return children;
};

export default InternetConnectionProvider;