import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiMail, FiInstagram, FiLinkedin, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import './Contact.css';

const socials = [
  {
    icon: <FiGithub size={22} />,
    label: 'GitHub',
    handle: '@ayushagarwal-12',
    href: 'https://github.com/ayushagarwal-12',
    color: '#f1f5f9',
  },
  {
    icon: <FiLinkedin size={22} />,
    label: 'LinkedIn',
    handle: 'Ayush Agarwal',
    href: 'https://www.linkedin.com/in/ayush-agarwal-a910b02a9/',
    color: '#0a66c2',
  },
  {
    icon: <FiInstagram size={22} />,
    label: 'Instagram',
    handle: '@ayushagarwal_122',
    href: 'https://www.instagram.com/ayushagarwal_122/',
    color: '#e1306c',
  },
  {
    icon: <FiMail size={22} />,
    label: 'Email',
    handle: 'ayushagrwal2021@gmail.com',
    href: 'mailto:ayushagrwal2021@gmail.com',
    color: '#22d3ee',
  },
];

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const formRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Create mailto link
    const mailtoLink = `mailto:ayushagrwal2021@gmail.com?subject=${encodeURIComponent(formState.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`)}`;
    
    // Open mail client
    setTimeout(() => {
      window.location.href = mailtoLink;
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormState({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 800);
  };

  return (
    <section className="section contact-section" id="contact" ref={ref}>
      <div className="contact-bg-orb" aria-hidden="true" />
      <div className="contact-bg-orb-2" aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-tag">Let's Connect</div>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Let's build something exceptional together.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Left: Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Availability card */}
            <div className="avail-card glass-card">
              <div className="avail-top">
                <div className="avail-pulse">
                  <div className="pulse-ring" />
                  <div className="pulse-dot" />
                </div>
                <div>
                  <div className="avail-label">Current Status</div>
                  <div className="avail-status">Available for Work</div>
                </div>
              </div>
              <p className="avail-text">
                Open to freelance projects, internships, and full-time opportunities in 
                AI, web development, and automation.
              </p>
              <div className="avail-tags">
                {['Full-time', 'Freelance', 'Remote'].map((t) => (
                  <span key={t} className="avail-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="contact-socials">
              <h3 className="socials-heading">Find Me On</h3>
              <div className="social-cards">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-card"
                    style={{ '--sc-color': s.color }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <div className="sc-icon-wrap" style={{ color: s.color, background: `${s.color}14`, border: `1px solid ${s.color}28` }}>
                      {s.icon}
                    </div>
                    <div className="sc-info">
                      <div className="sc-label">{s.label}</div>
                      <div className="sc-handle">{s.handle}</div>
                    </div>
                    <div className="sc-arrow">→</div>
                    <div className="sc-hover-bg" style={{ background: `${s.color}08` }} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form className="contact-form glass-card" onSubmit={handleSubmit} ref={formRef} noValidate>
              <div className="form-header">
                <h3 className="form-title">Send a Message</h3>
                <p className="form-sub">I'll get back to you within 24 hours.</p>
              </div>

              {/* Name & Email row */}
              <div className="form-row">
                <div className={`form-group ${focused === 'name' || formState.name ? 'active' : ''}`}>
                  <label htmlFor="contact-name" className="form-label">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Ayush Agarwal"
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    required
                  />
                </div>

                <div className={`form-group ${focused === 'email' || formState.email ? 'active' : ''}`}>
                  <label htmlFor="contact-email" className="form-label">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div className={`form-group ${focused === 'subject' || formState.subject ? 'active' : ''}`}>
                <label htmlFor="contact-subject" className="form-label">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  className="form-input"
                  placeholder="Project Collaboration"
                  value={formState.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused(null)}
                />
              </div>

              {/* Message */}
              <div className={`form-group ${focused === 'message' || formState.message ? 'active' : ''}`}>
                <label htmlFor="contact-message" className="form-label">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-input form-textarea"
                  placeholder="Tell me about your project or idea..."
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  rows={5}
                  required
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className={`form-submit ${status}`}
                disabled={status === 'sending' || status === 'success'}
                whileHover={status === 'idle' ? { scale: 1.02, y: -2 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
              >
                {status === 'idle' && (
                  <>
                    <FiSend size={18} />
                    <span>Send Message</span>
                  </>
                )}
                {status === 'sending' && (
                  <>
                    <div className="submit-spinner" />
                    <span>Sending...</span>
                  </>
                )}
                {status === 'success' && (
                  <>
                    <FiCheck size={18} />
                    <span>Message Sent!</span>
                  </>
                )}
                {status === 'error' && (
                  <>
                    <FiAlertCircle size={18} />
                    <span>Try Again</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
