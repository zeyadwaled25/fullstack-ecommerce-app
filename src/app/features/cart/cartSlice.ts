import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IProduct } from '../../../interfaces'

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
      state.cartProducts = [...state.cartProducts, action.payload]
    }
  }
})

export const {addToCart} = cartSlice.actions
export default cartSlice.reducer
