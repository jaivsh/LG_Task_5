import React, { useState, useEffect } from 'react';
import firstImage from './s1.png';
import secondImage from './s2.png';

const RotatingImage = () => {
  const [currentShape, setCurrentShape] = useState(0);
  const [animationPhase, setAnimationPhase] = useState('initialRotation');
  const [starState, setStarState] = useState('white');
  
  const shapes = [
    // React logo hexagon centered at (150,150)
    `M${150 + (58.88972745734182 - 69.28203230275508)*1.8} ${150 + (6 - 80)*1.8} ` +
    `Q${150 + (69.28203230275508 - 69.28203230275508)*1.8} ${150 + (0 - 80)*1.8} ${150 + (79.67433714816835 - 69.28203230275508)*1.8} ${150 + (6 - 80)*1.8} ` +
    `L${150 + (128.1717597600969 - 69.28203230275508)*1.8} ${150 + (34 - 80)*1.8} ` +
    `Q${150 + (138.56406460551017 - 69.28203230275508)*1.8} ${150 + (40 - 80)*1.8} ${150 + (138.56406460551017 - 69.28203230275508)*1.8} ${150 + (52 - 80)*1.8} ` +
    `L${150 + (138.56406460551017 - 69.28203230275508)*1.8} ${150 + (108 - 80)*1.8} ` +
    `Q${150 + (138.56406460551017 - 69.28203230275508)*1.8} ${150 + (120 - 80)*1.8} ${150 + (128.1717597600969 - 69.28203230275508)*1.8} ${150 + (126 - 80)*1.8} ` +
    `L${150 + (79.67433714816835 - 69.28203230275508)*1.8} ${150 + (154 - 80)*1.8} ` +
    `Q${150 + (69.28203230275508 - 69.28203230275508)*1.8} ${150 + (160 - 80)*1.8} ${150 + (58.88972745734182 - 69.28203230275508)*1.8} ${150 + (154 - 80)*1.8} ` +
    `L${150 + (10.392304845413264 - 69.28203230275508)*1.8} ${150 + (126 - 80)*1.8} ` +
    `Q${150 + (0 - 69.28203230275508)*1.8} ${150 + (120 - 80)*1.8} ${150 + (0 - 69.28203230275508)*1.8} ${150 + (108 - 80)*1.8} ` +
    `L${150 + (0 - 69.28203230275508)*1.8} ${150 + (52 - 80)*1.8} ` +
    `Q${150 + (0 - 69.28203230275508)*1.8} ${150 + (40 - 80)*1.8} ${150 + (10.392304845413264 - 69.28203230275508)*1.8} ${150 + (34 - 80)*1.8} Z`,
          
    // Large circle
    "M150 20 C230 20 280 70 280 150 C280 230 230 280 150 280 C70 280 20 230 20 150 C20 70 70 20 150 20 Z",
  
    // Elongated circle with star cutout (larger size)
    "M150 20 C220 20 270 70 270 150 C270 230 220 280 150 280 C80 280 30 230 30 150 C30 70 80 20 150 20 Z",

    // Larger 8-Petal Flower
    Array.from({ length: 8 })
    .map((_, i) => {
      const angle = (i * 45) * (Math.PI / 180);
      const x1 = 150 + 150 * Math.cos(angle);
      const y1 = 150 + 150 * Math.sin(angle);
      const x2 = 150 + 125 * Math.cos(angle - Math.PI / 8);
      const y2 = 150 + 125 * Math.sin(angle - Math.PI / 8);
      const x3 = 150 + 125 * Math.cos(angle + Math.PI / 8);
      const y3 = 150 + 125 * Math.sin(angle + Math.PI / 8);
      return `M150,150 L${x2},${y2} Q${x1},${y1} ${x3},${y3} Z`;
    })
    .join(" "),
  ];

  useEffect(() => {
    let timeoutId;
    const startNewCycle = () => {
      // Phase 1: Initial rotation with static white star
      setAnimationPhase('initialRotation');
      setStarState('white');
      
      // Phase 2: Everything collapses
      timeoutId = setTimeout(() => {
        setStarState('collapsing');
        setAnimationPhase('collapsing');
        
        // Phase 3: Black star emerges
        timeoutId = setTimeout(() => {
          setStarState('black');
          setAnimationPhase('emerging');
          
          // Phase 4: Pause after black star reaches full size
          timeoutId = setTimeout(() => {
            setStarState('paused');
            
            // Reset cycle after pause
            timeoutId = setTimeout(startNewCycle, 1000);
          }, 2000); // Time for black star emergence
        }, 2000); // Time for collapse
      }, 10000); // Initial rotation phase
    };

    startNewCycle();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (animationPhase === 'initialRotation') {
      interval = setInterval(() => {
        setCurrentShape((prev) => (prev + 1) % shapes.length);
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [animationPhase, shapes.length]);

  const getShapeClassName = () => {
    switch (animationPhase) {
      case 'initialRotation':
        return 'shape-rotating';
      case 'collapsing':
        return 'shape-collapsing';
      case 'emerging':
        return 'shape-hidden';
      default:
        return '';
    }
  };

  return (
    <div style={{ position: "relative", width: "400px", height: "400px" }}>
      <svg
        width="400"
        height="400"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        className={getShapeClassName()}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <defs>
          <linearGradient id="morphGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00688B" className="gradient-start" />
            <stop offset="100%" stopColor="#8A2BE2" className="gradient-end" />
          </linearGradient>
          <radialGradient id="shineGradient">
            <stop offset="0%" stopColor="rgba(147, 112, 219, 0)" />
            <stop offset="50%" stopColor="rgba(147, 112, 219, 0)" className="shine-mid" />
            <stop offset="100%" stopColor="rgba(147, 112, 219, 0)" />
          </radialGradient>
        </defs>
        <g>
          <path
            d={shapes[currentShape]}
            fill="url(#morphGradient)"
            style={{
              transition: "d 1.5s ease-in-out",
            }}
          />
          <path
            d={shapes[currentShape]}
            fill="url(#shineGradient)"
            className="shine-overlay"
            style={{
              transition: "d 1.5s ease-in-out",
              mixBlendMode: "soft-light",
            }}
          />
        </g>
      </svg>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "200px",
          height: "200px",
          zIndex: 1
        }}
      >
        <div className="star-container">
          <img
            src={firstImage}
            alt="White star"
            className="star white-star"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: ['white', 'collapsing'].includes(starState) ? 'block' : 'none',
              animation: starState === 'collapsing' ? 'rotateAndCollapse 2s forwards' : 'none'
            }}
          />
          <img
            src={secondImage}
            alt="Black star"
            className="star black-star"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: ['black', 'paused'].includes(starState) ? 'block' : 'none',
              animation: starState === 'black' ? 'emergeAndRotate 2s forwards' : 'none'
            }}
          />
        </div>
      </div>

      <style>
        {`
          .shape-rotating {
            animation: rotateBackground 5s linear infinite;
          }

          .shape-collapsing {
            animation: collapseShape 2s forwards;
          }

          .shape-hidden {
            opacity: 0;
            transform: scale(0.01);
          }

          .star-container {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .star {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          @keyframes collapseShape {
            0% { 
              transform: rotate(0deg) scale(1);
              opacity: 1;
            }
            100% { 
              transform: rotate(360deg) scale(0.01);
              opacity: 0;
            }
          }

          @keyframes rotateAndCollapse {
            0% { 
              transform: rotate(0deg) scale(1); 
              opacity: 1;
            }
            100% { 
              transform: rotate(720deg) scale(0.01);
              opacity: 0;
            }
          }

          @keyframes emergeAndRotate {
            0% { 
              transform: rotate(0deg) scale(0.01);
              opacity: 0;
            }
            50% {
              transform: rotate(360deg) scale(0.5);
              opacity: 0.5;
            }
            100% { 
              transform: rotate(720deg) scale(1);
              opacity: 1;
            }
          }

          @keyframes rotateBackground {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes shiftColorStart {
            0% { stop-color: #00688B; }
            25% { stop-color: #4169E1; }
            50% { stop-color: #9370DB; }  /* Medium Purple */
            75% { stop-color: #B19CD9; }  /* Light Purple */
            100% { stop-color: #00688B; }
          }

          @keyframes shiftColorEnd {
            0% { stop-color: #8A2BE2; }
            25% { stop-color: #483D8B; }
            50% { stop-color: #9932CC; }  /* Dark Orchid */
            75% { stop-color: #BA55D3; }  /* Medium Orchid */
            100% { stop-color: #8A2BE2; }
          }

          @keyframes shineEffect {
            0% { 
              stop-color: rgba(147, 112, 219, 0);
            }
            25% {
              stop-color: rgba(147, 112, 219, 0.3);
            }
            50% { 
              stop-color: rgba(186, 85, 211, 0.8);  /* Brighter purple glow */
            }
            75% {
              stop-color: rgba(147, 112, 219, 0.3);
            }
            100% { 
              stop-color: rgba(147, 112, 219, 0);
            }
          }

          .shine-overlay {
            animation: moveShine 5s linear infinite;
            transform-origin: center;
          }

          .shine-mid {
            animation: shineEffect 5s linear infinite;
          }

          @keyframes moveShine {
            from { 
              transform: rotate(0deg) scale(1.2);
            }
            to { 
              transform: rotate(360deg) scale(1.2);
            }
          }

          .gradient-start {
            animation: shiftColorStart 6s linear infinite;
          }

          .gradient-end {
            animation: shiftColorEnd 6s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default RotatingImage;