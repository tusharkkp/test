
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Wildlife {
  id: string;
  type: 'butterfly' | 'firefly' | 'bird';
  x: number;
  y: number;
  timestamp: number;
}

const FloatingWildlife = () => {
  const [wildlife, setWildlife] = useState<Wildlife[]>([]);
  const [currentHour] = useState(new Date().getHours());

  const isEvening = currentHour >= 18 || currentHour < 6;

  useEffect(() => {
    const spawnWildlife = () => {
      const types: Wildlife['type'][] = isEvening 
        ? ['firefly', 'bird'] 
        : ['butterfly', 'bird'];
      
      const newWildlife: Wildlife = {
        id: `wildlife-${Date.now()}-${Math.random()}`,
        type: types[Math.floor(Math.random() * types.length)],
        x: Math.random() * 100,
        y: 20 + Math.random() * 60,
        timestamp: Date.now(),
      };

      setWildlife(prev => [...prev.slice(-8), newWildlife]);
    };

    // Spawn wildlife periodically
    const spawnInterval = setInterval(spawnWildlife, 3000 + Math.random() * 2000);

    // Clean up old wildlife
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setWildlife(prev => prev.filter(w => now - w.timestamp < 15000));
    }, 5000);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(cleanupInterval);
    };
  }, [isEvening]);

  const ButterflyComponent = ({ wildlife: w }: { wildlife: Wildlife }) => (
    <motion.div
      className="absolute"
      initial={{ x: `${w.x}vw`, y: `${w.y}vh`, opacity: 0 }}
      animate={{
        x: [`${w.x}vw`, `${w.x + 20}vw`, `${w.x + 10}vw`, `${w.x + 30}vw`],
        y: [`${w.y}vh`, `${w.y - 10}vh`, `${w.y + 5}vh`, `${w.y - 15}vh`],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 8,
        times: [0, 0.3, 0.7, 1],
        ease: "easeInOut",
      }}
    >
      <motion.svg
        width="20"
        height="16"
        viewBox="0 0 20 16"
        className="text-bio-green opacity-60"
        animate={{
          rotateY: [0, 30, -30, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M10,8 Q6,4 4,8 Q6,12 10,8 Q14,4 16,8 Q14,12 10,8 M10,6 L10,14"
          fill="currentColor"
          stroke="rgba(57, 255, 106, 0.8)"
          strokeWidth="0.5"
        />
      </motion.svg>
    </motion.div>
  );

  const FireflyComponent = ({ wildlife: w }: { wildlife: Wildlife }) => (
    <motion.div
      className="absolute"
      initial={{ x: `${w.x}vw`, y: `${w.y}vh`, opacity: 0 }}
      animate={{
        x: [`${w.x}vw`, `${w.x + 15}vw`, `${w.x + 5}vw`, `${w.x + 25}vw`],
        y: [`${w.y}vh`, `${w.y - 8}vh`, `${w.y + 3}vh`, `${w.y - 12}vh`],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 10,
        times: [0, 0.2, 0.8, 1],
        ease: "linear",
      }}
    >
      <motion.div
        className="w-2 h-2 rounded-full bg-yellow-300"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.5, 1.5, 0.5],
          boxShadow: [
            '0 0 5px rgba(255, 255, 0, 0.5)',
            '0 0 15px rgba(255, 255, 0, 0.8)',
            '0 0 5px rgba(255, 255, 0, 0.5)',
          ],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );

  const BirdComponent = ({ wildlife: w }: { wildlife: Wildlife }) => (
    <motion.div
      className="absolute"
      initial={{ x: `${w.x}vw`, y: `${w.y}vh`, opacity: 0 }}
      animate={{
        x: [`${w.x}vw`, `${w.x + 50}vw`],
        y: [`${w.y}vh`, `${w.y + Math.sin(Date.now() * 0.01) * 5}vh`],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 6,
        times: [0, 0.1, 0.9, 1],
        ease: "linear",
      }}
    >
      <motion.svg
        width="16"
        height="12"
        viewBox="0 0 24 12"
        className="text-misty-white opacity-50"
        animate={{
          scaleX: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M2 6C2 6 4 4 6 6C6 6 8 4 10 6C10 6 12 8 14 6C14 6 16 4 18 6C18 6 20 8 22 6"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      </motion.svg>
    </motion.div>
  );

  const renderWildlife = (w: Wildlife) => {
    switch (w.type) {
      case 'butterfly':
        return <ButterflyComponent key={w.id} wildlife={w} />;
      case 'firefly':
        return <FireflyComponent key={w.id} wildlife={w} />;
      case 'bird':
        return <BirdComponent key={w.id} wildlife={w} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence mode="popLayout">
        {wildlife.map(renderWildlife)}
      </AnimatePresence>
    </div>
  );
};

export default FloatingWildlife;
