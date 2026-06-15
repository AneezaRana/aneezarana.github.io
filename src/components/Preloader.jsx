import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { greetings } from '../data/portfolioData';

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const timer = setTimeout(() => setIndex((i) => i + 1), 600);
      return () => clearTimeout(timer);
    }
    const exitTimer = setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 600);
    }, 800);
    return () => clearTimeout(exitTimer);
  }, [index, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={greetings[index]}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="text-5xl sm:text-7xl font-bold text-white"
            >
              {greetings[index]}
            </motion.h1>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
