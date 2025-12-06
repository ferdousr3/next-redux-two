import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}
