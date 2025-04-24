"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, Mail } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { DataTable } from "@/components/ui/data-table"
import { ColDef } from "ag-grid-community"
import { ValueFormatterParams, ICellRendererParams } from 'ag-grid-community'
import { useAuth } from "@/hooks/useAuth"

interface Student {
  _id: string
  name: string
  email: string
  bio: string
  createdAt: string
  isActive: boolean
}

export default function AdminStudentsPage() {
  const { token } = useAuth()
  const [students, setStudents] = useState<Student[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStudents()
  }, [token])

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setStudents(data)
      } else {
        throw new Error('Failed to fetch students')
      }
    } catch (error) {
      console.error("Error fetching students:", error)
      toast.error("Failed to load students")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteClick = (studentId: string) => {
    setStudentToDelete(studentId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (studentToDelete) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/${studentToDelete}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.ok) {
          setStudents(students.filter((student) => student._id !== studentToDelete))
          toast.success("Student deleted successfully")
        } else {
          throw new Error('Failed to delete student')
        }
      } catch (error) {
        console.error("Error deleting student:", error)
        toast.error("Failed to delete student")
      } finally {
        setDeleteDialogOpen(false)
        setStudentToDelete(null)
      }
    }
  }

  const columns: ColDef<Student>[] = [
    {
      headerName: "Name",
      field: "name",
      filter: "agTextColumnFilter",
      minWidth: 200,
    },
    {
      headerName: "Email",
      field: "email",
      filter: "agTextColumnFilter",
      minWidth: 250,
    },
    {
      headerName: "Bio",
      field: "bio",
      filter: "agTextColumnFilter",
      minWidth: 300,
      valueFormatter: (params: ValueFormatterParams<Student, string>) => params.value || "-",
    },
    {
      headerName: "Join Date",
      field: "createdAt",
      filter: "agDateColumnFilter",
      minWidth: 150,
      valueFormatter: (params: ValueFormatterParams<Student, string>) => 
        params.value ? format(new Date(params.value), "MMM d, yyyy") : "-",
    },
    {
      headerName: "Status",
      field: "isActive",
      filter: "agTextColumnFilter",
      minWidth: 120,
      cellRenderer: (params: ICellRendererParams<Student>) => (
        <span
          className={`inline-flex justify-center rounded-full px-2 py-1 text-xs font-medium ${
            params.value ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          }`}
        >
          {params.value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      headerName: "Actions",
      field: "_id",
      filter: false,
      sortable: false,
      minWidth: 150,
      cellRenderer: (params: ICellRendererParams<Student>) => (
        <div className="flex justify-center gap-2">
          <Link href={`/admin/students/${params.value}`}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/admin/students/${params.value}/edit`}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-600"
            onClick={() => handleDeleteClick(params.value as string)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading students...</div>
        </div>
      </div>
    )
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

      <div className="rounded-md border">
        <DataTable
          data={students}
          columns={columns}
          pageSize={10}
        />
      </div>

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
