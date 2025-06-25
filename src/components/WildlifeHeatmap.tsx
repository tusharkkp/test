
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import InteractiveMap from './InteractiveMap';

const WildlifeHeatmap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedRegion, setSelectedRegion] = useState('all');

  const regions = [
    { id: 'all', name: 'All Regions', color: '#00D4FF' },
    { id: 'tigers', name: 'Tiger Reserves', color: '#FF6B35' },
    { id: 'elephants', name: 'Elephant Corridors', color: '#8B5FFF' },
    { id: 'hotspots', name: 'Poaching Hotspots', color: '#FF0000' },
    { id: 'monitored', name: 'AI Monitored Zones', color: '#39FF6A' }
  ];

  const stats = [
    { label: 'Protected Areas', value: '870+', icon: '🛡️' },
    { label: 'AI Cameras', value: '15,000+', icon: '📹' },
    { label: 'Species Tracked', value: '2,500+', icon: '🐾' },
    { label: 'Alerts Generated', value: '98,000+', icon: '🚨' }
  ];

  return (
    <section ref={ref} className="py-20 relative" id="heatmap">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-bio-green to-electric-cyan mb-8">
            Wildlife Monitoring Heatmap
          </h2>
          <p className="text-xl text-misty-white max-w-4xl mx-auto">
            Real-time visualization of wildlife populations, AI monitoring zones, and conservation efforts across India
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Map Controls */}
          <div className="lg:col-span-1">
            <div className="glassmorphism p-6 rounded-xl">
              <h3 className="text-xl font-orbitron font-bold text-electric-cyan mb-6">
                Map Layers
              </h3>
              
              <div className="space-y-3">
                {regions.map((region) => (
                  <motion.button
                    key={region.id}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-300 ${
                      selectedRegion === region.id 
                        ? 'bg-electric-cyan/20 border border-electric-cyan' 
                        : 'hover:bg-misty-white/10 border border-transparent'
                    }`}
                    onClick={() => setSelectedRegion(region.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: region.color }}
                      />
                      <span className="text-misty-white font-medium">
                        {region.name}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <h4 className="text-lg font-orbitron font-bold text-bio-green">
                  Live Statistics
                </h4>
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-forest-navy/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{stat.icon}</span>
                      <span className="text-misty-white/80 text-sm">{stat.label}</span>
                    </div>
                    <span className="text-electric-cyan font-orbitron font-bold">
                      {stat.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glassmorphism p-6 rounded-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-orbitron font-bold text-electric-cyan">
                  India Wildlife Distribution
                </h3>
                <div className="flex items-center space-x-2 text-sm text-misty-white/60">
                  <div className="w-2 h-2 bg-bio-green rounded-full animate-pulse" />
                  <span>Live Data</span>
                </div>
              </div>
              
              <div className="h-96 rounded-lg overflow-hidden">
                <InteractiveMap />
              </div>

              {/* Map Legend */}
              <div className="mt-4 flex flex-wrap gap-4 justify-center">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-misty-white">High Density</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-misty-white">Medium Density</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-misty-white">Alert Zone</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-misty-white">AI Coverage</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="glassmorphism p-6 rounded-xl text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="text-xl font-orbitron font-bold text-electric-cyan mb-2">
              Precision Targeting
            </h4>
            <p className="text-misty-white/80">
              AI identifies poaching patterns with 94% accuracy using real-time satellite data
            </p>
          </div>

          <div className="glassmorphism p-6 rounded-xl text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="text-xl font-orbitron font-bold text-bio-green mb-2">
              Rapid Response
            </h4>
            <p className="text-misty-white/80">
              Average response time reduced from 2 hours to 8 minutes with AI alerts
            </p>
          </div>

          <div className="glassmorphism p-6 rounded-xl text-center">
            <div className="text-4xl mb-3">🔄</div>
            <h4 className="text-xl font-orbitron font-bold text-neural-purple mb-2">
              Adaptive Learning
            </h4>
            <p className="text-misty-white/80">
              System continuously learns from wildlife behavior patterns and threats
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WildlifeHeatmap;
