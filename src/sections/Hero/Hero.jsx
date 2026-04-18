import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight, FiGithub, FiDownload } from 'react-icons/fi';
import TechLaptop from '../../components/TechLaptop/TechLaptop';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);

  // Parallax bg stars
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      const stars = document.querySelector('.hero-stars');
      if (stars) {
        stars.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      {/* Animated star background */}
      <div className="hero-stars" aria-hidden="true">
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
              width: `${Math.random() < 0.3 ? 2 : 1}px`,
              height: `${Math.random() < 0.3 ? 2 : 1}px`,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />

      <div className="container hero-container">
        {/* Left: Text content */}
        <div className="hero-content">
          {/* Greeting badge */}
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="badge-dot" />
            <span>Available for hire</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            Hi, I'm{' '}
            <span className="hero-name-highlight">
              Ayush
              <br />
              Agarwal
              <div className="name-underline" />
            </span>
          </motion.h1>

          {/* Rotating role */}
          <motion.div
            className="hero-role-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <span className="hero-role-prefix">I'm a </span>
            <TypeAnimation
              sequence={[
                'Full Stack Developer', 2000,
                'AI Developer', 2000,
                'Automation Developer', 2000,
                'Prompt Engineer', 2000,
                'Unity Game Developer', 2000,
                'Blender Artist', 2000,
              ]}
              wrapper="span"
              speed={50}
              deletionSpeed={60}
              repeat={Infinity}
              className="hero-role-typed"
            />
            <span className="cursor-blink">|</span>
          </motion.div>

          {/* Description */}
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            Crafting intelligent digital experiences at the intersection of{' '}
            <span className="hero-desc-accent">AI</span>,{' '}
            <span className="hero-desc-accent">automation</span>, and{' '}
            <span className="hero-desc-accent">creative technology</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <a href="#projects" className="btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span>View Projects</span>
              <FiArrowRight size={18} style={{ position: 'relative', zIndex: 1 }} />
            </a>
            <a href="#contact" className="btn-outline" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span>Contact Me</span>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            {[
              { value: '5+', label: 'Projects Built' },
              { value: '5+', label: 'Technologies' },
            ].map((stat) => (
              <div className="hero-stat" key={stat.label}>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            <a href="https://github.com/ayushagarwal-12" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub">
              <FiGithub size={20} />
            </a>
            <div className="social-divider" />
            <a href="https://www.linkedin.com/in/ayush-agarwal-a910b02a9/" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </motion.div>
        </div>

        {/* Right: 3D Canvas */}
        <motion.div
          className="hero-canvas-container hero-laptop-container"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <TechLaptop />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="scroll-line">
          <div className="scroll-ball" />
        </div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
};

export default Hero;
