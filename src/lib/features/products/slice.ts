import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { productApi } from './api'
import { Product, ProductInput, ProductQuery } from '@/types/product'

// Thunks
export const fetchProducts = createAsyncThunk('products/fetchAll', async (query: ProductQuery | undefined, { rejectWithValue }) => {
   try {
      return await productApi.getAllProducts(query)
   } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products')
   }
})

export const fetchProduct = createAsyncThunk('products/fetchOne', async (id: string, { rejectWithValue }) => {
   try {
      return await productApi.getProduct(id)
   } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product')
   }
})

export const createProduct = createAsyncThunk('products/create', async (data: ProductInput, { rejectWithValue }) => {
   try {
      return await productApi.createProduct(data)
   } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create product')
   }
})

export const updateProduct = createAsyncThunk('products/update', async ({ id, data }: { id: string; data: Partial<Product> }, { rejectWithValue }) => {
   try {
      return await productApi.updateProduct(id, data)
   } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update product')
   }
})

export const deleteProduct = createAsyncThunk('products/delete', async (id: string, { rejectWithValue }) => {
   try {
      return await productApi.deleteProduct(id)
   } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete product')
   }
})

export const fetchCategories = createAsyncThunk('products/fetchCategories', async (_, { rejectWithValue }) => {
   // Placeholder - assuming similar API structure if needed
   return []
})


interface ProductState {
   products: Product[]
   selectedProduct: Product | null
   categories: string[] // legacy
   loading: boolean
   creating: boolean
   updating: boolean
   deleting: string | null
   error: string | null
   query: ProductQuery
   total: number
   initialized: boolean
}

const initialState: ProductState = {
   products: [],
   selectedProduct: null,
   categories: [],
   loading: false,
   creating: false,
   updating: false,
   deleting: null,
   error: null,
   query: {
      page: 1,
      size: 12,
   },
   total: 0,
   initialized: false,
}

const productSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      setQuery: (state, action: PayloadAction<Partial<ProductQuery>>) => {
         state.query = { ...state.query, ...action.payload }
      },
      setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
         state.selectedProduct = action.payload
      },
      clearError: (state) => {
         state.error = null
      },
      clearProducts: (state) => {
         state.products = []
         state.initialized = false
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload.products
            state.total = action.payload.total
            state.initialized = true
         })
      // ... implementations for other thunks, omitting for brevity but should be there
   },
})

export const { setQuery, setSelectedProduct, clearError, clearProducts } = productSlice.actions
export default productSlice.reducer
