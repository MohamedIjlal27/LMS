"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, X } from "lucide-react"
import Image from "next/image"
import { UploadDropzone } from "@uploadthing/react"
import { OurFileRouter } from "@/lib/uploadthing"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  level: z.string({
    required_error: "Please select a level.",
  }),
  price: z.coerce.number().min(0, {
    message: "Price must be a positive number.",
  }),
  instructor: z.string().min(3, {
    message: "Instructor name must be at least 3 characters.",
  }),
  duration: z.string().min(1, {
    message: "Duration is required.",
  }),
  isPublished: z.boolean().default(false),
  imageUrl: z.string().optional(),
})

interface CourseFormProps {
  initialData?: any
  isEditing?: boolean
}

export default function CourseForm({ initialData, isEditing = false }: CourseFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [currentImageUrl, setCurrentImageUrl] = useState(initialData?.imageUrl)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      category: "",
      level: "",
      price: 0,
      instructor: "",
      duration: "",
      isPublished: false,
      imageUrl: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      if (isEditing && values.imageUrl === currentImageUrl) {
        values.imageUrl = currentImageUrl
      }

      const url = isEditing 
        ? `${process.env.NEXT_PUBLIC_API_URL}/courses/${initialData._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/courses`
      
      const response = await fetch(url, {
        method: isEditing ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error(isEditing ? 'Failed to update course' : 'Failed to create course')
      }

      setSubmitSuccess(true)
      toast({
        title: "Success",
        description: isEditing ? "Course updated successfully!" : "Course created successfully!",
      })

      setTimeout(() => {
        router.push("/admin/courses")
        router.refresh()
      }, 2000)
    } catch (error) {
      console.error(isEditing ? "Error updating course:" : "Error creating course:", error)
      toast({
        title: "Error",
        description: isEditing ? "Failed to update course. Please try again." : "Failed to create course. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{isEditing ? 'Edit Course' : 'Add New Course'}</h1>
          <p className="text-muted-foreground">
            {isEditing ? 'Update your course information' : 'Create a new course for your platform'}
          </p>
        </div>

        {submitSuccess && (
          <Alert className="mb-6 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              {isEditing ? 'Course updated successfully!' : 'Course created successfully!'} Redirecting...
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Course Information' : 'New Course Information'}</CardTitle>
            <CardDescription>Enter the details for the course</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Image</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            {field.value ? (
                              <div className="relative h-40 w-40">
                                <Image
                                  src={field.value}
                                  alt="Course preview"
                                  fill
                                  className="rounded-lg object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    form.setValue("imageUrl", "")
                                    setCurrentImageUrl("")
                                  }}
                                  className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="w-full">
                                <div className="flex items-center justify-center w-full">
                                  <UploadDropzone<OurFileRouter, "courseImage">
                                    endpoint="courseImage"
                                    onClientUploadComplete={(res) => {
                                      console.log("Upload completed:", res)
                                      if (res?.[0]) {
                                        form.setValue("imageUrl", res[0].url)
                                        setCurrentImageUrl(res[0].url)
                                        toast({
                                          title: "Success",
                                          description: "Image uploaded successfully",
                                        })
                                      }
                                    }}
                                    onUploadError={(error: Error) => {
                                      console.error("Upload error:", error)
                                      toast({
                                        title: "Error",
                                        description: error.message,
                                        variant: "destructive",
                                      })
                                    }}
                                    className="ut-button:bg-primary ut-label:text-lg border-2 border-dashed border-gray-200 p-8 w-full min-h-[200px]"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Recommended size: 1280×720. Max size: 4MB
                          </p>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Introduction to Web Development" {...field} />
                      </FormControl>
                      <FormDescription>The title of your course as it will appear to students.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a detailed description of your course..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>A comprehensive description of what students will learn.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Development">Development</SelectItem>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Data Science">Data Science</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>The category that best describes your course.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="All Levels">All Levels</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>The difficulty level of your course.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.01" {...field} />
                        </FormControl>
                        <FormDescription>The price of your course in USD.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 10 hours" {...field} />
                        </FormControl>
                        <FormDescription>The total length of your course.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="instructor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructor</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. John Smith" {...field} />
                      </FormControl>
                      <FormDescription>The name of the course instructor.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Publish immediately</FormLabel>
                        <FormDescription>
                          If checked, the course will be immediately available to students.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <CardFooter className="flex justify-between px-0">
                  <Button type="button" variant="outline" onClick={() => router.push("/admin/courses")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Course" : "Create Course")}
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