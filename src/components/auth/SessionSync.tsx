'use client';

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setCredentials } from "@/lib/features/auth/slice"
import { AuthUser } from "@/lib/features/auth/api"

export default function SessionSync() {
   const { data: session } = useSession()
   const dispatch = useDispatch()

   useEffect(() => {
      if (session?.user && session?.accessToken && session?.refreshToken) {
         // Sync session to Redux
         // Note: session.user might not have all fields if not properly mapped in callbacks
         // But we passed full user object in authorize() so it should involve casting if needed

         const user = session.user as unknown as AuthUser // Cast assuming we passed AuthUser structure

         dispatch(setCredentials({
            user,
            accessToken: session.accessToken as string,
            refreshToken: session.refreshToken as string
         }))
      }
   }, [session, dispatch])

   return null
}
