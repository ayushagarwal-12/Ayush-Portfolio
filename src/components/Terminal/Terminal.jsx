import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTerminal, FiX, FiMaximize2, FiMinus } from 'react-icons/fi';
import './Terminal.css';

const COMMANDS = {
  help: 'Available commands: about, skills, projects, clear, sudo, contact',
  about: 'Accessing secure files... \nName: Ayush Agarwal\nDesignation: Full Stack & AI Developer\nStatus: Initializing digital dominance... \nLocation: Earth',
  skills: '[=== LOADING SKILLS ===]\n> React.js\n> Python / AI Automation\n> Three.js / GSAP\n> Unity Game Dev',
  projects: 'Executing search...\nRedirecting focus to "Projects" section of mainframe. Try scrolling down!',
  clear: '',
  sudo: 'Access denied. This incident will be reported. 🚨',
  contact: 'Running contact protocol...\nEmail: ayushagrwal2021@gmail.com\nGitHub: @ayushagarwal-12'
};

const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to AyushOS v2.4.9' },
    { type: 'output', text: 'Type a command to interact.' },
    { type: 'output', text: 'AVAILABLE COMMANDS: \n> about \n> skills \n> projects \n> contact \n> sudo \n> clear' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      if (!cmd) return;

      const newHistory = [...history, { type: 'input', text: `root@ayush.dev:~$ ${input}` }];
      
      if (cmd === 'clear') {
        setHistory([]);
      } else if (COMMANDS[cmd]) {
        newHistory.push({ type: 'output', text: COMMANDS[cmd] });
        setHistory(newHistory);
      } else {
        newHistory.push({ type: 'output', text: `Command not found: ${cmd}. Type "help" to see commands.` });
        setHistory(newHistory);
      }
      
      setInput('');
    }
  };

  return (
    <>
      <motion.button
        className="terminal-launcher"
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}
        whileTap={{ scale: 0.9 }}
      >
        <FiTerminal size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="terminal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="terminal-window"
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="terminal-header">
                <div className="terminal-title">bash - ayush@portfolio</div>
                <button className="t-explicit-close" onClick={() => setIsOpen(false)} title="Close Terminal">
                  <FiX size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="terminal-body" onClick={() => document.getElementById('term-input').focus()}>
                {history.map((line, i) => (
                  <div key={i} className={`term-line ${line.type}`}>
                    {line.text.split('\n').map((l, j) => (
                      <div key={j}>{l}</div>
                    ))}
                  </div>
                ))}
                
                <div className="term-input-line">
                  <span className="term-prompt">root@ayush.dev:~$</span>
                  <input
                    id="term-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    autoComplete="off"
                    autoFocus
                    spellCheck="false"
                  />
                </div>
                <div ref={endRef} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;
