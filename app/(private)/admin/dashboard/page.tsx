"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, GraduationCap, BarChart, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { Student, Course, Enrollment, studentColumns, courseColumns, enrollmentColumns } from "@/components/ui/table-columns"
import { dashboardApi, DashboardStats } from "@/lib/api/dashboard"
import { toast } from "sonner"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentStudents, setRecentStudents] = useState([])
  const [popularCourses, setPopularCourses] = useState([])
  const [recentEnrollments, setRecentEnrollments] = useState([])
  const [systemStatus, setSystemStatus] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [stats, students, courses, enrollments, status] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getRecentStudents(),
        dashboardApi.getPopularCourses(),
        dashboardApi.getRecentEnrollments(),
        dashboardApi.getSystemStatus()
      ])

      setStats(stats)
      setRecentStudents(students)
      setPopularCourses(courses)
      setRecentEnrollments(enrollments)
      setSystemStatus(status)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading dashboard data...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage courses, students, and enrollments</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/courses">
              <BookOpen className="mr-2 h-4 w-4" />
              Course Management
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/students">
              <Users className="mr-2 h-4 w-4" />
              Student Management
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="text-center">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className={`flex items-center justify-center ${(stats?.studentGrowth ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {(stats?.studentGrowth ?? 0) >= 0 ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
                {Math.abs(stats?.studentGrowth ?? 0)}% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalCourses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className={`flex items-center justify-center ${(stats?.courseGrowth ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {(stats?.courseGrowth ?? 0) >= 0 ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
                {Math.abs(stats?.courseGrowth ?? 0)}% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalEnrollments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className={`flex items-center justify-center ${(stats?.enrollmentGrowth ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {(stats?.enrollmentGrowth ?? 0) >= 0 ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
                {Math.abs(stats?.enrollmentGrowth ?? 0)}% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats?.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className={`flex items-center justify-center ${(stats?.revenueGrowth ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {(stats?.revenueGrowth ?? 0) >= 0 ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
                {Math.abs(stats?.revenueGrowth ?? 0)}% from last month
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 md:grid-cols-12">
        {/* Tables - 8/12 width */}
        <div className="md:col-span-8">
          <Tabs defaultValue="students" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="students">Recent Students</TabsTrigger>
              <TabsTrigger value="courses">Popular Courses</TabsTrigger>
              <TabsTrigger value="enrollments">Recent Enrollments</TabsTrigger>
            </TabsList>
            <TabsContent value="students" className="mt-6">
              <Card>
                <CardHeader className="text-center md:text-left">
                  <CardTitle>Recently Registered Students</CardTitle>
                  <CardDescription>A list of recently registered students on your platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable data={recentStudents} columns={studentColumns} pageSize={5} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="courses" className="mt-6">
              <Card>
                <CardHeader className="text-center md:text-left">
                  <CardTitle>Popular Courses</CardTitle>
                  <CardDescription>Courses with the highest enrollment rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable data={popularCourses} columns={courseColumns} pageSize={5} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="enrollments" className="mt-6">
              <Card>
                <CardHeader className="text-center md:text-left">
                  <CardTitle>Recent Enrollments</CardTitle>
                  <CardDescription>A list of recent course enrollments</CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable data={recentEnrollments} columns={enrollmentColumns} pageSize={5} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 4/12 width */}
        <div className="space-y-8 md:col-span-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/admin/courses/new">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Create New Course
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/students/new">
                  <Users className="mr-2 h-4 w-4" />
                  Add New Student
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/enrollments/new">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Create Enrollment
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current platform metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Server Status</span>
                  <span className="text-sm font-medium text-green-600">
                    {systemStatus?.serverStatus || 'Unknown'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Users</span>
                  <span className="text-sm font-medium">
                    {systemStatus?.activeUsers || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">System Load</span>
                  <span className="text-sm font-medium">
                    {systemStatus?.systemLoad || '0'}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
