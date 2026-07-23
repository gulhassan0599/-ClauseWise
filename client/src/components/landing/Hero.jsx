import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="py-5 text-center my-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold mb-4">
              Understand Any Contract in <span className="text-gradient">Plain English</span>
            </h1>
            <p className="lead text-muted mb-5 px-md-5">
              ClauseWise uses advanced AI to instantly break down legal jargon, identify hidden risks, and summarize agreements so you can sign with confidence.
            </p>
            <Link to="/analysis" className="btn btn-gradient btn-lg px-5 py-3 rounded-pill hover-lift fw-bold">
              Start Analyzing for Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
