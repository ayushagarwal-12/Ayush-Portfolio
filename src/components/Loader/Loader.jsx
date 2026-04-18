import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timerRef.current);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="loader-container"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Scan line */}
        <div className="loader-scan-line" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="loader-content"
        >
          <div className="loader-glitch-wrap">
            <div className="loader-logo" data-text="AA">AA</div>
          </div>
          <div className="loader-ring" />
          <motion.p
            className="loader-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Initializing Portfolio...
          </motion.p>

          {/* Progress bar */}
          <div className="loader-progress-track">
            <motion.div
              className="loader-progress-bar"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.4, ease: 'easeInOut', delay: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Corner decorations */}
        <div className="loader-corner loader-corner-tl" />
        <div className="loader-corner loader-corner-tr" />
        <div className="loader-corner loader-corner-bl" />
        <div className="loader-corner loader-corner-br" />
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
