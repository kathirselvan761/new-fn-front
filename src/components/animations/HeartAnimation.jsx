import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import "./HeartAnimation.css";

const HeartAnimation = ({ onComplete }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const heartArray = [];
    const colors = ["#ff1744", "#e91e63", "#f06292", "#ff4081", "#ff80ab"];

    for (let i = 0; i < 30; i++) {
      heartArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3000,
        duration: 3000 + Math.random() * 2000,
        size: 0.5 + Math.random() * 1.5,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setHearts(heartArray);

    const timer = setTimeout(() => {
      if (typeof onComplete === "function") {
        onComplete();
      }
    }, 6000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="heart-animation-container">
      <div className="background-particles">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="hearts-wrapper">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="floating-heart"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              animationDelay: `${heart.delay}ms`,
              animationDuration: `${heart.duration}ms`,
              transform: `scale(${heart.size}) rotate(${heart.rotation}deg)`,
            }}
          >
            <Heart
              className="heart-icon"
              fill={heart.color}
              color={heart.color}
              size={32}
            />
          </div>
        ))}
      </div>

      <div className="abc">
        <div className="heart-message">
          <div className="message-backdrop"></div>
          <h1 className="main-title">Make an every night feel the Sleepyyy </h1>
          <p className="subtitle">For Your Comfort & Joy</p>
          <div className="heart-pulse">
            <Heart
              className="central-heart"
              fill="#ff1744"
              color="#ffcccb"
              size={99}
            />
          </div>
        </div>
      </div>

      <div className="corner-decoration top-left"></div>
      <div className="corner-decoration top-right"></div>
      <div className="corner-decoration bottom-left"></div>
      <div className="corner-decoration bottom-right"></div>
    </div>
  );
};

export default HeartAnimation;
