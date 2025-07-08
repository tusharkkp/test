
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ProblemStatement = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    { value: "7%", label: "of World's Recorded Fauna", description: "Tigers, Elephants, Snow Leopards in India" },
    { value: "30%", label: "Forest Staff Deficit", description: "Critical monitoring gaps nationwide" },
    { value: "↑", label: "Poaching Incidents", description: "Despite tiger population growth" },
    { value: "2018", label: "Tiger Territory Shrinkage", description: "Fourth National Tiger Estimation reveals trends" }
  ];

  const challenges = [
    "Financial constraints limit AI adoption in remote ecosystems",
    "Infrastructural gaps prevent comprehensive monitoring",
    "Ethical considerations in wildlife surveillance technology",
    "Increasing habitat encroachment threatens biodiversity"
  ];

  return (
    <section id="problem" ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-tiger-orange to-electric-cyan mb-8">
            The Wildlife Crisis
          </h2>
          
          <div className="max-w-5xl mx-auto holographic p-8 rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-electric-cyan mb-6">
              Problem Statement
            </h3>
            <p className="text-lg md:text-xl text-misty-white leading-relaxed">
              How can artificial intelligence and frontier technologies be applied in a 
              <span className="text-bio-green font-bold"> scalable</span>, 
              <span className="text-neural-purple font-bold"> ethical</span>, and 
              <span className="text-tiger-orange font-bold"> cost-effective</span> manner to strengthen 
              wildlife protection, enhance biodiversity monitoring, and integrate communities 
              in conservation management?
            </p>
          </div>
        </motion.div>

        {/* Strategic Significance Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center glassmorphism p-6 rounded-xl hover:scale-105 transition-transform duration-300"
              whileHover={{ y: -10 }}
            >
              <div className="text-4xl md:text-6xl font-orbitron font-black text-electric-cyan text-glow mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-bio-green mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-misty-white/80">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-neural-purple mb-12">
            Critical Challenges
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="cyber-border glassmorphism p-6 rounded-xl"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-tiger-orange rounded-full animate-pulse"></div>
                  <p className="text-misty-white text-left">{challenge}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement;
