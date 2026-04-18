import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Experience.css';

const experiences = [
  {
    id: 1,
    role: 'Marketing Head',
    org: 'Google Developer Groups On Campus',
    place: 'SRMCEM',
    period: '2024 – 2025',
    type: 'Leadership',
    color: '#0ea5e9',
    icon: '🌐',
    description:
      'Led digital marketing and community outreach efforts for GDG On Campus at SRMCEM. Organized and promoted technical workshops, hackathons, and dev talks — growing community engagement and brand presence.',
    highlights: ['Community Growth', 'Event Promotion', 'Digital Strategy', 'Content Creation'],
  },
  {
    id: 2,
    role: 'Member',
    org: 'GeeksforGeeks Student Chapter',
    place: 'SRMCEM',
    period: '2023 – 2025',
    type: 'Community',
    color: '#22d3ee',
    icon: '💻',
    description:
      'Active contributor and member of the GFG Student Chapter, participating in coding competitions, technical workshops, and peer-learning sessions to promote DSA and competitive programming culture.',
    highlights: ['Competitive Programming', 'DSA Workshops', 'Peer Learning', 'Problem Solving'],
  },
  {
    id: 3,
    role: 'National Level Participant',
    org: 'Smart India Hackathon',
    place: 'India',
    period: '2024 & 2025',
    type: 'Hackathon',
    color: '#a855f7',
    icon: '🚀',
    description:
      "Qualified and participated in SIH 2024 and SIH 2025 — one of India's largest national hackathons. Built solutions for real-world government and social sector problems using AI and full-stack web technologies.",
    highlights: ['AI Solutions', 'National Level', 'Product Building', 'Team Collaboration'],
  },
  {
    id: 4,
    role: 'Independent Developer',
    org: 'Freelance & Personal Projects',
    place: 'Remote',
    period: '2023 – Present',
    type: 'Development',
    color: '#f59e0b',
    icon: '⚡',
    description:
      'Building AI-powered tools, automation systems, and full-stack web applications independently. Shipping products from idea to deployment — including AI content systems, monitoring tools, and portfolio projects.',
    highlights: ['AI Development', 'Product Launch', 'Full-Stack', 'Automation'],
  },
];

const Experience = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section className="section experience-section" id="experience" ref={ref}>
      <div className="exp-bg-orb" aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-tag">My Journey</div>
          <h2 className="section-title">Experience & Achievements</h2>
          <p className="section-subtitle">
            From national hackathons to community leadership — a journey of 
            continuous learning and impact-driven building.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="timeline">
          <div className="timeline-line" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Card */}
              <div className="timeline-card glass-card" style={{ '--card-accent': exp.color }}>
                {/* Card header */}
                <div className="tc-header">
                  <div className="tc-icon" style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30` }}>
                    {exp.icon}
                  </div>
                  <div className="tc-meta">
                    <div className="tc-type-badge" style={{ color: exp.color, background: `${exp.color}12`, border: `1px solid ${exp.color}25` }}>
                      {exp.type}
                    </div>
                    <div className="tc-period" style={{ color: exp.color }}>
                      <span className="period-dot" style={{ background: exp.color }} />
                      {exp.period}
                    </div>
                  </div>
                </div>

                {/* Role & Org */}
                <h3 className="tc-role">{exp.role}</h3>
                <div className="tc-org">
                  <span>{exp.org}</span>
                  <span className="tc-org-sep">·</span>
                  <span className="tc-place">{exp.place}</span>
                </div>

                {/* Description */}
                <p className="tc-desc">{exp.description}</p>

                {/* Highlights */}
                <div className="tc-highlights">
                  {exp.highlights.map((h) => (
                    <span key={h} className="tc-highlight" style={{ color: exp.color, borderColor: `${exp.color}30`, background: `${exp.color}08` }}>
                      {h}
                    </span>
                  ))}
                </div>

                {/* Glow border on hover */}
                <div className="tc-glow-border" style={{ background: `linear-gradient(90deg, transparent, ${exp.color}, transparent)` }} />
              </div>

              {/* Connector node */}
              <div className="timeline-node" style={{ '--node-color': exp.color }}>
                <div className="node-dot" />
                <div className="node-ring" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
