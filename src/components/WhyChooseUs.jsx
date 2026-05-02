import { motion } from 'framer-motion'
import {
  HiOutlineOfficeBuilding,
  HiOutlineTrendingUp,
  HiOutlineLockClosed,
  HiOutlineLightningBolt,
  HiOutlineUserGroup,
  HiOutlineSparkles,
} from 'react-icons/hi'
import { useInView } from '../hooks/useInView'

const whyChooseUs = [
  {
    Icon: HiOutlineOfficeBuilding,
    title: 'HMDA/DTCP Approved',
    description: 'All our projects are government approved with clear titles and legal documentation.',
  },
  {
    Icon: HiOutlineTrendingUp,
    title: 'High ROI Potential',
    description: 'Strategic locations in fast-developing corridors ensure maximum appreciation.',
  },
  {
    Icon: HiOutlineLockClosed,
    title: 'Secure Investment',
    description: 'Transparent transactions, registered documents, and zero hidden charges.',
  },
  {
    Icon: HiOutlineLightningBolt,
    title: 'Fast Developing Areas',
    description: "Located in Hyderabad's growth corridors with upcoming infrastructure projects.",
  },
  {
    Icon: HiOutlineUserGroup,
    title: 'Trusted Developer',
    description: '15+ years of experience with 600+ happy customers across Telangana.',
  },
  {
    Icon: HiOutlineSparkles,
    title: 'Premium Amenities',
    description: 'Wide roads, parks, drainage, electricity — fully developed layouts.',
  },
]

export default function WhyChooseUs() {
  const [ref, inView] = useInView()

  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Why HKMC
          </div>
          <h2 className="section-title gold-underline">Why Choose Us</h2>
          <p className="section-subtitle">
            We don't just sell plots — we build trust, deliver value, and secure your financial future.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-300">
                <item.Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-dark text-lg mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Certification button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 text-center"
        >
          <button
            onClick={() => document.getElementById('certificationModal').showModal()}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-accent via-yellow-400 to-accent hover:from-yellow-400 hover:to-accent text-dark font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-accent/30 transition-all hover:scale-105 border border-yellow-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            View Our Certifications
          </button>
        </motion.div>
      </div>







      {/* Certification Modal */}
      <dialog id="certificationModal" className="bg-transparent backdrop:bg-black/50 backdrop:backdrop-blur-sm p-0 rounded-2xl max-w-4xl w-full">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-blue-900 p-6 text-white flex items-center justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold">Our Certifications</h3>
              <p className="text-white/70 text-sm mt-1">Government-approved, legally verified documents</p>
            </div>
            <button
              onClick={() => document.getElementById('certificationModal').close()}
              className="text-white/60 hover:text-white text-2xl p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: 'HMDA Approval',
                  desc: 'Hyderabad Metropolitan Development Authority approval for Deccan Heights.',
                  img: 'https://images.unsplash.com/photo-1589829545856-d10d555cf536?w=400&q=80',
                },
                {
                  title: 'DTCP Approval',
                  desc: 'Directorate of Town & Country Planning approval for Eden Farms.',
                  img: 'https://images.unsplash.com/photo-1589829545856-d10d555cf536?w=400&q=80',
                },
                {
                  title: 'RERA Registration',
                  desc: 'Registered under Telangana Real Estate Regulatory Authority.',
                  img: 'https://images.unsplash.com/photo-1589829545856-d10d555cf536?w=400&q=80',
                },
                {
                  title: 'Clear Title Certificate',
                  desc: 'Encumbrance-free, registered sale deeds with 100% legal clarity.',
                  img: 'https://images.unsplash.com/photo-1589829545856-d10d555cf536?w=400&80',
                },
              ].map((cert, i) => (
                <div key={cert.title} className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-primary/30 transition-colors">
                  <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    {/* Placeholder for actual certificate image */}
                    <div className="text-center p-4">
                      <div className="w-16 h-16 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center mb-3">
                        <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-primary font-semibold text-sm">{cert.title}</span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-dark text-base mb-2">{cert.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{cert.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center border-t border-gray-100 pt-6">
              <p className="text-gray-500 text-sm mb-4">
                All our projects are backed by government approvals and clear legal documentation.
              </p>
              <button
                onClick={() => document.getElementById('certificationModal').close()}
                className="bg-primary hover:bg-blue-900 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  )
}
