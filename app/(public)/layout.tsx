import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

// This layout will be used for all public routes
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
} 