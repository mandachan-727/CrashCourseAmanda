import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CourseCard from '../components/CourseCard'
import ProjectView from '../components/ProjectView'
import Certificate from '../components/Certificate'
import { courses } from '../data/courses'

const course = {
  'learning-science': {
    title: 'Learning Science in Action',
    description: 'Explore my research approach and projects in educational technology and learning sciences.',
    color: 'from-blue-500 to-blue-600',
    modules: [
      {
        title: 'Research Methods',
        description: 'Understanding how I approach educational research and data analysis.',
        duration: '2 hours'
      },
      {
        title: 'Learning Analytics',
        description: 'Exploring data-driven insights in educational technology.',
        duration: '1.5 hours'
      },
      {
        title: 'Case Studies',
        description: 'Real-world examples of learning science in practice.',
        duration: '2.5 hours'
      }
    ]
  },
  'product-design': {
    title: 'Designing Learning Products',
    description: 'Discover my product design work in educational technology and learning experiences.',
    color: 'from-purple-500 to-purple-600',
    modules: [
      {
        title: 'User Research',
        description: 'Understanding user needs and behaviors in educational contexts.',
        duration: '2 hours'
      },
      {
        title: 'Design Process',
        description: 'My approach to designing effective learning experiences.',
        duration: '2.5 hours'
      },
      {
        title: 'Prototyping',
        description: 'Creating and testing learning product prototypes.',
        duration: '2 hours'
      }
    ]
  },
  'life': {
    title: 'Living My Life',
    description: 'A peek into my creative pursuits, hobbies, and personal projects.',
    color: 'from-pink-500 to-pink-600',
    modules: [
      {
        title: 'Creative Writing',
        description: 'Exploring my journey in creative writing and storytelling.',
        duration: '1.5 hours'
      },
      {
        title: 'Photography',
        description: 'Capturing moments and stories through my lens.',
        duration: '2 hours'
      },
      {
        title: 'Travel Adventures',
        description: 'Sharing experiences from my travels around the world.',
        duration: '2.5 hours'
      }
    ]
  }
}

export default function CourseDetail() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [selectedProject, setSelectedProject] = useState(null)
  const [completedProjects, setCompletedProjects] = useState({})
  const [activeFilters, setActiveFilters] = useState([])
  const [showCertificate, setShowCertificate] = useState(false)

  const course = course[courseId]

  useEffect(() => {
    // Load completed projects from localStorage
    const saved = localStorage.getItem(`completed-${courseId}`)
    if (saved) {
      setCompletedProjects(JSON.parse(saved))
    }
  }, [courseId])

  useEffect(() => {
    // Save completed projects to localStorage
    localStorage.setItem(`completed-${courseId}`, JSON.stringify(completedProjects))
  }, [completedProjects, courseId])

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-secondary-900 mb-4">Course Not Found</h1>
          <p className="text-secondary-600">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const filteredProjects = course.projects.filter(project =>
    activeFilters.length === 0 || project.tags.some(tag => activeFilters.includes(tag))
  )

  const handleProjectComplete = (projectId) => {
    setCompletedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }))
  }

  const toggleFilter = (tag) => {
    setActiveFilters(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const completionPercentage = (Object.keys(completedProjects).length / course.projects.length) * 100

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Course Header */}
      <motion.div 
        className="relative rounded-2xl overflow-hidden mb-12 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-90`} />
        <div className="relative px-8 py-12 sm:px-12 sm:py-16">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            {course.title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            {course.description}
          </p>
        </div>
      </motion.div>

      {/* Course Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {course.modules.map((module, index) => (
          <motion.div
            key={module.title}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-display font-bold text-secondary-900 mb-2">
                {module.title}
              </h3>
              <p className="text-secondary-600 mb-4">
                {module.description}
              </p>
              <div className="flex items-center text-sm text-secondary-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {module.duration}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certificate Section */}
      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-3xl font-display font-bold text-secondary-900 mb-4">
          Get Your Certificate
        </h2>
        <p className="text-secondary-600 mb-8 max-w-2xl mx-auto">
          Complete the course modules to earn your certificate of completion.
        </p>
        <Certificate courseTitle={course.title} />
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CourseCard
              title={project.title}
              description={project.problem}
              tags={project.tags}
              isCompleted={completedProjects[project.id]}
              onClick={() => setSelectedProject(project)}
            />
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
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
                  className="h-2 bg-primary-500 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-secondary-600">
                {Object.keys(completedProjects).length} of {course.projects.length} completed
              </span>
              {completionPercentage === 100 && (
                <button
                  onClick={() => setShowCertificate(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-sm"
                >
                  Get Certificate
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Project View Modal */}
      <ProjectView
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Certificate Modal */}
      {showCertificate && (
        <Certificate
          course={course}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  )
} 