
import { motion } from 'framer-motion';

const BirdFlight = () => {
  const birds = [
    { id: 1, delay: 0, yOffset: 0 },
    { id: 2, delay: 0.5, yOffset: 20 },
    { id: 3, delay: 1, yOffset: -10 },
    { id: 4, delay: 1.5, yOffset: 30 },
    { id: 5, delay: 2, yOffset: 15 },
  ];

  const BirdSVG = () => (
    <svg width="20" height="12" viewBox="0 0 24 12" className="text-misty-white opacity-40">
      <path
        d="M2 6C2 6 4 4 6 6C6 6 8 4 10 6C10 6 12 8 14 6C14 6 16 4 18 6C18 6 20 8 22 6"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );

  return (
    <div className="fixed top-20 left-0 w-full h-40 pointer-events-none z-5 overflow-hidden">
      <div className="relative w-full h-full">
        {birds.map((bird) => (
          <motion.div
            key={bird.id}
            className="absolute"
            style={{
              top: `${40 + bird.yOffset}%`,
            }}
            initial={{ x: -50, y: 0 }}
            animate={{
              x: window.innerWidth + 50,
              y: [0, -20, 10, -15, 0],
            }}
            transition={{
              duration: 15,
              delay: bird.delay,
              repeat: Infinity,
              ease: "linear",
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <motion.div
              animate={{
                scaleX: [1, 0.8, 1.2, 0.9, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <BirdSVG />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BirdFlight;
