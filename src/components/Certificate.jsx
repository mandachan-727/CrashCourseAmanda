import { useRef } from 'react'
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'

export default function Certificate({ course, onClose }) {
  const certificateRef = useRef(null)

  const handleDownload = async () => {
    if (!certificateRef.current) return

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: null
      })
      
      const link = document.createElement('a')
      link.download = `${course.title}-Certificate.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error generating certificate:', error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl max-w-4xl w-full p-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-display font-bold text-secondary-900 mb-2">
            Course Completion Certificate
          </h2>
          <p className="text-secondary-600">
            Congratulations on completing the course! Download your certificate below.
          </p>
        </div>

        {/* Certificate Design */}
        <div
          ref={certificateRef}
          className="aspect-[1.414] bg-white border-8 border-primary-600 p-8 mb-6"
        >
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-display font-bold text-primary-600 mb-2">
                Certificate of Completion
              </h1>
              <p className="text-xl text-secondary-600">
                This is to certify that
              </p>
            </div>

            <div className="mb-8">
              <p className="text-3xl font-display font-bold text-secondary-900 mb-2">
                [Your Name]
              </p>
              <p className="text-xl text-secondary-600">
                has successfully completed
              </p>
            </div>

            <div className="mb-8">
              <p className="text-2xl font-display font-bold text-primary-600 mb-2">
                {course.title}
              </p>
              <p className="text-secondary-600">
                with distinction
              </p>
            </div>

            <div className="mt-auto w-full">
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="h-24 border-t border-secondary-300 w-48 mx-auto mb-2" />
                  <p className="text-secondary-600">Course Instructor</p>
                </div>
                <div className="text-center">
                  <div className="h-24 border-t border-secondary-300 w-48 mx-auto mb-2" />
                  <p className="text-secondary-600">Date</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-secondary-700 hover:text-secondary-900"
          >
            Close
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-sm"
          >
            Download Certificate
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
} 