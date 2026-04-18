import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Terminal from './components/Terminal/Terminal';

// Sections
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Skills from './sections/Skills/Skills';
import Experience from './sections/Experience/Experience';
import Projects from './sections/Projects/Projects';
import Services from './sections/Services/Services';
import Contact from './sections/Contact/Contact';

import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: -400, y: -400 });
  const cursorRef = useRef(null);
  const rafRef = useRef(null);
  const targetPos = useRef({ x: -400, y: -400 });

  // Smooth cursor follow with requestAnimationFrame
  useEffect(() => {
    const onMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const animateCursor = () => {
      setCursorPos((prev) => {
        const dx = targetPos.current.x - prev.x;
        const dy = targetPos.current.y - prev.y;
        return {
          x: prev.x + dx * 0.1,
          y: prev.y + dy * 0.1,
        };
      });
      rafRef.current = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    }
  }, [loading]);

  return (
    <>
      {/* ── Cursor glow ── */}
      <div
        className="cursor-glow"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      />

      {/* ── Background grid ── */}
      <div className="bg-grid" aria-hidden="true" />

      {/* ── Noise texture ── */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── Global floating orbs ── */}
      <div className="bg-glow-orb" style={{ width: 700, height: 700, background: 'rgba(14, 165, 233, 0.07)', top: '10%', right: '-15%' }} aria-hidden="true" />
      <div className="bg-glow-orb" style={{ width: 600, height: 600, background: 'rgba(168, 85, 247, 0.07)', top: '50%', left: '-15%', animationDelay: '4s' }} aria-hidden="true" />
      <div className="bg-glow-orb" style={{ width: 400, height: 400, background: 'rgba(34, 211, 238, 0.05)', bottom: '10%', right: '25%', animationDelay: '8s' }} aria-hidden="true" />

      {/* ── Loader ── */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <Loader onComplete={handleLoadComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main site ── */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Navbar />

          <main>
            <Hero />
            <div className="divider-glow" style={{ maxWidth: '80%', margin: '0 auto' }} />
            <About />
            <div className="divider-glow" style={{ maxWidth: '60%', margin: '0 auto' }} />
            <Skills />
            <div className="divider-glow" style={{ maxWidth: '60%', margin: '0 auto' }} />
            <Experience />
            <div className="divider-glow" style={{ maxWidth: '60%', margin: '0 auto' }} />
            <Projects />
            <div className="divider-glow" style={{ maxWidth: '60%', margin: '0 auto' }} />
            <Services />
            <div className="divider-glow" style={{ maxWidth: '60%', margin: '0 auto' }} />
            <Contact />
          </main>

          <Footer />
        </motion.div>
      )}
      {!loading && <Terminal />}
    </>
  );
};

export default App;
