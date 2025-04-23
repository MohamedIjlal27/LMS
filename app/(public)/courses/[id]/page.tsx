import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Award, Users, BarChart, CheckCircle, PlayCircle } from "lucide-react"

// Mock course data - in a real app, this would come from an API
const getCourse = (id: string) => {
  return {
    id: Number.parseInt(id),
    title: "Advanced React Development",
    description: "Master advanced React concepts and build professional applications with modern best practices.",
    longDescription:
      "This comprehensive course will take you from intermediate to advanced React developer. You'll learn how to build scalable, performant, and maintainable React applications using the latest techniques and best practices. By the end of this course, you'll be able to architect complex React applications, implement advanced state management, optimize performance, and deploy your applications to production.",
    category: "Development",
    level: "Advanced",
    price: 79.99,
    instructor: {
      name: "Sarah Johnson",
      bio: "Senior Frontend Developer with 10+ years of experience. Sarah has worked with companies like Google and Facebook, and has taught over 50,000 students online.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    rating: 4.9,
    students: 873,
    duration: "12 hours",
    lectures: 48,
    lastUpdated: "March 2023",
    whatYouWillLearn: [
      "Build complex React applications using functional components and hooks",
      "Implement advanced state management with Context API and Redux",
      "Optimize React applications for performance",
      "Create custom hooks for reusable logic",
      "Implement authentication and authorization",
      "Deploy React applications to production",
    ],
    curriculum: [
      {
        title: "Getting Started",
        lectures: [
          { title: "Course Overview", duration: "5:22" },
          { title: "Setting Up Your Development Environment", duration: "10:15" },
          { title: "Modern JavaScript Essentials", duration: "15:42" },
        ],
      },
      {
        title: "Advanced React Concepts",
        lectures: [
          { title: "Understanding React's Component Lifecycle", duration: "12:30" },
          { title: "Working with Hooks in Depth", duration: "20:15" },
          { title: "Custom Hooks for Reusable Logic", duration: "18:45" },
          { title: "Memoization and Performance Optimization", duration: "25:10" },
        ],
      },
      {
        title: "State Management",
        lectures: [
          { title: "Local State vs. Global State", duration: "10:30" },
          { title: "Context API Deep Dive", duration: "22:15" },
          { title: "Redux Fundamentals", duration: "30:00" },
          { title: "Redux Toolkit and Modern Redux", duration: "28:45" },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Michael P.",
        rating: 5,
        date: "2 months ago",
        comment:
          "One of the best React courses I've taken. The instructor explains complex concepts in a way that's easy to understand.",
      },
      {
        id: 2,
        user: "Jennifer L.",
        rating: 4,
        date: "3 months ago",
        comment:
          "Great course with lots of practical examples. I especially enjoyed the sections on performance optimization.",
      },
      {
        id: 3,
        user: "Robert K.",
        rating: 5,
        date: "1 month ago",
        comment:
          "This course took my React skills to the next level. Highly recommended for anyone looking to advance their knowledge.",
      },
    ],
  }
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const course = getCourse(params.id)

  return (
    <div className="container py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Course Info - 2/3 width on large screens */}
        <div className="lg:col-span-2">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">{course.title}</h1>
          <p className="mb-6 text-lg text-muted-foreground">{course.description}</p>

          <div className="mb-6 flex flex-wrap gap-4">
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

          <div className="mb-6 flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image
                src={course.instructor.avatar || "/placeholder.svg"}
                alt={course.instructor.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium">Instructor: {course.instructor.name}</p>
              <div className="flex items-center gap-1">
                <span className="font-medium">{course.rating}</span>
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
                <span className="text-sm text-muted-foreground">({course.students} reviews)</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
              <Image
                src={`/placeholder.svg?height=300&width=800&text=Course+${course.id}+Video`}
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
                  <h3 className="mb-4 text-xl font-semibold">About This Course</h3>
                  <p className="text-muted-foreground">{course.longDescription}</p>
                </div>
                <div>
                  <h3 className="mb-4 text-xl font-semibold">What You&apos;ll Learn</h3>
                  <ul className="grid gap-3 md:grid-cols-2">
                    {course.whatYouWillLearn.map((item, index) => (
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
                <h3 className="text-xl font-semibold">Course Content</h3>
                <div className="text-sm text-muted-foreground">
                  {course.lectures} lectures • {course.duration} total length
                </div>
                <div className="space-y-4">
                  {course.curriculum.map((section, index) => (
                    <Card key={index}>
                      <CardHeader className="py-4">
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <CardDescription>
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
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full">
                    <Image
                      src={course.instructor.avatar || "/placeholder.svg"}
                      alt={course.instructor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{course.instructor.name}</h3>
                    <p className="text-muted-foreground">Course Instructor</p>
                  </div>
                </div>
                <p>{course.instructor.bio}</p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold">{course.rating}</div>
                    <div className="flex text-yellow-400">
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
                  <div className="flex-1">{/* Rating bars would go here in a real implementation */}</div>
                </div>
                <div className="space-y-4">
                  {course.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="font-medium">{review.user}</div>
                          <div className="text-sm text-muted-foreground">{review.date}</div>
                        </div>
                        <div className="mb-2 flex text-yellow-400">
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
                        <p>{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Enrollment Card - 1/3 width on large screens */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">${course.price}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" size="lg">
                Enroll Now
              </Button>
              <p className="text-center text-sm text-muted-foreground">30-Day Money-Back Guarantee</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>Full lifetime access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-muted-foreground" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center gap-2">
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
