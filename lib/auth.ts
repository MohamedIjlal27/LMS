"use server"

import { cookies } from "next/headers"

// This is a simple authentication utility
// In a real application, you would want to use a proper authentication system
// like NextAuth.js, Auth.js, or a custom solution with JWT or session-based auth

export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    const data = await response.json()
    
    // Set token in cookies for server-side
    const cookieStore = await cookies()
    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    // Return token for client-side storage
    return { success: true, token: data.token }
  } catch (error) {
    return { success: false, error: "Invalid credentials" }
  }
}

export async function logout() {
  // Delete the token cookie
  const cookieStore = await cookies()
  cookieStore.delete("token")
  
  // Also clear localStorage on client side
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token')
  }
  
  return { success: true }
}

export async function checkAuth() {
  // Check if the user is authenticated
  const cookieStore = await cookies()
  const token = cookieStore.get("token")
  
  return !!token
}

export async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")
  
  if (!token) {
    return null
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get user data")
    }

    return await response.json()
  } catch (error) {
    return null
  }
} 