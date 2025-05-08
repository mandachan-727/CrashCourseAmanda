import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CourseCard from '../components/CourseCard'
import ProjectView from '../components/ProjectView'
import Certificate from '../components/Certificate'
import { courses } from '../data/courses'

export default function CourseDetail() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [selectedProject, setSelectedProject] = useState(null)
  const [completedProjects, setCompletedProjects] = useState({})
  const [activeFilters, setActiveFilters] = useState([])
  const [showCertificate, setShowCertificate] = useState(false)

  const course = courses.find(c => c.id === courseId)

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
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-secondary-900">Course not found</h1>
        <button
          onClick={() => navigate('/courses')}
          className="mt-4 text-primary-600 hover:text-primary-700"
        >
          Back to Courses
        </button>
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-display font-bold text-secondary-900 mb-4">
          {course.title}
        </h1>
        <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
          {course.description}
        </p>
      </motion.div>

      {/* Filter Bar */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {course.tags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleFilter(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeFilters.includes(tag)
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

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