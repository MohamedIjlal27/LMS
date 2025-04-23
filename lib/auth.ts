"use server"

import { cookies } from "next/headers"

// This is a simple authentication utility
// In a real application, you would want to use a proper authentication system
// like NextAuth.js, Auth.js, or a custom solution with JWT or session-based auth

export async function login(email: string, password: string) {
  // In a real application, you would validate credentials against a database
  // For this example, we'll use a mock authentication
  
  // Mock authentication - in a real app, this would be a database check
  if (email === "admin@example.com" && password === "password") {
    // Set a cookie with a token
    const cookieStore = await cookies()
    cookieStore.set("token", "mock-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })
      
    return { success: true }
  }
  
  return { success: false, error: "Invalid credentials" }
}

export async function logout() {
  // Delete the token cookie
  const cookieStore = await cookies()
  cookieStore.delete("token")
  
  return { success: true }
}

export async function checkAuth() {
  // Check if the user is authenticated
  const cookieStore = await cookies()
  const token = cookieStore.get("token")
  
  return !!token
}

export async function getUser() {
  // In a real application, you would decode the token and get the user data
  // For this example, we'll return a mock user
  
  const cookieStore = await cookies()
  const token = cookieStore.get("token")
  
  if (!token) {
    return null
  }
  
  // Mock user data
  return {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  }
} 