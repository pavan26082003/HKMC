import { motion } from 'framer-motion'
import { FiPhone, FiFileText, FiCalendar } from 'react-icons/fi'
import { PHONE_CALL } from '../data/content'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80"
          alt="Premium open plots in Hyderabad by HKMC Builders and Developers - HMDA DTCP approved investment land"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/75 to-blue-900/80" />
      </div>

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-96 h-96 border border-accent/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] border border-white/10 rounded-full"
        />
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-accent rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6"
        >
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-white/90 text-sm font-medium">HMDA & DTCP Approved Projects</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          Premium Open Plots
          <br />
          <span className="text-accent">for Smart Investment</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          HKMC Builders & Developers — Trusted by 500+ investors across Telangana.
          Secure your future with HMDA/DTCP approved plots in Hyderabad's fastest-growing corridors.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10"
        >
          {[
            { value: '15+', label: 'Years Experience' },
            { value: '600+', label: 'Happy Investors' },
            { value: '2', label: 'Premium Projects' },
            { value: '100%', label: 'Legal Clarity' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-accent font-bold text-2xl md:text-3xl font-serif">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#contact" className="btn-accent text-base px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2">
            <FiCalendar className="w-5 h-5" />
            Book Site Visit
          </a>
          <a href="#projects" className="btn-outline text-base px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2">
            <FiFileText className="w-5 h-5" />
            View Projects
          </a>
          <a
            href={`tel:${PHONE_CALL}`}
            className="flex items-center gap-2 text-white border border-white/30 rounded-lg px-8 py-4 hover:bg-white/10 transition-all w-full sm:w-auto justify-center"
          >
            <FiPhone className="w-5 h-5" />
            Call Now
          </a>
        </motion.div>
        

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >

          
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
