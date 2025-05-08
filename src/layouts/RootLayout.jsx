import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'
import ContactModal from '../components/ContactModal'

export default function RootLayout() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <span className="font-display text-xl text-primary-600">Portfolio</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/courses" className="text-secondary-600 hover:text-secondary-900">
                Courses
              </Link>
              <button
                onClick={() => setIsContactOpen(true)}
                className="text-secondary-600 hover:text-secondary-900"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <Link to="/" className="text-secondary-500 hover:text-secondary-900">
                Home
              </Link>
              <Link to="/courses" className="text-secondary-500 hover:text-secondary-900">
                Courses
              </Link>
              <button
                onClick={() => setIsContactOpen(true)}
                className="text-secondary-500 hover:text-secondary-900"
              >
                Contact
              </button>
            </div>
            <div className="flex space-x-6">
              {/* Add your social media links here */}
              <a href="#" className="text-secondary-500 hover:text-secondary-900">
                Twitter
              </a>
              <a href="#" className="text-secondary-500 hover:text-secondary-900">
                LinkedIn
              </a>
              <a href="#" className="text-secondary-500 hover:text-secondary-900">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
} 