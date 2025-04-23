"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"

// Mock enrollment data
const initialEnrollments = [
  {
    id: 1,
    student: "John Doe",
    studentId: 1,
    course: "Introduction to Web Development",
    courseId: 1,
    enrollmentDate: "Jan 20, 2023",
    progress: 75,
    status: "In Progress",
  },
  {
    id: 2,
    student: "Jane Smith",
    studentId: 2,
    course: "Advanced React Techniques",
    courseId: 2,
    enrollmentDate: "Feb 25, 2023",
    progress: 30,
    status: "In Progress",
  },
  {
    id: 3,
    student: "Robert Johnson",
    studentId: 3,
    course: "Data Science Fundamentals",
    courseId: 3,
    enrollmentDate: "Mar 15, 2023",
    progress: 100,
    status: "Completed",
  },
  {
    id: 4,
    student: "Emily Davis",
    studentId: 4,
    course: "UX/UI Design Principles",
    courseId: 4,
    enrollmentDate: "Apr 10, 2023",
    progress: 60,
    status: "In Progress",
  },
  {
    id: 5,
    student: "Michael Wilson",
    studentId: 5,
    course: "Machine Learning for Beginners",
    courseId: 5,
    enrollmentDate: "May 18, 2023",
    progress: 0,
    status: "Not Started",
  },
  {
    id: 6,
    student: "Sarah Brown",
    studentId: 6,
    course: "Full-Stack JavaScript Development",
    courseId: 6,
    enrollmentDate: "Jun 12, 2023",
    progress: 90,
    status: "In Progress",
  },
  {
    id: 7,
    student: "David Miller",
    studentId: 7,
    course: "Python for Data Analysis",
    courseId: 7,
    enrollmentDate: "Jul 25, 2023",
    progress: 100,
    status: "Completed",
  },
]

export default function AdminEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState(initialEnrollments)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [enrollmentToDelete, setEnrollmentToDelete] = useState<number | null>(null)

  // Filter enrollments based on search query and status filter
  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enrollment.course.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || enrollment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleDeleteClick = (enrollmentId: number) => {
    setEnrollmentToDelete(enrollmentId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (enrollmentToDelete) {
      setEnrollments(enrollments.filter((enrollment) => enrollment.id !== enrollmentToDelete))
      setDeleteDialogOpen(false)
      setEnrollmentToDelete(null)
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Enrollments Management</h1>
          <p className="text-muted-foreground">Manage student enrollments in courses</p>
        </div>
        <Button asChild>
          <Link href="/admin/enrollments/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Enrollment
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search enrollments..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Enrollments Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Enrollment Date</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEnrollments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No enrollments found.
                </TableCell>
              </TableRow>
            ) : (
              filteredEnrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell className="font-medium">
                    <Link href={`/admin/students/${enrollment.studentId}`} className="hover:underline">
                      {enrollment.student}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/courses/${enrollment.courseId}`} className="hover:underline">
                      {enrollment.course}
                    </Link>
                  </TableCell>
                  <TableCell>{enrollment.enrollmentDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full max-w-[100px] rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${enrollment.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">{enrollment.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        enrollment.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : enrollment.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {enrollment.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/enrollments/${enrollment.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/enrollments/${enrollment.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(enrollment.id)}
                          className="text-red-600 focus:bg-red-50 focus:text-red-600"
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
            <DialogTitle>Are you sure you want to delete this enrollment?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently remove the enrollment record from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
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
