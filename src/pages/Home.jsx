import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const courses = [
  {
    id: 'learning-science',
    title: 'Learning Science in Action',
    description: 'Explore my research approach and projects in educational technology and learning sciences.',
    color: 'from-blue-500 to-blue-600',
    href: '/courses/learning-science'
  },
  {
    id: 'product-design',
    title: 'Designing Learning Products',
    description: 'Discover my product design work in educational technology and learning experiences.',
    color: 'from-purple-500 to-purple-600',
    href: '/courses/product-design'
  },
  {
    id: 'life',
    title: 'Living My Life',
    description: 'A peek into my creative pursuits, hobbies, and personal projects.',
    color: 'from-pink-500 to-pink-600',
    href: '/courses/life'
  }
]

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.h1 
          className="text-4xl sm:text-6xl font-display font-bold text-secondary-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to My Portfolio
        </motion.h1>
        <motion.p 
          className="text-xl text-secondary-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Choose a course to explore my work in learning science, product design, and personal projects.
        </motion.p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          >
            <Link
              to={course.href}
              className="block group"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-lg">
                <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <h2 className="text-white text-2xl font-display font-bold text-center">
                    {course.title}
                  </h2>
                </div>
              </div>
              <p className="text-secondary-600 group-hover:text-secondary-900 transition-colors duration-300">
                {course.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 