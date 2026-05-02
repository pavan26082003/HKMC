import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiPhone, FiMail, FiMapPin, FiClock,
  FiCheckCircle, FiTrendingUp, FiGift, FiFileText, FiAlertCircle,
} from 'react-icons/fi'
import { RiWhatsappLine } from 'react-icons/ri'
import { HiOutlineHome } from 'react-icons/hi'
import { useInView } from '../hooks/useInView'
import { PHONE_CALL, PHONE_WHATSAPP, EMAIL } from '../data/content'

const projectOptions = ['Eden Farms (Konadal)', 'Deccan Heights (Shadnagar)', 'Both Projects']
const plotSizeOptions = ['100 sq.yd', '121 sq.yd', '200 sq.yd', '242 sq.yd', '400 sq.yd', '800 sq.yd', 'Other']

const whyActNow = [
  { Icon: FiAlertCircle,  text: 'Limited plots available' },
  { Icon: FiTrendingUp,   text: 'Prices increasing quarterly' },
  { Icon: FiCheckCircle,  text: 'Zero brokerage charges' },
  { Icon: FiGift,         text: 'Free site visit arranged' },
  { Icon: FiFileText,     text: 'Instant documentation' },
]

export default function LeadCapture() {
  const [ref, inView] = useInView()
  const [form, setForm] = useState({ name: '', phone: '', email: '', project: '', plotSize: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({ name: '', phone: '', email: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }

  const validateForm = () => {
    const newErrors = { name: '', phone: '', email: '' }
    let isValid = true
    if (!form.name.trim()) { newErrors.name = 'Name is required'; isValid = false }
    else if (form.name.trim().length < 2) { newErrors.name = 'Name must be at least 2 characters'; isValid = false }
    else if (!/^[a-zA-Z\s]+$/.test(form.name)) { newErrors.name = 'Name should only contain letters'; isValid = false }
    if (!form.phone.trim()) { newErrors.phone = 'Phone number is required'; isValid = false }
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) { newErrors.phone = 'Enter a valid 10-digit Indian mobile number'; isValid = false }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { newErrors.email = 'Enter a valid email address'; isValid = false }
    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    const formData = new FormData(e.target)
    try {
      await fetch('https://formsubmit.co/hmcbuilderanddevelopers@gmail.com', { method: 'POST', body: formData })
      setLoading(false)
      setSubmitted(true)
    } catch {
      setLoading(false)
      setSubmitted(true)
    }
  }

  return (
    <section id="contact" className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Get In Touch
          </div>
          <h2 className="section-title gold-underline">Book Your Free Site Visit</h2>
          <p className="section-subtitle">
            Take the first step toward your dream investment. Our team will get back to you within 2 hours.
          </p>
        </motion.div>

        {/* ── 3-column grid: contact | form | map ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* ── Col 1: Contact details + Why Act Now ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5"
          >
            {/* Contact buttons */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-dark text-base mb-4">Contact Us Directly</h3>

              <a href={`tel:${PHONE_CALL}`}
                className="flex items-center gap-3 p-3.5 bg-primary hover:bg-blue-900 rounded-xl text-white transition-colors mb-3">
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                  <FiPhone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-white/70">Call Us Now</div>
                  <div className="font-bold text-sm">{PHONE_CALL}</div>
                </div>
              </a>

              <a href={`https://wa.me/91${PHONE_WHATSAPP}?text=Hi, I'm interested in your plots. Please share details.`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 bg-green-500 hover:bg-green-600 rounded-xl text-white transition-colors mb-3">
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                  <RiWhatsappLine className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-white/70">WhatsApp Us</div>
                  <div className="font-bold text-sm">{PHONE_WHATSAPP}</div>
                </div>
              </a>

              <a href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 p-3.5 bg-light hover:bg-gray-200 rounded-xl text-dark transition-colors">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <FiMail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Email Us</div>
                  <div className="font-medium text-xs truncate">{EMAIL}</div>
                </div>
              </a>
            </div>

            {/* Why Act Now */}
            <div className="bg-gradient-to-br from-primary to-blue-800 rounded-2xl p-6 text-white">
              <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">Why Act Now?</h4>
              <div className="space-y-3">
                {whyActNow.map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-white/90">
                    <Icon className="w-4 h-4 text-accent shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Col 2: Enquiry Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm h-full">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    We've received your enquiry. Our team will contact you within 2 hours.
                  </p>
                  <div className="flex flex-col gap-3">
                    <a href={`tel:${PHONE_CALL}`} className="btn-primary flex items-center justify-center gap-2">
                      <FiPhone className="w-4 h-4" /> Call Us Now
                    </a>
                    <a href={`https://wa.me/91${PHONE_WHATSAPP}`} target="_blank" rel="noopener noreferrer"
                      className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                      <RiWhatsappLine className="w-4 h-4" /> WhatsApp
                    </a>
                  </div>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-semibold text-dark text-base mb-5">Send Enquiry</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="hidden" name="_subject" value="New Lead - HKMC Builders Website" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_captcha" value="false" />

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name *</label>
                        <input type="text" name="name" required value={form.name} onChange={handleChange}
                          placeholder="Your name"
                          className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary/20'}`} />
                        {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle className="w-3 h-3" />{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone *</label>
                        <input type="tel" name="phone" required value={form.phone} onChange={handleChange}
                          placeholder="10-digit number" maxLength="10"
                          className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary/20'}`} />
                        {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle className="w-3 h-3" />{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="your@email.com"
                        className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary/20'}`} />
                      {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle className="w-3 h-3" />{errors.email}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Project</label>
                        <select name="project" value={form.project} onChange={handleChange}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white">
                          <option value="">Select Project</option>
                          {projectOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Plot Size</label>
                        <select name="plotSize" value={form.plotSize} onChange={handleChange}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white">
                          <option value="">Select Size</option>
                          {plotSizeOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Message (Optional)</label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                        placeholder="Any specific requirements or questions..."
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
                    </div>

                    <button type="submit" disabled={loading}
                      className="btn-primary w-full py-3 text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {loading ? (
                        <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>Sending...</>
                      ) : (
                        <><HiOutlineHome className="w-4 h-4" />Book Free Site Visit</>
                      )}
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      By submitting, you agree to be contacted by HKMC Builders. No spam, ever.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>

          {/* ── Col 3: Map + Address + Hours ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-5"
          >
            {/* Map card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {/* Map — taller for better visibility */}
              <div className="relative w-full h-56">
                <iframe
                  title="HKMC Builders Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4516.028189543515!2d78.45830362577942!3d17.404793102302307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97689410c401%3A0x552daf9ba01104d8!2sHKMC%20BUILDERS%20%26%20DEVELOPERS%20PVT%20LTD!5e1!3m2!1sen!2sin!4v1777540427711!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
                {/* "Our Office" badge overlay */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md flex items-center gap-1.5 pointer-events-none">
                  <FiMapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-xs font-semibold text-primary">HKMC Office</span>
                </div>
              </div>

              {/* Address below map */}
              <div className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <FiMapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark text-sm leading-tight">HKMC Builders & Developers Pvt. Ltd.</p>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">Lakdikapul, Hyderabad,<br />Telangana – 500004</p>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=HKMC+Builders+Developers+Lakdikapul+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary hover:text-white text-primary text-xs font-semibold py-2.5 rounded-xl transition-all"
                >
                  <FiMapPin className="w-3.5 h-3.5" /> Get Directions
                </a>
              </div>
            </div>

            {/* Office hours card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FiClock className="w-4 h-4 text-primary" />
                </div>
                <h4 className="font-semibold text-dark text-sm">Office Hours</h4>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-600 text-sm">Monday – Saturday</span>
                  <span className="font-semibold text-primary text-sm">9 AM – 7 PM</span>
                </div>
               
              </div>
              <div className="mt-4 bg-green-50 border border-green-100 rounded-xl px-4 py-2.5 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
                <span className="text-green-700 text-xs font-medium">We're open now — call us!</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
