import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import './TechLaptop.css';

const codeLines = [
  { text: 'const ayush = {', color: '#c792ea' },
  { text: '  name: "Ayush Agarwal",', color: '#80cbc4' },
  { text: '  role: "Full Stack Dev",', color: '#80cbc4' },
  { text: '  passion: "Building AI Tools",', color: '#80cbc4' },
  { text: '  skills: [', color: '#80cbc4' },
  { text: '    "React", "Python",', color: '#f78c6c' },
  { text: '    "OpenAI", "Three.js"', color: '#f78c6c' },
  { text: '  ],', color: '#80cbc4' },
  { text: '  status: "🚀 Shipping..."', color: '#c3e88d' },
  { text: '}', color: '#c792ea' },
];

const floatingBadges = [
  { label: 'React', icon: '⚛️', delay: 0, x: -130, y: -60 },
  { label: 'Python', icon: '🐍', delay: 0.3, x: 135, y: -80 },
  { label: 'AI / ML', icon: '🤖', delay: 0.6, x: -140, y: 80 },
  { label: 'Three.js', icon: '🌐', delay: 0.9, x: 145, y: 60 },
  { label: 'Node.js', icon: '⚡', delay: 1.2, x: 0, y: -130 },
];

const TypedLine = ({ text, color, startDelay, charDelay = 40 }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, ++i));
        if (i >= text.length) clearInterval(interval);
      }, charDelay);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [text, startDelay, charDelay]);

  return (
    <div className="code-line" style={{ color }}>
      {displayed}
      {displayed.length < text.length && (
        <span className="code-cursor">|</span>
      )}
    </div>
  );
};

const TechLaptop = () => {
  const containerRef = useRef(null);

  // Scroll tracking
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 20, stiffness: 100, mass: 0.5 });
  
  const lidAngleRaw = useTransform(smoothScrollY, [0, 400], [10, 118]);
  const lidAngle = useTransform(lidAngleRaw, (val) => Math.min(val, 118));

  // Mouse hover 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.5 });

  // Map mouse movement to subtle 3D rotation
  const rotateX = useTransform(springY, [-200, 200], [15, -5]); // default pitch offset of 5deg combined
  const rotateY = useTransform(springX, [-200, 200], [-15, 15]);

  const [screenOn, setScreenOn] = useState(false);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScreenOn(latest > 100);
      setShowCode(latest > 150);
    });
  }, [scrollY]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="laptop-scene" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating tech badges */}
      {floatingBadges.map((b) => (
        <motion.div
          key={b.label}
          className="tech-badge"
          style={{ '--bx': `${b.x}px`, '--by': `${b.y}px` }}
          initial={{ opacity: 0, scale: 0, x: b.x, y: b.y }}
          animate={{ opacity: screenOn ? 1 : 0, scale: screenOn ? 1 : 0, x: b.x, y: b.y }}
          transition={{ delay: screenOn ? b.delay : 0, duration: 0.5, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.15, zIndex: 20, boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}
        >
          <span className="badge-icon">{b.icon}</span>
          <span className="badge-label">{b.label}</span>
        </motion.div>
      ))}

      {/* Laptop 3D wrapper */}
      <motion.div
        className="laptop-float"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div 
          className="laptop-3d"
          style={{ rotateX, rotateY }}
        >
          {/* ── Lid / Screen ── */}
          <motion.div
            className="laptop-lid"
            style={{ rotateX: lidAngle }}
          >
            <div className={`laptop-screen ${screenOn ? 'screen-on' : ''}`}>
              {/* Screen glare overlay */}
              <div className="screen-glare" />

              {/* Webcam dot */}
              <div className="webcam-dot" />

              {/* Code content */}
              <div className="code-window">
                <div className="code-topbar">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                  <span className="file-name">ayush.js</span>
                </div>
                <div className="code-body">
                  {showCode &&
                    codeLines.map((line, i) => (
                      <TypedLine
                        key={i}
                        text={line.text}
                        color={line.color}
                        startDelay={i * 260}
                        charDelay={28}
                      />
                    ))}
                </div>
              </div>

              {/* Screen glow reflection */}
              <div className={`screen-glow ${screenOn ? 'glow-on' : ''}`} />
            </div>

            {/* Lid back face */}
            <div className="lid-back">
              <div className="apple-logo">✦</div>
            </div>
          </motion.div>

          {/* ── Base / Keyboard ── */}
          <div className="laptop-base">
            <div className="keyboard-area">
              {/* Keyboard rows */}
              {[14, 13, 13, 12].map((keys, row) => (
                <div key={row} className="key-row">
                  {Array.from({ length: keys }).map((_, k) => (
                    <motion.div 
                      key={k} 
                      className="key" 
                      whileHover={{ backgroundColor: 'rgba(34, 211, 238, 0.3)', scale: 1.1 }}
                      transition={{ duration: 0.1 }}
                    />
                  ))}
                </div>
              ))}
              {/* Spacebar */}
              <div className="key-row spacebar-row">
                <motion.div 
                  className="spacebar" 
                  whileHover={{ backgroundColor: 'rgba(34, 211, 238, 0.3)', scale: 1.02 }}
                />
              </div>
              {/* Trackpad */}
              <motion.div 
                className="trackpad" 
                whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.2)', boxShadow: '0 0 10px rgba(168, 85, 247, 0.2)' }}
              />
            </div>
          </div>

          {/* Ground reflection shadow */}
          <div className="laptop-shadow" />
        </motion.div>

        {/* Bottom glow under laptop */}
        <div className={`laptop-glow ${screenOn ? 'glow-active' : ''}`} />
      </motion.div>
    </div>
  );
};

export default TechLaptop;

