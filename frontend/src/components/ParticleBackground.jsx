import React from 'react';

const ParticleBackground = ({ count = 15 }) => {
  return (
    <div className="magical-particles-container">
      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className={`magical-shape magical-shape-${i % 5}`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${15 + Math.random() * 20}s`
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
