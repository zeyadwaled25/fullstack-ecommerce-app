import { useToast } from "@chakra-ui/react";
import { useEffect, useRef, type ReactNode } from "react";
import { BsWifiOff } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { networkMode } from "../app/features/networkSlice";

interface IProps {
  children: ReactNode;
}

const InternetConnectionProvider = ({children}: IProps) => {
  const toast = useToast();
  const toastRef = useRef();
  const dispatch = useDispatch();

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

  const setOnline = () => {
    dispatch(networkMode(true));
    closeAll();
  }
  const setOffline = () => {
    dispatch(networkMode(false));
    addToast();
  }

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);
    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return children;
};

export default InternetConnectionProvider;