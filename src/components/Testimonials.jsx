import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiStar } from 'react-icons/hi'
import {
  HiOutlineOfficeBuilding,
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
} from 'react-icons/hi'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { testimonials } from '../data/content'
import { useInView } from '../hooks/useInView'

const trustBadges = [
  { Icon: HiOutlineOfficeBuilding, label: 'HMDA Approved' },
  { Icon: HiOutlineDocumentText,   label: 'DTCP Certified' },
  { Icon: HiStar,                  label: '4.9/5 Rating' },
  { Icon: HiOutlineShieldCheck,    label: 'Secure Transactions' },
  { Icon: HiOutlineUserGroup,      label: '600+ Investors' },
]

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <HiStar key={i} className={`w-4 h-4 ${i < rating ? 'text-accent' : 'text-gray-300'}`} />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [ref, inView] = useInView()
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Testimonials
          </div>
          <h2 className="section-title gold-underline">What Our Investors Say</h2>
          <p className="section-subtitle">
            Real stories from real investors who trusted HKMC with their future.
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-light rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <StarRating rating={t.rating} />
              <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-dark text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.location} · {t.project}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.35 }}
                className="bg-light rounded-2xl p-6"
              >
                <StarRating rating={testimonials[current].rating} />
                <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-4">
                  "{testimonials[current].text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-dark text-sm">{testimonials[current].name}</div>
                    <div className="text-gray-400 text-xs">{testimonials[current].location} · {testimonials[current].project}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center">
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-primary w-6' : 'bg-gray-300'}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center">
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 bg-light px-4 py-2 rounded-full text-sm text-gray-600">
              <badge.Icon className="w-4 h-4 text-primary" />
              <span className="font-medium">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
