import React from 'react';

const Loading = () => {
  return (
    <div className="container py-4 page-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Top Bar Skeleton */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="placeholder-glow w-50">
          <span className="placeholder col-8 col-md-6 rounded-pill" style={{ height: '32px' }}></span>
        </div>
        <div className="placeholder-glow w-25 text-end">
          <span className="placeholder col-10 col-md-8 rounded-pill" style={{ height: '32px' }}></span>
        </div>
      </div>

      {/* Stats Row Skeleton */}
      <div className="d-grid gap-3 mb-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {[1, 2, 3].map(i => (
          <div key={i} className="glass-panel p-3 text-center placeholder-glow border-0">
             <span className="placeholder col-6 rounded-pill mb-2 bg-secondary opacity-25"></span>
             <br/>
             <span className="placeholder col-4 rounded-pill bg-secondary opacity-25" style={{ height: '24px' }}></span>
          </div>
        ))}
      </div>

      {/* Tabbed Content Skeleton */}
      <div className="glass-panel overflow-hidden mb-4 border-0">
        <div className="d-flex border-bottom placeholder-glow" style={{ borderColor: 'var(--border-color)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-fill py-3 text-center">
              <span className="placeholder col-4 rounded-pill bg-secondary opacity-25"></span>
            </div>
          ))}
        </div>
        <div className="p-4 placeholder-glow">
          <span className="placeholder col-12 rounded mb-2 bg-secondary opacity-25"></span>
          <span className="placeholder col-10 rounded mb-2 bg-secondary opacity-25"></span>
          <span className="placeholder col-11 rounded mb-4 bg-secondary opacity-25"></span>
          
          <div className="border-top pt-4 mt-2" style={{ borderColor: 'var(--border-color)' }}>
             <span className="placeholder col-8 rounded mb-2 bg-secondary opacity-25"></span>
             <span className="placeholder col-9 rounded bg-secondary opacity-25"></span>
          </div>
        </div>
      </div>

      {/* Status indicator */}
      <div className="text-center mt-5">
        <div className="spinner-border text-primary opacity-75 mb-3" role="status"></div>
        <h5 className="text-muted fw-bold">Analyzing Document...</h5>
        <p className="small text-muted opacity-75">Our AI is reading and extracting key clauses.</p>
      </div>
    </div>
  );
};

export default Loading;
