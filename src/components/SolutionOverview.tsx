
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const SolutionOverview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const solutions = [
    {
      title: "Data-Driven Intelligence",
      icon: "🧠",
      description: "AI for camera trap sorting, species recognition, acoustic signature identification",
      features: [
        "Automated species classification with 95%+ accuracy",
        "Behavioral pattern analysis and tracking",
        "Acoustic signature database with ML recognition",
        "Real-time data processing and analysis"
      ],
      color: "from-electric-cyan to-bio-green"
    },
    {
      title: "Real-Time & Predictive Systems",
      icon: "⚡",
      description: "Anticipatory intelligence for anti-poaching alerts and habitat degradation",
      features: [
        "Predictive poaching risk assessment",
        "Real-time intrusion detection alerts",
        "Habitat degradation early warning system",
        "Weather and seasonal pattern integration"
      ],
      color: "from-neural-purple to-tiger-orange"
    },
    {
      title: "Community-Integrated Platform",
      icon: "🤝",
      description: "Simplified interfaces for Van Rakshaks and village leaders",
      features: [
        "Mobile-first design for forest staff",
        "Multi-language support for local communities",
        "Gamified conservation participation",
        "Real-time communication networks"
      ],
      color: "from-bio-green to-electric-cyan"
    },
    {
      title: "Deployable & Durable Technology",
      icon: "🛡️",
      description: "Power-efficient, offline functionality, rugged terrain compatibility",
      features: [
        "Solar-powered edge computing devices",
        "Offline-first architecture with sync capabilities",
        "Weather-resistant hardware design",
        "Low-bandwidth satellite connectivity"
      ],
      color: "from-tiger-orange to-neural-purple"
    }
  ];

  return (
    <section id="solution" ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-forest-navy via-forest-navy/90 to-forest-navy"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-bio-green to-neural-purple mb-8">
            VanRakshak AI Solution
          </h2>
          
          <p className="text-xl md:text-2xl text-misty-white max-w-4xl mx-auto leading-relaxed">
            Revolutionary AI-powered wildlife conservation platform integrating cutting-edge technology 
            with community-driven conservation efforts
          </p>
        </motion.div>

        {/* Solution Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative holographic p-8 rounded-2xl cursor-pointer transition-all duration-500 ${
                hoveredCard === index ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{ y: -10 }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-10 rounded-2xl`}></div>
              
              <div className="relative z-10">
                {/* Icon and Title */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-6xl animate-float">{solution.icon}</div>
                  <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-electric-cyan">
                    {solution.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-lg text-misty-white mb-6 leading-relaxed">
                  {solution.description}
                </p>

                {/* Features List */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={
                    hoveredCard === index 
                      ? { opacity: 1, height: 'auto' }
                      : { opacity: 0.7, height: 'auto' }
                  }
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  {solution.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        hoveredCard === index 
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0.8, x: 0 }
                      }
                      transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-bio-green rounded-full animate-pulse"></div>
                      <span className="text-misty-white/90">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Hover effect overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 rounded-2xl`}
                animate={{ opacity: hoveredCard === index ? 0.05 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Central Architecture Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 text-center"
        >
          <div className="relative max-w-4xl mx-auto">
            <div className="holographic p-12 rounded-3xl">
              <h3 className="text-3xl font-orbitron font-bold text-neural-purple mb-8">
                Integrated Ecosystem Architecture
              </h3>
              
              {/* Connection diagram */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center space-y-2"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 3,
                      delay: index * 0.5,
                      repeat: Infinity
                    }}
                  >
                    <div className="text-4xl p-4 glassmorphism rounded-full">
                      {solution.icon}
                    </div>
                    <div className="text-sm text-misty-white text-center font-medium">
                      {solution.title.split(' ')[0]}
                    </div>
                  </motion.div>
                ))}
                
                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#39FF6A" stopOpacity="0.8"/>
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 50 50 Q 150 25 250 50 Q 350 75 450 50"
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.5 }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionOverview;
