"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

// Mock data for students and courses
const students = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Robert Johnson" },
  { id: "4", name: "Emily Davis" },
  { id: "5", name: "Michael Wilson" },
]

const courses = [
  { id: "1", title: "Introduction to Web Development" },
  { id: "2", title: "Advanced React Techniques" },
  { id: "3", title: "Data Science Fundamentals" },
  { id: "4", title: "UX/UI Design Principles" },
  { id: "5", title: "Machine Learning for Beginners" },
]

const formSchema = z.object({
  studentId: z.string({
    required_error: "Please select a student.",
  }),
  courseId: z.string({
    required_error: "Please select a course.",
  }),
})

export default function NewEnrollmentPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      courseId: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // In a real implementation, this would be an API call to create the enrollment
      console.log("Enrollment values:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitSuccess(true)

      // Redirect to enrollments page after successful submission
      setTimeout(() => {
        router.push("/admin/enrollments")
      }, 2000)
    } catch (error) {
      console.error("Error creating enrollment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add New Enrollment</h1>
          <p className="text-muted-foreground">Enroll a student in a course</p>
        </div>

        {submitSuccess && (
          <Alert className="mb-6 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              Enrollment created successfully! Redirecting...
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Enrollment Information</CardTitle>
            <CardDescription>Select a student and a course to create an enrollment</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a student" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {students.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>The student to enroll in the course.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="courseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>The course in which to enroll the student.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <CardFooter className="flex justify-between px-0">
                  <Button type="button" variant="outline" onClick={() => router.push("/admin/enrollments")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Enrollment"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
