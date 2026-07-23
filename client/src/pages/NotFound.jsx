import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container py-5 text-center d-flex flex-column align-items-center justify-content-center page-fade-in" style={{ minHeight: '60vh' }}>
      <h1 className="display-1 fw-bold text-gradient mb-3">404</h1>
      <h2 className="mb-4 fw-bold">Page Not Found</h2>
      <p className="text-muted mb-5" style={{ maxWidth: '400px' }}>
        The page you are looking for doesn't exist or has been moved to a different location.
      </p>
      <Link to="/" className="btn btn-primary rounded-pill px-4 py-2 hover-lift shadow-sm">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
