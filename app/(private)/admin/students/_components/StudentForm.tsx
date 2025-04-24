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
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.union([
    z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    z.string().length(0)
  ]),
  bio: z.string().optional(),
  isActive: z.boolean().default(true),
})

interface StudentFormProps {
  initialData?: any
  isEditing?: boolean
}

export default function StudentForm({ initialData, isEditing = false }: StudentFormProps) {
  const router = useRouter()
  const { token } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      password: "",
      bio: initialData?.bio || "",
      isActive: initialData?.isActive ?? true,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const url = isEditing 
        ? `${process.env.NEXT_PUBLIC_API_URL}/students/${initialData._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/students`

      const method = isEditing ? 'PATCH' : 'POST'

      // Create a copy of values and make password optional
      const submitData: Partial<typeof values> = { ...values }
      
      // Remove empty password in edit mode
      if (isEditing && submitData.password === '') {
        delete submitData.password
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(submitData)
      })

      if (!response.ok) {
        throw new Error(isEditing ? 'Failed to update student' : 'Failed to create student')
      }

      setSubmitSuccess(true)
      setTimeout(() => {
        router.push("/admin/students")
      }, 2000)
    } catch (error) {
      console.error(isEditing ? "Error updating student:" : "Error creating student:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{isEditing ? 'Edit Student' : 'Add New Student'}</h1>
          <p className="text-muted-foreground">
            {isEditing ? 'Update student information' : 'Create a new student account'}
          </p>
        </div>

        {submitSuccess && (
          <Alert className="mb-6 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              {isEditing ? 'Student updated successfully!' : 'Student created successfully!'} Redirecting...
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>Enter the details for the student</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="e.g. john.doe@example.com" {...field} />
                      </FormControl>
                      <FormDescription>The student will use this email to log in.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{isEditing ? 'New Password (optional)' : 'Password'}</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription>
                        {isEditing 
                          ? 'Leave blank to keep the current password'
                          : 'Must be at least 8 characters.'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief description about the student..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Active Account</FormLabel>
                        <FormDescription>If checked, the student will be able to log in.</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <CardFooter className="flex justify-between px-0">
                  <Button type="button" variant="outline" onClick={() => router.push("/admin/students")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting 
                      ? (isEditing ? "Updating..." : "Creating...") 
                      : (isEditing ? "Update Student" : "Create Student")}
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