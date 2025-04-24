export interface Instructor {
  name: string
  bio: string
  avatar?: string
}

export interface Lecture {
  title: string
  duration: string
}

export interface CurriculumSection {
  title: string
  lectures: Lecture[]
}

export interface Review {
  _id: string
  user: string
  rating: number
  date: string
  comment: string
}

export interface Course {
  _id: string
  title: string
  description: string
  longDescription: string
  category: string
  level: string
  price: number
  instructor: string | Instructor
  rating: number
  students: number
  duration: string
  lectures: number
  lastUpdated: string
  imageUrl?: string
  whatYouWillLearn: string[]
  curriculum: CurriculumSection[]
  reviews: Review[]
} 