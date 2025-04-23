import { redirect } from "next/navigation"

// This layout will be used for all authentication-related routes
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Here you would check if the user is already authenticated
  // If they are, redirect them to the dashboard
  // For now, we'll just render the children
  // In a real app, you would implement authentication logic here
  
  // Example of how you might check authentication:
  // const isAuthenticated = checkAuthStatus();
  // if (isAuthenticated) {
  //   redirect("/dashboard");
  // }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4 py-8">
        {children}
      </div>
    </div>
  )
} 