import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { postApi } from './api'
import { Post, PostInput, PostQuery } from '@/types/post'

// Define Thunks first
export const fetchPosts = createAsyncThunk(
   'posts/fetchAll',
   async (query: Partial<PostQuery> | undefined, { rejectWithValue }) => {
      try {
         return await postApi.getAllPosts(query)
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to load posts')
      }
   }
)

export const fetchPost = createAsyncThunk(
   'posts/fetchOne',
   async (id: string, { rejectWithValue }) => {
      try {
         return await postApi.getPost(id)
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to load post')
      }
   }
)

export const createPost = createAsyncThunk(
   'posts/create',
   async (data: PostInput, { rejectWithValue }) => {
      try {
         return await postApi.createPost(data)
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to create post')
      }
   }
)

export const updatePost = createAsyncThunk(
   'posts/update',
   async ({ id, data }: { id: string; data: Partial<Post> }, { rejectWithValue }) => {
      try {
         return await postApi.updatePost(id, data)
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to update post')
      }
   }
)

export const deletePost = createAsyncThunk(
   'posts/delete',
   async (id: string, { rejectWithValue }) => {
      try {
         await postApi.deletePost(id)
         return id
      } catch (error: any) {
         return rejectWithValue(error.response?.data?.message || 'Failed to delete post')
      }
   }
)

interface PostState {
   posts: Post[]
   selectedPost: Post | null
   loading: boolean
   creating: boolean
   updating: boolean
   deleting: string | null
   error: string | null
   query: PostQuery
   initialized: boolean
}

const initialState: PostState = {
   posts: [],
   selectedPost: null,
   loading: false,
   creating: false,
   updating: false,
   deleting: null,
   error: null,
   query: {
      page: 1,
      limit: 10,
   },
   initialized: false,
}

const postSlice = createSlice({
   name: 'posts',
   initialState,
   reducers: {
      setQuery: (state, action: PayloadAction<Partial<PostQuery>>) => {
         state.query = { ...state.query, ...action.payload }
      },
      setSelectedPost: (state, action: PayloadAction<Post | null>) => {
         state.selectedPost = action.payload
      },
      clearError: (state) => {
         state.error = null
      },
      clearPosts: (state) => {
         state.posts = []
         state.initialized = false
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload
            state.initialized = true
         })
         .addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false
            state.selectedPost = action.payload
         })
         .addCase(createPost.fulfilled, (state, action) => {
            state.creating = false
            state.posts = [action.payload, ...state.posts]
         })
         .addCase(updatePost.fulfilled, (state, action) => {
            state.updating = false
            const index = state.posts.findIndex((p) => p.id === action.payload.id)
            if (index !== -1) {
               state.posts[index] = action.payload
            }
         })
         .addCase(deletePost.fulfilled, (state, action) => {
            state.deleting = null
            state.posts = state.posts.filter((p) => p.id !== action.payload)
         })
      // Add pending/rejected cases as needed...
   },
})

export const { setQuery, setSelectedPost, clearError, clearPosts } = postSlice.actions
export default postSlice.reducer
