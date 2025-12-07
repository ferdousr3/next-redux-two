import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product, ProductQuery } from '../model/product.model'
import { fetchProducts, fetchProduct, createProduct, updateProduct, deleteProduct, fetchCategories } from './productActions'

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
         .addCase(fetchProducts.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload.products
            state.total = action.payload.total
            state.initialized = true
         })
         .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         .addCase(fetchProduct.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchProduct.fulfilled, (state, action) => {
            state.loading = false
            state.selectedProduct = action.payload
         })
         .addCase(fetchProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
         })
         .addCase(createProduct.pending, (state) => {
            state.creating = true
            state.error = null
         })
         .addCase(createProduct.fulfilled, (state) => {
            state.creating = false
         })
         .addCase(createProduct.rejected, (state, action) => {
            state.creating = false
            state.error = action.payload as string
         })
         .addCase(updateProduct.pending, (state) => {
            state.updating = true
            state.error = null
         })
         .addCase(updateProduct.fulfilled, (state) => {
            state.updating = false
         })
         .addCase(updateProduct.rejected, (state, action) => {
            state.updating = false
            state.error = action.payload as string
         })
         .addCase(deleteProduct.pending, (state, action) => {
            state.deleting = action.meta.arg
            state.error = null
         })
         .addCase(deleteProduct.fulfilled, (state) => {
            state.deleting = null
         })
         .addCase(deleteProduct.rejected, (state, action) => {
            state.deleting = null
            state.error = action.payload as string
         })
   },
})

export const { setQuery, setSelectedProduct, clearError, clearProducts } = productSlice.actions
export default productSlice.reducer
