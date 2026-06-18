import { motion } from 'framer-motion';
import { HiBriefcase } from 'react-icons/hi';
import { experience } from '../data/portfolioData';
import ParticleCanvas from './ParticleCanvas';
import Tilt3D from './Tilt3D';

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

function ExperienceEntry({ item, index, isLast }) {
  return (
    <motion.li variants={itemVariants} className={`exp-entry ${isLast ? 'exp-entry--last' : ''}`}>
      <div className="exp-entry__marker" aria-hidden="true">
        <span className="exp-entry__dot" />
      </div>

      <Tilt3D intensity={6} scale={1.02} glare className="exp-entry__card">
        <div className="exp-entry__header">
          <span className="exp-entry__index">{String(index + 1).padStart(2, '0')}</span>
          <span className="exp-entry__period">{item.period}</span>
        </div>

        <div className="exp-entry__icon" aria-hidden="true">
          <HiBriefcase />
        </div>

        <h3 className="exp-entry__role">{item.role}</h3>
        <p className="exp-entry__company">{item.company}</p>
        <p className="exp-entry__desc">{item.description}</p>
      </Tilt3D>
    </motion.li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section">
      <ParticleCanvas />
      <div className="section-inner relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-16"
        >
          <span className="exp-label">Career Path</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3">Experience</h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            Roles and milestones that shaped my journey as a developer.
          </p>
        </motion.div>

        <motion.ol
          className="exp-list"
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {experience.map((item, index) => (
            <ExperienceEntry
              key={`${item.company}-${item.role}`}
              item={item}
              index={index}
              isLast={index === experience.length - 1}
            />
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
