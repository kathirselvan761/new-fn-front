import React, { useEffect } from 'react';
import './GlitterStars.css';

const GlitterStars = () => {
  useEffect(() => {
    const count = 60;
    const container = document.querySelector('.glitter-stars');

    if (!container) return;

    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.width = `${Math.random() * 2 + 1}px`;
      star.style.height = star.style.width;
      container.appendChild(star);
    }

    return () => container.innerHTML = '';
  }, []);

  return <div className='glitter-stars'></div>;
};

export default GlitterStars;
