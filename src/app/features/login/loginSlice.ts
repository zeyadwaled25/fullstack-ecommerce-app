import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { IProductResponse } from '../../../interfaces'

export interface ILoginState {
  loading: boolean;
  data: IProductResponse | null;
  error: string | null;
}

const initialState: ILoginState = {
  loading: false,
  data: null,
  error: null
}

export const userLogin = createAsyncThunk("login/userLogin", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI

  try {
    const {data} = await axios.get<IProductResponse>(`${import.meta.env.VITE_SERVER_URL}/api/auth/local`)
    return data
  } catch (error) {
    return rejectWithValue(error)
  }
}) 

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload as string;
      });
  },
});

export const selectLogin = ({ login }: { login: ILoginState }) => login;
export default loginSlice.reducer;