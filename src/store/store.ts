import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/lib/features/auth/slice'
import lawyerReducer from '@/lib/features/lawyers/slice'
import notesReducer from '@/lib/features/notes/slice'
import postReducer from '@/lib/features/posts/slice'
import productReducer from '@/lib/features/products/slice'
export const store = configureStore({
   reducer: {
      auth: authReducer,
      lawyers: lawyerReducer,
      notes: notesReducer,
      posts: postReducer,
      products: productReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            // Ignore these action types
            ignoredActions: [
               'lawyers/fetchLawyers/fulfilled',
               'notes/fetchNotes/fulfilled',
               'posts/fetchPosts/fulfilled',
               'products/fetchProducts/fulfilled',
            ],
         },
      }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
