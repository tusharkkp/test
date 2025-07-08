
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DayNightCycle = () => {
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDay(prev => !prev);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-30 pointer-events-none">
      <motion.div
        className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-electric-cyan/30"
        animate={{
          backgroundColor: isDay ? '#FFD700' : '#1a1a2e',
          boxShadow: isDay 
            ? '0 0 20px rgba(255, 215, 0, 0.5)' 
            : '0 0 20px rgba(139, 95, 255, 0.3)',
        }}
        transition={{ duration: 2 }}
      >
        {/* Sun */}
        <motion.div
          className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          animate={{
            opacity: isDay ? 1 : 0,
            scale: isDay ? 1 : 0.8,
          }}
          transition={{ duration: 1.5 }}
        />

        {/* Moon */}
        <motion.div
          className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-400"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          animate={{
            opacity: isDay ? 0 : 1,
            scale: isDay ? 0.8 : 1,
          }}
          transition={{ duration: 1.5 }}
        />

        {/* Stars */}
        {!isDay && (
          <div className="absolute inset-0">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${15 + i * 20}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* 24/7 indicator */}
      <motion.div
        className="mt-2 text-center text-xs font-orbitron font-bold"
        animate={{
          color: isDay ? '#FFD700' : '#8B5FFF',
        }}
        transition={{ duration: 2 }}
      >
        24/7 MONITORING
      </motion.div>
    </div>
  );
};

export default DayNightCycle;
