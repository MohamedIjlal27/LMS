"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, BookOpen } from "lucide-react"

// Mock course data
const initialCourses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    category: "Development",
    level: "Beginner",
    price: 49.99,
    instructor: "John Smith",
    students: 1245,
    status: "Published",
  },
  {
    id: 2,
    title: "Advanced React Techniques",
    category: "Development",
    level: "Advanced",
    price: 79.99,
    instructor: "Sarah Johnson",
    students: 873,
    status: "Published",
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    category: "Data Science",
    level: "Intermediate",
    price: 59.99,
    instructor: "Michael Chen",
    students: 1032,
    status: "Published",
  },
  {
    id: 4,
    title: "UX/UI Design Principles",
    category: "Design",
    level: "Beginner",
    price: 49.99,
    instructor: "Emily Rodriguez",
    students: 756,
    status: "Published",
  },
  {
    id: 5,
    title: "Machine Learning for Beginners",
    category: "Data Science",
    level: "Beginner",
    price: 69.99,
    instructor: "David Kim",
    students: 1189,
    status: "Published",
  },
  {
    id: 6,
    title: "Full-Stack JavaScript Development",
    category: "Development",
    level: "Intermediate",
    price: 89.99,
    instructor: "Alex Turner",
    students: 942,
    status: "Draft",
  },
  {
    id: 7,
    title: "Python for Data Analysis",
    category: "Data Science",
    level: "Intermediate",
    price: 69.99,
    instructor: "Lisa Wang",
    students: 0,
    status: "Draft",
  },
]

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState(initialCourses)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null)

  // Filter courses based on search query and filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter
    const matchesStatus = statusFilter === "all" || course.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleDeleteClick = (courseId: number) => {
    setCourseToDelete(courseId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (courseToDelete) {
      setCourses(courses.filter((course) => course.id !== courseToDelete))
      setDeleteDialogOpen(false)
      setCourseToDelete(null)
    }
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div>
          <h1 className="text-3xl font-bold">Courses Management</h1>
          <p className="text-muted-foreground">Manage and organize your courses</p>
        </div>
        <Button asChild>
          <Link href="/admin/courses/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Course
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="relative md:col-span-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <div>
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Courses Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Title</TableHead>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-center">Level</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Instructor</TableHead>
              <TableHead className="text-center">Students</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No courses found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="text-center font-medium">{course.title}</TableCell>
                  <TableCell className="text-center">{course.category}</TableCell>
                  <TableCell className="text-center">{course.level}</TableCell>
                  <TableCell className="text-center">${course.price}</TableCell>
                  <TableCell className="text-center">{course.instructor}</TableCell>
                  <TableCell className="text-center">{course.students}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex justify-center rounded-full px-2 py-1 text-xs font-medium ${
                        course.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : course.status === "Draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {course.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/courses/${course.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/courses/${course.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/courses/${course.id}/curriculum`}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            Manage Curriculum
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteClick(course.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center gap-2 sm:justify-start">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
