import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'AI Instagram Reel Automation',
    description:
      'A fully automated pipeline that generates, edits, and publishes Instagram Reels using AI. Combines OpenAI for scripts, text-to-speech, and automated video rendering — zero manual effort required.',
    tech: ['Python', 'OpenAI API', 'Automation', 'FFmpeg', 'REST API'],
    color: '#0ea5e9',
    emoji: '🤖',
    category: 'AI/Automation',
    github: '#',
    live: '#',
  },
  {
    id: 2,
    title: 'Smart Camera Monitoring System',
    description:
      'Real-time surveillance system using computer vision. Detects motion, identifies anomalies, sends alerts, and records events — built with Python and OpenCV with a clean web dashboard.',
    tech: ['Python', 'OpenCV', 'Computer Vision', 'WebSocket', 'React'],
    color: '#22d3ee',
    emoji: '📸',
    category: 'Computer Vision',
    github: '#',
    live: '#',
  },
  {
    id: 3,
    title: 'AI SEO Content System',
    description:
      'Automated SEO content generation engine that researches keywords, generates optimized articles, adds metadata, and schedules publishing — built for scale with OpenAI and Python.',
    tech: ['Python', 'OpenAI', 'SEO Tools', 'Automation', 'CMS API'],
    color: '#a855f7',
    emoji: '✍️',
    category: 'AI/Content',
    github: '#',
    live: '#',
  },
  {
    id: 4,
    title: 'Personal Portfolio Website',
    description:
      'This very portfolio — a premium, futuristic personal portfolio built with React, Framer Motion, Three.js, and GSAP. Features 3D animations, glassmorphism design, and smooth scroll transitions.',
    tech: ['React', 'Three.js', 'Framer Motion', 'GSAP', 'CSS3'],
    color: '#f59e0b',
    emoji: '🌐',
    category: 'Web Dev',
    github: '#',
    live: '#',
  },
  {
    id: 5,
    title: 'Unity Game Projects',
    description:
      'A collection of Unity 3D games — including platformers, survival mechanics, and interactive experiences. Built with C#, showcasing physics, AI pathfinding, and procedural generation.',
    tech: ['Unity', 'C#', 'Game Design', '3D Assets', 'Physics'],
    color: '#ec4899',
    emoji: '🎮',
    category: 'Game Dev',
    github: '#',
    live: '#',
  },
  {
    id: 6,
    title: 'Blender 3D Projects',
    description:
      'Creative 3D artworks including product visualizations, abstract art, architectural renders, and animated scenes — crafted in Blender with photorealistic PBR materials and custom lighting setups.',
    tech: ['Blender', '3D Modeling', 'Rendering', 'Animation', 'Texturing'],
    color: '#f97316',
    emoji: '🎨',
    category: '3D Design',
    github: '#',
    live: '#',
  },
];

const filters = ['All', 'AI/Automation', 'Web Dev', 'Computer Vision', 'Game Dev', '3D Design', 'AI/Content'];

const Projects = () => {
  const [active, setActive] = useState('All');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.07 });

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="section projects-section" id="projects" ref={ref}>
      <div className="proj-bg-orb" aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-tag">My Work</div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A curated selection of projects spanning AI, automation, web development, 
            game dev, and 3D design.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="project-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn ${active === f ? 'active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
              {active === f && <motion.div className="filter-active-bar" layoutId="filter-bar" />}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((proj, i) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="project-card"
                style={{ '--card-color': proj.color }}
              >
                {/* Top */}
                <div className="pc-top">
                  <div className="pc-emoji-wrap" style={{ background: `${proj.color}15`, border: `1px solid ${proj.color}30` }}>
                    <span className="pc-emoji">{proj.emoji}</span>
                  </div>
                  <span className="pc-category" style={{ color: proj.color, background: `${proj.color}10`, border: `1px solid ${proj.color}25` }}>
                    {proj.category}
                  </span>
                </div>

                {/* Content */}
                <h3 className="pc-title">{proj.title}</h3>
                <p className="pc-desc">{proj.description}</p>

                {/* Tech stack */}
                <div className="pc-tech">
                  {proj.tech.map((t) => (
                    <span key={t} className="pc-tag" style={{ color: proj.color, borderColor: `${proj.color}25`, background: `${proj.color}08` }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Hover glow */}
                <div className="pc-hover-glow" style={{ background: `radial-gradient(ellipse at top, ${proj.color}18, transparent 70%)` }} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="projects-cta"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <a href="https://github.com/ayushagarwal-12" target="_blank" rel="noopener noreferrer" className="btn-outline">
            <FiGithub size={18} style={{ position: 'relative', zIndex: 1 }} />
            <span>View All on GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
