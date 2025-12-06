'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
   const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth)
   const router = useRouter()
   const pathname = usePathname()

   useEffect(() => {
      // Check localStorage directly for client-side persistence match
      const hasToken = typeof window !== 'undefined' ? !!localStorage.getItem('accessToken') : false

      if (!loading && !isAuthenticated && !hasToken) {
         router.push(`/login?from=${encodeURIComponent(pathname)}`)
      }
   }, [isAuthenticated, loading, router, pathname])

   // While loading or redirecting, you might want to show nothing or a spinner
   // But to avoid hydration mismatch, we might render children if we suspect they are auth'd,
   // or simple null.
   // Given the Redux loading state might be false initially until hydration kicks in,
   // we have to be careful.
   // Ideally, we wait for "initialized" or check storage.

   if (loading) {
       return (
          <div className="flex items-center justify-center min-h-screen">
             <div className="h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
       )
   }

   // Optimistically render if we see token in storage to prevent flash?
   // Or just render children and let effect redirect?
   // Standard approach: if not auth, render nothing or loader.

   return <>{children}</>
}
