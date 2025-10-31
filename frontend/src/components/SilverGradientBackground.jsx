import React from "react";

const SilverGradientBackground = () => {
  return (
    <>
      {/* Base silver gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400" />
      
      {/* Secondary silver overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-600/40 via-gray-600/30 to-zinc-900/40" />
      
      {/* Wave SVG from left middle to right bottom */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="50%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#e5e7eb", stopOpacity: 0.8 }} />
            <stop offset="30%" style={{ stopColor: "#d1d5db", stopOpacity: 0.6 }} />
            <stop offset="70%" style={{ stopColor: "#9ca3af", stopOpacity: 0.7 }} />
            <stop offset="100%" style={{ stopColor: "#6b7280", stopOpacity: 0.9 }} />
          </linearGradient>
        </defs>
        <path
          d="M0,500 C150,480 300,520 450,510 C600,500 750,540 900,530 C950,525 1000,520 1000,520 L1000,1000 L0,1000 Z"
          fill="url(#waveGradient)"
        />
      </svg>
      
      {/* Metallic shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </>
  );
};

export default SilverGradientBackground;
