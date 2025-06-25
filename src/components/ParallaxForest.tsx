
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ParallaxForest = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate parallax offsets
  const backgroundOffset = scrollY * 0.08;
  const midgroundOffset = scrollY * 0.2;
  const foregroundOffset = scrollY * 0.35;
  
  // Mouse parallax effect (very subtle)
  const mouseOffsetX = (mousePos.x - window.innerWidth / 2) * 0.005;
  const mouseOffsetY = (mousePos.y - window.innerHeight / 2) * 0.005;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Enhanced Background Mountains with Forest Atmosphere */}
      <motion.div
        className="absolute inset-0 opacity-25"
        style={{
          transform: `translateY(${backgroundOffset + mouseOffsetY}px) translateX(${mouseOffsetX}px)`,
        }}
      >
        <svg
          className="absolute bottom-0 w-full h-96"
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#1a2332', stopOpacity: 0.9 }} />
              <stop offset="50%" style={{ stopColor: '#2F4F2F', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#0B1426', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="forestCanopy" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#228B22', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: '#006400', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
          
          {/* Mountain ridges */}
          <path
            d="M0,400 L0,180 Q200,130 400,160 Q600,100 800,140 Q1000,80 1200,120 L1200,400 Z"
            fill="url(#mountainGradient)"
          />
          
          {/* Forest canopy silhouette */}
          <path
            d="M0,400 L0,250 Q100,220 200,240 Q300,200 400,230 Q500,190 600,220 Q700,180 800,210 Q900,170 1000,200 Q1100,160 1200,190 L1200,400 Z"
            fill="url(#forestCanopy)"
          />
        </svg>
      </motion.div>

      {/* Grounded Midground Trees */}
      <motion.div
        className="absolute inset-0 opacity-35"
        style={{
          transform: `translateY(${midgroundOffset + mouseOffsetY * 0.3}px) translateX(${mouseOffsetX * 0.3}px)`,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`midtree-${i}`}
            className="absolute bottom-0"
            style={{
              left: `${i * 18 + 8}%`,
              height: `${180 + Math.sin(i) * 40}px`,
            }}
            animate={{
              transform: `rotate(${Math.sin(Date.now() * 0.0008 + i) * 1.5}deg)`,
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Tree trunk - properly grounded */}
            <div
              className="absolute bottom-0 bg-gradient-to-t from-amber-900 via-amber-800 to-amber-700"
              style={{
                width: '10px',
                height: '50%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
            
            {/* Tree canopy layers */}
            <div
              className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-green-700 to-green-800 rounded-full"
              style={{
                width: `${50 + Math.sin(i) * 25}px`,
                height: `${70 + Math.sin(i) * 35}px`,
              }}
            />
            
            {/* Upper canopy */}
            <div
              className="absolute bottom-2/5 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-green-600 to-green-700 rounded-full"
              style={{
                width: `${35 + Math.sin(i + 1) * 20}px`,
                height: `${50 + Math.sin(i + 1) * 25}px`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Foreground Trees - Large and Grounded */}
      <motion.div
        className="absolute inset-0 opacity-45"
        style={{
          transform: `translateY(${foregroundOffset + mouseOffsetY * 0.2}px) translateX(${mouseOffsetX * 0.2}px)`,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`foretree-${i}`}
            className="absolute bottom-0"
            style={{
              left: `${i * 30 + 5}%`,
              height: `${250 + Math.sin(i + 2) * 60}px`,
            }}
            animate={{
              transform: `rotate(${Math.sin(Date.now() * 0.001 + i) * 2}deg)`,
            }}
            transition={{
              duration: 8 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Large tree trunk */}
            <div
              className="absolute bottom-0 bg-gradient-to-t from-amber-900 via-amber-700 to-amber-600"
              style={{
                width: '15px',
                height: '45%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
            
            {/* Main canopy */}
            <div
              className="absolute bottom-1/5 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-green-600 to-green-800 rounded-full"
              style={{
                width: `${80 + Math.sin(i + 2) * 40}px`,
                height: `${100 + Math.sin(i + 2) * 50}px`,
              }}
            />
            
            {/* Secondary canopy */}
            <div
              className="absolute bottom-2/5 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-green-500 to-green-700 rounded-full"
              style={{
                width: `${60 + Math.sin(i + 3) * 30}px`,
                height: `${80 + Math.sin(i + 3) * 40}px`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Forest floor mist effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-misty-white/10 to-transparent"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default ParallaxForest;
