
import { motion } from 'framer-motion';

const ForestCanopy = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-32 pointer-events-none z-5 overflow-hidden">
      {/* Canopy silhouette */}
      <svg
        className="absolute top-0 w-full h-full"
        viewBox="0 0 1200 200"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="canopyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#0B1426', stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: '#0B1426', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        
        {/* Tree canopy path */}
        <path
          d="M0,0 Q50,60 100,40 Q150,80 200,50 Q250,90 300,60 Q350,100 400,70 Q450,110 500,80 Q550,120 600,90 Q650,130 700,100 Q750,140 800,110 Q850,150 900,120 Q950,160 1000,130 Q1050,170 1100,140 Q1150,180 1200,150 L1200,0 Z"
          fill="url(#canopyGradient)"
          className="opacity-40"
        />
      </svg>

      {/* Dappled light effects */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-bio-green/10 to-electric-cyan/5"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + Math.sin(i) * 30}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Falling leaves */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`leaf-${i}`}
            className="absolute w-3 h-3"
            style={{
              left: `${Math.random() * 100}%`,
              top: -20,
            }}
            animate={{
              y: window.innerHeight + 50,
              x: [0, 30, -20, 10, 0],
              rotate: [0, 180, 360, 540, 720],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            <svg viewBox="0 0 20 20" className="text-bio-green opacity-30">
              <path
                fill="currentColor"
                d="M10 2C8 2 6 4 6 6C6 8 8 10 10 10C12 10 14 8 14 6C14 4 12 2 10 2M10 10C8 10 6 12 6 14C6 16 8 18 10 18C12 18 14 16 14 14C14 12 12 10 10 10Z"
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ForestCanopy;
