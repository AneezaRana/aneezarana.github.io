import { motion } from 'framer-motion';
import { skills } from '../data/portfolioData';
import { SkillIcon } from '../utils/skillIcons';
import ParticleCanvas from './ParticleCanvas';

function SkillRow({ items }) {
  return (
    <div className="flex shrink-0">
      {items.map((skill) => (
        <div
          key={skill}
          className="flex flex-col items-center gap-2 w-[140px] shrink-0 mr-10"
          aria-label={skill}
          title={skill}
        >
          <span className="text-[#1cd8d2] hover:scale-125 transition-transform duration-300">
            <SkillIcon name={skill} />
          </span>
          <p className="text-sm text-white whitespace-nowrap">{skill}</p>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  const doubled = [...skills, ...skills];

  return (
    <section id="skills" className="section min-h-[60vh] flex flex-col items-center justify-center">
      <ParticleCanvas />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="section-inner relative  z-10 flex flex-col items-center w-full">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold gradient-text pb-3"
        >
          My Skills
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-2 mb-10 text-white/90 text-base sm:text-lg"
        >
          Modern Applications | Modern Technologies
        </motion.p>

        <div className="relative w-full overflow-hidden pb-4">
          <div className="flex animate-marquee w-max">
            <SkillRow items={doubled} />
            <SkillRow items={doubled} />
          </div>
        </div>
      </div>
    </section>
  );
}
