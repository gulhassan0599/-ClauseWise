import React from 'react';

const HowItWorks = () => {
  const steps = [
    { num: '1', title: 'Upload Contract', text: 'Upload your text-based legal agreement in PDF format securely (scanned images and non-PDF files are not supported).' },
    { num: '2', title: 'AI Processing', text: 'Our system reads the document and identifies the critical clauses.' },
    { num: '3', title: 'Review Results', text: 'Get a plain English summary, risk score, and chat with the AI for clarity.' },
  ];

  return (
    <section className="py-5 my-4">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">How It Works</h2>
        <div className="row g-4 position-relative">
          {steps.map((step, idx) => (
            <div className="col-md-4 text-center" key={idx}>
              <div className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle mb-3" style={{ width: '60px', height: '60px', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {step.num}
              </div>
              <h4 className="fw-bold">{step.title}</h4>
              <p className="text-muted px-3">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
