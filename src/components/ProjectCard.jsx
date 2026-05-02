import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiMapPin } from 'react-icons/fi'
import { RiWhatsappLine } from 'react-icons/ri'
import { HiCheckCircle } from 'react-icons/hi'
import { PHONE_WHATSAPP } from '../data/content'


export default function ProjectCard({ project, index = 0 }) {
  const [activeImg, setActiveImg] = useState(0)
  const navigate = useNavigate()

  const totalPrice = (size) =>
    (size * project.pricePerSqYard).toLocaleString('en-IN')

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
    >
      {/* ── Image gallery ── */}
      <div className="relative h-60 overflow-hidden cursor-pointer group" onClick={() => navigate(`/project/${project.id}`)}>
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImg}
            src={project.gallery[activeImg]}
            alt={`${project.name} - ${project.location} open plots HMDA DTCP approved by HKMC Builders`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <span className={`absolute top-3 left-3 ${project.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow`}>
          {project.badge}
        </span>
        <span className="absolute top-3 right-3 bg-accent text-dark text-xs font-bold px-3 py-1 rounded-full shadow">
          ROI: {project.roi}
        </span>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {project.gallery.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setActiveImg(i) }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeImg ? 'bg-white w-5' : 'bg-white/50 w-1.5'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-serif text-xl font-bold text-primary leading-tight">{project.name}</h3>
            <p className="text-accent text-xs font-semibold mt-0.5">{project.tagline}</p>
          </div>
          <div className="text-right shrink-0 ml-3">
            <div className="text-xl font-bold text-primary">₹{project.pricePerSqYard.toLocaleString('en-IN')}</div>
            <div className="text-gray-400 text-xs">per sq. yard</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
          <FiMapPin className="w-3.5 h-3.5 shrink-0 text-primary" />
          <span>{project.location}</span>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>

        {/* Plot sizes */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-dark mb-2 uppercase tracking-wide">Available Sizes</p>
          <div className="flex flex-wrap gap-2">
            {project.plotSizes.map((size) => (
              <div key={size} className="bg-[#F5F5F5] rounded-lg px-3 py-1.5 text-center">
                <span className="font-bold text-primary text-xs">{size} sq.yd</span>
                <span className="text-gray-400 text-xs ml-1">· ₹{totalPrice(size)}</span>
              </div>
            ))}
          </div>
        </div>


        {/* Highlights — top 4 */}
        <div className="grid grid-cols-2 gap-1 mb-5">
          {project.highlights.slice(0, 4).map((h) => (
            <div key={h} className="flex items-center gap-1.5 text-xs text-gray-600">
              <HiCheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>

        <div className="flex-1" />

        {/* CTA row */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => navigate(`/project/${project.id}`)}
            className="flex-1 bg-primary hover:bg-blue-900 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-1.5"
          >
            Know More →
          </button>
          <a
            href={`https://wa.me/91${PHONE_WHATSAPP}?text=Hi, I'm interested in ${project.name}. Please share details.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-1.5"
          >
            <RiWhatsappLine className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  )
}
