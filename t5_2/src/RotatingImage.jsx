import React, { useState } from 'react';

const RotatingImage = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative w-full flex justify-center items-center p-4">
      <style>{`
        .rotating-button {
          position: relative;
          border: none;
          cursor: pointer;
          appearance: none;
          width: min(243px, 80vw);
          height: min(243px, 80vw);
          background: transparent;
          overflow: hidden;
        }
        
        .rotating-background {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          width: 100%;
          height: 100%;
          background: #4480f4;
          clip-path: path("M0 121.5C0 54.3974 54.3974 0 121.5 0C188.603 0 243 54.3974 243 121.5C243 188.603 188.603 243 121.5 243C54.3974 243 0 188.603 0 121.5Z");
          transform: scale(0);
          transition: transform 0.5s ease;
        }

        .rotating-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, #9f86e0, transparent);
          animation: none;
        }
        
        .rotating-button.active .rotating-background {
          transform: scale(1);
          animation: morphPath 10s linear infinite,
                     rotate 7s linear infinite;
        }

        .rotating-button.active .rotating-background::before {
          animation: slideGradient 2s linear infinite;
        }
        
        .rotating-svg {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 49.4%;
          height: 49.4%;
          transform: translate(-50%, -50%);
          transition: transform 1.2s ease, filter 0.6s ease;
          mix-blend-mode: plus-lighter;
        }
        
        .rotating-button.active .rotating-svg {
          transform: translate(-50%, -50%) rotate(360deg);
          animation: pulse 4s infinite;
        }

        @keyframes slideGradient {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        @keyframes morphPath {
          0% { clip-path: path("M0 121.5C0 54.3974 54.3974 0 121.5 0C188.603 0 243 54.3974 243 121.5C243 188.603 188.603 243 121.5 243C54.3974 243 0 188.603 0 121.5Z"); }
          25% { clip-path: path("M93.132 11.953C108.636 -3.98432 134.364 -3.98432 149.868 11.953C157.414 19.7095 167.885 24.0325 178.747 23.9027C200.892 23.6379 219.001 41.5209 218.74 63.5022L218.728 64.5295C218.601 75.1557 222.834 85.3762 230.452 92.8429L231.273 93.6477C246.909 108.973 246.909 134.027 231.273 149.352L230.452 150.157C222.834 157.624 218.601 167.844 218.728 178.47L218.74 179.498C219.001 201.479 200.892 219.362 178.747 219.097C167.885 218.967 157.414 223.29 149.868 231.047C134.364 246.984 108.636 246.984 93.132 231.047C85.5863 223.29 75.115 218.967 64.2529 219.097C42.1076 219.362 23.9994 201.479 24.2603 179.498L24.2725 178.471C24.3986 167.844 20.1664 157.624 12.5482 150.157L11.727 149.352C-3.90902 134.027 -3.90901 108.973 11.727 93.6477L12.5482 92.8429C20.1664 85.3761 24.3986 75.1557 24.2725 64.5295L24.2603 63.5022C23.9994 41.5209 42.1076 23.6379 64.2529 23.9027C75.115 24.0325 85.5863 19.7095 93.132 11.953Z"); }
          50% { clip-path: path("M40 81.5126C40 36.4945 76.4945 0 121.513 0C166.531 0 203.025 36.4945 203.025 81.5127V161.487C203.025 206.506 166.531 243 121.513 243C76.4945 243 40 206.506 40 161.487V81.5126Z"); }
          75% { clip-path: path("M101.606 5.34988C113.961 -1.78329 129.183 -1.78329 141.538 5.34988L212.178 46.1339C224.533 53.267 232.144 66.4497 232.144 80.716V162.284C232.144 176.55 224.533 189.733 212.178 196.866L141.538 237.65C129.183 244.783 113.961 244.783 101.606 237.65L30.966 196.866C18.611 189.733 11 176.55 11 162.284V80.716C11 66.4497 18.611 53.267 30.966 46.1339L101.606 5.34988Z"); }
          100% { clip-path: path("M0 121.5C0 54.3974 54.3974 0 121.5 0C188.603 0 243 54.3974 243 121.5C243 188.603 188.603 243 121.5 243C54.3974 243 0 188.603 0 121.5Z"); }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes pulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(4); }
        }

        @media (max-width: 640px) {
          .rotating-button {
            width: 60vw;
            height: 60vw;
          }
        }
      `}</style>

      <button 
        className={`rotating-button ${isActive ? 'active' : ''}`}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onTouchStart={() => setIsActive(true)}
        onTouchEnd={() => setIsActive(false)}
      >
        <span className="rotating-background"></span>
        <svg
          className="rotating-svg"
          viewBox="0 0 213 215"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_49_57)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M211 106.944C153.415 105.102 107.265 57.9707 107.001 0H106.999C106.735 57.9707 60.5852 105.102 3 106.944V107.056C60.7507 108.903 107 156.301 107 214.5C107 214.667 107 214.833 106.999 215H107.001C107 214.833 107 214.667 107 214.5C107 156.301 153.249 108.903 211 107.056V106.944Z"
              fill="#3D3E3E"
            />
          </g>
          <defs>
            <clipPath id="clip0_49_57">
              <rect width="213" height="215" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default RotatingImage;