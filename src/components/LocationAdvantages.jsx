import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiMapPin, FiTrendingUp,
} from 'react-icons/fi'
import {
  HiOutlineOfficeBuilding, HiOutlineAcademicCap, HiOutlineHeart,
  HiOutlineShoppingCart, HiOutlineChip, HiOutlineLightningBolt,
} from 'react-icons/hi'
import { MdOutlineTrain, MdOutlineFlight, MdOutlineFactory } from 'react-icons/md'
import { useInView } from '../hooks/useInView'

// Icon map — keys match the `iconKey` field in content.js
const ICON_MAP = {
  highway:    HiOutlineLightningBolt,
  school:     HiOutlineAcademicCap,
  hospital:   HiOutlineHeart,
  shopping:   HiOutlineShoppingCart,
  train:      MdOutlineTrain,
  industry:   MdOutlineFactory,
  orr:        HiOutlineLightningBolt,
  it:         HiOutlineChip,
  airport:    MdOutlineFlight,
  city:       HiOutlineOfficeBuilding,
}

const locationData = {
  'Eden Farms (Konadal)': [
    { iconKey: 'highway',  text: 'NH-44 Highway — 5 mins' },
    { iconKey: 'school',   text: 'Schools & Colleges — 10 mins' },
    { iconKey: 'hospital', text: 'Hospitals — 15 mins' },
    { iconKey: 'shopping', text: 'Shopping Centers — 10 mins' },
    { iconKey: 'train',    text: 'Railway Station — 20 mins' },
    { iconKey: 'industry', text: 'Industrial Zone — 15 mins' },
  ],
  'Deccan Heights (Shadnagar)': [
    { iconKey: 'orr',      text: 'Outer Ring Road — 5 mins' },
    { iconKey: 'it',       text: 'IT Hubs — 30 mins' },
    { iconKey: 'airport',  text: 'Rajiv Gandhi Airport — 25 mins' },
    { iconKey: 'school',   text: 'International Schools — 10 mins' },
    { iconKey: 'hospital', text: 'Multi-specialty Hospitals — 15 mins' },
    { iconKey: 'city',     text: 'Hyderabad City Center — 45 mins' },
  ],
}

export default function LocationAdvantages() {
  const [ref, inView] = useInView()
  const locations = Object.keys(locationData)
  const [active, setActive] = useState(locations[0])

  return (
    <section id="location" className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Location
          </div>
          <h2 className="section-title gold-underline">Strategic Locations</h2>
          <p className="section-subtitle">
            Our projects are positioned in Hyderabad's fastest-growing corridors with excellent connectivity.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-3 mb-10">
          {locations.map((loc) => (
            <button key={loc} onClick={() => setActive(loc)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                active === loc
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-primary/10 border border-gray-200'
              }`}>
              {loc}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-2xl overflow-hidden shadow-xl h-80 md:h-96"
          >
            <img
              src={active.includes('Konadal')
                ? 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80'
                : 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80'}
              alt={`${active} - open plot location near Hyderabad by HKMC Builders`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="text-white font-serif text-xl font-bold">{active}</div>
              <div className="text-white/70 text-sm mt-1">
                {active.includes('Konadal') ? 'Near NH-44, Konadal' : 'Shadnagar, Hyderabad'}
              </div>
            </div>
            {/* Animated pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-xl">
                  <FiMapPin className="w-5 h-5 text-dark" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Advantages */}
          <motion.div
            key={active + '-list'}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-serif text-2xl font-bold text-primary mb-6">
              Nearby Landmarks & Connectivity
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {locationData[active].map((item, i) => {
                const Icon = ICON_MAP[item.iconKey] || FiMapPin
                return (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{item.text}</span>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-4">
              <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                <FiTrendingUp className="w-4 h-4" /> Upcoming Developments
              </h4>
              <p className="text-gray-600 text-sm">
                {active.includes('Konadal')
                  ? 'New industrial zone, proposed metro connectivity, and upcoming IT park are set to boost property values significantly in the Konadal corridor.'
                  : 'Shadnagar is earmarked for major infrastructure upgrades including a new township, expanded ORR access, and upcoming commercial hubs near the airport.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
