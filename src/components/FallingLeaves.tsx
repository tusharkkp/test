
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Leaf {
  id: string;
  x: number;
  size: number;
  rotation: number;
  color: string;
  timestamp: number;
}

const FallingLeaves = () => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [windDirection, setWindDirection] = useState(0);

  const leafColors = ['#8B4513', '#CD853F', '#DAA520', '#B8860B', '#D2691E'];

  useEffect(() => {
    // Change wind direction periodically
    const windInterval = setInterval(() => {
      setWindDirection((Math.random() - 0.5) * 50);
    }, 8000);

    // Spawn leaves
    const spawnLeaf = () => {
      const newLeaf: Leaf = {
        id: `leaf-${Date.now()}-${Math.random()}`,
        x: Math.random() * 110 - 5, // Start slightly off-screen
        size: 0.5 + Math.random() * 1,
        rotation: Math.random() * 360,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        timestamp: Date.now(),
      };

      setLeaves(prev => [...prev.slice(-15), newLeaf]);
    };

    const spawnInterval = setInterval(spawnLeaf, 1500 + Math.random() * 1000);

    // Cleanup old leaves
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setLeaves(prev => prev.filter(leaf => now - leaf.timestamp < 20000));
    }, 5000);

    return () => {
      clearInterval(windInterval);
      clearInterval(spawnInterval);
      clearInterval(cleanupInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      <AnimatePresence mode="popLayout">
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            className="absolute opacity-60"
            initial={{
              x: `${leaf.x}vw`,
              y: '-5vh',
              rotate: leaf.rotation,
              scale: leaf.size,
            }}
            animate={{
              x: [`${leaf.x}vw`, `${leaf.x + windDirection}vw`],
              y: '110vh',
              rotate: [leaf.rotation, leaf.rotation + 720],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 8 + Math.random() * 4,
              ease: "linear",
              rotate: {
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              style={{ color: leaf.color }}
            >
              <path
                d="M8,2 Q12,6 10,12 Q8,18 8,18 Q8,18 6,12 Q4,6 8,2 M8,8 Q10,6 12,8"
                fill="currentColor"
                stroke="rgba(139, 69, 19, 0.3)"
                strokeWidth="0.5"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FallingLeaves;
