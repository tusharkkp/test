
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const AIDetectionDemo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [detectionActive, setDetectionActive] = useState(false);

  const detectedAnimals = [
    { 
      id: 1, 
      species: 'Bengal Tiger', 
      confidence: 98.7, 
      x: 25, 
      y: 35, 
      width: 30, 
      height: 20,
      status: 'healthy'
    },
    { 
      id: 2, 
      species: 'Indian Elephant', 
      confidence: 95.2, 
      x: 60, 
      y: 45, 
      width: 25, 
      height: 25,
      status: 'monitored'
    },
    { 
      id: 3, 
      species: 'Spotted Deer', 
      confidence: 92.1, 
      x: 15, 
      y: 65, 
      width: 15, 
      height: 12,
      status: 'healthy'
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setDetectionActive(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      setDetectionActive(false);
    }
  }, [isPlaying]);

  const handlePlayDemo = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section ref={ref} className="py-20 relative" id="ai-demo">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neural-purple to-electric-cyan mb-8">
            AI Detection in Action
          </h2>
          <p className="text-xl text-misty-white max-w-4xl mx-auto">
            Experience real-time wildlife detection and monitoring powered by advanced computer vision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Demo Video Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative glassmorphism p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-orbitron font-bold text-electric-cyan">
                  Live Wildlife Detection
                </h3>
                <div className="flex items-center space-x-2">
                  {detectionActive && (
                    <div className="flex items-center space-x-2 text-sm text-bio-green">
                      <div className="w-2 h-2 bg-bio-green rounded-full animate-pulse" />
                      <span>AI ACTIVE</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Simulated Camera Feed */}
              <div className="relative bg-gradient-to-br from-forest-navy to-green-900 rounded-lg overflow-hidden aspect-video">
                {/* Background Forest Scene */}
                <div className="absolute inset-0 bg-gradient-to-b from-green-800/30 to-green-900/50" />
                
                {/* Simulated Wildlife */}
                <div className="absolute inset-0">
                  {/* Forest elements */}
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-green-900 to-transparent" />
                  
                  {/* Animal silhouettes */}
                  <div className="absolute bottom-1/4 left-1/4 w-16 h-12 bg-orange-600 rounded-lg opacity-80" />
                  <div className="absolute bottom-1/3 right-1/4 w-12 h-16 bg-gray-600 rounded-lg opacity-80" />
                  <div className="absolute bottom-1/5 left-1/6 w-8 h-6 bg-brown-600 rounded-lg opacity-80" />
                </div>

                {/* Detection Overlays */}
                {detectionActive && detectedAnimals.map((animal, index) => (
                  <motion.div
                    key={animal.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.3 }}
                    className="absolute border-2 border-electric-cyan"
                    style={{
                      left: `${animal.x}%`,
                      top: `${animal.y}%`,
                      width: `${animal.width}%`,
                      height: `${animal.height}%`,
                      boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
                    }}
                  >
                    {/* Detection Label */}
                    <div className="absolute -top-8 left-0 bg-electric-cyan/90 text-forest-navy px-2 py-1 rounded text-xs font-bold">
                      {animal.species} ({animal.confidence}%)
                    </div>
                    
                    {/* Status indicator */}
                    <div className={`absolute -bottom-6 right-0 w-3 h-3 rounded-full ${
                      animal.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                  </motion.div>
                ))}

                {/* Scanning effect */}
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 border-l-2 border-electric-cyan opacity-60"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                )}

                {/* Play/Pause Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    className={`w-20 h-20 rounded-full ${
                      isPlaying ? 'bg-red-500/20' : 'bg-electric-cyan/20'
                    } border-2 border-current text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300`}
                    onClick={handlePlayDemo}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isPlaying ? (
                      <div className="w-4 h-4 bg-current" />
                    ) : (
                      <div className="w-0 h-0 border-l-[12px] border-l-current border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Detection Stats */}
              {detectionActive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="mt-4 grid grid-cols-3 gap-4"
                >
                  <div className="text-center p-3 bg-forest-navy/50 rounded-lg">
                    <div className="text-2xl font-orbitron font-bold text-electric-cyan">3</div>
                    <div className="text-sm text-misty-white/80">Detected</div>
                  </div>
                  <div className="text-center p-3 bg-forest-navy/50 rounded-lg">
                    <div className="text-2xl font-orbitron font-bold text-bio-green">95.3%</div>
                    <div className="text-sm text-misty-white/80">Accuracy</div>
                  </div>
                  <div className="text-center p-3 bg-forest-navy/50 rounded-lg">
                    <div className="text-2xl font-orbitron font-bold text-neural-purple">2.1s</div>
                    <div className="text-sm text-misty-white/80">Processing</div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* AI Capabilities Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glassmorphism p-6 rounded-xl h-full"
            >
              <h3 className="text-xl font-orbitron font-bold text-bio-green mb-6">
                AI Capabilities
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-forest-navy/50 rounded-lg">
                  <h4 className="font-semibold text-electric-cyan mb-2">Species Recognition</h4>
                  <p className="text-sm text-misty-white/80">
                    Identifies 2,500+ species with 95%+ accuracy
                  </p>
                  <div className="mt-2 bg-forest-navy rounded-full h-2">
                    <div className="bg-electric-cyan h-2 rounded-full w-[95%]" />
                  </div>
                </div>

                <div className="p-4 bg-forest-navy/50 rounded-lg">
                  <h4 className="font-semibold text-bio-green mb-2">Behavior Analysis</h4>
                  <p className="text-sm text-misty-white/80">
                    Detects stress, mating, feeding patterns
                  </p>
                  <div className="mt-2 bg-forest-navy rounded-full h-2">
                    <div className="bg-bio-green h-2 rounded-full w-[88%]" />
                  </div>
                </div>

                <div className="p-4 bg-forest-navy/50 rounded-lg">
                  <h4 className="font-semibold text-neural-purple mb-2">Threat Detection</h4>
                  <p className="text-sm text-misty-white/80">
                    Identifies poaching activities and intrusions
                  </p>
                  <div className="mt-2 bg-forest-navy rounded-full h-2">
                    <div className="bg-neural-purple h-2 rounded-full w-[92%]" />
                  </div>
                </div>

                <div className="p-4 bg-forest-navy/50 rounded-lg">
                  <h4 className="font-semibold text-orange-500 mb-2">Night Vision</h4>
                  <p className="text-sm text-misty-white/80">
                    24/7 monitoring with infrared capabilities
                  </p>
                  <div className="mt-2 bg-forest-navy rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full w-[97%]" />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-electric-cyan/10 to-bio-green/10 rounded-lg border border-electric-cyan/20">
                <h4 className="font-semibold text-electric-cyan mb-2 flex items-center">
                  <span className="mr-2">🚀</span>
                  Real-time Processing
                </h4>
                <p className="text-sm text-misty-white/80">
                  Edge computing enables instant threat detection and response coordination
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDetectionDemo;
