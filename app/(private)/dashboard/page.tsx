"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Award, Calendar, PlayCircle, BarChart4, CheckCircle, LogOut } from "lucide-react"
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"

interface Course {
  _id: string
  title: string
  description: string
  instructor: string
  image: string
  progress?: number
  lastAccessed?: string
  nextLesson?: string
}

interface Event {
  _id: string
  title: string
  date: string
  instructor: string
}

interface Achievement {
  _id: string
  title: string
  description: string
  icon: string
}

interface UserStats {
  learningTime: string
  coursesEnrolled: number
  certificates: number
}

export default function DashboardPage() {
  const router = useRouter()
  const { token, user } = useAuth()
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [userStats, setUserStats] = useState<UserStats>({
    learningTime: "0h 0m",
    coursesEnrolled: 0,
    certificates: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token || !user) return
      
      try {
        const coursesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enrollments/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json()
          setEnrolledCourses(coursesData)
        } else {
          console.error('Failed to fetch enrolled courses:', coursesResponse.statusText)
        }

        const eventsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/upcoming`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (eventsResponse.ok) {
          const eventsData = await eventsResponse.json()
          setUpcomingEvents(eventsData)
        }

        const achievementsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/achievements/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (achievementsResponse.ok) {
          const achievementsData = await achievementsResponse.json()
          setAchievements(achievementsData)
        }

        const statsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enrollments/user/${user._id}/stats`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setUserStats(statsData)
        } else {
          console.error('Failed to fetch user stats:', statsResponse.statusText)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [token, user])
  
  const handleLogout = () => {
    Cookies.remove('token', { path: '/' })
    localStorage.removeItem('user')
    router.push('/login')
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl py-10 px-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto max-w-7xl py-10 px-4">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
          <p className="text-muted-foreground">Track your progress and continue learning</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/courses">Browse More Courses</Link>
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="space-y-8 md:col-span-8">
          <Card>
            <CardHeader className="text-center md:text-left">
              <CardTitle>My Learning</CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {enrolledCourses.length > 0 ? (
                enrolledCourses.map((course) => (
                  <div key={course._id} className="space-y-3">
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
                        {course.progress && (
                          <div className="mt-2 flex items-center gap-1">
                            <Progress value={course.progress} className="h-2 w-full" />
                            <span className="text-xs font-medium">{course.progress}%</span>
                          </div>
                        )}
                        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm sm:justify-start">
                          {course.lastAccessed && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>Last accessed {course.lastAccessed}</span>
                            </div>
                          )}
                          {course.nextLesson && (
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              <span>Next lesson: {course.nextLesson}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2 sm:justify-start">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/courses/${course._id}`}>Course Details</Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link href={`/courses/${course._id}/learn`}>
                          <PlayCircle className="mr-1 h-4 w-4" />
                          Continue Learning
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You haven't enrolled in any courses yet.</p>
                  <Button asChild className="mt-4">
                    <Link href="/courses">Browse Courses</Link>
                  </Button>
                </div>
              )}
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
                    {upcomingEvents.length > 0 ? (
                      upcomingEvents.map((event) => (
                        <div key={event._id} className="flex items-start gap-4">
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
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground">No upcoming events</p>
                    )}
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
                    {achievements.length > 0 ? (
                      achievements.map((achievement) => (
                        <div key={achievement._id} className="flex items-start gap-4">
                          <div className="rounded-full bg-gray-100 p-2">
                            <Award className="h-8 w-8 text-yellow-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground">No achievements yet</p>
                    )}
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
                  <span className="font-semibold">{userStats.learningTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <span>Courses Enrolled</span>
                  </div>
                  <span className="font-semibold">{userStats.coursesEnrolled}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-muted-foreground" />
                    <span>Certificates</span>
                  </div>
                  <span className="font-semibold">{userStats.certificates}</span>
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
                {enrolledCourses.length > 0 ? (
                  enrolledCourses.slice(0, 2).map((course) => (
                    <div key={course._id} className="flex items-start gap-4">
                      <div className="relative h-16 w-16 flex-shrink-0">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">Based on your interests</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">No recommendations available</p>
                )}
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
