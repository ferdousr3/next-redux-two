import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authApi, AuthUser, LoginCredentials, RegisterData, AuthResponse } from './api'

export interface AuthState {
   user: AuthUser | null
   accessToken: string | null
   refreshToken: string | null
   isAuthenticated: boolean
   loading: boolean
   error: string | null
}

// Initial state must be safe for SSR (no localStorage access on init unless in effect)
// For Redux in Next.js, we often initialize with defaults and hydrate from client.
// However, to keep it simple and working with the ported logic, we will check window.
const initialState: AuthState = {
   user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,
   accessToken: typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
   refreshToken: typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null,
   isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('accessToken') : false,
   loading: false,
   error: null,
}

export const login = createAsyncThunk(
   'auth/login',
   async (credentials: LoginCredentials, { rejectWithValue }) => {
      try {
         const response = await authApi.login(credentials)
         // Save to localStorage
         if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', response.accessToken)
            localStorage.setItem('refreshToken', response.refreshToken)
            localStorage.setItem('user', JSON.stringify(response.user))
            localStorage.setItem('auth_token', response.accessToken)
         }
         return response
      } catch (error: any) {
         const message = error.response?.data?.message || 'Login failed. Please check your credentials.'
         return rejectWithValue(message)
      }
   }
)

export const register = createAsyncThunk(
   'auth/register',
   async (data: RegisterData, { rejectWithValue }) => {
      try {
         return await authApi.register(data)
      } catch (error: any) {
         const message = error.response?.data?.message || 'Registration failed. Please try again.'
         return rejectWithValue(message)
      }
   }
)

export const logout = createAsyncThunk('auth/logout', async () => {
   if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      localStorage.removeItem('auth_token')
   }
   return null
})

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      clearError: (state) => {
         state.error = null
      },
      setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
         state.accessToken = action.payload.accessToken
         state.refreshToken = action.payload.refreshToken
         if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', action.payload.accessToken)
            localStorage.setItem('refreshToken', action.payload.refreshToken)
            localStorage.setItem('auth_token', action.payload.accessToken)
         }
      },
      setCredentials: (state, action: PayloadAction<{ user: AuthUser; accessToken: string; refreshToken: string }>) => {
         state.user = action.payload.user
         state.accessToken = action.payload.accessToken
         state.refreshToken = action.payload.refreshToken
         state.isAuthenticated = true
         if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            localStorage.setItem('accessToken', action.payload.accessToken)
            localStorage.setItem('refreshToken', action.payload.refreshToken)
            localStorage.setItem('auth_token', action.payload.accessToken)
         }
      },
   },
   extraReducers: (builder) => {
      builder
         // Login
         .addCase(login.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
         })
         .addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Register
         .addCase(register.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(register.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(register.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         // Logout
         .addCase(logout.fulfilled, (state) => {
            state.user = null
            state.accessToken = null
            state.refreshToken = null
            state.isAuthenticated = false
         })
   },
})

export const { clearError, setTokens, setCredentials } = authSlice.actions
export default authSlice.reducer
