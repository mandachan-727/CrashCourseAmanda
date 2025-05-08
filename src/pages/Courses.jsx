import { useState } from 'react'
import { motion } from 'framer-motion'
import CourseCard from '../components/CourseCard'

const courses = [
  {
    id: 'learning-science',
    title: 'Learning Science in Action',
    description: 'Explore research projects and approaches in educational technology.',
    tags: ['AI in Ed.', 'Data Science Ed.', 'AI/ML Literacy', 'Civic Learning', 'CSCL'],
    color: 'bg-blue-500',
  },
  {
    id: 'product-design',
    title: 'Designing Learning Products',
    description: 'Case studies of educational technology product design work.',
    tags: ['Game-Based Learning', 'AI Integration', 'Civic Tech', 'Equity-Centered UX'],
    color: 'bg-purple-500',
  },
  {
    id: 'life',
    title: 'Living My Life',
    description: 'A collection of personal projects, art, and creative pursuits.',
    tags: ['Cooking', 'Art', 'Writing', 'Projects'],
    color: 'bg-pink-500',
  }
]

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [completedLessons, setCompletedLessons] = useState({})

  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId)
    // Here you would typically navigate to the course page
    // For now, we'll just console.log
    console.log(`Selected course: ${courseId}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-display font-bold text-secondary-900 mb-4">
          Available Courses
        </h1>
        <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
          Choose a course path to explore different aspects of my work and life.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CourseCard
              title={course.title}
              description={course.description}
              tags={course.tags}
              isCompleted={completedLessons[course.id]}
              onClick={() => handleCourseSelect(course.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Progress bar at the bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="fixed bottom-0 left-0 right-0 bg-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-secondary-600">
                Course Progress
              </span>
              <div className="w-64 h-2 bg-secondary-200 rounded-full">
                <div
                  className="h-2 bg-primary-500 rounded-full"
                  style={{
                    width: `${(Object.keys(completedLessons).length / courses.length) * 100}%`
                  }}
                />
              </div>
            </div>
            <span className="text-sm font-medium text-secondary-600">
              {Object.keys(completedLessons).length} of {courses.length} completed
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 