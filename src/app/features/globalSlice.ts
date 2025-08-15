import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState = {
  isOpenCartDrawer: false,
  onOpenCartDrawer: false,
  onCloseCartDrawer: false,
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    onOpenCartDrawer: (state) => {
      state.onOpenCartDrawer = true
      state.isOpenCartDrawer = true
    },
    onCloseCartDrawer: (state) => {
      state.onCloseCartDrawer = false
      state.isOpenCartDrawer = false
    }
  }
})

export const {onOpenCartDrawer, onCloseCartDrawer} = globalSlice.actions
export const selectGlobal = (state: RootState) => state.global
export default globalSlice.reducer