import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

// Mock course data
const courses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
    category: "Development",
    level: "Beginner",
    price: 49.99,
    instructor: "John Smith",
    rating: 4.7,
    students: 1245,
  },
  {
    id: 2,
    title: "Advanced React Techniques",
    description: "Master advanced React concepts including hooks, context API, and performance optimization.",
    category: "Development",
    level: "Advanced",
    price: 79.99,
    instructor: "Sarah Johnson",
    rating: 4.9,
    students: 873,
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    description: "An introduction to data science concepts, tools, and methodologies.",
    category: "Data Science",
    level: "Intermediate",
    price: 59.99,
    instructor: "Michael Chen",
    rating: 4.5,
    students: 1032,
  },
  {
    id: 4,
    title: "UX/UI Design Principles",
    description: "Learn the core principles of user experience and interface design.",
    category: "Design",
    level: "Beginner",
    price: 49.99,
    instructor: "Emily Rodriguez",
    rating: 4.8,
    students: 756,
  },
  {
    id: 5,
    title: "Machine Learning for Beginners",
    description: "A beginner-friendly introduction to machine learning algorithms and applications.",
    category: "Data Science",
    level: "Beginner",
    price: 69.99,
    instructor: "David Kim",
    rating: 4.6,
    students: 1189,
  },
  {
    id: 6,
    title: "Full-Stack JavaScript Development",
    description: "Build complete web applications with Node.js, Express, and MongoDB.",
    category: "Development",
    level: "Intermediate",
    price: 89.99,
    instructor: "Alex Turner",
    rating: 4.8,
    students: 942,
  },
]

export default function CoursesPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 space-y-4 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">Browse Courses</h1>
        <p className="text-muted-foreground">Discover our wide range of courses to enhance your skills and knowledge</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search courses..." className="pl-10" />
        </div>
        <div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="data-science">Data Science</SelectItem>
              <SelectItem value="business">Business</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={`/placeholder.svg?height=200&width=400&text=Course+${course.id}`}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                  {course.category}
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">{course.level}</span>
              </div>
              <CardTitle className="line-clamp-1">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
              <div className="mt-4 flex items-center justify-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">{course.rating}</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">({course.students} students)</span>
                </div>
                <span className="font-bold text-blue-600">${course.price}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild className="w-full">
                <Link href={`/courses/${course.id}`}>View Course</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
