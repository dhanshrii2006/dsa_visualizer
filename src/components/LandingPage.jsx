import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onStart }) => {
  return (
    <div className="landing-container">
      <div className="background-glow"></div>
      <div className="grid-overlay"></div>
      
      <div className="content">
        <div className="logo-section">
          <div className="visualizer-logo">
            <div className="bar bar-1"></div>
            <div className="bar bar-2"></div>
            <div className="bar bar-3"></div>
            <div className="bar bar-4"></div>
          </div>
          <h1>Sorting Visualizer</h1>
        </div>

        <p className="subtitle">
          Experience the elegance of algorithms in motion. 
          Bridge the gap between theoretical Big O notation and visual intuition.
        </p>

        <div className="cta-buttons">
          <button className="primary-btn" onClick={onStart}>
            Start Visualizing
          </button>
          <button className="secondary-btn" onClick={() => window.open('https://github.com/', '_blank')}>
            View Source
          </button>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Interactive</h3>
            <p>Control speed, array size, and step-through logic.</p>
          </div>
          <div className="feature-card">
            <h3>Comprehensive</h3>
            <p>Compare O(n²) and O(n log n) efficiency side-by-side.</p>
          </div>
          <div className="feature-card">
            <h3>Educational</h3>
            <p>Real-time stats for comparisons, swaps, and time.</p>
          </div>
        </div>
      </div>

      <div className="footer">
        Developed with React & DSA Fundamentals
      </div>
    </div>
  );
};

export default LandingPage;
