import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiCpu, FiZap, FiBox } from 'react-icons/fi';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
  }),
};

const interests = [
  { icon: <FiCpu size={20} />, label: 'AI & Machine Learning', color: '#0ea5e9' },
  { icon: <FiCode size={20} />, label: 'Full Stack Web Dev', color: '#a855f7' },
  { icon: <FiZap size={20} />, label: 'Automation & APIs', color: '#22d3ee' },
  { icon: <FiBox size={20} />, label: '3D Design & Game Dev', color: '#f59e0b' },
];

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="section about-section" id="about" ref={ref}>
      {/* Background decoration */}
      <div className="about-bg-orb" aria-hidden="true" />

      <div className="container">
        <div className="about-grid">
          {/* Left: Visual */}
          <motion.div
            className="about-visual"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0}
          >
            <div className="about-avatar-wrap">
              <div className="about-avatar">
                {/* Placeholder avatar with initials */}
                <div className="avatar-initials">AA</div>
                <div className="avatar-ring ring-1" />
                <div className="avatar-ring ring-2" />
                <div className="avatar-ring ring-3" />
                {/* Status badge */}
                <div className="avatar-status">
                  <div className="status-dot" />
                  <span>Open to Work</span>
                </div>
              </div>

              <div className="float-card float-card-1">
                <div className="float-card-icon">🎓</div>
                <div>
                  <div className="float-card-title">SRMCEM</div>
                  <div className="float-card-sub">B.Tech CSE</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="about-content">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={1}
            >
              <div className="section-tag">About Me</div>
              <h2 className="section-title">Turning Ideas Into<br />Digital Reality</h2>
            </motion.div>

            <motion.div
              className="about-bio"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={2}
            >
              <p>
                Hey! I'm <strong style={{ color: '#0ea5e9' }}>Ayush Agarwal</strong>, a passionate full-stack developer 
                and AI enthusiast from India. I'm currently pursuing my B.Tech in Computer Science at{' '}
                <strong style={{ color: '#22d3ee' }}>SRMCEM, Lucknow</strong>, where I combine academic learning 
                with real-world project building.
              </p>
              <p>
                I specialize in building <strong style={{ color: '#a855f7' }}>intelligent web applications</strong> that 
                leverage the latest in AI and automation — from full-stack React apps to AI-powered tools 
                using OpenAI APIs and Python automation pipelines.
              </p>
              <p>
                Beyond web development, I explore <strong style={{ color: '#22d3ee' }}>3D art in Blender</strong>, 
                game development in <strong style={{ color: '#0ea5e9' }}>Unity</strong>, and various SEO and digital 
                product strategies. I believe in creating things that are not just functional, but beautifully crafted.
              </p>
            </motion.div>

            {/* Interests grid */}
            <motion.div
              className="about-interests"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={3}
            >
              {interests.map((item, i) => (
                <div
                  key={item.label}
                  className="interest-chip"
                  style={{ '--chip-color': item.color }}
                >
                  <span className="interest-icon" style={{ color: item.color }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Goal statement */}
            <motion.div
              className="about-goal"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={4}
            >
              <div className="goal-icon">💡</div>
              <p>
                <strong>My Goal:</strong> To build AI-powered products that solve real problems and create 
                meaningful impact — bridging the gap between cutting-edge technology and practical usability.
              </p>
            </motion.div>

            {/* Download resume */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={5}
            >
              <a href="#" className="btn-outline" style={{ width: 'fit-content' }}>
                <span>Download Resume</span>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'relative', zIndex: 1 }}>
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
