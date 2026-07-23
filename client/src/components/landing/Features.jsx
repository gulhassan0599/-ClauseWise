import React from 'react';

const Features = () => {
  const features = [
    { icon: '🤖', title: 'AI-Powered Analysis', text: 'State-of-the-art LLMs break down complex legalese instantly.' },
    { icon: '🚨', title: 'Risk Detection', text: 'Automatically highlights red flags and hidden traps before you sign.' },
    { icon: '💬', title: 'Interactive Q&A', text: 'Ask specific follow-up questions about the contract directly to the AI.' },
    { icon: '🔒', title: 'Private & Secure', text: 'Documents are analyzed temporarily and never stored permanently.' },
  ];

  return (
    <section className="py-5 bg-opacity-10" style={{ background: 'var(--secondary-gradient)' }}>
      <div className="container py-4">
        <h2 className="text-center fw-bold mb-5">Why Choose ClauseWise?</h2>
        <div className="row g-4">
          {features.map((feature, idx) => (
            <div className="col-md-6 col-lg-3" key={idx}>
              <div className="glass-panel p-4 h-100 text-center hover-lift">
                <div className="display-4 mb-3">{feature.icon}</div>
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="text-muted small mb-0">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
