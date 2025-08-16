import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IProduct } from '../../../interfaces'
import type { RootState } from '../../store'
import { addItemToShoppingCart } from '../../../utils'

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
    }
  }
})

export const {addToCart} = cartSlice.actions
export const selectCart = (state: RootState) => state.cart
export default cartSlice.reducer
