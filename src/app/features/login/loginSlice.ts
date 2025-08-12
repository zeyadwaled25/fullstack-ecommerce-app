import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { createStandaloneToast } from '@chakra-ui/react'

const {toast} = createStandaloneToast()

export interface ILoginPayload {
  identifier: string
  password: string
}

export interface ILoginResponse {
  jwt: string
  user: {
    id: number
    username: string
    email: string
  }
}

export interface ILoginState {
  loading: boolean
  data: ILoginResponse | null
  error: string | null
}

const initialState: ILoginState = {
  loading: false,
  data: null,
  error: null,
}

export const userLogin = createAsyncThunk<
  ILoginResponse,
  ILoginPayload,
  { rejectValue: string }
>(
  'login/userLogin',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<ILoginResponse>(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/local`,
        user
      )
      return data
    } catch (err) {
      const error = err as AxiosError<{ error?: { message?: string } }>
      return rejectWithValue(error.response?.data?.error?.message || 'Login failed')
    }
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
        state.loading = false
        state.data = action.payload
        state.error = null
        toast({
          title: 'Logged in successfully.',
          status: 'success',
          duration: 2500,
          isClosable: true,
        })
      })
      .addCase(userLogin.rejected, (state, action) => {
        console.log(action);
        
        state.loading = false
        state.data = null
        state.error = action.payload || 'Unknown Error'
        toast({
          title: action.payload,
          description: "Make sure you have the correct Email or Password",
          status: 'error',
          duration: 2500,
          isClosable: true,
        })
      })
  },
})

export const selectLogin = (state: { login: ILoginState }) => state.login
export default loginSlice.reducer
