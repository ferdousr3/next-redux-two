'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store/store'
import { logout } from '@/lib/features/auth/slice'
import { Button } from '@/components/ui/button'
import {
   LayoutDashboard,
   FileText,
   Package,
   Users,
   StickyNote,
   Settings,
   LogOut,
} from 'lucide-react'

const sidebarItems = [
   { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
   { name: 'Posts', href: '/dashboard/posts', icon: FileText },
   { name: 'Products', href: '/dashboard/products', icon: Package },
   { name: 'Lawyers', href: '/dashboard/lawyers', icon: Users },
   { name: 'Notes', href: '/dashboard/notes', icon: StickyNote },
   { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

interface SidebarProps {
   open: boolean
   onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
   const pathname = usePathname()
   const router = useRouter()
   const dispatch = useDispatch<AppDispatch>()
   const { user } = useSelector((state: RootState) => state.auth)

   const handleLogout = async () => {
      await dispatch(logout())
      router.push('/')
   }

   return (
      <aside
         className={`fixed top-0 left-0 z-30 h-full w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
            open ? 'translate-x-0' : '-translate-x-full'
         }`}
      >
         <div className="flex flex-col h-full">
            <div className="p-6 border-b">
               <Link href="/dashboard" className="text-xl font-bold text-gray-900">
                  ManageX
               </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1">
               {sidebarItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                     <Link
                        key={item.name}
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                           isActive
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                     >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                     </Link>
                  )
               })}
            </nav>

            <div className="p-4 border-t">
               <div className="flex items-center gap-3 px-4 py-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                     <span className="text-sm font-medium text-emerald-700">
                        {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                     </span>
                  </div>
                  <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium text-gray-900 truncate">
                        {user?.firstName} {user?.lastName}
                     </p>
                     <p className="text-xs text-gray-500 truncate">
                        {user?.email || ''}
                     </p>
                  </div>
               </div>
               <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
               >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
               </Button>
            </div>
         </div>
      </aside>
   )
}
