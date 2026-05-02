import { motion } from 'framer-motion'
import { projects } from '../data/content'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Our Projects
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary gold-underline">
            Our Premium Projects
          </h2>
          <p className="text-gray-500 text-lg mt-5 max-w-2xl mx-auto">
            Two strategically located projects offering unmatched investment opportunities
            in Hyderabad's fastest-growing corridors.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
