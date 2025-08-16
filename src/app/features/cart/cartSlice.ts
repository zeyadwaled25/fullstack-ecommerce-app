import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IProduct } from '../../../interfaces'
import type { RootState } from '../../store'
import { addItemToShoppingCart } from '../../../utils'
import { createStandaloneToast } from '@chakra-ui/react'

const {toast} = createStandaloneToast()

interface CartState {
  cartProducts: IProduct[]
}

const initialState: CartState = {
  cartProducts: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      state.cartProducts = addItemToShoppingCart(action.payload, state.cartProducts)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartProducts = state.cartProducts.filter(item => item.id != action.payload)
      if (state.cartProducts.length == 0) {
        toast({
          title: "Your cart is empty now.",
          status: "success",
          duration: 2500,
          isClosable: true
        })
      } else {
        toast({
          title: "Removed from your cart.",
          status: "success",
          duration: 2500,
          isClosable: true
        })
      }
    },
    clearCart: (state) => {
      state.cartProducts = []
      toast({
        title: "Your cart is empty now.",
        status: "success",
        duration: 2500,
        isClosable: true
      })
    }
  }
})

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions
export const selectCart = (state: RootState) => state.cart
export default cartSlice.reducer
