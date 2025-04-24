"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Pencil } from "lucide-react"
import { format } from "date-fns"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"

interface Student {
  _id: string
  name: string
  email: string
  bio: string
  createdAt: string
  isActive: boolean
}

const StudentDetailsPage = () => {
  const params = useParams()
  const router = useRouter()
  const { token, isAuthenticated } = useAuth()
  const [student, setStudent] = useState<Student | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    const fetchStudent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/${params.studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        
        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login')
            return
          }
          throw new Error("Failed to fetch student")
        }
        
        const data = await response.json()
        setStudent(data)
      } catch (err) {
        setError("Failed to load student data")
        console.error(err)
        toast.error("Failed to load student data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudent()
  }, [params.studentId, token, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !student) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-destructive">{error || "Student not found"}</p>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Student Details</h1>
            <p className="text-muted-foreground">View and manage student information</p>
          </div>
          <Button asChild>
            <Link href={`/admin/students/${student._id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Student
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>Basic information about the student</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
              <p className="mt-1">{student.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
              <p className="mt-1">{student.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
              <p className="mt-1">{student.bio || "No bio provided"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Join Date</h3>
              <p className="mt-1">{format(new Date(student.createdAt), "MMM d, yyyy")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <p className="mt-1">
                <span
                  className={`inline-flex justify-center rounded-full px-2 py-1 text-xs font-medium ${
                    student.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {student.isActive ? "Active" : "Inactive"}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default StudentDetailsPage 