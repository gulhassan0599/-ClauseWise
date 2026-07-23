import React, { useState } from 'react';
import { generatePdfReport } from '../../utils/pdfGenerator';

const Dashboard = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'risky' | 'important'

  if (!data) return null;

  const flaggedCount = data.riskyClauses?.length || 0;

  return (
    <div className="d-flex flex-column gap-4">
      {/* 1. Top bar */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <h2 className="fw-bold mb-0 text-gradient fs-3">{data.documentType || 'Contract Analysis'}</h2>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-sm btn-primary rounded-pill hover-lift shadow-sm px-3 fw-bold"
            onClick={() => generatePdfReport(data)}
          >
            <span className="me-1">⬇️</span> Download PDF
          </button>
          <button 
            className="btn btn-sm btn-outline-danger rounded-pill hover-lift shadow-sm px-3 fw-bold"
            onClick={onReset}
          >
            <span className="me-1">🗑️</span> Clear & New
          </button>
        </div>
      </div>

      {/* 2. Stat card row */}
      <div className="d-grid gap-2" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="glass-panel p-2 text-center d-flex flex-column justify-content-center">
          <div className="text-muted mb-0 fw-medium" style={{ fontSize: '0.75rem' }}>Confidence</div>
          <div className="fw-bold text-primary" style={{ fontSize: '0.95rem' }}>{data.analysisConfidence?.level || 'N/A'}</div>
        </div>
        <div className="glass-panel p-2 text-center d-flex flex-column justify-content-center">
          <div className="text-muted mb-0 fw-medium" style={{ fontSize: '0.75rem' }}>Overall Risk</div>
          <div className={`fw-bold ${data.overallRisk?.level === 'High' ? 'text-danger' : data.overallRisk?.level === 'Medium' ? 'text-warning' : 'text-success'}`} style={{ fontSize: '0.95rem' }}>
            {data.overallRisk?.level || 'N/A'}
          </div>
        </div>
        <div className="glass-panel p-2 text-center d-flex flex-column justify-content-center">
          <div className="text-muted mb-0 fw-medium" style={{ fontSize: '0.75rem' }}>Flagged Clauses</div>
          <div className="fw-bold text-danger" style={{ fontSize: '0.95rem' }}>{flaggedCount}</div>
        </div>
      </div>

      {/* 3. Tabbed content section */}
      <div className="glass-panel overflow-hidden">
        {/* Tab Bar */}
        <div className="d-flex border-bottom" style={{ borderColor: 'var(--border-color)', backgroundColor: 'rgba(0,0,0,0.02)' }}>
          <button 
            className={`flex-fill py-3 border-0 bg-transparent fw-bold ${activeTab === 'summary' ? 'text-primary' : 'text-muted'}`}
            style={{ 
              borderBottom: activeTab === 'summary' ? '2px solid var(--primary-gradient)' : '2px solid transparent', 
              transition: 'all 0.2s',
              boxShadow: activeTab === 'summary' ? 'inset 0 -2px 0 0 #2563eb' : 'none'
            }}
            onClick={() => setActiveTab('summary')}
          >
            <span className="d-none d-sm-inline">📄 Summary</span>
            <span className="d-inline d-sm-none">📄</span>
          </button>
          <button 
            className={`flex-fill py-3 border-0 bg-transparent fw-bold ${activeTab === 'risky' ? 'text-danger' : 'text-muted'}`}
            style={{ 
              borderBottom: activeTab === 'risky' ? '2px solid #dc3545' : '2px solid transparent', 
              transition: 'all 0.2s',
              boxShadow: activeTab === 'risky' ? 'inset 0 -2px 0 0 #dc3545' : 'none'
            }}
            onClick={() => setActiveTab('risky')}
          >
            <span className="d-none d-sm-inline">🚨 Risky Clauses</span>
            <span className="d-inline d-sm-none">🚨</span>
          </button>
          <button 
            className={`flex-fill py-3 border-0 bg-transparent fw-bold ${activeTab === 'important' ? 'text-success' : 'text-muted'}`}
            style={{ 
              borderBottom: activeTab === 'important' ? '2px solid #198754' : '2px solid transparent', 
              transition: 'all 0.2s',
              boxShadow: activeTab === 'important' ? 'inset 0 -2px 0 0 #198754' : 'none'
            }}
            onClick={() => setActiveTab('important')}
          >
            <span className="d-none d-sm-inline">📌 Important</span>
            <span className="d-inline d-sm-none">📌</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-3" style={{ minHeight: '120px' }}>
          {activeTab === 'summary' && (
            <div className="page-fade-in">
              <p className="fs-6 mb-3 lh-lg text-muted">{data.summary}</p>
              {data.overallRisk?.reason && (
                <div className="d-flex align-items-start mt-4 pt-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="me-2 fs-5">💡</span>
                  <p className="text-muted small mb-0 mt-1">
                    <strong>Risk Reason:</strong> {data.overallRisk.reason}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'risky' && (
            <div className="page-fade-in d-flex flex-column gap-3">
              {data.riskyClauses?.length > 0 ? (
                data.riskyClauses.map((clause, idx) => (
                  <div key={idx} className="p-3 rounded-3 bg-body border" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="fw-bold mb-0 text-danger">{clause.title}</h6>
                      <span className={`badge ${clause.severity === 'High' ? 'bg-danger' : 'bg-warning text-dark'}`}>{clause.severity}</span>
                    </div>
                    <p className="small text-muted mb-2">{clause.explanation}</p>
                    <div className="p-2 bg-danger bg-opacity-10 rounded text-danger small">
                      <strong>Why it matters:</strong> {clause.whyItMatters}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted py-5">
                  No significant risky clauses detected.
                </div>
              )}
            </div>
          )}

          {activeTab === 'important' && (
            <div className="page-fade-in d-flex flex-column gap-3">
              {data.importantClauses?.length > 0 ? (
                data.importantClauses.map((clause, idx) => (
                  <div key={idx} className="p-3 rounded-3 bg-body border" style={{ borderColor: 'var(--border-color)' }}>
                    <h6 className="fw-bold mb-1 text-primary">{clause.title}</h6>
                    <p className="small text-muted mb-0">{clause.explanation}</p>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted py-5">
                  No specific important clauses highlighted.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
