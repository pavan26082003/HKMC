import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiPhone, FiMapPin, FiArrowLeft, FiChevronRight, FiAlertCircle,
} from 'react-icons/fi'
import {
  HiOutlineAcademicCap, HiOutlineHeart, HiOutlineShoppingCart,
  HiOutlineChip, HiOutlineOfficeBuilding, HiOutlineLightningBolt,
  HiOutlineShieldCheck, HiOutlineHome, HiCheckCircle,
  HiOutlineDocumentText, HiOutlineUserGroup, HiOutlineTrendingUp,
} from 'react-icons/hi'
import { MdOutlineTrain, MdOutlineFlight, MdOutlineFactory, MdOutlineConstruction } from 'react-icons/md'
import { RiWhatsappLine, RiPlantLine, RiDropLine, RiBuilding2Line } from 'react-icons/ri'
import { projects, PHONE_CALL, PHONE_WHATSAPP } from '../data/content'

// ── Icon resolver ─────────────────────────────────────────────────────────────
const ICON_MAP = {
  highway:   HiOutlineLightningBolt,
  school:    HiOutlineAcademicCap,
  hospital:  HiOutlineHeart,
  shopping:  HiOutlineShoppingCart,
  train:     MdOutlineTrain,
  industry:  MdOutlineFactory,
  orr:       HiOutlineLightningBolt,
  it:        HiOutlineChip,
  airport:   MdOutlineFlight,
  city:      HiOutlineOfficeBuilding,
  construct: MdOutlineConstruction,
  road:      HiOutlineLightningBolt,
  homes:     HiOutlineHome,
  retail:    HiOutlineShoppingCart,
  power:     HiOutlineLightningBolt,
  water:     RiDropLine,
  tree:      RiPlantLine,
  shield:    HiOutlineShieldCheck,
  drain:     RiDropLine,
  club:      RiBuilding2Line,
}

function resolveIcon(iconKey) {
  return ICON_MAP[iconKey] || FiMapPin
}

// ── Reusable pieces ───────────────────────────────────────────────────────────
function SectionHeading({ label, title }) {
  return (
    <div className="mb-8">
      <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
        {label}
      </span>
      <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary">{title}</h3>
      <div className="w-12 h-0.5 bg-accent mt-3 rounded-full" />
    </div>
  )
}

function InfoCard({ iconKey, title, desc }) {
  const Icon = resolveIcon(iconKey)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex gap-4"
    >
      <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h4 className="font-semibold text-dark text-sm mb-1">{title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

// ── Talking point icons ───────────────────────────────────────────────────────
const talkingPointIcons = [
  HiOutlineTrendingUp,
  HiOutlineDocumentText,
  HiOutlineTrendingUp,
  MdOutlineFactory,
  HiOutlineHome,
  HiOutlineUserGroup,
]

function TalkingPoint({ text, index }) {
  const Icon = talkingPointIcons[index % talkingPointIcons.length]
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3.5 shadow-sm"
    >
      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="text-gray-700 text-sm leading-relaxed">{text}</span>
    </motion.div>
  )
}

// ── Layout Zoom/Pan Viewer ────────────────────────────────────────────────────
function LayoutViewer({ project, PHONE_CALL }) {
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const MIN_SCALE = 1
  const MAX_SCALE = 5
  const STEP = 0.5

  const zoomIn  = () => setScale(s => Math.min(s + STEP, MAX_SCALE))
  const zoomOut = () => setScale(s => { const next = Math.max(s - STEP, MIN_SCALE); if (next === 1) setPos({ x: 0, y: 0 }); return next })
  const reset   = () => { setScale(1); setPos({ x: 0, y: 0 }) }

  const onWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY < 0 ? STEP : -STEP
    setScale(s => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, s + delta))
      if (next === 1) setPos({ x: 0, y: 0 })
      return next
    })
  }

  const onMouseDown = (e) => {
    if (scale === 1) return
    setDragging(true)
    setDragStart({ x: e.clientX - pos.x, y: e.clientY - pos.y })
  }
  const onMouseMove = (e) => {
    if (!dragging) return
    setPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }
  const onMouseUp = () => setDragging(false)

  // Touch support
  const lastTouchDist = useRef(null)
  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      lastTouchDist.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
    } else if (e.touches.length === 1 && scale > 1) {
      setDragging(true)
      setDragStart({ x: e.touches[0].clientX - pos.x, y: e.touches[0].clientY - pos.y })
    }
  }
  const onTouchMove = (e) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      if (lastTouchDist.current) {
        const ratio = dist / lastTouchDist.current
        setScale(s => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s * ratio)))
      }
      lastTouchDist.current = dist
    } else if (e.touches.length === 1 && dragging) {
      setPos({ x: e.touches[0].clientX - dragStart.x, y: e.touches[0].clientY - dragStart.y })
    }
  }
  const onTouchEnd = () => { setDragging(false); lastTouchDist.current = null }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [scale])

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <SectionHeading label="Layout" title="Project Layout Plan" />
      <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-blue-900 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{project.name} — Layout Plan</p>
              <p className="text-white/60 text-xs">{project.location}</p>
            </div>
          </div>
          <span className={`${project.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shrink-0`}>
            {project.badge === 'Premium' ? 'HMDA Approved' : 'DTCP Approved'}
          </span>
        </div>

        {project.layoutImage ? (
          <>
            {/* Zoom controls */}
            <div className="bg-white border-b border-gray-100 px-5 py-2.5 flex items-center justify-between gap-3">
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l5 5m-5-5a7 7 0 10-14 0 7 7 0 0014 0z" />
                </svg>
                Scroll or pinch to zoom · Drag to pan
              </span>
              <div className="flex items-center gap-2">
                {/* Zoom out */}
                <button onClick={zoomOut} disabled={scale <= MIN_SCALE}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                {/* Scale indicator */}
                <span className="text-xs font-semibold text-primary w-10 text-center">{Math.round(scale * 100)}%</span>
                {/* Zoom in */}
                <button onClick={zoomIn} disabled={scale >= MAX_SCALE}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                {/* Reset */}
                <button onClick={reset} disabled={scale === 1}
                  className="text-xs font-semibold text-gray-400 hover:text-primary px-3 py-1.5 rounded-lg border border-gray-200 hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                  Reset
                </button>
              </div>
            </div>

            {/* Image viewport */}
            <div
              ref={containerRef}
              className="relative bg-[#f0f2f5] overflow-hidden select-none"
              style={{ height: '520px', cursor: scale > 1 ? (dragging ? 'grabbing' : 'grab') : 'default' }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Checkerboard hint when zoomed */}
              <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'repeating-conic-gradient(#888 0% 25%, transparent 0% 50%)', backgroundSize: '20px 20px' }} />

              <img
                src={project.layoutImage}
                alt={`${project.name} layout plan - ${project.location} open plots by HKMC Builders`}
                draggable={false}
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                  transformOrigin: 'center center',
                  transition: dragging ? 'none' : 'transform 0.2s ease',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  position: 'absolute',
                  inset: 0,
                }}
              />

              {/* Zoom level badge */}
              {scale > 1 && (
                <div className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-bold px-2.5 py-1 rounded-full pointer-events-none">
                  {Math.round(scale * 100)}%
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-gradient-to-br from-primary/5 to-accent/10 flex flex-col items-center justify-center gap-4 py-20">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <p className="font-semibold text-primary text-base">Layout Coming Soon</p>
            <p className="text-gray-400 text-sm">Contact us to get the detailed layout plan</p>
            <a href={`tel:${PHONE_CALL}`}
              className="flex items-center gap-2 bg-primary hover:bg-blue-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
              <FiPhone className="w-4 h-4" /> Call for Layout
            </a>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ProjectDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  const [activeImg, setActiveImg] = useState(0)
  const [formData, setFormData] = useState({ name: '', phone: '', plotSize: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({ name: '', phone: '' })
  const [loading, setLoading] = useState(false)

  // Dynamic meta tags per project page
  useEffect(() => {
    if (!project) return
    const prevTitle = document.title
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content')

    document.title = `${project.name} – ${project.location} | HKMC Builders`

    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content',
      `${project.name} in ${project.location}. ${project.badge} open plots starting ₹${project.pricePerSqYard.toLocaleString('en-IN')}/sq.yd. ${project.badge === 'Premium' ? 'HMDA' : 'DTCP'} approved. Expected ROI: ${project.roi}. Book a free site visit today!`
    )

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', `${project.name} – ${project.location} | HKMC Builders`)

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content',
      `${project.name} in ${project.location}. Starting ₹${project.pricePerSqYard.toLocaleString('en-IN')}/sq.yd. ROI: ${project.roi}. Book free site visit!`
    )

    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', `https://hkmcbuilders.com/project/${project.id}`)

    return () => {
      document.title = prevTitle
      if (desc && prevDesc) desc.setAttribute('content', prevDesc)
      if (canonical) canonical.setAttribute('href', 'https://hkmcbuilders.com')
    }
  }, [project])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-semibold text-gray-500">Project not found.</p>
        <Link to="/" className="btn-primary">← Back to Projects</Link>
      </div>
    )
  }

  const validateForm = () => {
    const newErrors = { name: '', phone: '' }
    let isValid = true

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
      isValid = false
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should only contain letters'
      isValid = false
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
      isValid = false
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    // Submit form to FormSubmit.co
    const form = e.target
    const formData = new FormData(form)
    
    try {
      await fetch('https://formsubmit.co/hkmc.developer@gmail.com', {
        method: 'POST',
        body: formData,
      })
      setLoading(false)
      setSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
      setLoading(false)
      setSubmitted(true) // Still show success message
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Sticky top bar ── */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary font-medium text-sm hover:text-blue-900 transition-colors">
            <FiArrowLeft className="w-4 h-4" /> Back to Projects
          </button>
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span 
              className="text-gray-400 hover:text-primary cursor-pointer transition-colors" 
              onClick={() => {
                navigate('/')
                setTimeout(() => {
                  const projectsSection = document.getElementById('projects')
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }, 100)
              }}
            >
              HKMC Builders
            </span>
            <FiChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-primary font-semibold">{project.name}</span>
          </div>
          <a href={`tel:${PHONE_CALL}`} className="btn-accent text-xs py-2 px-4 flex items-center gap-1.5">
            <FiPhone className="w-3.5 h-3.5" /> Call Now
          </a>
        </div>
      </div>

      {/* ── Hero banner ── */}
      <div className="relative h-[55vh] min-h-[340px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImg}
            src={project.gallery[activeImg]}
            alt={`${project.name} - ${project.location} open plots by HKMC Builders Hyderabad`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover absolute inset-0"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className={`inline-block ${project.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}>
                {project.badge}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-2">{project.name}</h1>
              <p className="text-accent font-semibold text-lg mb-3">{project.tagline}</p>
              <div className="flex flex-wrap items-center gap-5 text-white/80 text-sm">
                <span className="flex items-center gap-1.5"><FiMapPin className="w-4 h-4" />{project.location}</span>
                <span className="flex items-center gap-1.5"><HiOutlineHome className="w-4 h-4" />₹{project.pricePerSqYard.toLocaleString('en-IN')}/sq.yd</span>
                <span className="flex items-center gap-1.5"><HiOutlineTrendingUp className="w-4 h-4" />ROI: {project.roi}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="absolute bottom-4 right-4 md:right-10 flex gap-2">
          {project.gallery.map((img, i) => (
            <button key={i} onClick={() => setActiveImg(i)}
              className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                i === activeImg ? 'border-accent scale-110' : 'border-white/40 opacity-70'
              }`}>
              <img src={img} alt={`${project.name} open plot - ${project.location} by HKMC Builders`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* ── Left: detail sections ── */}
          <div className="lg:col-span-2 space-y-16">

            {/* Overview */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionHeading label="Overview" title="About This Project" />
              <p className="text-gray-600 leading-relaxed text-base">{project.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {project.investmentBenefits.map((b) => (
                  <div key={b.label} className="bg-[#F5F5F5] rounded-2xl p-4 text-center">
                    <div className="font-serif text-2xl font-bold text-primary">{b.stat}</div>
                    <div className="text-dark text-xs font-semibold mt-1">{b.label}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{b.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pricing */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionHeading label="Pricing" title="Plot Sizes & Pricing" />
              <div className="grid sm:grid-cols-2 gap-4">
                {project.plotSizes.map((size) => {
                  const total = size * project.pricePerSqYard
                  return (
                    <div key={size} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-serif text-2xl font-bold text-primary">{size} sq.yd</span>
                        <span className={`${project.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>{project.badge}</span>
                      </div>
                      <div className="text-gray-500 text-sm mb-1">Total Investment</div>
                      <div className="text-2xl font-bold text-dark">₹{total.toLocaleString('en-IN')}</div>
                      <div className="text-gray-400 text-xs mt-1">@ ₹{project.pricePerSqYard.toLocaleString('en-IN')}/sq.yd</div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Layout Plan — Zoom & Pan Viewer */}
            <LayoutViewer project={project} PHONE_CALL={PHONE_CALL} />

            {/* Location Advantages */}
             <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionHeading label="Location" title="Location Advantages" />
              <div className="grid sm:grid-cols-2 gap-4">
                {project.locationAdvantages.map((item) => (
                  <InfoCard key={item.title} iconKey={item.iconKey} title={item.title} desc={item.desc} />
                ))}
              </div>
            </motion.div> 

            {/* Surrounding Developments */}
            {/* <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionHeading label="Growth" title="Surrounding Developments" />
              <div className="grid sm:grid-cols-2 gap-4">
                {project.surroundingDevelopments.map((item) => (
                  <InfoCard key={item.title} iconKey={item.iconKey} title={item.title} desc={item.desc} />
                ))}
              </div>
            </motion.div> */}

            {/* Infrastructure */}
            {/* <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionHeading label="Infrastructure" title="Infrastructure Developments" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.infrastructureDevelopments.map((item) => (
                  <InfoCard key={item.title} iconKey={item.iconKey} title={item.title} desc={item.desc} />
                ))}
              </div>
            </motion.div> */}

            {/* Future Growth */}
            {/* <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionHeading label="Investment" title="Future Growth Potential" />
              <div className="bg-gradient-to-br from-primary to-blue-900 rounded-2xl p-6 md:p-8 text-white">
                <p className="text-white/90 leading-relaxed mb-6">{project.futureGrowth.summary}</p>
                <div className="space-y-3">
                  {project.futureGrowth.points.map((pt, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3">
                      <FiChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-white/85 text-sm">{pt}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div> */}

            {/* Project Features */}
            {/* <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionHeading label="Features" title="Project Features" />
              <div className="grid sm:grid-cols-2 gap-3">
                {project.projectFeatures.map((f) => (
                  <div key={f} className="flex items-center gap-3 bg-[#F5F5F5] rounded-xl px-4 py-3">
                    <HiCheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-dark text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div> */}

            {/* Talking Points, key investment */} 
            {/* <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionHeading label="Why Invest" title="Key Investment Reasons" />
              <div className="space-y-3">
                {project.salesTalkingPoints.map((pt, i) => (
                  <TalkingPoint key={i} text={pt} index={i} />
                ))}
              </div>
            </motion.div> */}

            {/* Closing line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-accent/10 border border-accent/30 rounded-2xl p-6 text-center"
            >
              <p className="font-serif text-lg md:text-xl font-semibold text-dark italic leading-relaxed">
                "{project.closingLine}"
              </p>
            </motion.div>
          </div>

          {/* ── Right: sticky sidebar ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">

              {/* Enquiry form */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
                <h4 className="font-semibold text-dark text-base mb-4">Enquire About This Project</h4>

                {submitted ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <HiCheckCircle className="w-7 h-7 text-green-500" />
                    </div>
                    <p className="font-semibold text-primary mb-1">Thank you!</p>
                    <p className="text-gray-500 text-sm">We'll call you within 2 hours.</p>
                  </div>
                ) : (

                  
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="hidden" name="_subject" value={`New Site Visit Request - ${project.name}`} />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="Project" value={project.name} />
                    <input type="hidden" name="Location" value={project.location} />
                    
                    <div>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        placeholder="Your Name"
                        value={formData.name} 
                        onChange={handleInputChange}
                        className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.name 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-200 focus:border-primary focus:ring-primary/20'
                        }`} 
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <input 
                        type="tel" 
                        name="phone" 
                        required 
                        placeholder="Phone Number (10 digits)"
                        value={formData.phone} 
                        onChange={handleInputChange}
                        maxLength="10"
                        className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.phone 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-200 focus:border-primary focus:ring-primary/20'
                        }`} 
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    <select 
                      name="plotSize" 
                      value={formData.plotSize} 
                      onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white text-gray-600"
                    >
                      <option value="">Select Plot Size</option>
                      {project.plotSizes.map((s) => (
                        <option key={s} value={s}>{s} sq.yd — ₹{(s * project.pricePerSqYard).toLocaleString('en-IN')}</option>
                      ))}
                    </select>

                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-blue-900 text-white font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <HiOutlineHome className="w-4 h-4" /> Book Free Site Visit
                        </>
                      )}
                    </button>
                  </form>
                )}

                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                  <a href={`tel:${PHONE_CALL}`}
                    className="flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary hover:text-white text-primary font-semibold py-2.5 rounded-xl transition-all text-sm">
                    <FiPhone className="w-4 h-4" /> Call: {PHONE_CALL}
                  </a>
                  <a href={`https://wa.me/91${PHONE_WHATSAPP}?text=Hi, I'm interested in ${project.name}. Please share details.`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
                    <RiWhatsappLine className="w-4 h-4" /> WhatsApp Us
                  </a>
                </div>
              </div> 

              {/* Snapshot */}
              <div className="bg-[#F5F5F5] rounded-2xl p-5">
                <h4 className="font-semibold text-dark text-sm mb-3 uppercase tracking-wide">Project Snapshot</h4>
                <div className="space-y-2.5 text-sm">
                  {[
                    { label: 'Location',     value: project.location },
                    { label: 'Price',        value: `₹${project.pricePerSqYard.toLocaleString('en-IN')}/sq.yd` },
                    { label: 'Plot Sizes',   value: project.plotSizes.map(s => `${s} sq.yd`).join(', ') },
                    { label: 'Expected ROI', value: project.roi },
                    { label: 'Approval',     value: project.badge === 'Premium' ? 'HMDA Approved' : 'DTCP Approved' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between gap-2">
                      <span className="text-gray-500">{row.label}</span>
                      <span className="font-medium text-dark text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cross-sell */}
              {projects.filter(p => p.id !== project.id).map(other => (
                <div key={other.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <img src={other.image} alt={`${other.name} - ${other.location} open plots by HKMC Builders`} className="w-full h-28 object-cover" />
                  <div className="p-4">
                    <p className="text-xs text-gray-400 mb-1">Also explore</p>
                    <h5 className="font-serif font-bold text-primary">{other.name}</h5>
                    <p className="text-gray-500 text-xs mb-3">{other.location}</p>
                    <Link to={`/project/${other.id}`}
                      className="block text-center bg-primary/10 hover:bg-primary hover:text-white text-primary text-xs font-semibold py-2 rounded-lg transition-all">
                      View Project →
                    </Link>
                  </div>
                </div>
              ))}

              
            </div>     
          </div>
        </div>
      </div>
    </div>
  )
}
