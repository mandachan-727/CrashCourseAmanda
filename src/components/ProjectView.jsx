import { motion } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function ProjectView({ project, onClose }) {
  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-secondary-200 p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-display font-bold text-secondary-900">
              {project.title}
            </h2>
            <button
              onClick={onClose}
              className="text-secondary-500 hover:text-secondary-900"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Hero Image */}
          {project.image && (
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Sections */}
          <section>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              The Problem/Context
            </h3>
            <p className="text-secondary-600">{project.problem}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              My Role + Tools
            </h3>
            <p className="text-secondary-600">{project.role}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              Design or Research Process
            </h3>
            <p className="text-secondary-600">{project.process}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              Outcomes + Impact
            </h3>
            <p className="text-secondary-600">{project.outcomes}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              Reflection
            </h3>
            <p className="text-secondary-600">{project.reflection}</p>
          </section>

          {/* Sidebar Content */}
          {project.sidebar && (
            <div className="border-t border-secondary-200 pt-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Additional Resources
              </h3>
              <div className="space-y-4">
                {project.sidebar.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
                  >
                    <h4 className="font-medium text-secondary-900">{item.title}</h4>
                    <p className="text-sm text-secondary-600">{item.description}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
} 