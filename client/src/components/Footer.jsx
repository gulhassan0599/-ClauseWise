import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-4 mt-auto border-top" style={{ borderColor: 'var(--border-color)' }}>
      <div className="container text-center text-muted">
        <div className="mb-3">
          <Link to="/" className="text-decoration-none text-muted me-3 hover-lift d-inline-block">Home</Link>
          <Link to="/analysis" className="text-decoration-none text-muted hover-lift d-inline-block">Analyze Contract</Link>
        </div>
        <p className="mb-0 small">
          &copy; {new Date().getFullYear()} ClauseWise. <br />
          <span className="fst-italic text-warning">This application does not provide legal advice.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
