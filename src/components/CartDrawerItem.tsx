import { Button, Divider, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import type { IProduct } from "../interfaces";
import { removeFromCart } from "../app/features/cart/cartSlice";

const CartDrawerItem = ({ id, thumbnail, title, price, quantity }: IProduct) => {
  const dispatch = useDispatch()

  return (
    <>
      <Flex alignItems="center" mb={3} py={2}>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${thumbnail.url}`}
          alt={title}
          mr={5}
          h="60px"
          w="60px"
          rounded="full"
          objectFit="cover"
        />
        <Stack flexGrow={"1"}>
          <Flex justifyContent={"space-between"}>
            <Text fontSize="sm">{title}</Text>
            <Text fontSize="sm">Price: ${price}</Text>
          </Flex>
          <Text fontSize="sm">Quantity: {quantity}</Text>
          <Button variant="outline" colorScheme="red" size="sm" w="fit-content"
            onClick={() => {dispatch(removeFromCart(id))}}>
            Remove
          </Button>
        </Stack>
      </Flex>

      <Divider/>
    </>
  )
};

export default CartDrawerItem;