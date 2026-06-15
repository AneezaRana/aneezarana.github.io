import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import ParticleCanvas from './ParticleCanvas';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white pt-20 pb-16 overflow-hidden">
      <ParticleCanvas />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-7xl font-bold gradient-text mb-6"
        >
          {personalInfo.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-400 italic text-lg mb-8"
        >
          &ldquo;{personalInfo.quote}&rdquo;
        </motion.p>

        <p className="text-gray-500 text-sm">
          &copy; {year} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
