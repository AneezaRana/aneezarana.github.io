import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { navLinks, personalInfo } from '../data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : ''
        }`}
      >
        <button type="button" onClick={() => scrollTo('home')} className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
          <span className="text-2xl font-bold text-white hidden sm:block">{personalInfo.firstName}</span>
        </button>

        <div className="block lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <button
            type="button"
            className="text-white text-3xl focus:outline-none lg:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <HiMenuAlt3 />
          </button>

          <ul className="hidden lg:flex gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#contact"
          className="hidden lg:inline-flex bg-gradient-to-r from-[#22d3ee] to-[#0d9488] text-white px-5 py-2 rounded-full font-medium shadow-lg hover:scale-105 transition"
        >
          Reach Out
        </a>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6"
          >
            <button
              type="button"
              className="absolute top-6 right-6 text-white text-3xl"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <HiX />
            </button>
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link.id)}
                className="text-2xl font-semibold text-white hover:text-[#1cd8d2] transition"
              >
                {link.label}
              </motion.button>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 bg-gradient-to-r from-[#22d3ee] to-[#0d9488] text-white px-8 py-3 rounded-full font-medium"
            >
              Reach Out
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
