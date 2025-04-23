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
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, Mail } from "lucide-react"

// Mock student data
const initialStudents = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    enrolledCourses: 3,
    joinDate: "Jan 15, 2023",
    lastActive: "2 days ago",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    enrolledCourses: 2,
    joinDate: "Feb 20, 2023",
    lastActive: "1 day ago",
    status: "Active",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    enrolledCourses: 1,
    joinDate: "Mar 10, 2023",
    lastActive: "1 week ago",
    status: "Active",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    enrolledCourses: 4,
    joinDate: "Apr 5, 2023",
    lastActive: "3 days ago",
    status: "Active",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    enrolledCourses: 2,
    joinDate: "May 12, 2023",
    lastActive: "5 days ago",
    status: "Inactive",
  },
  {
    id: 6,
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    enrolledCourses: 1,
    joinDate: "Jun 8, 2023",
    lastActive: "2 weeks ago",
    status: "Active",
  },
  {
    id: 7,
    name: "David Miller",
    email: "david.miller@example.com",
    enrolledCourses: 0,
    joinDate: "Jul 22, 2023",
    lastActive: "1 month ago",
    status: "Inactive",
  },
]

export default function AdminStudentsPage() {
  const [students, setStudents] = useState(initialStudents)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null)

  // Filter students based on search query and status filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || student.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleDeleteClick = (studentId: number) => {
    setStudentToDelete(studentId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter((student) => student.id !== studentToDelete))
      setDeleteDialogOpen(false)
      setStudentToDelete(null)
    }
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div>
          <h1 className="text-3xl font-bold">Students Management</h1>
          <p className="text-muted-foreground">Manage and organize your students</p>
        </div>
        <Button asChild>
          <Link href="/admin/students/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Student
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search students..."
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Enrolled Courses</TableHead>
              <TableHead className="text-center">Join Date</TableHead>
              <TableHead className="text-center">Last Active</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No students found.
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="text-center font-medium">{student.name}</TableCell>
                  <TableCell className="text-center">{student.email}</TableCell>
                  <TableCell className="text-center">{student.enrolledCourses}</TableCell>
                  <TableCell className="text-center">{student.joinDate}</TableCell>
                  <TableCell className="text-center">{student.lastActive}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex justify-center rounded-full px-2 py-1 text-xs font-medium ${
                        student.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {student.status}
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
                          <Link href={`/admin/students/${student.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/students/${student.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`mailto:${student.email}`}>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteClick(student.id)}
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
            <DialogTitle>Delete Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this student? This action cannot be undone.
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
