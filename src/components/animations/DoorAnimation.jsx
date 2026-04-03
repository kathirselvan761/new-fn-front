import React, { useEffect, useState } from "react";
import "./DoorAnimation.css";

const DoorAnimation = ({ onComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Door starts opening after 1.5 seconds
    const openTimer = setTimeout(() => setIsOpening(true), 100);

    // Show welcome text after 8 seconds (door fully open)
    const textTimer = setTimeout(() => setShowText(true), 2500);

    // Animation complete after 12 seconds
    const completeTimer = setTimeout(() => onComplete(), 12000);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="door-container">
      <div className={`door-left ${isOpening ? "opening" : ""}`}>
        <div className="door-handle"></div>
      </div>
      <div className={`door-right ${isOpening ? "opening" : ""}`}>
        <div className="door-handle"></div>
      </div>

      {showText && (
        <div className="welcome-text fade-in">
          <h1>Welcome to Sleepyyy</h1>
          <p>Premium Bed & Pillow Covers</p>
        </div>
      )}
    </div>
  );
};

export default DoorAnimation;
