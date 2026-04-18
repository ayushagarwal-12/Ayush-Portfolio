import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Skills.css';

const categories = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '🎨',
    color: '#0ea5e9',
    skills: [
      { name: 'React.js', level: 88 },
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 70 },
      { name: 'HTML & CSS', level: 95 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Three.js', level: 65 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '⚙️',
    color: '#a855f7',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'Node.js', level: 78 },
      { name: 'Java', level: 72 },
      { name: 'MongoDB', level: 80 },
      { name: 'REST APIs', level: 88 },
      { name: 'SQL', level: 70 },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Automation',
    icon: '🤖',
    color: '#22d3ee',
    skills: [
      { name: 'OpenAI API', level: 85 },
      { name: 'LangChain', level: 70 },
      { name: 'Prompt Engineering', level: 90 },
      { name: 'Web Scraping', level: 80 },
      { name: 'Automation Scripts', level: 85 },
      { name: 'Gemini API', level: 82 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: '🔧',
    color: '#f59e0b',
    skills: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'VS Code', level: 95 },
      { name: 'Figma', level: 72 },
      { name: 'Postman', level: 80 },
      { name: 'Linux', level: 68 },
      { name: 'Docker', level: 55 },
    ],
  },
  {
    id: '3d',
    label: '3D & Design',
    icon: '🎮',
    color: '#ec4899',
    skills: [
      { name: 'Blender', level: 78 },
      { name: 'Unity 3D', level: 72 },
      { name: 'C# (Unity)', level: 68 },
      { name: 'GSAP', level: 75 },
      { name: 'Framer Motion', level: 80 },
      { name: 'UI/UX Design', level: 70 },
    ],
  },
];

const techCloud = [
  'React', 'Next.js', 'JavaScript', 'TypeScript', 'Python', 'Node.js',
  'MongoDB', 'Tailwind', 'Three.js', 'GSAP', 'Blender', 'Unity',
  'OpenAI', 'LangChain', 'Git', 'Figma', 'Java', 'REST API',
  'Framer Motion', 'HTML5', 'CSS3', 'Postman', 'Linux',
];

const SkillBar = ({ name, level, color, inView }) => (
  <div className="skill-bar-item">
    <div className="skill-bar-header">
      <span className="skill-bar-name">{name}</span>
      <span className="skill-bar-pct" style={{ color }}>{level}%</span>
    </div>
    <div className="skill-bar-track">
      <motion.div
        className="skill-bar-fill"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}88)`, '--progress': `${level}%` }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
      />
    </div>
  </div>
);

const Skills = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section className="section skills-section" id="skills" ref={ref}>
      <div className="skills-bg-orb" aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-tag">What I Know</div>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            A diverse toolkit spanning frontend, backend, AI, 3D, and automation — 
            always expanding, always building.
          </p>
        </motion.div>

        {/* Category cards grid */}
        <div className="skills-grid">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.id}
              className="skill-category-card glass-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
            >
              <div className="skill-cat-header">
                <div className="skill-cat-icon" style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}30` }}>
                  {cat.icon}
                </div>
                <h3 className="skill-cat-label" style={{ color: cat.color }}>{cat.label}</h3>
              </div>

              <div className="skill-bars">
                {cat.skills.map((s) => (
                  <SkillBar
                    key={s.name}
                    name={s.name}
                    level={s.level}
                    color={cat.color}
                    inView={inView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech cloud / tags */}
        <motion.div
          className="tech-cloud"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="tech-cloud-title">
            <span className="divider-glow" style={{ width: '60px', display: 'inline-block' }} />
            <span className="tech-cloud-label">Also familiar with</span>
            <span className="divider-glow" style={{ width: '60px', display: 'inline-block' }} />
          </div>
          <div className="tech-tags-wrap">
            {techCloud.map((t, i) => (
              <motion.span
                key={t}
                className="tech-tag"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.03, duration: 0.4 }}
                whileHover={{ scale: 1.08, y: -3 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
