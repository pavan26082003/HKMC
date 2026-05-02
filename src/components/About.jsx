import { motion } from 'framer-motion'
import { FiTarget, FiZap, FiCheckCircle, FiAward, FiMapPin, FiUsers } from 'react-icons/fi'
import { useInView } from '../hooks/useInView'

const milestones = [
  { year: '2014', event: 'HKMC Builders Founded' },
  { year: '2017', event: 'First HMDA Approved Project' },
  { year: '2020', event: '200+ Plots Sold' },
  { year: '2023', event: 'Launched Deccan Heights' },
  { year: '2024', event: '500+ Happy Investors' },
]

const highlights = [
  { Icon: FiAward,     label: 'HMDA & DTCP Approved',    sub: 'All projects legally certified' },
  { Icon: FiMapPin,    label: 'Prime Locations',          sub: 'Hyderabad growth corridors' },
  { Icon: FiUsers,     label: '500+ Happy Investors',     sub: 'Trusted across Telangana' },
  { Icon: FiCheckCircle, label: 'Zero Hidden Charges',   sub: 'Full transparency guaranteed' },
]

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="py-24 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full">
            About Us
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── LEFT: Image panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative flex justify-center"
          >
            {/* Glow blob behind image */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
            </div>

            {/* Card */}
            <div className="relative w-full max-w-md">
              {/* Decorative corner accent */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-accent rounded-tl-2xl z-10" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-accent rounded-br-2xl z-10" />

              {/* Image wrapper */}
              <div className="group relative bg-gradient-to-br from-primary/5 to-blue-50 rounded-3xl p-6 shadow-xl overflow-hidden border border-gray-100">
                {/* Subtle inner gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl" />

                <motion.img
                  src="/HKMC-logo.webp"
                  alt="HKMC Builders and Developers Pvt Ltd - trusted real estate developer in Hyderabad Telangana"
                  className="relative z-10 w-full object-contain rounded-2xl transition-all duration-500
                             group-hover:scale-105 group-hover:drop-shadow-2xl"
                  style={{ maxHeight: '340px' }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                />
              </div>

              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -right-5 bg-accent text-dark rounded-2xl px-4 py-3 shadow-xl z-20"
              >
                <div className="text-2xl font-bold font-serif leading-none">15+</div>
                <div className="text-xs font-semibold mt-0.5">Years of Trust</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-5 -left-5 bg-primary text-white rounded-2xl px-4 py-3 shadow-xl z-20"
              >
                <div className="text-2xl font-bold font-serif leading-none">600+</div>
                <div className="text-xs font-semibold mt-0.5 text-white/80">Happy Investors</div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── RIGHT: Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="space-y-7"
          >
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary leading-tight mb-2">
                About HKMC Builders
                <br />
                <span className="text-accent">and Developers</span>
              </h2>
              <div className="w-14 h-1 bg-accent rounded-full mt-4" />
            </div>

            <p className="text-gray-600 leading-relaxed text-base">
              HKMC Builders and Developers Pvt Ltd is a premier real estate company based in Hyderabad,
              Telangana. With over a decade of experience, we specialize in developing HMDA and DTCP
              approved open plot communities in Hyderabad's most promising growth corridors.
            </p>

            <p className="text-gray-600 leading-relaxed text-base">
              Our commitment to transparency, legal clarity, and customer satisfaction has made us one
              of the most trusted names in Telangana real estate. Every project we develop is backed
              by clear documentation, premium infrastructure, and strategic location selection.
            </p>

            {/* Highlight grid */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map(({ Icon, label, sub }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3 bg-[#F5F5F5] hover:bg-primary/5 border border-transparent hover:border-primary/20 rounded-xl p-3.5 transition-all duration-300"
                >
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-dark text-sm leading-tight">{label}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Vision & Mission */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-light rounded-xl p-4 border-l-4 border-primary">
                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2 text-sm">
                  <FiTarget className="w-4 h-4" /> Our Vision
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To make premium real estate investment accessible to every Indian family.
                </p>
              </div>
              <div className="bg-light rounded-xl p-4 border-l-4 border-accent">
                <h4 className="font-semibold text-dark mb-2 flex items-center gap-2 text-sm">
                  <FiZap className="w-4 h-4" /> Our Mission
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Deliver legally clear, high-ROI plots in strategic locations with full transparency.
                </p>
              </div>
            </div>

            {/* Timeline */}
            {/* <div>
              <h4 className="font-semibold text-dark mb-4 text-sm uppercase tracking-wider">Our Journey</h4>
              <div className="relative pl-4 border-l-2 border-gray-100 space-y-4">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 relative"
                  >
                    <div className="absolute -left-[21px] w-3 h-3 bg-accent rounded-full border-2 border-white shadow" />
                    <span className="text-accent font-bold text-sm w-10 shrink-0">{m.year}</span>
                    <span className="text-gray-600 text-sm">{m.event}</span>
                  </motion.div>
                ))}
              </div>
            </div> */}

            {/* CTA */}
            {/* <div className="flex flex-wrap gap-3 pt-2">
              <a href="#contact" className="btn-primary flex items-center gap-2 text-sm">
                Book Free Site Visit
              </a>
              <a href="#projects" className="btn-accent flex items-center gap-2 text-sm">
                View Projects
              </a>
            </div> */}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
