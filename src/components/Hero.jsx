import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import { personalInfo, typewriterRoles } from '../data/portfolioData';
import ParticleCanvas from './ParticleCanvas';
import GradientOrbs from './GradientOrbs';
import HeroAvatar3D from './HeroAvatar3D';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = typewriterRoles[roleIndex];
    let timeout;

    if (!deleting && displayText.length < current.length) {
      timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 80);
    } else if (!deleting && displayText.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length - 1)), 40);
    } else if (deleting && displayText.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % typewriterRoles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, deleting, roleIndex]);

  const socials = [
    { href: personalInfo.linkedin, icon: FaLinkedinIn, label: 'LinkedIn' },
    { href: personalInfo.github, icon: FaGithub, label: 'GitHub' },
  ];

  return (
    <section id="home" className="section min-h-screen">
      <ParticleCanvas />
      <GradientOrbs variant="hero" />

      <div className="relative z-10 min-h-screen w-full max-w-7xl mx-auto px-4 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center min-h-[calc(100vh-6rem)] text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:pr-24 mx-auto max-w-[48rem]"
          >
            <div className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]">
              <span>{displayText}</span>
              <span className="inline-block w-[2px] ml-1 bg-white animate-pulse align-middle" style={{ height: '1em' }} />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg">
              <span className="gradient-text">Hello, I&apos;m</span>
              <br />
              <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap">
                {personalInfo.name}
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
              {personalInfo.tagline}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <a
                href="#projects"
                className="px-6 py-3 rounded-full text-lg font-medium text-white gradient-btn shadow-lg hover:scale-105 transition-all"
              >
                View My Work
              </a>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full text-lg font-medium text-black bg-white hover:bg-gray-200 shadow-lg hover:scale-105 transition-all"
              >
                My Resume
              </a>
            </div>

            {/* <div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
              {socials.map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-gray-300 hover:text-[#1cd8d2] transition"
                  whileHover={{ scale: 1.2, y: -3 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div> */}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative hidden lg:flex items-center justify-end"
        >
          <HeroAvatar3D
            src="/avator.png"
            alt={`${personalInfo.name} avatar`}
          />
        </motion.div>
      </div>
    </section>
  );
}
