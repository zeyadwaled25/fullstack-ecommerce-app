import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { onCloseCartDrawer, selectGlobal } from "../app/features/globalSlice";
import { useRef } from "react";
import CartDrawerItem from "./CartDrawerItem";
import { selectCart } from "../app/features/cart/cartSlice";

const CartDrawer = () => {
  const {isOpenCartDrawer} = useSelector(selectGlobal)
  const {cartProducts} = useSelector(selectCart)
  const dispatch = useDispatch();
  const btnRef = useRef(null)

  const onClose = () => {
    dispatch(onCloseCartDrawer())
  }

  return (
    <Drawer
        isOpen={isOpenCartDrawer}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            {
              cartProducts.map(item => (
                <CartDrawerItem key={item.id} {...item} />
              ))
            }
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' colorScheme="red" mr={3} onClick={() => {}}>
              Clear All
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  );
}

export default CartDrawer;