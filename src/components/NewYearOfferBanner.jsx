import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineGift, HiX, HiSparkles } from 'react-icons/hi'
import { FiPhone } from 'react-icons/fi'
import { RiWhatsappLine } from 'react-icons/ri'
import { PHONE_CALL, PHONE_WHATSAPP } from '../data/content'

export default function NewYearOfferBanner() {
  const [dismissed, setDismissed] = useState(false)

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80, transition: { duration: 0.3 } }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-40 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #1E3A8A 50%, #1e293b 75%, #0f172a 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 8s ease infinite',
          }}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent animate-shimmer" 
                 style={{ backgroundSize: '200% 100%' }} />
          </div>

          {/* Floating sparkles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeInOut',
                }}
              >
                <HiSparkles className="text-accent w-3 h-3" />
              </motion.div>
            ))}
          </div>

          {/* Glowing orbs */}
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
            <div className="flex flex-wrap items-center justify-between gap-4">

              {/* Left: Main offer content */}
              <div className="flex items-center gap-4 flex-wrap">
                {/* Mega animated gift box */}
                <motion.div
                  animate={{ 
                    rotate: [-10, 10, -10],
                    y: [0, -5, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="relative shrink-0"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-accent via-yellow-400 to-accent rounded-2xl flex items-center justify-center shadow-2xl shadow-accent/50 border-2 border-yellow-300">
                    <HiOutlineGift className="w-7 h-7 text-dark" />
                  </div>
                  {/* Pulsing ring */}
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-2xl border-2 border-accent"
                  />
                </motion.div>

                <div className="flex flex-col gap-2">
                  {/* Top row: badge + headline */}
                  <div className="flex flex-wrap items-center gap-2">
                    <motion.span
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-gradient-to-r from-accent via-yellow-300 to-accent text-dark text-xs font-black px-3 py-1 rounded-full tracking-wide uppercase shadow-lg border border-yellow-300"
                    >
                      🎊 MEGA NEW YEAR 2026 OFFER
                    </motion.span>
                  
                  </div>

                  {/* Bottom row: offer details */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-white font-semibold text-sm sm:text-base">
                      Book your plot at
                    </span>

                    {/* Price with strikethrough */}
                    <div className="flex items-center gap-2">
                      <span className="text-white/50 line-through text-sm">₹3,500</span>
                      <motion.span
                        animate={{ 
                          scale: [1, 1.08, 1],
                          textShadow: [
                            '0 0 8px rgba(212, 175, 55, 0.5)',
                            '0 0 16px rgba(212, 175, 55, 0.8)',
                            '0 0 8px rgba(212, 175, 55, 0.5)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="font-serif text-accent font-black text-xl sm:text-2xl leading-none"
                      >
                        ₹2,000/sq.yd
                      </motion.span>
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        SAVE 43%
                      </span>
                    </div>

                    <span className="hidden sm:inline text-white/30 text-lg">•</span>

                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="flex items-center gap-1.5 text-accent font-semibold text-sm"
                    >
                      <HiOutlineGift className="w-4 h-4 shrink-0" />
                      <span>+ Surprise Gift Worth ₹10,000</span>
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Right: CTAs + close */}
              <div className="flex items-center gap-2 ml-auto">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`tel:${PHONE_CALL}`}
                  className="flex items-center gap-2 bg-gradient-to-r from-accent via-yellow-400 to-accent hover:from-yellow-400 hover:to-accent text-dark text-sm font-black px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-accent/30 whitespace-nowrap border border-yellow-300"
                >
                  <FiPhone className="w-4 h-4" /> Call Now
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/91${PHONE_WHATSAPP}?text=Hi, I'm interested in the New Year 2026 Mega Offer (₹2,000/sq.yd + Free Gift). Please share details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm font-black px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-green-500/30 whitespace-nowrap"
                >
                  <RiWhatsappLine className="w-4 h-4" /> WhatsApp
                </motion.a>
                <button
                  onClick={() => setDismissed(true)}
                  className="ml-1 text-white/40 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                  aria-label="Dismiss banner"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
