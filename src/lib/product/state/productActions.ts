import { createAsyncThunk } from '@reduxjs/toolkit'
import { productApi } from '../productApi'
import { Product, ProductInput, ProductQuery } from '../model/product.model'

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
