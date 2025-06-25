
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const ConservationMetrics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [threatLevel, setThreatLevel] = useState(65);
  const [tigerCount, setTigerCount] = useState(0);
  const [elephantCount, setElephantCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      // Animate counters
      const tigerTimer = setInterval(() => {
        setTigerCount(prev => {
          if (prev < 2967) return prev + 23;
          return 2967;
        });
      }, 50);

      const elephantTimer = setInterval(() => {
        setElephantCount(prev => {
          if (prev < 27000) return prev + 200;
          return 27000;
        });
      }, 30);

      return () => {
        clearInterval(tigerTimer);
        clearInterval(elephantTimer);
      };
    }
  }, [isInView]);

  const getThreatColor = (level: number) => {
    if (level < 30) return 'text-bio-green';
    if (level < 60) return 'text-tiger-orange';
    return 'text-red-500';
  };

  const getThreatStatus = (level: number) => {
    if (level < 30) return 'LOW RISK';
    if (level < 60) return 'MODERATE';
    return 'HIGH ALERT';
  };

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-forest-navy/50 to-forest-navy"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-bio-green mb-8">
            Live Conservation Data
          </h2>
          <p className="text-xl md:text-2xl text-misty-white max-w-4xl mx-auto leading-relaxed">
            Real-time monitoring of India's wildlife populations and threat levels
          </p>
        </motion.div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Poaching Threat Meter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="holographic p-8 rounded-2xl text-center"
          >
            <h3 className="text-2xl font-orbitron font-bold text-electric-cyan mb-6">
              Poaching Threat Level
            </h3>
            
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={threatLevel < 30 ? '#39FF6A' : threatLevel < 60 ? '#FF6B35' : '#FF4444'}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 251.2" }}
                  animate={isInView ? { 
                    strokeDasharray: `${(threatLevel / 100) * 251.2} 251.2` 
                  } : {}}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className={`text-3xl font-orbitron font-bold ${getThreatColor(threatLevel)}`}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 1 }}
                >
                  {threatLevel}%
                </motion.div>
              </div>
            </div>
            
            <div className={`text-lg font-semibold ${getThreatColor(threatLevel)}`}>
              {getThreatStatus(threatLevel)}
            </div>
            <div className="text-sm text-misty-white/60 mt-2">
              Based on 847 camera traps
            </div>
          </motion.div>

          {/* Wildlife Population Counters */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="holographic p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-orbitron font-bold text-bio-green mb-6 text-center">
              Wildlife Population
            </h3>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-2">🐅</div>
                <motion.div
                  className="text-4xl font-orbitron font-bold text-tiger-orange"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {tigerCount.toLocaleString()}
                </motion.div>
                <div className="text-lg text-misty-white font-semibold">Bengal Tigers</div>
                <div className="text-sm text-misty-white/60">↑ 8% from 2019</div>
              </div>
              
              <div className="h-px bg-gradient-to-r from-transparent via-electric-cyan to-transparent"></div>
              
              <div className="text-center">
                <div className="text-6xl mb-2">🐘</div>
                <motion.div
                  className="text-4xl font-orbitron font-bold text-neural-purple"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  {elephantCount.toLocaleString()}+
                </motion.div>
                <div className="text-lg text-misty-white font-semibold">Asian Elephants</div>
                <div className="text-sm text-misty-white/60">↑ 12% from 2017</div>
              </div>
            </div>
          </motion.div>

          {/* Forest Coverage Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="holographic p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-orbitron font-bold text-neural-purple mb-6 text-center">
              Forest Coverage
            </h3>
            
            <div className="relative w-full h-32 bg-forest-navy rounded-lg mb-4 overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 bg-gradient-to-t from-bio-green to-bio-green/60"
                initial={{ width: "0%" }}
                animate={isInView ? { width: "68%" } : {}}
                transition={{ duration: 2, delay: 1 }}
                style={{ height: '68%' }}
              />
              <motion.div
                className="absolute bottom-0 right-0 bg-gradient-to-t from-tiger-orange to-tiger-orange/60"
                initial={{ width: "0%" }}
                animate={isInView ? { width: "32%" } : {}}
                transition={{ duration: 2, delay: 1.2 }}
                style={{ height: '45%' }}
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-orbitron font-bold text-misty-white">68%</div>
                  <div className="text-sm text-misty-white/80">Protected</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-bio-green rounded-full"></div>
                <span className="text-misty-white">Protected Areas</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-tiger-orange rounded-full"></div>
                <span className="text-misty-white">At Risk</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Camera Trap Network */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="holographic p-8 rounded-2xl"
        >
          <h3 className="text-3xl font-orbitron font-bold text-electric-cyan mb-6 text-center">
            Camera Trap Network Status
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-orbitron font-bold text-bio-green mb-2">847</div>
              <div className="text-sm text-misty-white">Active Cameras</div>
              <motion.div
                className="w-3 h-3 bg-bio-green rounded-full mx-auto mt-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-orbitron font-bold text-tiger-orange mb-2">23</div>
              <div className="text-sm text-misty-white">Maintenance</div>
              <motion.div
                className="w-3 h-3 bg-tiger-orange rounded-full mx-auto mt-2"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-orbitron font-bold text-electric-cyan mb-2">156k</div>
              <div className="text-sm text-misty-white">Photos Today</div>
              <motion.div
                className="w-3 h-3 bg-electric-cyan rounded-full mx-auto mt-2"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-orbitron font-bold text-neural-purple mb-2">98.7%</div>
              <div className="text-sm text-misty-white">Uptime</div>
              <div className="w-3 h-3 bg-neural-purple rounded-full mx-auto mt-2" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConservationMetrics;
