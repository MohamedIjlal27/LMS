import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Award, Calendar, PlayCircle, BarChart4, CheckCircle } from "lucide-react"

// Mock enrolled courses data
const enrolledCourses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    progress: 75,
    lastAccessed: "2 days ago",
    nextLesson: "CSS Flexbox and Grid",
    instructor: "John Smith",
    image: "/placeholder.svg?height=200&width=400&text=Web+Dev",
  },
  {
    id: 2,
    title: "Advanced React Techniques",
    progress: 30,
    lastAccessed: "Yesterday",
    nextLesson: "Custom Hooks",
    instructor: "Sarah Johnson",
    image: "/placeholder.svg?height=200&width=400&text=React",
  },
  {
    id: 3,
    title: "UX/UI Design Principles",
    progress: 10,
    lastAccessed: "1 week ago",
    nextLesson: "User Research Methods",
    instructor: "Emily Rodriguez",
    image: "/placeholder.svg?height=200&width=400&text=UX+Design",
  },
]

// Mock upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Live Q&A: Web Development Career Paths",
    date: "Tomorrow, 3:00 PM",
    instructor: "John Smith",
  },
  {
    id: 2,
    title: "Workshop: Building a Portfolio Website",
    date: "May 15, 2:00 PM",
    instructor: "Sarah Johnson",
  },
]

// Mock achievements
const achievements = [
  {
    id: 1,
    title: "Fast Learner",
    description: "Completed 5 lessons in one day",
    icon: <Award className="h-8 w-8 text-yellow-500" />,
  },
  {
    id: 2,
    title: "Consistent Student",
    description: "Logged in for 7 consecutive days",
    icon: <Calendar className="h-8 w-8 text-blue-500" />,
  },
]

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-7xl py-10 px-4">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and continue learning</p>
        </div>
        <Button asChild>
          <Link href="/courses">Browse More Courses</Link>
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Main content - 8/12 width on medium screens and up */}
        <div className="space-y-8 md:col-span-8">
          <Card>
            <CardHeader className="text-center md:text-left">
              <CardTitle>My Learning</CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="space-y-3">
                  <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                    <div className="relative h-48 w-full sm:h-32 sm:w-48">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                      <div className="mt-2 flex items-center gap-1">
                        <Progress value={course.progress} className="h-2 w-full" />
                        <span className="text-xs font-medium">{course.progress}%</span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm sm:justify-start">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Last accessed {course.lastAccessed}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>Next lesson: {course.nextLesson}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 sm:justify-start">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/courses/${course.id}`}>Course Details</Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href={`/courses/${course.id}/learn`}>
                        <PlayCircle className="mr-1 h-4 w-4" />
                        Continue Learning
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-6">
              <Card>
                <CardHeader className="text-center md:text-left">
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Live sessions and workshops</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-start gap-4">
                        <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {event.date} • {event.instructor}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Events
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="achievements" className="mt-6">
              <Card>
                <CardHeader className="text-center md:text-left">
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>Badges and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-start gap-4">
                        <div className="rounded-full bg-gray-100 p-2">{achievement.icon}</div>
                        <div>
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Achievements
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 4/12 width on medium screens and up */}
        <div className="md:col-span-4">
          <Card>
            <CardHeader className="text-center md:text-left">
              <CardTitle>Learning Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>Learning Time</span>
                  </div>
                  <span className="font-semibold">12h 30m</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <span>Courses Enrolled</span>
                  </div>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-muted-foreground" />
                    <span>Certificates</span>
                  </div>
                  <span className="font-semibold">1</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Full Profile
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-8">
            <CardHeader className="text-center md:text-left">
              <CardTitle>Recommended Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={`/placeholder.svg?height=100&width=100&text=${i}`}
                        alt={`Recommended Course ${i}`}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">Recommended Course {i}</h4>
                      <p className="text-sm text-muted-foreground">Based on your interests</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Recommendations
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
