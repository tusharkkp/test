
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WildlifeSilhouettes = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const silhouettes = [
    {
      id: 'tiger1',
      path: 'M10,50 Q20,40 30,45 Q40,35 50,40 Q60,30 70,35 Q80,40 90,50 Q85,60 75,55 Q65,65 55,60 Q45,70 35,65 Q25,60 15,55 Q5,60 10,50',
      startX: -200,
      endX: windowSize.width + 200,
      y: Math.random() * (windowSize.height * 0.3) + windowSize.height * 0.6,
      duration: 25 + Math.random() * 10,
      delay: Math.random() * 5
    },
    {
      id: 'elephant1',
      path: 'M5,40 Q15,30 25,35 Q35,25 45,30 Q55,20 65,25 Q75,30 85,40 Q80,50 70,45 Q60,55 50,50 Q40,60 30,55 Q20,50 10,45 Q0,50 5,40',
      startX: windowSize.width + 150,
      endX: -250,
      y: Math.random() * (windowSize.height * 0.4) + windowSize.height * 0.5,
      duration: 30 + Math.random() * 15,
      delay: Math.random() * 8
    }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
      {silhouettes.map((silhouette) => (
        <motion.div
          key={silhouette.id}
          className="absolute wildlife-silhouette"
          initial={{ x: silhouette.startX, y: silhouette.y }}
          animate={{ 
            x: silhouette.endX,
            y: silhouette.y + Math.sin(Date.now() * 0.001) * 20 
          }}
          transition={{
            duration: silhouette.duration,
            delay: silhouette.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg width="100" height="60" viewBox="0 0 100 80" className="opacity-20">
            <path
              d={silhouette.path}
              fill="url(#wildlifeGradient)"
              className="drop-shadow-lg"
            />
            <defs>
              <linearGradient id="wildlifeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#00D4FF', stopOpacity: 0.6 }} />
                <stop offset="50%" style={{ stopColor: '#39FF6A', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#8B5FFF', stopOpacity: 0.3 }} />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default WildlifeSilhouettes;
