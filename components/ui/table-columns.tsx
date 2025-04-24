import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ColDef } from 'ag-grid-community'
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Types
export interface Student {
  id: number
  name: string
  email: string
  date: string
}

export interface Course {
  id: number
  title: string
  category: string
  students: number
}

export interface Enrollment {
  _id: string
  student: {
    _id: string
    name: string
  }
  course: {
    _id: string
    title: string
  }
  createdAt: string
  progress: number
  status: string
}

export interface AdminCourse {
  _id: string
  title: string
  category: string
  level: string
  price: number
  instructor: string
  students: number
  isPublished: boolean
  imageUrl?: string
}

// Column Definitions
export const studentColumns: ColDef<Student>[] = [
  { 
    field: 'name', 
    headerName: 'Name', 
    sortable: true, 
    filter: true,
    flex: 2,
    minWidth: 200,
    cellStyle: { fontSize: '14px', padding: '12px' }
  },
  { 
    field: 'email', 
    headerName: 'Email', 
    sortable: true, 
    filter: true,
    flex: 2,
    minWidth: 200,
    cellStyle: { fontSize: '14px', padding: '12px' }
  },
  {
    headerName: 'Actions',
    cellRenderer: (params: any) => (
      <Button asChild variant="ghost" size="sm" className="w-full">
        <Link href={`/admin/students/${params.data.id}`}>View</Link>
      </Button>
    ),
    flex: 1,
    minWidth: 120,
    sortable: false,
    filter: false,
    cellStyle: { padding: '8px' }
  },
]

export const courseColumns: ColDef<Course>[] = [
  { 
    field: 'title', 
    headerName: 'Course', 
    sortable: true, 
    filter: true,
    flex: 2,
    minWidth: 200,
    cellStyle: { fontSize: '14px', padding: '12px' }
  },
  { 
    field: 'category', 
    headerName: 'Category', 
    sortable: true, 
    filter: true,
    flex: 1.5,
    minWidth: 150,
    cellStyle: { fontSize: '14px', padding: '12px' }
  },
  { 
    field: 'students', 
    headerName: 'Students', 
    sortable: true, 
    filter: true,
    flex: 1,
    minWidth: 120,
    cellStyle: { fontSize: '14px', padding: '12px' }
  },
  {
    headerName: 'Actions',
    cellRenderer: (params: any) => (
      <Button asChild variant="ghost" size="sm" className="w-full">
        <Link href={`/admin/courses/${params.data.id}`}>View</Link>
      </Button>
    ),
    flex: 1,
    minWidth: 120,
    sortable: false,
    filter: false,
    cellStyle: { padding: '8px' }
  },
]

export const enrollmentColumns: ColDef<Enrollment>[] = [
  { 
    field: 'student.name', 
    headerName: 'Student', 
    sortable: true, 
    filter: true,
    flex: 2,
    minWidth: 200,
    cellStyle: { fontSize: '14px', padding: '12px' }
  },
  { 
    field: 'course.title', 
    headerName: 'Course', 
    sortable: true, 
    filter: true,
    flex: 2,
    minWidth: 200,
    cellStyle: { fontSize: '14px', padding: '12px' }
  },
  { 
    field: 'createdAt', 
    headerName: 'Date', 
    sortable: true, 
    filter: true,
    flex: 1.5,
    minWidth: 150,
    cellStyle: { fontSize: '14px', padding: '12px' },
    valueFormatter: (params: any) => new Date(params.value).toLocaleDateString()
  },
  {
    headerName: 'Actions',
    cellRenderer: (params: any) => (
      <Button asChild variant="ghost" size="sm" className="w-full">
        <Link href={`/admin/enrollments/${params.data._id}`}>View</Link>
      </Button>
    ),
    flex: 1,
    minWidth: 120,
    sortable: false,
    filter: false,
    cellStyle: { padding: '8px' }
  },
]

export const adminCourseColumns = (onDelete: (id: string) => void): ColDef<AdminCourse>[] => [
  { 
    field: 'title', 
    headerName: 'Title', 
    sortable: true, 
    filter: true,
    flex: 2,
    minWidth: 200,
    cellStyle: { fontSize: '14px', padding: '12px' }
  },
  { 
    field: 'category', 
    headerName: 'Category', 
    sortable: true, 
    filter: true,
    flex: 1.5,
    minWidth: 150,
    cellStyle: { fontSize: '14px', padding: '12px' }
  },
  { 
    field: 'level', 
    headerName: 'Level', 
    sortable: true, 
    filter: true,
    flex: 1,
    minWidth: 120,
    cellStyle: { fontSize: '14px', padding: '12px' }
  },
  { 
    field: 'price', 
    headerName: 'Price', 
    sortable: true, 
    filter: true,
    flex: 1,
    minWidth: 100,
    cellRenderer: (params: any) => `$${params.value}`,
    cellStyle: { fontSize: '14px', padding: '12px' }
  },
  { 
    field: 'instructor', 
    headerName: 'Instructor', 
    sortable: true, 
    filter: true,
    flex: 1.5,
    minWidth: 150,
    cellStyle: { fontSize: '14px', padding: '12px' }
  },
  { 
    field: 'students', 
    headerName: 'Students', 
    sortable: true, 
    filter: true,
    flex: 1,
    minWidth: 100,
    cellStyle: { fontSize: '14px', padding: '12px' }
  },
  { 
    field: 'isPublished', 
    headerName: 'Status', 
    sortable: true, 
    filter: true,
    flex: 1,
    minWidth: 120,
    cellRenderer: (params: any) => (
      <span
        className={`inline-flex justify-center rounded-full px-2 py-1 text-xs font-medium ${
          params.value ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {params.value ? "Published" : "Draft"}
      </span>
    ),
    cellStyle: { fontSize: '14px', padding: '12px' }
  },
  {
    headerName: 'Actions',
    minWidth: 100,
    flex: 1,
    sortable: false,
    filter: false,
    cellRenderer: (params: any) => (
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
            <Link href={`/admin/courses/${params.data._id}`}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/admin/courses/${params.data._id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => onDelete(params.data._id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    cellStyle: { padding: '8px' }
  },
] 