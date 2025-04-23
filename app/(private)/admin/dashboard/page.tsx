import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, GraduationCap, BarChart, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function AdminDashboardPage() {
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
              Couse Management
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
            <div className="text-2xl font-bold">2,543</div>
            <p className="text-xs text-muted-foreground">
              <span className="flex items-center justify-center text-green-600">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                12% from last month
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
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">
              <span className="flex items-center justify-center text-green-600">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                4% from last month
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
            <div className="text-2xl font-bold">3,872</div>
            <p className="text-xs text-muted-foreground">
              <span className="flex items-center justify-center text-green-600">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                18% from last month
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
            <div className="text-2xl font-bold">$24,389</div>
            <p className="text-xs text-muted-foreground">
              <span className="flex items-center justify-center text-red-600">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                3% from last month
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
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Email</TableHead>
                        <TableHead className="text-center">Registered</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: 1, name: "John Doe", email: "john@example.com", date: "2 days ago" },
                        { id: 2, name: "Jane Smith", email: "jane@example.com", date: "3 days ago" },
                        { id: 3, name: "Robert Johnson", email: "robert@example.com", date: "1 week ago" },
                        { id: 4, name: "Emily Davis", email: "emily@example.com", date: "1 week ago" },
                        { id: 5, name: "Michael Wilson", email: "michael@example.com", date: "2 weeks ago" },
                      ].map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="text-center font-medium">{student.name}</TableCell>
                          <TableCell className="text-center">{student.email}</TableCell>
                          <TableCell className="text-center">{student.date}</TableCell>
                          <TableCell className="text-center">
                            <Button asChild variant="ghost" size="sm">
                              <Link href={`/admin/students/${student.id}`}>View</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Course</TableHead>
                        <TableHead className="text-center">Category</TableHead>
                        <TableHead className="text-center">Students</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: 1, title: "Introduction to Web Development", category: "Development", students: 1245 },
                        { id: 2, title: "Advanced React Techniques", category: "Development", students: 873 },
                        { id: 3, title: "Data Science Fundamentals", category: "Data Science", students: 1032 },
                        { id: 4, title: "UX/UI Design Principles", category: "Design", students: 756 },
                        { id: 5, title: "Machine Learning for Beginners", category: "Data Science", students: 1189 },
                      ].map((course) => (
                        <TableRow key={course.id}>
                          <TableCell className="text-center font-medium">{course.title}</TableCell>
                          <TableCell className="text-center">{course.category}</TableCell>
                          <TableCell className="text-center">{course.students}</TableCell>
                          <TableCell className="text-center">
                            <Button asChild variant="ghost" size="sm">
                              <Link href={`/admin/courses/${course.id}`}>View</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Student</TableHead>
                        <TableHead className="text-center">Course</TableHead>
                        <TableHead className="text-center">Date</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: 1,
                          student: "John Doe",
                          course: "Web Development",
                          date: "Today",
                        },
                        {
                          id: 2,
                          student: "Jane Smith",
                          course: "React Techniques",
                          date: "Yesterday",
                        },
                        {
                          id: 3,
                          student: "Robert Johnson",
                          course: "UX Design",
                          date: "2 days ago",
                        },
                      ].map((enrollment) => (
                        <TableRow key={enrollment.id}>
                          <TableCell className="text-center font-medium">{enrollment.student}</TableCell>
                          <TableCell className="text-center">{enrollment.course}</TableCell>
                          <TableCell className="text-center">{enrollment.date}</TableCell>
                          <TableCell className="text-center">
                            <Button asChild variant="ghost" size="sm">
                              <Link href={`/admin/enrollments/${enrollment.id}`}>View</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
                  <span className="text-sm font-medium text-green-600">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Users</span>
                  <span className="text-sm font-medium">127</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">System Load</span>
                  <span className="text-sm font-medium">23%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
