
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PawPrint {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

const PawPrintTrail = () => {
  const [pawPrints, setPawPrints] = useState<PawPrint[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let lastPawTime = 0;
    const pawInterval = 150; // milliseconds between paw prints

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const now = Date.now();
      if (now - lastPawTime > pawInterval) {
        const newPaw: PawPrint = {
          id: now,
          x: e.clientX,
          y: e.clientY,
          timestamp: now
        };
        
        setPawPrints(prev => [...prev.slice(-15), newPaw]); // Keep last 15 prints
        lastPawTime = now;
      }
    };

    // Clean up old paw prints
    const cleanup = setInterval(() => {
      const now = Date.now();
      setPawPrints(prev => prev.filter(paw => now - paw.timestamp < 3000));
    }, 1000);

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanup);
    };
  }, []);

  const PawIcon = ({ rotation }: { rotation: number }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      style={{ transform: `rotate(${rotation}deg)` }}
      className="text-electric-cyan opacity-60"
    >
      <path
        fill="currentColor"
        d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2M8.5 4.5C7.4 4.5 6.5 5.4 6.5 6.5C6.5 7.6 7.4 8.5 8.5 8.5C9.6 8.5 10.5 7.6 10.5 6.5C10.5 5.4 9.6 4.5 8.5 4.5M15.5 4.5C14.4 4.5 13.5 5.4 13.5 6.5C13.5 7.6 14.4 8.5 15.5 8.5C16.6 8.5 17.5 7.6 17.5 6.5C17.5 5.4 16.6 4.5 15.5 4.5M12 8C9.8 8 8 9.8 8 12C8 14.2 9.8 16 12 16C14.2 16 16 14.2 16 12C16 9.8 14.2 8 12 8Z"
      />
    </svg>
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      <AnimatePresence>
        {pawPrints.map((paw, index) => (
          <motion.div
            key={paw.id}
            className="absolute"
            style={{
              left: paw.x - 10,
              top: paw.y - 10,
            }}
            initial={{ opacity: 0.8, scale: 0.5 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <PawIcon rotation={Math.random() * 360} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PawPrintTrail;
