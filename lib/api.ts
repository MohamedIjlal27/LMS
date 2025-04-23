// This file contains mock API functions for the learning platform
// In a real application, these would make actual API calls to a backend server

// Types
export type Course = {
  id: number
  title: string
  description: string
  category: string
  level: string
  price: number
  instructor: string
  duration: string
  students: number
  rating: number
  status: "Published" | "Draft"
}

export type Student = {
  id: number
  name: string
  email: string
  enrolledCourses: number
  joinDate: string
  lastActive: string
  status: "Active" | "Inactive"
}

export type Enrollment = {
  id: number
  studentId: number
  student: string
  courseId: number
  course: string
  enrollmentDate: string
  progress: number
  status: "Not Started" | "In Progress" | "Completed"
}

// Mock API functions

// Courses
export async function getCourses(): Promise<Course[]> {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Introduction to Web Development",
          description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
          category: "Development",
          level: "Beginner",
          price: 49.99,
          instructor: "John Smith",
          duration: "10 hours",
          students: 1245,
          rating: 4.7,
          status: "Published",
        },
        {
          id: 2,
          title: "Advanced React Techniques",
          description: "Master advanced React concepts including hooks, context API, and performance optimization.",
          category: "Development",
          level: "Advanced",
          price: 79.99,
          instructor: "Sarah Johnson",
          duration: "12 hours",
          students: 873,
          rating: 4.9,
          status: "Published",
        },
        // More courses would be here
      ])
    }, 500)
  })
}

export async function getCourse(id: number): Promise<Course | null> {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: id,
        title: "Advanced React Techniques",
        description: "Master advanced React concepts including hooks, context API, and performance optimization.",
        category: "Development",
        level: "Advanced",
        price: 79.99,
        instructor: "Sarah Johnson",
        duration: "12 hours",
        students: 873,
        rating: 4.9,
        status: "Published",
      })
    }, 500)
  })
}

export async function createCourse(course: Omit<Course, "id" | "students" | "rating">): Promise<Course> {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...course,
        id: Math.floor(Math.random() * 1000),
        students: 0,
        rating: 0,
      })
    }, 500)
  })
}

// Students
export async function getStudents(): Promise<Student[]> {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
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
        // More students would be here
      ])
    }, 500)
  })
}

export async function getStudent(id: number): Promise<Student | null> {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: id,
        name: "John Doe",
        email: "john.doe@example.com",
        enrolledCourses: 3,
        joinDate: "Jan 15, 2023",
        lastActive: "2 days ago",
        status: "Active",
      })
    }, 500)
  })
}

// Enrollments
export async function getEnrollments(): Promise<Enrollment[]> {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          studentId: 1,
          student: "John Doe",
          courseId: 1,
          course: "Introduction to Web Development",
          enrollmentDate: "Jan 20, 2023",
          progress: 75,
          status: "In Progress",
        },
        {
          id: 2,
          studentId: 2,
          student: "Jane Smith",
          courseId: 2,
          course: "Advanced React Techniques",
          enrollmentDate: "Feb 25, 2023",
          progress: 30,
          status: "In Progress",
        },
        // More enrollments would be here
      ])
    }, 500)
  })
}

export async function createEnrollment(studentId: number, courseId: number): Promise<Enrollment> {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 1000),
        studentId,
        student: "John Doe", // This would come from the backend
        courseId,
        course: "Introduction to Web Development", // This would come from the backend
        enrollmentDate: new Date().toLocaleDateString(),
        progress: 0,
        status: "Not Started",
      })
    }, 500)
  })
}
