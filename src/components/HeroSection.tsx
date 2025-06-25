
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import EnhancedWildlife3D from './EnhancedWildlife3D';

const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const heroTexts = [
    "Protecting India's Wildlife with Artificial Intelligence",
    "7% of World's Fauna Under AI Guardian",
    "Bridging 30% Forest Staff Deficit with Technology",
    "Real-Time Poaching Prevention Systems"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollToDemo = () => {
    document.getElementById('ai-demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTechnology = () => {
    document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Enhanced 3D Background with Immersive Forest */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 2, 8], fov: 75 }}>
          <Environment preset="forest" />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00D4FF" />
          <pointLight position={[-10, 5, -5]} intensity={1.0} color="#39FF6A" />
          <pointLight position={[0, -5, 5]} intensity={0.8} color="#8B5FFF" />
          <directionalLight position={[5, 10, 5]} intensity={0.6} color="#FFD700" />
          
          <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
            <EnhancedWildlife3D />
          </Float>
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.2}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>

      {/* Immersive Forest Atmosphere Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-navy/40 via-transparent to-forest-navy/60 z-1"></div>
      
      {/* Subtle mist effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-misty-white/5 to-transparent z-2"></div>

      {/* Enhanced Content with Forest Narrative */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-bio-green to-neural-purple mb-6 hero-gradient-text"
            animate={{ 
              filter: [
                "drop-shadow(0 0 8px rgba(0, 212, 255, 0.2))",
                "drop-shadow(0 0 16px rgba(0, 212, 255, 0.4))",
                "drop-shadow(0 0 8px rgba(0, 212, 255, 0.2))"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            VanRakshak AI
          </motion.h1>
          
          <motion.div
            className="h-20 flex items-center justify-center"
            key={currentText}
            initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -100, filter: "blur(10px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p className="text-2xl md:text-4xl font-inter font-light text-misty-white subtle-text-glow">
              {heroTexts[currentText]}
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced Call-to-Action with Forest Theme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12"
        >
          <motion.button
            className="group relative cyber-border holographic px-10 py-5 rounded-xl text-xl font-semibold text-electric-cyan hover:text-forest-navy transition-all duration-700 overflow-hidden"
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              boxShadow: "0 20px 40px rgba(0, 212, 255, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToDemo}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-electric-cyan to-bio-green opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              initial={false}
            />
            <span className="relative z-10 group-hover:text-forest-navy transition-colors duration-300">
              🌲 Experience AI Guardian
            </span>
          </motion.button>
          
          <motion.button
            className="group relative glassmorphism px-10 py-5 rounded-xl text-xl font-semibold text-bio-green border-2 border-bio-green hover:bg-bio-green hover:text-forest-navy transition-all duration-700"
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              boxShadow: "0 20px 40px rgba(57, 255, 106, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToTechnology}
          >
            <span className="relative z-10">
              🔬 Explore Technology
            </span>
          </motion.button>
        </motion.div>

        {/* Enhanced Impact Metrics with Forest Context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <motion.div 
            className="text-center glassmorphism p-6 rounded-2xl"
            whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 212, 255, 0.2)" }}
          >
            <div className="text-4xl font-orbitron font-bold text-electric-cyan mb-2">7%</div>
            <div className="text-sm text-misty-white/80 font-medium">World's Fauna Protected</div>
            <div className="text-xs text-misty-white/60 mt-1">🐅 Tigers, 🐘 Elephants, 🦏 Rhinos</div>
          </motion.div>
          
          <motion.div 
            className="text-center glassmorphism p-6 rounded-2xl"
            whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(57, 255, 106, 0.2)" }}
          >
            <div className="text-4xl font-orbitron font-bold text-bio-green mb-2">30%</div>
            <div className="text-sm text-misty-white/80 font-medium">Forest Staff Shortage</div>
            <div className="text-xs text-misty-white/60 mt-1">🤖 AI Fills the Gap</div>
          </motion.div>
          
          <motion.div 
            className="text-center glassmorphism p-6 rounded-2xl"
            whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(139, 95, 255, 0.2)" }}
          >
            <div className="text-4xl font-orbitron font-bold text-neural-purple mb-2">24/7</div>
            <div className="text-sm text-misty-white/80 font-medium">AI Vigilance</div>
            <div className="text-xs text-misty-white/60 mt-1">🛡️ Never Sleeps</div>
          </motion.div>
        </motion.div>

        {/* Forest Soundscape Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="mt-12 flex justify-center items-center gap-4 text-misty-white/60"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-bio-green rounded-full"
          />
          <span className="text-sm font-medium">🎵 Live Forest Sounds Detected</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="w-2 h-2 bg-electric-cyan rounded-full"
          />
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator with Forest Theme */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-electric-cyan cursor-pointer"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => document.getElementById('problem-statement')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="w-8 h-12 border-2 border-electric-cyan rounded-full flex justify-center relative overflow-hidden">
          <motion.div 
            className="w-1.5 h-4 bg-gradient-to-b from-electric-cyan to-bio-green rounded-full mt-2"
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="text-xs mt-2 font-medium">Enter the Forest</div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
