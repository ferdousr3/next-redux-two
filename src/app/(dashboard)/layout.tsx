'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
         {/* Mobile sidebar toggle */}
         <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b px-4 py-3 flex items-center justify-between">
            <span className="font-semibold text-gray-900">ManageX</span>
            <Button
               variant="ghost"
               size="icon"
               onClick={() => setSidebarOpen(!sidebarOpen)}
            >
               {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
         </div>

         {/* Sidebar Component */}
         <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

         {/* Main content */}
         <main className="lg:pl-64 pt-16 lg:pt-0">
            <div className="p-6">
               {children}
            </div>
         </main>

         {/* Mobile overlay */}
         {sidebarOpen && (
            <div
               className="fixed inset-0 z-20 bg-black/50 lg:hidden"
               onClick={() => setSidebarOpen(false)}
            />
         )}
      </div>
    </ProtectedRoute>
  )
}
