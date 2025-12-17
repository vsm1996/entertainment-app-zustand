import type React from "react"
import Navbar from "@/component/ui/navbar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-blue-950 text-white flex flex-col md:flex-row min-h-screen font-[family-name:var(--font-outfit)]">
      <Navbar />
      {children}
    </div>
  )
}
