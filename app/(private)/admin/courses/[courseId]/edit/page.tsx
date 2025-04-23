"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import CourseForm from "../../_components/CourseForm"
import { Loader2 } from "lucide-react"

export default function EditCoursePage() {
  const params = useParams()
  const [course, setCourse] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${params.courseId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch course")
        }
        const data = await response.json()
        setCourse(data)
      } catch (err) {
        setError("Failed to load course data")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourse()
  }, [params.courseId])

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

  return <CourseForm initialData={course} isEditing />
} 