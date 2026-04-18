import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-divider" />
      <div className="container footer-inner">
        <div className="footer-left">
          <div className="footer-logo">
            <div className="footer-logo-badge">AA</div>
            <span>Ayush</span>
          </div>
          <p className="footer-tagline">
            Building intelligent digital experiences — one line of code at a time.
          </p>
        </div>

        <div className="footer-links">
          {[['Home', '#home'], ['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'], ['Contact', '#contact']].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="footer-link"
              onClick={(e) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="footer-right">
          <p className="footer-copy">
            © {year} Ayush Agarwal. All rights reserved.
          </p>
          <p className="footer-made">
            Made with <span style={{ color: '#ef4444' }}>♥</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
