import React, { useEffect } from "react";
import "./TextAnimation.css";
import { useNavigate } from "react-router-dom";

const TextAnimation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 18000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="animation-container">
      <div className="stars"></div>

      {/* Falling small hearts */}
      <div className="hearts">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="small-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Big heart + slogan */}
      <div className="big-heart"></div>
      <div className="slogan">
        Just gift for Newly Married Couples <br />
        but also to your's 💖
      </div>
    </div>
  );
};

export default TextAnimation;

// It is Old Code but it is working without the three animation

// import React, { useEffect } from "react";
// import "./TextAnimation.css";
// import { useNavigate } from "react-router-dom";

// const TextAnimation = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate("/home"); // redirect to homepage
//     }, 4000);

//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <div className="heart-container">
//       <div className="text">Make every night feel like the Sleepyyy</div>
//       {[...Array(15)].map((_, i) => (
//         <div key={i} className="heart" style={{ left: `${Math.random() * 100}%` }}></div>
//       ))}
//     </div>
//   );
// };

// export default TextAnimation;

// import React, { useEffect } from "react";
// import "./HeartAnimation.css";
// import { useNavigate } from "react-router-dom";

// const HeartAnimation = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Navigate to homepage after 4 seconds
//     const timer = setTimeout(() => {
//       navigate("/home"); // change "/home" if your home route differs
//     }, 4000);

//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <div className="heart-container">
//       <div className="text">Make every night feel like the Sleepyyy</div>

//       {/* Floating hearts */}
//       {[...Array(15)].map((_, i) => (
//         <div key={i} className="heart" style={{ left: `${Math.random() * 100}%` }}></div>
//       ))}
//     </div>
//   );
// };

// export default HeartAnimation;
