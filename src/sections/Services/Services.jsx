import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Services.css';

const services = [
  {
    id: 1,
    emoji: '🌐',
    title: 'Full Stack Web Development',
    description:
      'End-to-end web applications from backend APIs to polished frontends. Built with React, Node.js, MongoDB, and modern cloud deployments.',
    color: '#0ea5e9',
    tags: ['React', 'Node.js', 'MongoDB', 'REST API'],
  },
  {
    id: 2,
    emoji: '🎨',
    title: 'Frontend Development',
    description:
      'Pixel-perfect, responsive UIs with smooth animations and premium aesthetics. Specializing in React, Tailwind CSS, Framer Motion, and GSAP.',
    color: '#22d3ee',
    tags: ['React', 'Tailwind', 'GSAP', 'Framer Motion'],
  },
  {
    id: 3,
    emoji: '🤖',
    title: 'AI Tool Development',
    description:
      'Custom AI-powered applications integrating OpenAI, Gemini, and other LLM APIs. From chatbots to content generators to intelligent automation.',
    color: '#a855f7',
    tags: ['OpenAI API', 'Gemini', 'LangChain', 'Python'],
  },
  {
    id: 4,
    emoji: '⚡',
    title: 'Automation Solutions',
    description:
      'Powerful workflow automation scripts that save hours of manual work. Web scraping, data pipelines, scheduled tasks, and API integrations.',
    color: '#f59e0b',
    tags: ['Python', 'Selenium', 'APIs', 'Scheduling'],
  },
  {
    id: 5,
    emoji: '✨',
    title: 'Prompt Engineering',
    description:
      'Crafting precise, optimized prompts for maximum AI output quality. System prompts, chain-of-thought strategies, and LLM fine-tuning guidance.',
    color: '#ec4899',
    tags: ['ChatGPT', 'Gemini', 'Claude', 'LLM Chains'],
  },
  {
    id: 6,
    emoji: '🎮',
    title: 'Unity Game Development',
    description:
      'Engaging 2D/3D games built in Unity with C#. Game mechanics, UI systems, physics, AI pathfinding, and polished player experiences.',
    color: '#14b8a6',
    tags: ['Unity', 'C#', '3D Games', 'Game Design'],
  },
  {
    id: 7,
    emoji: '🌀',
    title: 'Blender 3D Design',
    description:
      'Photorealistic 3D models, animations, product visualizations, and artistic renders crafted in Blender with professional-grade lighting setups.',
    color: '#f97316',
    tags: ['Blender', '3D Modeling', 'Animation', 'Rendering'],
  },
  {
    id: 8,
    emoji: '📈',
    title: 'AI SEO',
    description:
      'Data-driven SEO strategies powered by AI content generation, keyword research automation, on-page optimization, and performance tracking.',
    color: '#84cc16',
    tags: ['SEO', 'Content AI', 'Keywords', 'Analytics'],
  },
];

const Services = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section className="section services-section" id="services" ref={ref}>
      <div className="svc-bg-orb" aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-tag">What I Offer</div>
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">
            From intelligent AI tools to immersive 3D experiences — I bring a 
            multidisciplinary skill set to every project.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="services-grid">
          {services.map((svc, i) => (
            <motion.div
              key={svc.id}
              className="service-card"
              style={{ '--svc-color': svc.color }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              whileHover={{ y: -8 }}
            >
              {/* Glow background */}
              <div className="svc-glow" style={{ background: `radial-gradient(ellipse at top left, ${svc.color}12, transparent 60%)` }} />

              {/* Number */}
              <div className="svc-num" style={{ color: `${svc.color}30` }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className="svc-icon-wrap" style={{ background: `${svc.color}14`, border: `1px solid ${svc.color}28` }}>
                <span className="svc-icon">{svc.emoji}</span>
              </div>

              {/* Title */}
              <h3 className="svc-title">{svc.title}</h3>

              {/* Desc */}
              <p className="svc-desc">{svc.description}</p>

              {/* Tags */}
              <div className="svc-tags">
                {svc.tags.map((t) => (
                  <span key={t} className="svc-tag" style={{ color: svc.color, borderColor: `${svc.color}25`, background: `${svc.color}08` }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Bottom accent line */}
              <div className="svc-accent-line" style={{ background: `linear-gradient(90deg, ${svc.color}, transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
