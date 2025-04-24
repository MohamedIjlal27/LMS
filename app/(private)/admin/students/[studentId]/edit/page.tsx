"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import StudentForm from "../../_components/StudentForm"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export default function EditStudentPage() {
  const params = useParams()
  const { token } = useAuth()
  const [student, setStudent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/${params.studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (!response.ok) {
          throw new Error("Failed to fetch student")
        }
        const data = await response.json()
        setStudent(data)
      } catch (err) {
        setError("Failed to load student data")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudent()
  }, [params.studentId, token])

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    )
  }

  return <StudentForm initialData={student} isEditing />
} 