import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg glass-nav sticky-top py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          <span className="text-gradient">ClauseWise</span>
        </Link>
        
        {/* Mobile Theme Toggle & Hamburger */}
        <div className="d-flex align-items-center gap-2 order-lg-last">
          <div className="d-lg-none">
            <ThemeToggle />
          </div>
          
          <button 
            className="navbar-toggler border-0 px-2" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <Link className={`nav-link fw-medium px-3 ${location.pathname === '/' ? 'active' : ''}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link fw-medium px-3 ${location.pathname === '/analysis' ? 'active' : ''}`} to="/analysis">
                Analyze Contract
              </Link>
            </li>
            {/* Desktop Theme Toggle */}
            <li className="nav-item ms-2 ps-3 border-start d-none d-lg-block" style={{ borderColor: 'var(--border-color)' }}>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
