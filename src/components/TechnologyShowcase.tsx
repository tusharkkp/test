
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import AISpeciesDemo from './AISpeciesDemo';
import AcousticAnalyzer from './AcousticAnalyzer';
import InteractiveMap from './InteractiveMap';

const TechnologyShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeDemo, setActiveDemo] = useState('species');

  const demos = [
    {
      id: 'species',
      title: 'AI Species Recognition',
      description: 'Real-time wildlife identification with 95%+ accuracy',
      component: <AISpeciesDemo />,
      icon: '🐅'
    },
    {
      id: 'acoustic',
      title: 'Acoustic Monitoring',
      description: 'Sound pattern analysis for threat detection',
      component: <AcousticAnalyzer />,
      icon: '🎵'
    },
    {
      id: 'mapping',
      title: '3D Conservation Map',
      description: 'Interactive sanctuary and threat visualization',
      component: <InteractiveMap />,
      icon: '🗺️'
    }
  ];

  return (
    <section id="technology" ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-forest-navy to-forest-navy/95"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-tiger-orange mb-8">
            Live Technology Showcase
          </h2>
          
          <p className="text-xl md:text-2xl text-misty-white max-w-4xl mx-auto leading-relaxed">
            Experience our AI-powered wildlife conservation technology in real-time
          </p>
        </motion.div>

        {/* Demo Selection Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {demos.map((demo) => (
            <motion.button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeDemo === demo.id
                  ? 'holographic text-electric-cyan'
                  : 'glassmorphism text-misty-white hover:text-electric-cyan'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">{demo.icon}</span>
              <div className="text-left">
                <div className="font-orbitron font-bold">{demo.title}</div>
                <div className="text-sm opacity-80">{demo.description}</div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Active Demo Display */}
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {demos.find(demo => demo.id === activeDemo)?.component}
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center glassmorphism p-6 rounded-xl">
            <div className="text-4xl font-orbitron font-bold text-bio-green mb-2">95%+</div>
            <div className="text-lg font-semibold text-electric-cyan mb-2">Accuracy Rate</div>
            <div className="text-sm text-misty-white/80">Species identification precision</div>
          </div>
          
          <div className="text-center glassmorphism p-6 rounded-xl">
            <div className="text-4xl font-orbitron font-bold text-neural-purple mb-2">&lt;2s</div>
            <div className="text-lg font-semibold text-electric-cyan mb-2">Response Time</div>
            <div className="text-sm text-misty-white/80">Real-time threat detection</div>
          </div>
          
          <div className="text-center glassmorphism p-6 rounded-xl">
            <div className="text-4xl font-orbitron font-bold text-tiger-orange mb-2">24/7</div>
            <div className="text-lg font-semibold text-electric-cyan mb-2">Monitoring</div>
            <div className="text-sm text-misty-white/80">Continuous surveillance</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;
