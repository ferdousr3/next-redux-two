'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/store/store"
import { logout } from "@/lib/features/auth/slice"
import { ArrowRight, Menu, X, LayoutDashboard, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Lawyers", href: "/lawyers" },
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
    <nav className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-slate-900 font-semibold tracking-tight text-lg">
            VERITAS.
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
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

        <div className="hidden md:flex items-center gap-4">
          {showAuth ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-emerald-700">
                      {user?.firstName?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {user?.firstName || "User"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 cursor-pointer"
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
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-full transition-all shadow-lg shadow-slate-200/50 flex items-center gap-2 group"
              >
                Register
                <ArrowRight
                  className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                  strokeWidth={1.5}
                />
              </Link>
            </>
          )}
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
