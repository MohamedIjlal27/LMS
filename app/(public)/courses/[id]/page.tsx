"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Award, Users, BarChart, CheckCircle, PlayCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Course } from "@/types/course"
import { useParams } from "next/navigation"

export default function CoursePage() {
  const params = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch course')
        }
        const data = await response.json()
        console.log('Course data:', data)
        console.log('Instructor data:', data.instructor)
        setCourse(data)
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to load course details",
          variant: "destructive",
        })
        console.error('Error fetching course:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourse()
  }, [params.id, toast])

  const getInstructorName = () => {
    if (typeof course?.instructor === 'string') {
      return course.instructor
    }
    return course?.instructor?.name
  }

  const getInstructorBio = () => {
    if (typeof course?.instructor === 'string') {
      return "No bio available"
    }
    return course?.instructor?.bio
  }

  const getInstructorAvatar = () => {
    if (typeof course?.instructor === 'string') {
      return "/placeholder.svg"
    }
    return course?.instructor?.avatar || "/placeholder.svg"
  }

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
    <div className="container py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">{course.title}</h1>
          <p className="mb-6 text-center text-lg text-muted-foreground">{course.description}</p>

          <div className="mb-6 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span>{course.lectures} lectures</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-600" />
              <span>{course.level}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>{course.students} students</span>
            </div>
          </div>

          <div className="mb-6 flex flex-col items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image
                src={getInstructorAvatar()}
                alt={getInstructorName() || "Instructor"}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <p className="font-medium">Instructor: {getInstructorName()}</p>
              <div className="flex items-center justify-center gap-1">
                <span className="font-medium">{course?.rating}</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({course?.students} reviews)</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="relative mx-auto h-[300px] w-full max-w-3xl overflow-hidden rounded-lg">
              <Image
                src={course.imageUrl || `/placeholder.svg?height=300&width=800&text=Course+${course._id}+Video`}
                alt={course.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <PlayCircle className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="mb-10">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-center text-xl font-semibold">About This Course</h3>
                  <p className="text-center text-muted-foreground">{course.longDescription}</p>
                </div>
                <div>
                  <h3 className="mb-4 text-center text-xl font-semibold">What You&apos;ll Learn</h3>
                  <ul className="mx-auto grid max-w-2xl gap-3 md:grid-cols-2">
                    {course.whatYouWillLearn?.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="curriculum" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-center text-xl font-semibold">Course Content</h3>
                <div className="text-center text-sm text-muted-foreground">
                  {course.lectures} lectures • {course.duration} total length
                </div>
                <div className="mx-auto max-w-2xl space-y-4">
                  {course.curriculum?.map((section, index) => (
                    <Card key={index}>
                      <CardHeader className="py-4">
                        <CardTitle className="text-center text-lg">{section.title}</CardTitle>
                        <CardDescription className="text-center">
                          {section.lectures.length} lectures •{" "}
                          {section.lectures.reduce((acc, lecture) => {
                            const [min, sec] = lecture.duration.split(":").map(Number)
                            return acc + min * 60 + sec
                          }, 0) / 60}{" "}
                          min
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="py-0">
                        <ul className="divide-y">
                          {section.lectures.map((lecture, lectureIndex) => (
                            <li key={lectureIndex} className="flex items-center justify-between py-3">
                              <div className="flex items-center gap-2">
                                <PlayCircle className="h-5 w-5 text-blue-600" />
                                <span>{lecture.title}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{lecture.duration}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="instructor" className="mt-6">
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full">
                    <Image
                      src={getInstructorAvatar()}
                      alt={getInstructorName() || "Instructor"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">{getInstructorName()}</h3>
                    <p className="text-muted-foreground">Course Instructor</p>
                  </div>
                </div>
                <p className="text-center">{getInstructorBio()}</p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold">{course.rating}</div>
                    <div className="flex justify-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">Course Rating</div>
                  </div>
                  <div className="flex-1"></div>
                </div>
                <div className="mx-auto max-w-2xl space-y-4">
                  {course.reviews?.map((review) => (
                    <Card key={review._id}>
                      <CardContent className="pt-6">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="font-medium">{review.user}</div>
                          <div className="text-sm text-muted-foreground">{review.date}</div>
                        </div>
                        <div className="mb-2 flex justify-center text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={i < review.rating ? "currentColor" : "none"}
                              stroke={i >= review.rating ? "currentColor" : "none"}
                              className="h-4 w-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                        </div>
                        <p className="text-center">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold">${course.price}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" size="lg">
                Enroll Now
              </Button>
              <p className="text-center text-sm text-muted-foreground">30-Day Money-Back Guarantee</p>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>Full lifetime access</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Award className="h-5 w-5 text-muted-foreground" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <span>Access on mobile and TV</span>
                </div>
              </div>
              <div className="pt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Not sure?{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    Try a free preview
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
