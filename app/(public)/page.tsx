import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, Users, CheckCircle } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Expand Your Knowledge with Our Online Courses
              </h1>
              <p className="text-lg md:text-xl">
                Access high-quality courses taught by industry experts and advance your career with our comprehensive
                learning platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white bg-white/10">
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] w-full rounded-lg shadow-xl">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Students learning online"
                fill
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Why Choose Our Platform</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 inline-block">
                <GraduationCap size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals with years of experience.</p>
            </div>
            <div className="rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 inline-block">
                <BookOpen size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Diverse Courses</h3>
              <p className="text-gray-600">Explore a wide range of subjects to expand your knowledge.</p>
            </div>
            <div className="rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 inline-block">
                <Users size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Community Support</h3>
              <p className="text-gray-600">Connect with fellow learners and build your network.</p>
            </div>
            <div className="rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 inline-block">
                <CheckCircle size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Certification</h3>
              <p className="text-gray-600">Earn certificates to showcase your achievements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Popular Courses</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
                <div className="relative h-48 w-full">
                  <Image
                    src={`/placeholder.svg?height=200&width=400&text=Course+${i}`}
                    alt={`Course ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                      Category
                    </span>
                    <span className="font-bold text-blue-600">$49.99</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Course Title {i}</h3>
                  <p className="mb-4 text-gray-600">
                    Learn essential skills with our comprehensive curriculum designed for beginners and advanced
                    learners alike.
                  </p>
                  <Button asChild className="w-full">
                    <Link href={`/courses/${i}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">What Our Students Say</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={`/placeholder.svg?height=50&width=50&text=${i}`}
                      alt={`Student ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Student Name {i}</h4>
                    <p className="text-sm text-gray-500">Course Graduate</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "This platform has transformed my learning experience. The courses are well-structured, and the
                  instructors are knowledgeable and engaging."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Start Learning?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Join thousands of students who are already advancing their careers with our online courses.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
            <Link href="/register">Create Your Account</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
