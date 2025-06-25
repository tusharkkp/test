
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DynamicSky = () => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [cloudPositions, setCloudPositions] = useState<Array<{x: number, y: number, speed: number}>>([]);

  useEffect(() => {
    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);

    // Initialize cloud positions
    const clouds = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * 120 - 20, // Start some clouds off-screen
      y: Math.random() * 30 + 10,
      speed: 0.02 + Math.random() * 0.03,
    }));
    setCloudPositions(clouds);

    return () => clearInterval(timeInterval);
  }, []);

  // Animate clouds
  useEffect(() => {
    const cloudInterval = setInterval(() => {
      setCloudPositions(prev => 
        prev.map(cloud => ({
          ...cloud,
          x: cloud.x > 120 ? -20 : cloud.x + cloud.speed,
        }))
      );
    }, 100);

    return () => clearInterval(cloudInterval);
  }, []);

  // Determine sky colors based on time
  const getSkyGradient = () => {
    if (currentHour >= 6 && currentHour < 8) {
      // Dawn
      return 'linear-gradient(to bottom, #FF6B35 0%, #FF8C69 30%, #87CEEB 70%, #0B1426 100%)';
    } else if (currentHour >= 8 && currentHour < 18) {
      // Day
      return 'linear-gradient(to bottom, #87CEEB 0%, #98D8E8 40%, #F0F8FF 70%, #0B1426 100%)';
    } else if (currentHour >= 18 && currentHour < 20) {
      // Dusk
      return 'linear-gradient(to bottom, #8B5FFF 0%, #FF6B35 20%, #FF8C69 50%, #0B1426 100%)';
    } else {
      // Night
      return 'linear-gradient(to bottom, #0B1426 0%, #1a2332 50%, #0B1426 100%)';
    }
  };

  const isNight = currentHour < 6 || currentHour >= 20;
  const isDusk = currentHour >= 18 && currentHour < 20;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Dynamic Sky Background */}
      <motion.div
        className="absolute inset-0"
        style={{ background: getSkyGradient() }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Clouds */}
      <div className="absolute inset-0">
        {cloudPositions.map((cloud, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute opacity-20"
            style={{
              left: `${cloud.x}%`,
              top: `${cloud.y}%`,
            }}
          >
            <svg width="100" height="60" viewBox="0 0 100 60">
              <path
                d="M20,40 Q10,25 25,25 Q30,10 50,15 Q70,5 75,20 Q90,15 85,35 Q90,50 75,45 Q50,55 25,50 Q10,55 20,40"
                fill="rgba(255, 255, 255, 0.6)"
                className="drop-shadow-sm"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Stars (only at night) */}
      {isNight && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Twinkling Effect Overlay */}
      {(isNight || isDusk) && (
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`twinkle-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                background: 'radial-gradient(circle, rgba(0,212,255,0.8) 0%, transparent 70%)',
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DynamicSky;
