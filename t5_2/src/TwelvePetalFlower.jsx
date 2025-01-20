import React from "react";

const TwelvePetalFlower = () => {
  return (
    <svg
      width="300"
      height="300"
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Define a gradient for the petals */}
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFA500" /> {/* Orange */}
          <stop offset="100%" stopColor="#FF4500" /> {/* Red */}
        </linearGradient>
      </defs>

      {/* Petals */}
      <path
        d="M150,30 Q170,80 150,120 Q130,80 150,30"
        fill="url(#gradient)"
        transform="rotate(0 150 150)"
      />
      <path
        d="M150,30 Q170,80 150,120 Q130,80 150,30"
        fill="url(#gradient)"
        transform="rotate(30 150 150)"
      />
      <path
        d="M150,30 Q170,80 150,120 Q130,80 150,30"
        fill="url(#gradient)"
        transform="rotate(60 150 150)"
      />
      <path
        d="M150,30 Q170,80 150,120 Q130,80 150,30"
        fill="url(#gradient)"
        transform="rotate(90 150 150)"
      />
      <path
        d="M150,30 Q170,80 150,120 Q130,80 150,30"
        fill="url(#gradient)"
        transform="rotate(120 150 150)"
      />
      <path
        d="M150,30 Q170,80 150,120 Q130,80 150,30"
        fill="url(#gradient)"
        transform="rotate(150 150 150)"
      />
      <path
        d="M150,30 Q170,80 150,120 Q130,80 150,30"
        fill="url(#gradient)"
        transform="rotate(180 150 150)"
      />
      <path
        d="M150,30 Q170,80 150,120 Q130,80 150,30"
        fill="url(#gradient)"
        transform="rotate(210 150 150)"
      />
      <path
        d="M150,30 Q170,80 150,120 Q130,80 150,30"
        fill="url(#gradient)"
        transform="rotate(240 150 150)"
      />
      <path
        d="M150,30 Q170,80 150,120 Q130,80 150,30"
        fill="url(#gradient)"
        transform="rotate(270 150 150)"
      />
      <path
        d="M150,30 Q170,80 150,120 Q130,80 150,30"
        fill="url(#gradient)"
        transform="rotate(300 150 150)"
      />
      <path
        d="M150,30 Q170,80 150,120 Q130,80 150,30"
        fill="url(#gradient)"
        transform="rotate(330 150 150)"
      />

      {/* Optional Circle in the Center */}
      <circle cx="150" cy="150" r="20" fill="#FFD700" /> {/* Yellow center */}
    </svg>
  );
};

export default TwelvePetalFlower;
