import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import html2canvas from 'html2canvas'

export default function Certificate({ courseTitle }) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')

  const handleDownload = async () => {
    const element = document.getElementById('certificate')
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: null,
      logging: false
    })
    
    const link = document.createElement('a')
    link.download = `${courseTitle.toLowerCase().replace(/\s+/g, '-')}-certificate.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-300"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        View Certificate
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={() => setIsOpen(false)}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-2xl font-display font-bold text-secondary-900 mb-4">
                        Course Completion Certificate
                      </h3>
                      
                      <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div id="certificate" className="relative bg-white p-8 rounded-lg border-2 border-primary-500 mb-4">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-primary-600"></div>
                        <div className="text-center">
                          <h4 className="text-3xl font-display font-bold text-secondary-900 mb-2">
                            Certificate of Completion
                          </h4>
                          <p className="text-secondary-600 mb-4">
                            This is to certify that
                          </p>
                          <p className="text-2xl font-display font-bold text-primary-600 mb-4">
                            {name || 'Your Name'}
                          </p>
                          <p className="text-secondary-600 mb-4">
                            has successfully completed the course
                          </p>
                          <p className="text-xl font-display font-bold text-secondary-900 mb-8">
                            {courseTitle}
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-secondary-500">
                              Date: {new Date().toLocaleDateString()}
                            </div>
                            <div className="text-sm text-secondary-500">
                              Certificate ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownload}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-300"
                  >
                    Download Certificate
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-300"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 