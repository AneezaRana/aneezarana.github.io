import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { personalInfo, stats } from '../data/portfolioData';
import GradientOrbs from './GradientOrbs';
import ParticleCanvas from './ParticleCanvas';

export default function About() {
  const socials = [
    { href: personalInfo.linkedin, icon: FaLinkedinIn, label: 'LinkedIn' },
    { href: personalInfo.github, icon: FaGithub, label: 'GitHub' },
  ];

  return (
    <section id="about" aria-label="About me" className="section min-h-screen flex items-center">
      <ParticleCanvas />
      <GradientOrbs />

      <div className="section-inner relative z-10 flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
        >
          <div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1CD8D2]/20 to-[#302b63]/20 border border-[#1CD8D2]/25 shrink-0">
            <img src="/profile1.jpg" alt={personalInfo.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight gradient-text">
              {personalInfo.name}
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">{personalInfo.title}</p>
            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              {personalInfo.bio}
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto md:mx-0">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                >
                  <div className="text-sm text-gray-400">{stat.label}</div>
                  <div className="text-base font-semibold text-white">{stat.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 text-white font-semibold px-5 py-3 hover:bg-white/10 transition"
              >
                Get in Touch
              </a>

              <div className="flex items-center justify-center gap-4 text-2xl sm:ml-2">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="text-gray-400 hover:text-[#1cd8d2] transition hover:scale-110"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8"
        >
          <h3 className="text-2xl font-bold gradient-text mb-4">About Me</h3>
          {personalInfo.aboutExtra.map((text) => (
            <p key={text.slice(0, 30)} className="text-gray-300 leading-relaxed mb-3 last:mb-0">
              {text}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
