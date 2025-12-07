'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/store/store"
import { logout } from "@/lib/features/auth/slice"
import { ArrowRight, Menu, X, LayoutDashboard, LogOut, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Posts", href: "/posts" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLogout = async () => {
    await dispatch(logout())
    router.push("/")
  }

  // Determine if we should show the authenticated view
  // Only show if mounted AND authenticated to prevent hydration mismatch
  const showAuth = isMounted && isAuthenticated

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-slate-900 font-bold tracking-tighter text-2xl font-mono">
            Codian
          </span>
        </Link>

        {/* RIGHT SIDE CONTAINER: Nav Links + Actions */}
        <div className="hidden md:flex items-center gap-8">

            {/* Navigation Links - Now Right Aligned */}
            <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
                {navigation.map((item) => (
                    <Link
                    key={item.name}
                    href={item.href}
                    className="hover:text-emerald-700 transition-colors"
                    >
                    {item.name}
                    </Link>
                ))}
            </div>

            <div className="w-px h-6 bg-slate-200" />

            {/* Actions */}
            <div className="flex items-center gap-4">
            {/* Search Icon */}
            <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <Search className="w-5 h-5" />
            </button>

            {showAuth ? (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 rounded-none hover:bg-slate-100">
                    <div className="h-8 w-8 bg-emerald-100 flex items-center justify-center border border-emerald-200">
                        <span className="text-sm font-bold text-emerald-700 font-mono">
                        {user?.firstName?.charAt(0).toUpperCase() || "U"}
                        </span>
                    </div>
                    <span className="text-sm font-bold text-slate-700 font-mono">
                        {user?.firstName || "User"}
                    </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-none border-slate-200">
                    <DropdownMenuItem asChild className="rounded-none focus:bg-slate-100 cursor-pointer">
                    <Link href="/dashboard" className="flex items-center gap-2 font-mono">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer rounded-none focus:bg-red-50 font-mono"
                    >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <>
                <Link
                    href="/login"
                    className="flex items-center gap-2 text-sm font-bold font-mono text-slate-600 hover:text-emerald-700 transition-colors"
                >
                    Log in
                </Link>
                <Link
                    href="/register"
                    className="relative overflow-hidden bg-slate-900 text-white text-xs font-bold font-mono px-6 py-3 transition-all hover:bg-emerald-600 flex items-center gap-2 group rounded-full"
                >
                    <span className="relative z-10 flex items-center gap-2">
                    Register
                    <ArrowRight
                        className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                        strokeWidth={1.5}
                    />
                    </span>
                </Link>
                </>
            )}
            </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 text-slate-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-6 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              {showAuth ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="block text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-full transition-all text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
