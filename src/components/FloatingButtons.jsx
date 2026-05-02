import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPhone, FiArrowUp, FiFileText } from 'react-icons/fi'
import { RiWhatsappLine } from 'react-icons/ri'
import { PHONE_CALL, PHONE_WHATSAPP } from '../data/content'

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    const timer = setTimeout(() => setShowTooltip(true), 3000)
    const hideTimer = setTimeout(() => setShowTooltip(false), 7000)
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-24 md:bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white text-dark text-sm px-4 py-2 rounded-xl shadow-xl border border-gray-100 whitespace-nowrap"
            >
              Chat with us on WhatsApp!
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href={`https://wa.me/91${PHONE_WHATSAPP}?text=Hi, I'm interested in your plots. Please share details.`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <RiWhatsappLine className="w-7 h-7" />
        </motion.a>
      </div>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-40 md:bottom-24 right-6 z-50 w-10 h-10 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-900 transition-colors"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-2xl px-4 py-3">
        <div className="flex gap-3">
          <a
            href={`tel:${PHONE_CALL}`}
            className="flex-1 bg-primary text-white text-center py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5"
          >
            <FiPhone className="w-4 h-4" />
            Call Now
          </a>
          <a
            href={`https://wa.me/91${PHONE_WHATSAPP}?text=Hi, I'm interested in your plots.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white text-center py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5"
          >
            <RiWhatsappLine className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href="#contact"
            className="flex-1 bg-accent text-dark text-center py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5"
          >
            <FiFileText className="w-4 h-4" />
            Enquire
          </a>
        </div>
      </div>
    </>
  )
}
