import { createStandaloneToast } from "@chakra-ui/react";
import type { IProduct } from "../interfaces";

export const formattedPrice = (price: number | null | undefined): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price ?? 0);
};

const {toast} = createStandaloneToast()
export const addItemToShoppingCart = (cartItem: IProduct, cartItems: IProduct[] = []) => {
  const existsItem = cartItems.find(item => item.id === cartItem.id);

  if (existsItem) {
    toast({
      title: "Added to your Cart.",
      description: "This item already exists, the quantity will be increased.",
      status: "success",
      duration: 2500,
      isClosable: true
    })
    return cartItems.map(item => item.id === cartItem.id ? {...item, quantity: item.quantity + 1} : item);
  }

  toast({
      title: "Added to your Cart.",
      status: "success",
      duration: 2500,
      isClosable: true
    })
  return [...cartItems, {...cartItem, quantity: 1}];
};