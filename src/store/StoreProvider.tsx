'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
type AppStore = typeof store

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>(null)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store
  }

  return (
    <SessionProvider>
      <Provider store={storeRef.current}>
        <SessionSync />
        {children}
      </Provider>
    </SessionProvider>
  )
}

import { SessionProvider } from "next-auth/react"
import SessionSync from "@/components/auth/SessionSync"
