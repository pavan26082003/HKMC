import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPhone } from 'react-icons/fi'
import { PHONE_CALL } from '../data/content'
import Logo from './Logo'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])


  
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <Logo scrolled={scrolled} />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  scrolled ? 'text-dark' : 'text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href={`tel:${PHONE_CALL}`} className="btn-accent text-sm py-2 px-4 flex items-center gap-2">
              <FiPhone className="w-4 h-4" />
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-primary' : 'text-white'}`}
          >
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" style={{ transform: menuOpen ? 'rotate(45deg) translate(2px, 8px)' : '' }} />
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
            <div className="w-6 h-0.5 bg-current transition-all" style={{ transform: menuOpen ? 'rotate(-45deg) translate(2px, -8px)' : '' }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-dark font-medium py-2 border-b border-gray-100 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a href={`tel:${PHONE_CALL}`} className="btn-primary text-center mt-2 flex items-center justify-center gap-2">
                <FiPhone className="w-4 h-4" />
                Call Now: {PHONE_CALL}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
