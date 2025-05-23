import { redirect } from "next/navigation"
import { SiteHeader } from "@/components/site-header"

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
    </div>
  )
} 