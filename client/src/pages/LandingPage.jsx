import React from 'react';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import FAQ from '../components/landing/FAQ';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <FAQ />
    </>
  );
};

export default LandingPage;
