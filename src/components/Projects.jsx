import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiExternalLink,
  HiCode,
  HiChevronLeft,
  HiChevronRight,
  HiX,
  HiZoomIn,
  HiZoomOut,
} from 'react-icons/hi';
import { projects } from '../data/portfolioData';
import ParticleCanvas from './ParticleCanvas';

function ProjectImage({ src, title, onOpen }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1cd8d2]/15 to-[#302b63]/25 text-white/70 text-xl font-semibold">
        {title}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group/img relative w-full h-full cursor-zoom-in"
      aria-label={`View larger image of ${title}`}
    >
      <img
        src={src}
        alt={title}
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity">
        <HiZoomIn className="text-white text-4xl" />
      </span>
    </button>
  );
}

function Lightbox({ src, title, onClose }) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.5, 4));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.5, 1));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); zoomOut(); }}
          aria-label="Zoom out"
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white text-xl hover:bg-white/20 transition disabled:opacity-40"
          disabled={zoom <= 1}
        >
          <HiZoomOut />
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); zoomIn(); }}
          aria-label="Zoom in"
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white text-xl hover:bg-white/20 transition disabled:opacity-40"
          disabled={zoom >= 4}
        >
          <HiZoomIn />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white text-2xl hover:bg-[#1cd8d2] hover:text-black transition"
        >
          <HiX />
        </button>
      </div>

      <div
        className="max-w-[90vw] max-h-[85vh] overflow-auto rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={title}
          style={{ transform: `scale(${zoom})` }}
          className="origin-top transition-transform duration-200 max-w-full select-none"
        />
      </div>
    </motion.div>
  );
}

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export default function Projects() {
  const [[index, direction], setState] = useState([0, 0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const count = projects.length;
  const current = projects[index];

  const paginate = (dir) => {
    setState(([prev]) => [(prev + dir + count) % count, dir]);
  };

  const goTo = (i) => {
    setState(([prev]) => [i, i > prev ? 1 : -1]);
  };

  return (
    <section id="projects" className="section min-h-screen flex flex-col items-center">
      <ParticleCanvas />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#1CD8D2] to-[#302b63] opacity-10 blur-[140px]" />
      </div>

      <div className="section-inner relative z-10 flex flex-col items-center w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold gradient-text mb-12"
        >
          My Work
        </motion.h2>

        <div className="relative w-full max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.article
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="grid grid-cols-1 md:grid-cols-2"
              >
                <div className="aspect-[16/10] md:aspect-auto md:h-full overflow-hidden">
                  <ProjectImage
                    src={current.image}
                    title={current.title}
                    onOpen={() => setLightboxOpen(true)}
                  />
                </div>

                <div className="flex flex-col justify-center p-8 md:p-10">
                  <span className="text-[#1cd8d2] font-mono text-sm mb-2">
                    {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-3">{current.title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-5">{current.description}</p>

                  {current.tech?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {current.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1 rounded-full bg-[#1cd8d2]/10 text-[#1cd8d2] border border-[#1cd8d2]/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    {current.liveUrl && current.liveUrl !== '#' && (
                      <a
                        href={current.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full gradient-btn text-white text-sm font-medium hover:scale-105 transition"
                      >
                        View Project <HiExternalLink />
                      </a>
                    )}
                    {current.codeUrl && (
                      <a
                        href={current.codeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition"
                      >
                        Code <HiCode />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous project"
            className="absolute left-3 top-1/2 -translate-y-1/2 md:-left-5 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 border border-white/15 text-white text-2xl hover:bg-[#1cd8d2] hover:text-black transition"
          >
            <HiChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next project"
            className="absolute right-3 top-1/2 -translate-y-1/2 md:-right-5 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 border border-white/15 text-white text-2xl hover:bg-[#1cd8d2] hover:text-black transition"
          >
            <HiChevronRight />
          </button>
        </div>

        <div className="flex items-center gap-3 mt-8">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 gradient-btn' : 'w-2.5 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && current.image && (
          <Lightbox
            src={current.image}
            title={current.title}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
