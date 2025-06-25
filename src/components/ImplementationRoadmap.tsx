
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { generateRoadmapPDF } from '@/utils/pdfGenerator';

const ImplementationRoadmap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedPhase, setSelectedPhase] = useState(0);

  const phases = [
    {
      phase: 'Phase 1',
      title: 'Pilot Deployment',
      duration: '3 months',
      icon: '🚀',
      color: 'from-electric-cyan to-blue-500',
      timeline: 'Q1 2024',
      objectives: [
        'Deploy 25 AI cameras in Sundarbans National Park',
        'Establish basic species recognition system',
        'Train local Van Rakshaks on technology usage',
        'Implement core alert system'
      ],
      deliverables: [
        'Functional camera network',
        'Mobile app for forest staff',
        'Basic dashboard interface',
        'Initial training program'
      ],
      budget: '₹45 lakhs',
      partnerships: ['West Bengal Forest Department', 'WWF India'],
      success_metrics: [
        '95% camera uptime',
        '80% species recognition accuracy',
        '100% staff trained',
        '50% reduction in response time'
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Ecosystem Expansion',
      duration: '6 months',
      icon: '🌱',
      color: 'from-bio-green to-green-500',
      timeline: 'Q2-Q3 2024',
      objectives: [
        'Expand to 3 additional national parks',
        'Implement acoustic monitoring system',
        'Develop community engagement platform',
        'Add predictive analytics capabilities'
      ],
      deliverables: [
        '100+ camera deployment',
        'Acoustic sensor network',
        'Community mobile app',
        'Predictive threat modeling'
      ],
      budget: '₹1.2 crores',
      partnerships: ['Ministry of Environment', 'Local NGOs', 'Tech Universities'],
      success_metrics: [
        '4 parks fully monitored',
        '90% threat prediction accuracy',
        '70% community participation',
        '60% poaching incident reduction'
      ]
    },
    {
      phase: 'Phase 3',
      title: 'National Network',
      duration: '12 months',
      icon: '🕸️',
      color: 'from-neural-purple to-purple-500',
      timeline: 'Q4 2024 - Q3 2025',
      objectives: [
        'Connect 15 major wildlife sanctuaries',
        'Implement satellite connectivity',
        'Deploy edge AI processing units',
        'Establish 24/7 monitoring centers'
      ],
      deliverables: [
        'National monitoring network',
        'Satellite communication system',
        'Regional control centers',
        'Advanced analytics platform'
      ],
      budget: '₹3.8 crores',
      partnerships: ['ISRO', 'State Forest Departments', 'International Conservation Groups'],
      success_metrics: [
        '15 sanctuaries connected',
        '99% network uptime',
        '24/7 monitoring capability',
        '80% overall threat reduction'
      ]
    },
    {
      phase: 'Phase 4',
      title: 'Global Integration',
      duration: '18 months',
      icon: '🌍',
      color: 'from-tiger-orange to-red-500',
      timeline: 'Q4 2025 - Q1 2027',
      objectives: [
        'Scale to 50+ protected areas',
        'Integrate with global conservation networks',
        'Implement cross-border monitoring',
        'Deploy autonomous response systems'
      ],
      deliverables: [
        'Pan-India coverage',
        'International data sharing',
        'Autonomous patrol units',
        'Global conservation API'
      ],
      budget: '₹8.5 crores',
      partnerships: ['UN Environment', 'Global Wildlife Fund', 'International Tech Consortiums'],
      success_metrics: [
        '50+ areas protected',
        'Global data integration',
        'Autonomous operations',
        '90% conservation effectiveness'
      ]
    }
  ];

  const handleDownloadPDF = () => {
    generateRoadmapPDF(phases);
  };

  const PhaseCard = ({ phase, index }: { phase: any; index: number }) => {
    const isSelected = selectedPhase === index;
    
    return (
      <motion.div
        className={`cursor-pointer transition-all duration-500 ${
          isSelected ? 'scale-105' : 'scale-100 opacity-70'
        }`}
        onClick={() => setSelectedPhase(index)}
        whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
      >
        <div className={`holographic p-6 rounded-xl border-2 ${
          isSelected ? 'border-electric-cyan' : 'border-transparent'
        }`}>
          {/* Phase Header */}
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center text-2xl`}>
              {phase.icon}
            </div>
            <div>
              <div className="text-lg font-orbitron font-bold text-electric-cyan">
                {phase.phase}
              </div>
              <div className="text-sm text-misty-white/60">{phase.timeline}</div>
            </div>
          </div>
          
          {/* Phase Title */}
          <h3 className="text-xl font-orbitron font-bold text-misty-white mb-2">
            {phase.title}
          </h3>
          
          {/* Duration & Budget */}
          <div className="flex justify-between items-center">
            <span className="text-bio-green font-semibold">{phase.duration}</span>
            <span className="text-neural-purple font-mono font-bold">{phase.budget}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="roadmap" ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-forest-navy to-forest-navy/95"></div>
      <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neural-purple to-tiger-orange mb-8">
            Implementation Roadmap
          </h2>
          
          <p className="text-xl md:text-2xl text-misty-white max-w-4xl mx-auto leading-relaxed">
            Strategic phased deployment for nationwide wildlife protection
          </p>
        </motion.div>

        {/* Phase Selection Timeline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <PhaseCard phase={phase} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Phase Information */}
        <motion.div
          key={selectedPhase}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="holographic p-8 rounded-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Objectives & Deliverables */}
            <div className="space-y-8">
              {/* Objectives */}
              <div>
                <h4 className="text-2xl font-orbitron font-bold text-bio-green mb-6 flex items-center space-x-2">
                  <span>🎯</span>
                  <span>Key Objectives</span>
                </h4>
                <div className="space-y-3">
                  {phases[selectedPhase].objectives.map((objective, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 glassmorphism rounded-lg"
                    >
                      <div className="w-2 h-2 bg-electric-cyan rounded-full mt-2 animate-pulse"></div>
                      <span className="text-misty-white">{objective}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-2xl font-orbitron font-bold text-neural-purple mb-6 flex items-center space-x-2">
                  <span>📦</span>
                  <span>Deliverables</span>
                </h4>
                <div className="space-y-3">
                  {phases[selectedPhase].deliverables.map((deliverable, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className="flex items-start space-x-3 p-3 glassmorphism rounded-lg"
                    >
                      <div className="w-2 h-2 bg-neural-purple rounded-full mt-2 animate-pulse"></div>
                      <span className="text-misty-white">{deliverable}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Partnerships & Success Metrics */}
            <div className="space-y-8">
              {/* Partnerships */}
              <div>
                <h4 className="text-2xl font-orbitron font-bold text-tiger-orange mb-6 flex items-center space-x-2">
                  <span>🤝</span>
                  <span>Key Partnerships</span>
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {phases[selectedPhase].partnerships.map((partner, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-4 glassmorphism rounded-lg text-center border-l-4 border-tiger-orange"
                    >
                      <span className="text-misty-white font-semibold">{partner}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Success Metrics */}
              <div>
                <h4 className="text-2xl font-orbitron font-bold text-electric-cyan mb-6 flex items-center space-x-2">
                  <span>📊</span>
                  <span>Success Metrics</span>
                </h4>
                <div className="space-y-3">
                  {phases[selectedPhase].success_metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className="flex items-center justify-between p-3 glassmorphism rounded-lg"
                    >
                      <span className="text-misty-white">{metric}</span>
                      <div className="w-3 h-3 bg-bio-green rounded-full animate-pulse"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Phase Summary Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 p-6 bg-gradient-to-r from-forest-navy to-forest-navy/80 rounded-xl border border-electric-cyan/30"
          >
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-sm text-misty-white/60">Duration</div>
                  <div className="text-lg font-orbitron font-bold text-bio-green">
                    {phases[selectedPhase].duration}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-misty-white/60">Budget</div>
                  <div className="text-lg font-orbitron font-bold text-neural-purple">
                    {phases[selectedPhase].budget}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-misty-white/60">Timeline</div>
                  <div className="text-lg font-orbitron font-bold text-electric-cyan">
                    {phases[selectedPhase].timeline}
                  </div>
                </div>
              </div>
              
              <motion.button
                className="cyber-border holographic px-6 py-3 rounded-xl font-semibold text-electric-cyan hover:text-forest-navy hover:bg-electric-cyan transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadPDF}
              >
                View Detailed Plan
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Total Investment Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto holographic p-8 rounded-2xl">
            <h3 className="text-3xl font-orbitron font-bold text-tiger-orange mb-6">
              Total Investment Framework
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-orbitron font-bold text-bio-green mb-2">₹13.5 cr</div>
                <div className="text-lg text-misty-white">Total Investment</div>
                <div className="text-sm text-misty-white/60">4-year program</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-orbitron font-bold text-electric-cyan mb-2">50+</div>
                <div className="text-lg text-misty-white">Protected Areas</div>
                <div className="text-sm text-misty-white/60">National coverage</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-orbitron font-bold text-neural-purple mb-2">10,000+</div>
                <div className="text-lg text-misty-white">Wildlife Protected</div>
                <div className="text-sm text-misty-white/60">Estimated impact</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImplementationRoadmap;
