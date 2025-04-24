"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Edit, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"

interface Course {
  _id: string
  title: string
  description: string
  category: string
  level: string
  price: number
  instructor: string
  duration: string
  students: number
  isPublished: boolean
  imageUrl?: string
}

export default function CourseDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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
        toast({
          title: "Error",
          description: "Failed to load course details",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourse()
  }, [params.courseId, toast])

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-destructive">Course not found</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => router.push(`/admin/courses/${params.courseId}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Course
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Course Image */}
        <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
          <Image
            src={course.imageUrl || "/placeholder.svg?height=300&width=600"}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Course Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant={course.isPublished ? "default" : "secondary"}>
                {course.isPublished ? "Published" : "Draft"}
              </Badge>
              <Badge variant="outline">{course.category}</Badge>
              <Badge variant="outline">{course.level}</Badge>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="mt-1">{course.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Instructor</h3>
                  <p className="mt-1">{course.instructor}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Duration</h3>
                  <p className="mt-1">{course.duration}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
                  <p className="mt-1">${course.price.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Students</h3>
                  <p className="mt-1">{course.students}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 