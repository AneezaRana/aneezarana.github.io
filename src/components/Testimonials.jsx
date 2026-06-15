import { useState } from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/portfolioData';
import ParticleCanvas from './ParticleCanvas';

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({ name, src }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="testimonial-avatar testimonial-avatar--fallback">
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className="testimonial-avatar"
      onError={() => setFailed(true)}
    />
  );
}

function TestimonialCard({ item }) {
  return (
    <motion.div
      variants={cardVariants}
      className="testimonial-card"
      whileHover={{ rotate: -2, y: -6 }}
      transition={{ type: 'spring', stiffness: 250, damping: 15 }}
    >
      <Avatar name={item.name} src={item.avatar} />
      <p className="text-gray-300 leading-relaxed italic mb-6">
        &ldquo;{item.quote}&rdquo;
      </p>
      <h3 className="text-lg font-bold text-white">{item.name}</h3>
      <p className="text-sm text-gray-400 mt-1">{item.role}</p>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="section">
      <ParticleCanvas />
      <div className="section-inner relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-white text-center mb-12 md:mb-16"
        >
          What People Say
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {testimonials.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
